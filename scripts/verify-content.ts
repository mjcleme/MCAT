import { ALL_CARDS, ALL_QUIZZES, TOTAL_CARDS, TOTAL_QUESTIONS } from "@/data";
import { schedule, buildQueue, isDue, INITIAL_STATE } from "@/lib/srs";
import type { CardReview } from "@/lib/types";

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  if (!cond) {
    failures++;
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

console.log("\n--- Content integrity ---");

const cardIds = ALL_CARDS.map((c) => c.id);
check("no duplicate card ids", new Set(cardIds).size === cardIds.length);
for (const c of ALL_CARDS) {
  check(`card ${c.id} has front`, c.front.trim().length > 0);
  check(`card ${c.id} has back`, c.back.trim().length > 0);
  check(`card ${c.id} has topic`, c.topic.trim().length > 0);
}

// Near-duplicate detection: at 600+ cards it is easy to write the same card
// twice under different ids, which quietly corrupts the SRS (two schedules for
// one fact) and wastes the student's time.
const norm = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

const frontSeen = new Map<string, string>();
for (const c of ALL_CARDS) {
  const key = norm(c.front);
  const prior = frontSeen.get(key);
  check(`card ${c.id} front is not a duplicate of ${prior}`, !prior, prior ? `"${c.front.slice(0, 60)}"` : "");
  frontSeen.set(key, c.id);
}

const backSeen = new Map<string, string>();
for (const c of ALL_CARDS) {
  const key = norm(c.back);
  const prior = backSeen.get(key);
  check(`card ${c.id} back is not a duplicate of ${prior}`, !prior, prior ? `"${c.back.slice(0, 60)}"` : "");
  backSeen.set(key, c.id);
}

const qIds = ALL_QUIZZES.flatMap((q) => q.questions.map((x) => x.id));
check("no duplicate question ids", new Set(qIds).size === qIds.length);
check("no duplicate quiz ids", new Set(ALL_QUIZZES.map((q) => q.id)).size === ALL_QUIZZES.length);

for (const quiz of ALL_QUIZZES) {
  for (const q of quiz.questions) {
    check(`${q.id} has 4 options`, q.options.length === 4, `got ${q.options.length}`);
    check(
      `${q.id} answer index in range`,
      q.answer >= 0 && q.answer < q.options.length,
      `answer=${q.answer}`,
    );
    check(`${q.id} has explanation`, q.explanation.trim().length > 20);
    check(`${q.id} options unique`, new Set(q.options).size === q.options.length);
  }
}

// Every CARS quiz should carry a passage; that's the whole point of the section.
for (const quiz of ALL_QUIZZES.filter((q) => q.section === "cars")) {
  check(`${quiz.id} has passage`, Boolean(quiz.passage?.trim()));
}

console.log(`  ${TOTAL_CARDS} cards, ${TOTAL_QUESTIONS} questions across ${ALL_QUIZZES.length} quizzes`);
const bySection = (s: string) => ALL_CARDS.filter((c) => c.section === s).length;
console.log(
  `  bb=${bySection("bb")} cp=${bySection("cp")} ps=${bySection("ps")} cars=${bySection("cars")}`,
);

console.log("\n--- SRS scheduling ---");

const now = new Date("2026-01-01T00:00:00Z");

// A brand-new card rated "good" should come back tomorrow.
const s1 = schedule(INITIAL_STATE, "good", now);
check("first 'good' -> 1 day", s1.interval_days === 1, `got ${s1.interval_days}`);
check("first 'good' -> reps 1", s1.repetitions === 1);

// Second "good" -> 6 days, per SM-2.
const s2 = schedule(s1, "good", now);
check("second 'good' -> 6 days", s2.interval_days === 6, `got ${s2.interval_days}`);

// Third "good" multiplies by ease.
const s3 = schedule(s2, "good", now);
check("third 'good' grows past 6", s3.interval_days > 6, `got ${s3.interval_days}`);

// "again" resets and records a lapse.
const lapse = schedule(s3, "again", now);
check("'again' resets interval", lapse.interval_days === 0);
check("'again' resets reps", lapse.repetitions === 0);
check("'again' increments lapses", lapse.lapses === s3.lapses + 1);
check("'again' is immediately due", isDue(lapse, now));

// Ease floor holds under repeated failure.
let hammered = INITIAL_STATE;
for (let i = 0; i < 20; i++) hammered = schedule(hammered, "again", now);
check("ease never drops below 1.3", hammered.ease >= 1.3, `got ${hammered.ease}`);

// "easy" should outpace "good" from the same state.
const easy = schedule(s2, "easy", now);
const good = schedule(s2, "good", now);
check("'easy' >= 'good' interval", easy.interval_days >= good.interval_days);

// "hard" should undershoot "good".
const hard = schedule(s2, "hard", now);
check("'hard' < 'good' interval", hard.interval_days < good.interval_days,
  `hard=${hard.interval_days} good=${good.interval_days}`);

// due_at should actually track the interval.
const days = Math.round(
  (new Date(s2.due_at).getTime() - now.getTime()) / 86_400_000,
);
check("due_at matches interval", days === s2.interval_days, `${days} vs ${s2.interval_days}`);

console.log("\n--- Queue building ---");

const cards = ALL_CARDS.slice(0, 5);
const reviews = new Map<string, CardReview>();
// card[0] due in the past (overdue), card[1] due far in the future.
reviews.set(cards[0].id, {
  card_id: cards[0].id, section: cards[0].section, ease: 2.5,
  interval_days: 1, repetitions: 1, lapses: 0,
  due_at: new Date(now.getTime() - 86_400_000).toISOString(),
  last_rating: 2, reviewed_at: now.toISOString(),
});
reviews.set(cards[1].id, {
  card_id: cards[1].id, section: cards[1].section, ease: 2.5,
  interval_days: 30, repetitions: 4, lapses: 0,
  due_at: new Date(now.getTime() + 30 * 86_400_000).toISOString(),
  last_rating: 3, reviewed_at: now.toISOString(),
});

const queue = buildQueue(cards, reviews, now);
check("future card excluded from queue", !queue.some((c) => c.id === cards[1].id));
check("overdue card included", queue.some((c) => c.id === cards[0].id));
check("unseen cards come first", queue.slice(0, 3).every((c) => !reviews.has(c.id)),
  queue.map((c) => c.id).join(","));
check("queue size = 3 unseen + 1 overdue", queue.length === 4, `got ${queue.length}`);

console.log(
  failures === 0
    ? "\n✅ All checks passed\n"
    : `\n❌ ${failures} check(s) failed\n`,
);
process.exit(failures === 0 ? 1 - 1 : 1);
