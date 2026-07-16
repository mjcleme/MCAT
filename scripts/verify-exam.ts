import {
  DIAGNOSTIC_EXAM,
  flattenExam,
  examQuestionCount,
  examMinutes,
  examAnswerKey,
} from "@/data/exam";
import { sectionQuestionCount } from "@/lib/exam-types";
import { ALL_CARDS, ALL_QUIZZES } from "@/data";
import {
  scaledScore,
  scoreExam,
  approximatePercentile,
  MIN_SECTION_SCORE,
  MAX_SECTION_SCORE,
} from "@/lib/exam-scoring";

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  if (!cond) {
    failures++;
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

const exam = DIAGNOSTIC_EXAM;

console.log("\n--- Exam structure ---");
check("4 sections", exam.sections.length === 4);
check("120 questions total", examQuestionCount(exam) === 120, `got ${examQuestionCount(exam)}`);
for (const s of exam.sections) {
  const n = sectionQuestionCount(s);
  check(`section ${s.id} has 30 questions`, n === 30, `got ${n}`);
  check(`section ${s.id} has time`, s.minutes > 0);
}
console.log(
  `  sections: ${exam.sections.map((s) => `${s.id}=${sectionQuestionCount(s)}q/${s.minutes}m`).join(" ")}`,
);
console.log(`  total seat time: ${examMinutes(exam)} min (${(examMinutes(exam) / 60).toFixed(2)} h)`);

// Section order must match the real exam.
check(
  "section order is cp, cars, bb, ps",
  exam.sections.map((s) => s.id).join(",") === "cp,cars,bb,ps",
  exam.sections.map((s) => s.id).join(","),
);

console.log("\n--- Question integrity ---");
const flat = flattenExam(exam);
const ids = flat.map((f) => f.question.id);
check("no duplicate question ids", new Set(ids).size === ids.length);

for (const { question: q, section } of flat) {
  check(`${q.id} has 4 options`, q.options.length === 4, `got ${q.options.length}`);
  check(`${q.id} answer in range`, q.answer >= 0 && q.answer < q.options.length);
  check(`${q.id} has explanation`, q.explanation.trim().length > 30);
  check(`${q.id} options unique`, new Set(q.options).size === q.options.length);
  check(`${q.id} prompt non-empty`, q.prompt.trim().length > 0);
  check(`${q.id} section valid`, ["cp", "cars", "bb", "ps"].includes(section));
}

// Answer positions should not cluster on one letter.
const dist = [0, 0, 0, 0];
for (const { question } of flat) dist[question.answer]++;
console.log(`  answer distribution A/B/C/D: ${dist.join(" / ")}`);
check(
  "no answer letter used <10% or >45% of the time",
  dist.every((d) => d / flat.length > 0.1 && d / flat.length < 0.45),
  dist.join(","),
);

console.log("\n--- CARS passages ---");
const cars = exam.sections.find((s) => s.id === "cars")!;
const carsPassages = cars.blocks.filter((b) => b.kind === "passage");
check("cars is all passage-based", carsPassages.length === cars.blocks.length);
check("cars has 5 passages", carsPassages.length === 5, `got ${carsPassages.length}`);
for (const b of carsPassages) {
  if (b.kind !== "passage") continue;
  const words = b.text.split(/\s+/).length;
  check(`${b.id} passage is substantial`, words > 250, `${words} words`);
  check(`${b.id} has 6 questions`, b.questions.length === 6, `got ${b.questions.length}`);
}
console.log(
  `  passage lengths: ${carsPassages
    .map((b) => (b.kind === "passage" ? b.text.split(/\s+/).length : 0))
    .join(", ")} words`,
);

console.log("\n--- Every flattened question carries its passage context ---");
for (const f of flat) {
  if (f.section === "cars") {
    check(`${f.question.id} has passage`, Boolean(f.passage), "CARS question missing passage");
  }
}

console.log("\n--- Exam content is NOT recycled from quizzes/flashcards ---");
const quizIds = new Set(ALL_QUIZZES.flatMap((q) => q.questions.map((x) => x.id)));
const cardIds = new Set(ALL_CARDS.map((c) => c.id));
check("no exam id collides with a quiz id", !ids.some((i) => quizIds.has(i)));
check("no exam id collides with a card id", !ids.some((i) => cardIds.has(i)));

const quizPrompts = new Set(
  ALL_QUIZZES.flatMap((q) => q.questions.map((x) => x.prompt.trim().toLowerCase())),
);
const dupPrompts = flat.filter((f) => quizPrompts.has(f.question.prompt.trim().toLowerCase()));
check("no exam prompt duplicates a quiz prompt", dupPrompts.length === 0,
  dupPrompts.map((d) => d.question.id).join(","));

console.log("\n--- Scoring ---");
check("perfect section -> 132", scaledScore(30, 30) === 132, `got ${scaledScore(30, 30)}`);
check("zero -> 118", scaledScore(0, 30) === 118, `got ${scaledScore(0, 30)}`);
check("~65% -> 125 (median)", scaledScore(20, 30) === 125, `got ${scaledScore(20, 30)}`);
check("score never below floor", scaledScore(1, 30) >= MIN_SECTION_SCORE);
check("score never above ceiling", scaledScore(30, 30) <= MAX_SECTION_SCORE);

// Monotonic: more correct must never lower the score.
let monotonic = true;
for (let i = 1; i <= 30; i++) {
  if (scaledScore(i, 30) < scaledScore(i - 1, 30)) monotonic = false;
}
check("scaled score is monotonic in raw score", monotonic);

const perfect = scoreExam(
  (["cp", "cars", "bb", "ps"] as const).map((s) => ({
    section: s, raw: 30, total: 30, scaled: scaledScore(30, 30),
  })),
);
check("perfect exam -> 528", perfect.totalScaled === 528, `got ${perfect.totalScaled}`);

const zero = scoreExam(
  (["cp", "cars", "bb", "ps"] as const).map((s) => ({
    section: s, raw: 0, total: 30, scaled: scaledScore(0, 30),
  })),
);
check("zero exam -> 472", zero.totalScaled === 472, `got ${zero.totalScaled}`);

const median = scoreExam(
  (["cp", "cars", "bb", "ps"] as const).map((s) => ({
    section: s, raw: 20, total: 30, scaled: scaledScore(20, 30),
  })),
);
console.log(`  20/30 each -> ${median.totalScaled} (${median.percentile}th percentile)`);
check("median-ish exam lands near 500", median.totalScaled === 500, `got ${median.totalScaled}`);
check("500 is near 47th percentile", Math.abs(approximatePercentile(500) - 47) <= 1);
check("percentile monotonic", approximatePercentile(520) > approximatePercentile(505));
check("528 -> 100th", approximatePercentile(528) === 100);
check("472 -> 0th", approximatePercentile(472) === 0);

console.log("\n--- Answer key ---");
const key = examAnswerKey(exam);
check("key covers every question", key.size === 120, `got ${key.size}`);

console.log(
  failures === 0 ? "\n✅ All exam checks passed\n" : `\n❌ ${failures} check(s) failed\n`,
);
process.exit(failures === 0 ? 0 : 1);
