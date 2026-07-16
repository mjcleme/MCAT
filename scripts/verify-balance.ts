import { DIAGNOSTIC_EXAM, flattenExam } from "@/data/exam";
import { examChemPhys } from "@/data/exam/chem-phys";
import { examCars } from "@/data/exam/cars";
import { examBioBiochem } from "@/data/exam/bio-biochem";
import { examPsychSoc } from "@/data/exam/psych-soc";
import { flattenSection } from "@/lib/exam-types";
import { balanceQuestion, remapExplanation } from "@/lib/exam-balance";

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  if (!cond) { failures++; console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`); }
}

console.log("\n--- Invariant: correct ANSWER TEXT is unchanged by balancing ---");
const raw = [examChemPhys, examCars, examBioBiochem, examPsychSoc].flatMap(flattenSection);
const balanced = flattenExam(DIAGNOSTIC_EXAM);
check("same question count", raw.length === balanced.length);

for (let i = 0; i < raw.length; i++) {
  const r = raw[i], b = balanced[i];
  check(`${r.question.id} same id`, r.question.id === b.question.id);
  check(
    `${r.question.id} correct text preserved`,
    r.question.options[r.question.answer] === b.question.options[b.question.answer],
    `"${r.question.options[r.question.answer]?.slice(0,40)}" vs "${b.question.options[b.question.answer]?.slice(0,40)}"`,
  );
  check(
    `${r.question.id} option set preserved`,
    JSON.stringify([...r.question.options].sort()) === JSON.stringify([...b.question.options].sort()),
  );
  check(`${r.question.id} still 4 options`, b.question.options.length === 4);
}

console.log("\n--- Distribution after balancing ---");
const dist = [0,0,0,0];
for (const { question } of balanced) dist[question.answer]++;
console.log(`  A/B/C/D: ${dist.join(" / ")}  (of ${balanced.length})`);
check("no letter below 15%", dist.every(d => d / balanced.length >= 0.15), dist.join(","));
check("no letter above 35%", dist.every(d => d / balanced.length <= 0.35), dist.join(","));

console.log("\n--- Determinism: balancing twice gives the same result ---");
const again = flattenExam(DIAGNOSTIC_EXAM);
check("stable across calls",
  JSON.stringify(again.map(q => [q.question.id, q.question.answer])) ===
  JSON.stringify(balanced.map(q => [q.question.id, q.question.answer])));

console.log("\n--- remapExplanation unit tests ---");
// old->new: A(0)->C(2), B(1)->A(0), C(2)->D(3), D(3)->B(1)
const m = [2, 0, 3, 1];
const cases: [string, string][] = [
  ["Choice A is wrong.", "Choice C is wrong."],
  ["choice D is the trap.", "choice B is the trap."],
  ["Choices A and D both overshoot.", "Choices C and B both overshoot."],
  ["Choices A, C, and D are eliminated.", "Choices C, D, and B are eliminated."],
  ["This eliminates A even though...", "This eliminates C even though..."],
  ["which rules out D on inspection", "which rules out B on inspection"],
  ["Option B is better.", "Option A is better."],
];
for (const [input, expected] of cases) {
  const got = remapExplanation(input, m);
  check(`remap: "${input}"`, got === expected, `got "${got}"`);
}

console.log("\n--- remapExplanation must NOT touch prose capitals ---");
const untouched = [
  "A catalyst lowers activation energy.",
  "Vitamin A is fat-soluble.",
  "The answer follows from Boyle's law.",
  "DNA polymerase III proofreads.",
];
for (const text of untouched) {
  check(`untouched: "${text}"`, remapExplanation(text, m) === text, `got "${remapExplanation(text, m)}"`);
}

console.log("\n--- No stale letter references survive in the real content ---");
// For each balanced question, every "Choice X" must name an option that the
// explanation could plausibly discuss. The strongest cheap check: the correct
// letter should rarely be described as wrong.
let suspicious = 0;
for (const { question: q } of balanced) {
  const correctLetter = ["A","B","C","D"][q.answer];
  const re = new RegExp(`[Cc]hoice ${correctLetter} is (wrong|the trap|false|incorrect|contradicted)`, "");
  if (re.test(q.explanation)) {
    suspicious++;
    console.log(`  SUSPECT ${q.id}: explanation calls correct letter ${correctLetter} wrong`);
  }
}
check("no explanation calls its own correct letter wrong", suspicious === 0, `${suspicious} found`);

console.log("\n--- Identity permutation is a no-op ---");
const idm = [0,1,2,3];
check("identity leaves text alone",
  remapExplanation("Choice A and Choice D differ.", idm) === "Choice A and Choice D differ.");

console.log("\n--- balanceQuestion targets the requested slot ---");
const sample = raw[0].question;
for (let t = 0; t < 4; t++) {
  const b = balanceQuestion(sample, t);
  check(`target ${t} honored`, b.answer === t);
  check(`target ${t} keeps correct text`,
    b.options[b.answer] === sample.options[sample.answer]);
}

console.log(failures === 0 ? "\n✅ All balance checks passed\n" : `\n❌ ${failures} failed\n`);
process.exit(failures === 0 ? 0 : 1);
