import type { QuizQuestion, SectionId } from "./types";

/**
 * Client-safe half of the review feature: types and label constants only.
 *
 * `lib/review.ts` holds the queries and imports the server Supabase client,
 * which pulls in `next/headers`. Client components need `CAUSE_LABELS` at
 * runtime, so importing it from there drags server-only code into the browser
 * bundle and fails the build. Keep anything a client component touches here.
 */

/** Why a question was missed. Matches the check constraint on question_notes. */
export type MissCause = "content" | "misread" | "pacing" | "trap" | "guess";

export const CAUSE_LABELS: Record<MissCause, { label: string; hint: string }> = {
  content: {
    label: "Didn't know it",
    hint: "A genuine content gap. Study the topic.",
  },
  misread: {
    label: "Misread the question",
    hint: "Knew the material, missed a word in the stem.",
  },
  pacing: {
    label: "Rushed it",
    hint: "Ran short on time and guessed under pressure.",
  },
  trap: {
    label: "Fell for the distractor",
    hint: "Picked a tempting wrong answer. The most fixable kind.",
  },
  guess: {
    label: "Blind guess",
    hint: "No idea either way.",
  },
};

export type QuestionNote = {
  question_id: string;
  cause: MissCause | null;
  resolved: boolean;
  retest_correct: number;
  retest_wrong: number;
};

export type MissedQuestion = {
  question: QuizQuestion;
  section: SectionId;
  topic: string;
  source: "quiz" | "exam";
  /** Human-readable origin, e.g. "Enzyme Kinetics & Regulation". */
  sourceTitle: string;
  /** How many times this question has been answered wrong. */
  timesMissed: number;
  lastMissedAt: string;
  /** Option index most recently chosen. */
  lastChoice: number | undefined;
  note: QuestionNote | null;
  passage?: string;
};

export type TopicWeakness = {
  topic: string;
  section: SectionId;
  missed: number;
  seen: number;
  accuracy: number;
};
