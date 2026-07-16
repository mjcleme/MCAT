import type { SectionId } from "./types";

export type ExamQuestion = {
  id: string;
  prompt: string;
  options: string[];
  /** Index into `options`. */
  answer: number;
  explanation: string;
};

/**
 * A section is an ordered list of blocks, mirroring the real exam's mix of
 * passage-based sets and standalone discrete questions.
 */
export type ExamBlock =
  | { kind: "passage"; id: string; title: string; text: string; questions: ExamQuestion[] }
  | { kind: "discrete"; id: string; questions: ExamQuestion[] };

export type ExamSection = {
  id: SectionId;
  /** Minutes allotted, scaled from the real exam's per-question pacing. */
  minutes: number;
  blocks: ExamBlock[];
};

export type Exam = {
  id: string;
  title: string;
  description: string;
  sections: ExamSection[];
  /** Minutes of optional break offered between sections. */
  breakMinutes: number;
};

/** A question flattened out of its block, carrying its passage context. */
export type FlatQuestion = {
  question: ExamQuestion;
  section: SectionId;
  /** Index within the section, 0-based. */
  indexInSection: number;
  passage?: { title: string; text: string };
};

export function flattenSection(section: ExamSection): FlatQuestion[] {
  const out: FlatQuestion[] = [];
  for (const block of section.blocks) {
    for (const question of block.questions) {
      out.push({
        question,
        section: section.id,
        indexInSection: out.length,
        passage:
          block.kind === "passage"
            ? { title: block.title, text: block.text }
            : undefined,
      });
    }
  }
  return out;
}

export function sectionQuestionCount(section: ExamSection): number {
  return section.blocks.reduce((sum, b) => sum + b.questions.length, 0);
}
