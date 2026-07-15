import type { Flashcard, Quiz, SectionId } from "@/lib/types";
import { bioBiochemCards } from "./flashcards/bio-biochem";
import { chemPhysCards } from "./flashcards/chem-phys";
import { psychSocCards } from "./flashcards/psych-soc";
import { carsCards } from "./flashcards/cars";
import { bioBiochemQuizzes } from "./quizzes/bio-biochem";
import { chemPhysQuizzes } from "./quizzes/chem-phys";
import { psychSocQuizzes } from "./quizzes/psych-soc";
import { carsQuizzes } from "./quizzes/cars";

export const ALL_CARDS: Flashcard[] = [
  ...bioBiochemCards,
  ...chemPhysCards,
  ...psychSocCards,
  ...carsCards,
];

export const ALL_QUIZZES: Quiz[] = [
  ...bioBiochemQuizzes,
  ...chemPhysQuizzes,
  ...psychSocQuizzes,
  ...carsQuizzes,
];

export function cardsForSection(section: SectionId): Flashcard[] {
  return ALL_CARDS.filter((card) => card.section === section);
}

export function quizzesForSection(section: SectionId): Quiz[] {
  return ALL_QUIZZES.filter((quiz) => quiz.section === section);
}

export function getQuiz(id: string): Quiz | undefined {
  return ALL_QUIZZES.find((quiz) => quiz.id === id);
}

export function getCard(id: string): Flashcard | undefined {
  return ALL_CARDS.find((card) => card.id === id);
}

/** Distinct topics within a section, in first-appearance order. */
export function topicsForSection(section: SectionId): string[] {
  return [...new Set(cardsForSection(section).map((c) => c.topic))];
}

export const TOTAL_CARDS = ALL_CARDS.length;
export const TOTAL_QUESTIONS = ALL_QUIZZES.reduce(
  (sum, quiz) => sum + quiz.questions.length,
  0,
);
