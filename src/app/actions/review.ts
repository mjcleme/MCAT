"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { MissCause } from "@/lib/review-types";
import { ALL_QUIZZES } from "@/data";
import { DIAGNOSTIC_EXAM, flattenExam } from "@/data/exam";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  return { supabase, user };
}

/** Answer key for every question in the app, built once per request. */
function answerKey(): Map<string, number> {
  const key = new Map<string, number>();
  for (const quiz of ALL_QUIZZES) {
    for (const q of quiz.questions) key.set(q.id, q.answer);
  }
  for (const f of flattenExam(DIAGNOSTIC_EXAM)) {
    key.set(f.question.id, f.question.answer);
  }
  return key;
}

/** Records why the student missed a question. */
export async function setCause(questionId: string, cause: MissCause | null) {
  const { supabase, user } = await requireUser();
  if (!answerKey().has(questionId)) {
    throw new Error(`Unknown question: ${questionId}`);
  }

  const { error } = await supabase.from("question_notes").upsert(
    {
      user_id: user.id,
      question_id: questionId,
      cause,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,question_id" },
  );

  if (error) throw new Error(`Could not save: ${error.message}`);
  revalidatePath("/review");
}

/**
 * Grades one retest answer server-side and updates the note. Getting it right
 * resolves the question; getting it wrong un-resolves it, so a lucky guess
 * doesn't permanently clear something the student still can't do.
 */
export async function submitRetestAnswer(questionId: string, choice: number) {
  const { supabase, user } = await requireUser();

  const correctAnswer = answerKey().get(questionId);
  if (correctAnswer === undefined) {
    throw new Error(`Unknown question: ${questionId}`);
  }
  const correct = choice === correctAnswer;

  const { data: existing } = await supabase
    .from("question_notes")
    .select("retest_correct, retest_wrong")
    .eq("user_id", user.id)
    .eq("question_id", questionId)
    .maybeSingle();

  const { error } = await supabase.from("question_notes").upsert(
    {
      user_id: user.id,
      question_id: questionId,
      resolved: correct,
      retest_correct: (existing?.retest_correct ?? 0) + (correct ? 1 : 0),
      retest_wrong: (existing?.retest_wrong ?? 0) + (correct ? 0 : 1),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,question_id" },
  );

  if (error) throw new Error(`Could not save: ${error.message}`);

  return { correct, correctAnswer };
}

/** Logs a finished retest session so it counts toward the streak. */
export async function logRetestSession(count: number) {
  const { supabase, user } = await requireUser();
  await supabase.from("study_sessions").insert({
    user_id: user.id,
    kind: "retest",
    cards_seen: count,
  });
  revalidatePath("/dashboard");
  revalidatePath("/review");
}
