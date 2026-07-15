"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { schedule, type SrsState } from "@/lib/srs";
import type { Rating, SectionId } from "@/lib/types";
import { getCard, getQuiz } from "@/data";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  return { supabase, user };
}

/**
 * Records a flashcard rating and returns the new scheduling state. The card's
 * previous state is read server-side rather than trusted from the client.
 */
export async function reviewCard(cardId: string, rating: Rating) {
  const card = getCard(cardId);
  if (!card) throw new Error(`Unknown card: ${cardId}`);

  const { supabase, user } = await requireUser();

  const { data: existing } = await supabase
    .from("card_reviews")
    .select("ease, interval_days, repetitions, lapses, due_at")
    .eq("user_id", user.id)
    .eq("card_id", cardId)
    .maybeSingle();

  const prev: SrsState = existing ?? {
    ease: 2.5,
    interval_days: 0,
    repetitions: 0,
    lapses: 0,
    due_at: new Date().toISOString(),
  };

  const next = schedule(prev, rating);

  const { error } = await supabase.from("card_reviews").upsert(
    {
      user_id: user.id,
      card_id: cardId,
      section: card.section,
      ...next,
      last_rating: { again: 0, hard: 1, good: 2, easy: 3 }[rating],
      reviewed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,card_id" },
  );

  if (error) throw new Error(`Could not save review: ${error.message}`);

  return next;
}

/** Logs that the user studied today, so the streak counter advances. */
export async function logStudySession(
  kind: "flashcards" | "quiz",
  cardsSeen: number,
) {
  const { supabase, user } = await requireUser();

  const { error } = await supabase.from("study_sessions").insert({
    user_id: user.id,
    kind,
    cards_seen: cardsSeen,
  });

  if (error) throw new Error(`Could not log session: ${error.message}`);
  revalidatePath("/dashboard");
}

/**
 * Grades and stores a quiz attempt. Grading happens on the server against the
 * canonical answer key — the client only submits which options were chosen.
 */
export async function submitQuiz(
  quizId: string,
  answers: Record<string, number>,
  durationSecs: number,
) {
  const quiz = getQuiz(quizId);
  if (!quiz) throw new Error(`Unknown quiz: ${quizId}`);

  const { supabase, user } = await requireUser();

  const score = quiz.questions.reduce(
    (sum, q) => sum + (answers[q.id] === q.answer ? 1 : 0),
    0,
  );

  const { error } = await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    quiz_id: quizId,
    section: quiz.section as SectionId,
    score,
    total: quiz.questions.length,
    duration_secs: durationSecs,
    answers,
  });

  if (error) throw new Error(`Could not save attempt: ${error.message}`);

  await supabase.from("study_sessions").insert({
    user_id: user.id,
    kind: "quiz",
    cards_seen: quiz.questions.length,
  });

  revalidatePath("/dashboard");
  revalidatePath("/quiz");

  return { score, total: quiz.questions.length };
}
