import { DIAGNOSTIC_EXAM } from "@/data/exam";
import {
  newProgress,
  advance,
  secondsRemaining,
  formatClock,
  loadProgress,
  saveProgress,
  clearProgress,
  storageKey,
  type ExamProgress,
} from "@/lib/exam-progress";

// Minimal localStorage stand-in so the persistence path is exercised for real.
const store = new Map<string, string>();
(globalThis as unknown as { window: unknown }).window = {
  localStorage: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  },
};

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  if (!cond) { failures++; console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`); }
}

const exam = DIAGNOSTIC_EXAM;
const T0 = 1_800_000_000_000;

console.log("\n--- New progress ---");
const p0 = newProgress(exam, T0);
check("starts at section 0", p0.sectionIndex === 0);
check("starts in section phase", p0.phase === "section");
check("no answers", Object.keys(p0.answers).length === 0);
check(
  "deadline = start + first section minutes",
  p0.deadline === T0 + exam.sections[0].minutes * 60_000,
  `${(p0.deadline - T0) / 60000} min`,
);
check("full time remaining at start",
  secondsRemaining(p0, T0) === exam.sections[0].minutes * 60);

console.log("\n--- Clock ---");
check("formats mm:ss", formatClock(65) === "01:05", formatClock(65));
check("formats h:mm:ss", formatClock(3725) === "1:02:05", formatClock(3725));
check("zero", formatClock(0) === "00:00", formatClock(0));
check("never negative remaining", secondsRemaining(p0, p0.deadline + 999_999) === 0);
check("48 min reads 48:00", formatClock(48 * 60) === "48:00", formatClock(48*60));

console.log("\n--- Full walk through the exam ---");
let p: ExamProgress = p0;
const order: string[] = [];
let guard = 0;
while (p.phase !== "done" && guard++ < 50) {
  order.push(`${p.phase}:${p.phase === "section" ? exam.sections[p.sectionIndex].id : "—"}`);
  p = advance(exam, p, T0);
}
check("terminates", p.phase === "done", `guard=${guard}`);
console.log(`  ${order.join(" → ")} → done`);
check(
  "visits 4 sections and 3 breaks",
  order.filter((o) => o.startsWith("section")).length === 4 &&
    order.filter((o) => o.startsWith("break")).length === 3,
  order.join(","),
);
check("all 4 sections marked complete", p.completedSections.length === 4, p.completedSections.join(","));
check(
  "completed in exam order",
  p.completedSections.join(",") === "cp,cars,bb,ps",
  p.completedSections.join(","),
);

console.log("\n--- Break timing ---");
const afterCp = advance(exam, p0, T0);
check("section -> break", afterCp.phase === "break");
check("break deadline honors breakMinutes",
  afterCp.deadline === T0 + exam.breakMinutes * 60_000,
  `${(afterCp.deadline - T0)/60000} min`);
check("still on section 0 during break", afterCp.sectionIndex === 0);

const afterBreak = advance(exam, afterCp, T0);
check("break -> next section", afterBreak.phase === "section");
check("advances section index", afterBreak.sectionIndex === 1);
check("new deadline uses CARS minutes",
  afterBreak.deadline === T0 + exam.sections[1].minutes * 60_000,
  `${(afterBreak.deadline - T0)/60000} min`);

console.log("\n--- Last section finishes the exam (no trailing break) ---");
let last = newProgress(exam, T0);
last = { ...last, sectionIndex: 3, phase: "section" };
const done = advance(exam, last, T0);
check("last section -> done, not break", done.phase === "done", done.phase);

console.log("\n--- Answers and flags survive advancing ---");
const withWork = advance(
  exam,
  { ...p0, answers: { "cp-d-q1": 2 }, flagged: ["cp-d-q2"] },
  T0,
);
check("answers preserved", withWork.answers["cp-d-q1"] === 2);
check("flags preserved", withWork.flagged.includes("cp-d-q2"));

console.log("\n--- Persistence round trip ---");
saveProgress(p0);
const loaded = loadProgress(exam.id);
check("loads back", loaded !== null);
check("deadline survives", loaded?.deadline === p0.deadline);
check("stored under namespaced key", store.has(storageKey(exam.id)));

const withAnswers = { ...p0, answers: { "cp-d-q1": 1, "cp-d-q2": 3 } };
saveProgress(withAnswers);
check("answers survive reload", loadProgress(exam.id)?.answers["cp-d-q2"] === 3);

console.log("\n--- Resume does not hand back time ---");
// Simulate: saved 10 minutes ago, reloaded now. Remaining must have shrunk.
const tenMinLater = T0 + 10 * 60_000;
const resumed = loadProgress(exam.id)!;
check(
  "clock kept running while away",
  secondsRemaining(resumed, tenMinLater) === (exam.sections[0].minutes - 10) * 60,
  `${secondsRemaining(resumed, tenMinLater)}s`,
);

console.log("\n--- Corrupt / stale data is rejected, not thrown ---");
store.set(storageKey(exam.id), "{not json");
check("garbage -> null", loadProgress(exam.id) === null);
store.set(storageKey(exam.id), JSON.stringify({ ...p0, version: 99 }));
check("wrong version -> null", loadProgress(exam.id) === null);
store.set(storageKey(exam.id), JSON.stringify({ ...p0, examId: "other" }));
check("wrong exam -> null", loadProgress(exam.id) === null);
store.set(storageKey(exam.id), JSON.stringify({ ...p0, deadline: "soon" }));
check("bad deadline -> null", loadProgress(exam.id) === null);

clearProgress(exam.id);
check("clear removes it", loadProgress(exam.id) === null);
check("missing key -> null", loadProgress("nonexistent") === null);

console.log(failures === 0 ? "\n✅ All progress checks passed\n" : `\n❌ ${failures} failed\n`);
process.exit(failures === 0 ? 0 : 1);
