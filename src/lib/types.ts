export type SectionId = "bb" | "cp" | "ps" | "cars";

export type Section = {
  id: SectionId;
  name: string;
  shortName: string;
  blurb: string;
  /** Tailwind classes for the section's accent treatment. */
  accent: string;
  dot: string;
};

export const SECTIONS: Section[] = [
  {
    id: "bb",
    name: "Biological & Biochemical Foundations",
    shortName: "Bio/Biochem",
    blurb:
      "Amino acids, enzymes, metabolism, molecular biology, and organ systems.",
    accent: "from-emerald-500 to-teal-600",
    dot: "bg-emerald-500",
  },
  {
    id: "cp",
    name: "Chemical & Physical Foundations",
    shortName: "Chem/Phys",
    blurb:
      "General chemistry, organic chemistry, physics, and lab techniques.",
    accent: "from-sky-500 to-blue-600",
    dot: "bg-sky-500",
  },
  {
    id: "ps",
    name: "Psychological, Social & Biological Foundations",
    shortName: "Psych/Soc",
    blurb:
      "Sensation and perception, learning, identity, and social structures.",
    accent: "from-violet-500 to-purple-600",
    dot: "bg-violet-500",
  },
  {
    id: "cars",
    name: "Critical Analysis & Reasoning Skills",
    shortName: "CARS",
    blurb:
      "Passage comprehension, reasoning within and beyond the text.",
    accent: "from-amber-500 to-orange-600",
    dot: "bg-amber-500",
  },
];

export function getSection(id: SectionId): Section {
  const section = SECTIONS.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown section: ${id}`);
  return section;
}

export type Flashcard = {
  id: string;
  section: SectionId;
  topic: string;
  front: string;
  back: string;
};

export type QuizQuestion = {
  id: string;
  /** Discrete questions stand alone; passage questions belong to a stem. */
  prompt: string;
  options: string[];
  /** Index into `options`. */
  answer: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  section: SectionId;
  title: string;
  description: string;
  /** Present only for passage-based quizzes (CARS and some science sets). */
  passage?: string;
  questions: QuizQuestion[];
};

/** Persisted spaced-repetition state for a single card. */
export type CardReview = {
  card_id: string;
  section: SectionId;
  ease: number;
  interval_days: number;
  repetitions: number;
  lapses: number;
  due_at: string;
  last_rating: number | null;
  reviewed_at: string;
};

export type QuizAttempt = {
  id: string;
  quiz_id: string;
  section: SectionId;
  score: number;
  total: number;
  duration_secs: number | null;
  answers: Record<string, number>;
  completed_at: string;
};

/** How well the user recalled a card, mapped onto SM-2 quality scores. */
export type Rating = "again" | "hard" | "good" | "easy";
