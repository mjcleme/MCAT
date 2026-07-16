"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getExam, flattenExam } from "@/data/exam";
import { scaledScore, type SectionScore } from "@/lib/exam-scoring";
import { sectionQuestionCount } from "@/lib/exam-types";
import type { SectionId } from "@/lib/types";

/**
 * Grades a completed exam server-side against the canonical key. The client
 * submits only which option index it chose per question.
 */
export async function submitExam(
  examId: string,
  answers: Record<string, number>,
) {
  const exam = getExam(examId);
  if (!exam) throw new Error(`Unknown exam: ${examId}`);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const flat = flattenExam(exam);

  const sectionScores: SectionScore[] = exam.sections.map((section) => {
    const inSection = flat.filter((f) => f.section === section.id);
    const raw = inSection.reduce(
      (sum, f) => sum + (answers[f.question.id] === f.question.answer ? 1 : 0),
      0,
    );
    const total = sectionQuestionCount(section);
    return {
      section: section.id as SectionId,
      raw,
      total,
      scaled: scaledScore(raw, total),
    };
  });

  const totalScaled = sectionScores.reduce((sum, s) => sum + s.scaled, 0);

  // Keep only answers to questions that actually exist in this exam, so a
  // tampered payload can't bloat the row.
  const validIds = new Set(flat.map((f) => f.question.id));
  const cleanAnswers = Object.fromEntries(
    Object.entries(answers).filter(([id]) => validIds.has(id)),
  );

  const { data, error } = await supabase
    .from("exam_attempts")
    .insert({
      user_id: user.id,
      exam_id: examId,
      answers: cleanAnswers,
      section_scores: sectionScores,
      total_scaled: totalScaled,
    })
    .select("id")
    .single();

  if (error) throw new Error(`Could not save your exam: ${error.message}`);

  await supabase.from("study_sessions").insert({
    user_id: user.id,
    kind: "exam",
    cards_seen: flat.length,
  });

  revalidatePath("/dashboard");
  revalidatePath("/exam");

  return { attemptId: data.id as string, totalScaled };
}
