import type { Exam, ExamSection, FlatQuestion } from "@/lib/exam-types";
import { flattenSection, sectionQuestionCount } from "@/lib/exam-types";
import { balance } from "@/lib/exam-balance";
import type { SectionId } from "@/lib/types";
import { examChemPhys } from "./chem-phys";
import { examCars } from "./cars";
import { examBioBiochem } from "./bio-biochem";
import { examPsychSoc } from "./psych-soc";

/**
 * Options are written in whatever order reads most naturally, which clusters
 * correct answers badly. Balancing happens here, once, so no consumer can
 * reach the raw section data by accident.
 */
function balanceSection(section: ExamSection): ExamSection {
  return {
    ...section,
    blocks: section.blocks.map((block) => ({
      ...block,
      questions: block.questions.map(balance),
    })),
  };
}

/**
 * Section order mirrors the real exam: Chem/Phys, CARS, Bio/Biochem, Psych/Soc.
 * Timing is scaled from the AAMC's per-question pacing (~1.6 min for the
 * science sections, ~1.7 for CARS) at half the question count.
 */
export const DIAGNOSTIC_EXAM: Exam = {
  id: "diagnostic-1",
  title: "Half-Length Diagnostic Exam",
  description:
    "120 questions across all four sections, timed at real MCAT pacing. Scored 472–528.",
  breakMinutes: 10,
  sections: [examChemPhys, examCars, examBioBiochem, examPsychSoc].map(
    balanceSection,
  ),
};

export const ALL_EXAMS: Exam[] = [DIAGNOSTIC_EXAM];

export function getExam(id: string): Exam | undefined {
  return ALL_EXAMS.find((e) => e.id === id);
}

export function examQuestionCount(exam: Exam): number {
  return exam.sections.reduce((sum, s) => sum + sectionQuestionCount(s), 0);
}

export function examMinutes(exam: Exam): number {
  const testing = exam.sections.reduce((sum, s) => sum + s.minutes, 0);
  const breaks = exam.breakMinutes * (exam.sections.length - 1);
  return testing + breaks;
}

/** Every question in the exam, flattened, in presentation order. */
export function flattenExam(exam: Exam): FlatQuestion[] {
  return exam.sections.flatMap(flattenSection);
}

export function examAnswerKey(exam: Exam): Map<string, number> {
  const key = new Map<string, number>();
  for (const { question } of flattenExam(exam)) {
    key.set(question.id, question.answer);
  }
  return key;
}

/** Which section a given question id belongs to. */
export function sectionOfQuestion(
  exam: Exam,
  questionId: string,
): SectionId | undefined {
  return flattenExam(exam).find((q) => q.question.id === questionId)?.section;
}
