import { createClient } from "./supabase/server";
import type { CardReview, QuizAttempt, SectionId } from "./types";
import { cardsForSection } from "@/data";

export type SectionProgress = {
  section: SectionId;
  total: number;
  seen: number;
  /** Cards with an interval of at least 21 days — the usual "mature" cutoff. */
  mastered: number;
  due: number;
};

export async function getReviews(userId: string): Promise<CardReview[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("card_reviews")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(`Could not load reviews: ${error.message}`);
  return (data ?? []) as CardReview[];
}

export async function getAttempts(
  userId: string,
  limit = 20,
): Promise<QuizAttempt[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("*")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Could not load attempts: ${error.message}`);
  return (data ?? []) as QuizAttempt[];
}

const MATURE_INTERVAL_DAYS = 21;

export function summarizeSection(
  section: SectionId,
  reviews: CardReview[],
  now = new Date(),
): SectionProgress {
  const cards = cardsForSection(section);
  const ids = new Set(cards.map((c) => c.id));
  const relevant = reviews.filter((r) => ids.has(r.card_id));

  return {
    section,
    total: cards.length,
    seen: relevant.length,
    mastered: relevant.filter((r) => r.interval_days >= MATURE_INTERVAL_DAYS)
      .length,
    due:
      cards.length -
      relevant.length +
      relevant.filter((r) => new Date(r.due_at) <= now).length,
  };
}

/**
 * Counts consecutive days ending today (or yesterday, so a streak survives
 * until the day is actually missed) that have at least one study session.
 */
export async function getStreak(userId: string): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("study_sessions")
    .select("studied_on")
    .eq("user_id", userId)
    .order("studied_on", { ascending: false })
    .limit(400);

  if (error || !data?.length) return 0;

  const days = [...new Set(data.map((row) => row.studied_on as string))];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const mostRecent = new Date(`${days[0]}T00:00:00Z`);
  const gapDays = Math.round(
    (today.getTime() - mostRecent.getTime()) / 86_400_000,
  );
  // A streak is only live if the last session was today or yesterday.
  if (gapDays > 1) return 0;

  let streak = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(`${days[i - 1]}T00:00:00Z`);
    const curr = new Date(`${days[i]}T00:00:00Z`);
    const diff = Math.round((prev.getTime() - curr.getTime()) / 86_400_000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}
