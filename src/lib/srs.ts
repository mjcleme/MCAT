import type { CardReview, Rating } from "./types";

/**
 * A trimmed SM-2. Ratings map onto SM-2 quality scores; anything below "good"
 * is treated as a lapse and restarts the interval.
 */
const QUALITY: Record<Rating, number> = {
  again: 2,
  hard: 3,
  good: 4,
  easy: 5,
};

const MIN_EASE = 1.3;
const DAY_MS = 24 * 60 * 60 * 1000;

export type SrsState = Pick<
  CardReview,
  "ease" | "interval_days" | "repetitions" | "lapses" | "due_at"
>;

export const INITIAL_STATE: SrsState = {
  ease: 2.5,
  interval_days: 0,
  repetitions: 0,
  lapses: 0,
  due_at: new Date().toISOString(),
};

/**
 * Returns the next scheduling state for a card given how the user rated it.
 * Pass `now` to keep callers deterministic in tests.
 */
export function schedule(
  prev: SrsState,
  rating: Rating,
  now: Date = new Date(),
): SrsState {
  const quality = QUALITY[rating];
  const lapsed = quality < 3;

  // Standard SM-2 ease adjustment, floored so a card can never become
  // unreviewable-frequent.
  const ease = Math.max(
    MIN_EASE,
    prev.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
  );

  let repetitions: number;
  let intervalDays: number;

  if (lapsed) {
    repetitions = 0;
    intervalDays = 0; // due again this session
  } else {
    repetitions = prev.repetitions + 1;
    if (repetitions === 1) {
      intervalDays = 1;
    } else if (repetitions === 2) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(prev.interval_days * ease);
    }
    // "hard" earns a shorter step than the ease alone would give.
    if (rating === "hard") {
      intervalDays = Math.max(1, Math.round(intervalDays * 0.6));
    }
  }

  return {
    ease,
    interval_days: intervalDays,
    repetitions,
    lapses: prev.lapses + (lapsed ? 1 : 0),
    due_at: new Date(now.getTime() + intervalDays * DAY_MS).toISOString(),
  };
}

export function isDue(review: SrsState, now: Date = new Date()): boolean {
  return new Date(review.due_at).getTime() <= now.getTime();
}

/** Human-readable preview of when a rating would resurface the card. */
export function intervalLabel(state: SrsState, rating: Rating): string {
  const next = schedule(state, rating);
  const days = next.interval_days;
  if (days === 0) return "Now";
  if (days === 1) return "1 day";
  if (days < 30) return `${days} days`;
  const months = Math.round(days / 30);
  return months === 1 ? "1 month" : `${months} months`;
}

/**
 * Orders a study queue: cards never seen come first, then overdue cards by how
 * long they have been waiting.
 */
export function buildQueue<T extends { id: string }>(
  cards: T[],
  reviews: Map<string, CardReview>,
  now: Date = new Date(),
): T[] {
  const unseen: T[] = [];
  const due: { card: T; overdueBy: number }[] = [];

  for (const card of cards) {
    const review = reviews.get(card.id);
    if (!review) {
      unseen.push(card);
      continue;
    }
    const overdueBy = now.getTime() - new Date(review.due_at).getTime();
    if (overdueBy >= 0) due.push({ card, overdueBy });
  }

  due.sort((a, b) => b.overdueBy - a.overdueBy);
  return [...unseen, ...due.map((d) => d.card)];
}
