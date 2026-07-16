import type { ExamQuestion } from "./exam-types";

/**
 * Answer-position balancing.
 *
 * Written naturally, the correct answer lands in the same slot far too often —
 * our first draft put 63% of answers at B and one at D, which a test-wise
 * student could exploit without knowing any content. This module permutes each
 * question's options to a deterministic target position and remaps the letter
 * references inside the explanation to match.
 *
 * Deterministic by question id, so a given question always renders identically:
 * a student who retakes the exam sees stable letters, and the answer key in the
 * database stays meaningful across deploys. Never randomize this at request
 * time — stored attempts record option indices.
 */

const LETTERS = ["A", "B", "C", "D"] as const;

/** FNV-1a. Small, fast, and stable across runtimes — Math.random is not. */
function hash(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Rewrites option letters in explanation prose given a map from old index to
 * new index. Handles every reference form used in our content:
 *   "Choice A" · "choices B and D" · "Choices A, C, and D" · "eliminates A"
 */
export function remapExplanation(
  text: string,
  oldToNew: readonly number[],
): string {
  const letterOf = (old: string) => {
    const oldIndex = LETTERS.indexOf(old as (typeof LETTERS)[number]);
    if (oldIndex < 0) return old;
    return LETTERS[oldToNew[oldIndex]];
  };

  // Replace letters only where they are unambiguously option references: after
  // "choice(s)"/"option(s)", after an elimination verb, or inside a list that
  // began with one of those. A bare capital letter elsewhere is left alone.
  //
  // The letter classes must stay case-SENSITIVE. Matching them case-insensitively
  // lets [A-D] match the "a" in "and", so "Choices A, C, and D" parses as the
  // list "A, C, a" and the final letter escapes remapping.
  return text.replace(
    /\b([Cc]hoices?|[Oo]ptions?|[Ee]liminates?|[Ee]liminating|[Ee]liminated|[Rr]ules? out|[Pp]icking|[Cc]hoosing|[Aa]nswering)\s+([A-D])((?:\s*,\s*[A-D])*(?:\s*,?\s*and\s+[A-D])?)/g,
    (_match, lead: string, first: string, rest: string) => {
      const remappedRest = rest.replace(
        /\b([A-D])\b/g,
        (l: string) => letterOf(l),
      );
      return `${lead} ${letterOf(first)}${remappedRest}`;
    },
  );
}

/**
 * Moves the correct option to `target`, preserving the relative order of the
 * distractors, and remaps the explanation's letter references.
 */
export function balanceQuestion(
  question: ExamQuestion,
  target: number,
): ExamQuestion {
  // Work in index space, never by matching option text — two options with the
  // same wording would otherwise resolve to the same slot and corrupt the key.
  const distractorIndices = question.options
    .map((_, i) => i)
    .filter((i) => i !== question.answer);

  const newToOld: number[] = [];
  let d = 0;
  for (let i = 0; i < question.options.length; i++) {
    newToOld.push(i === target ? question.answer : distractorIndices[d++]);
  }

  const newOptions = newToOld.map((oldIndex) => question.options[oldIndex]);

  const oldToNew: number[] = [];
  newToOld.forEach((oldIndex, newIndex) => {
    oldToNew[oldIndex] = newIndex;
  });

  return {
    ...question,
    options: newOptions,
    answer: target,
    explanation: remapExplanation(question.explanation, oldToNew),
  };
}

/** Target slot for a question, derived from its id so it never drifts. */
export function targetFor(questionId: string): number {
  return hash(questionId) % 4;
}

export function balance(question: ExamQuestion): ExamQuestion {
  return balanceQuestion(question, targetFor(question.id));
}
