import { createClient } from "./supabase/server";
import type { QuizQuestion, SectionId } from "./types";
import type {
  MissedQuestion,
  QuestionNote,
  TopicWeakness,
} from "./review-types";
import { ALL_QUIZZES, getQuiz } from "@/data";
import { DIAGNOSTIC_EXAM, flattenExam } from "@/data/exam";
import { topicOf } from "@/data/question-topics";

// Re-exported so server callers have one import site for the whole feature.
export type {
  MissCause,
  MissedQuestion,
  QuestionNote,
  TopicWeakness,
} from "./review-types";
export { CAUSE_LABELS } from "./review-types";

/** Every question in the app, indexed by id, with its origin. */
function buildIndex() {
  const index = new Map<
    string,
    {
      question: QuizQuestion;
      section: SectionId;
      source: "quiz" | "exam";
      sourceTitle: string;
      passage?: string;
    }
  >();

  for (const quiz of ALL_QUIZZES) {
    for (const question of quiz.questions) {
      index.set(question.id, {
        question,
        section: quiz.section,
        source: "quiz",
        sourceTitle: quiz.title,
        passage: quiz.passage,
      });
    }
  }

  for (const f of flattenExam(DIAGNOSTIC_EXAM)) {
    index.set(f.question.id, {
      question: f.question,
      section: f.section,
      source: "exam",
      sourceTitle: f.passage?.title ?? DIAGNOSTIC_EXAM.title,
      passage: f.passage?.text,
    });
  }

  return index;
}

/**
 * Reconstructs everything the user has ever missed from their stored attempts.
 *
 * Nothing is written when a question is missed — the attempts already record
 * every answer, so the miss list is derived. That keeps a single source of
 * truth and means this list stays correct even for attempts made before the
 * review feature existed.
 */
export async function getMissedQuestions(
  userId: string,
): Promise<MissedQuestion[]> {
  const supabase = await createClient();

  const [quizRes, examRes, notesRes] = await Promise.all([
    supabase
      .from("quiz_attempts")
      .select("quiz_id, answers, completed_at")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false }),
    supabase
      .from("exam_attempts")
      .select("exam_id, answers, completed_at")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false }),
    supabase
      .from("question_notes")
      .select("question_id, cause, resolved, retest_correct, retest_wrong")
      .eq("user_id", userId),
  ]);

  const notes = new Map<string, QuestionNote>();
  for (const n of (notesRes.data ?? []) as QuestionNote[]) {
    notes.set(n.question_id, n);
  }

  const index = buildIndex();
  const missed = new Map<string, MissedQuestion>();

  function record(
    questionId: string,
    choice: number | undefined,
    at: string,
  ): void {
    const entry = index.get(questionId);
    // A question that no longer exists in the content (renamed or removed).
    if (!entry) return;
    if (choice === entry.question.answer) return;

    const existing = missed.get(questionId);
    if (existing) {
      existing.timesMissed += 1;
      // Attempts arrive newest-first, so keep the first choice we see.
      return;
    }

    missed.set(questionId, {
      question: entry.question,
      section: entry.section,
      topic: topicOf(questionId),
      source: entry.source,
      sourceTitle: entry.sourceTitle,
      timesMissed: 1,
      lastMissedAt: at,
      lastChoice: choice,
      note: notes.get(questionId) ?? null,
      passage: entry.passage,
    });
  }

  for (const attempt of quizRes.data ?? []) {
    const quiz = getQuiz(attempt.quiz_id as string);
    if (!quiz) continue;
    const answers = attempt.answers as Record<string, number>;
    // Iterate the quiz's questions, not the answer keys, so an unanswered
    // question still counts as missed.
    for (const question of quiz.questions) {
      record(question.id, answers[question.id], attempt.completed_at as string);
    }
  }

  for (const attempt of examRes.data ?? []) {
    const answers = attempt.answers as Record<string, number>;
    for (const f of flattenExam(DIAGNOSTIC_EXAM)) {
      record(f.question.id, answers[f.question.id], attempt.completed_at as string);
    }
  }

  return [...missed.values()].sort(
    (a, b) =>
      b.timesMissed - a.timesMissed ||
      Date.parse(b.lastMissedAt) - Date.parse(a.lastMissedAt),
  );
}

/**
 * Accuracy per topic across every attempt. Only topics the user has actually
 * been tested on appear — an untouched topic is unknown, not weak.
 */
export async function getTopicWeaknesses(
  userId: string,
): Promise<TopicWeakness[]> {
  const supabase = await createClient();

  const [quizRes, examRes] = await Promise.all([
    supabase
      .from("quiz_attempts")
      .select("quiz_id, answers")
      .eq("user_id", userId),
    supabase.from("exam_attempts").select("answers").eq("user_id", userId),
  ]);

  const index = buildIndex();
  const stats = new Map<string, TopicWeakness>();

  function tally(questionId: string, choice: number | undefined) {
    const entry = index.get(questionId);
    if (!entry) return;
    const topic = topicOf(questionId);
    const key = `${entry.section}::${topic}`;
    const stat =
      stats.get(key) ??
      { topic, section: entry.section, missed: 0, seen: 0, accuracy: 0 };
    stat.seen += 1;
    if (choice !== entry.question.answer) stat.missed += 1;
    stats.set(key, stat);
  }

  for (const attempt of quizRes.data ?? []) {
    const quiz = getQuiz(attempt.quiz_id as string);
    if (!quiz) continue;
    const answers = attempt.answers as Record<string, number>;
    for (const q of quiz.questions) tally(q.id, answers[q.id]);
  }

  for (const attempt of examRes.data ?? []) {
    const answers = attempt.answers as Record<string, number>;
    for (const f of flattenExam(DIAGNOSTIC_EXAM)) {
      tally(f.question.id, answers[f.question.id]);
    }
  }

  return [...stats.values()]
    .map((s) => ({ ...s, accuracy: s.seen > 0 ? (s.seen - s.missed) / s.seen : 0 }))
    .sort((a, b) => a.accuracy - b.accuracy || b.seen - a.seen);
}
