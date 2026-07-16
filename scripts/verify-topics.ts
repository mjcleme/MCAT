import { ALL_QUIZZES, ALL_CARDS, topicsForSection } from "@/data";
import { DIAGNOSTIC_EXAM, flattenExam } from "@/data/exam";
import { QUESTION_TOPICS, topicOf } from "@/data/question-topics";
import type { SectionId } from "@/lib/types";

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  if (!cond) { failures++; console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`); }
}

// Every question the app can show, with its section.
const all: { id: string; section: SectionId }[] = [
  ...ALL_QUIZZES.flatMap((q) => q.questions.map((x) => ({ id: x.id, section: q.section }))),
  ...flattenExam(DIAGNOSTIC_EXAM).map((f) => ({ id: f.question.id, section: f.section })),
];

console.log("\n--- Every question is tagged ---");
const untagged = all.filter((q) => !QUESTION_TOPICS[q.id]);
check("no untagged questions", untagged.length === 0,
  untagged.length ? `${untagged.length}: ${untagged.slice(0, 8).map(q => q.id).join(", ")}` : "");
console.log(`  ${all.length} questions tagged across ${new Set(all.map(q => topicOf(q.id))).size} topics`);

console.log("\n--- No orphan tags (a tag whose question no longer exists) ---");
const ids = new Set(all.map((q) => q.id));
const orphans = Object.keys(QUESTION_TOPICS).filter((id) => !ids.has(id));
check("no orphan tags", orphans.length === 0, orphans.slice(0, 8).join(", "));

console.log("\n--- Tags reuse the flashcard vocabulary where cards exist ---");
// A tag that doesn't match any flashcard topic can't route a student to cards.
// "Research Methods" is a known, documented gap — assert it stays the only one,
// so a typo like "Aminoacids" fails instead of silently orphaning a topic.
const KNOWN_GAPS = new Set(["Research Methods"]);
const vocab = new Map<SectionId, Set<string>>();
for (const s of ["bb", "cp", "ps", "cars"] as const) {
  vocab.set(s, new Set(topicsForSection(s)));
}
const offVocab = new Map<string, string>();
for (const q of all) {
  const topic = topicOf(q.id);
  if (KNOWN_GAPS.has(topic)) continue;
  if (!vocab.get(q.section)!.has(topic)) offVocab.set(`${q.section}:${topic}`, q.id);
}
check("tags match flashcard topics for their section", offVocab.size === 0,
  [...offVocab.entries()].map(([k, v]) => `${k} (${v})`).join(", "));

console.log("\n--- Known gaps are real gaps, not typos ---");
for (const gap of KNOWN_GAPS) {
  const used = all.some((q) => topicOf(q.id) === gap);
  check(`"${gap}" is actually used`, used, "listed as a gap but tagged on nothing");
  const hasCards = ALL_CARDS.some((c) => c.topic === gap);
  check(`"${gap}" still has no cards`, !hasCards,
    "cards now exist — remove it from KNOWN_GAPS");
}

console.log("\n--- Every tagged topic can route somewhere useful ---");
const topicsInUse = new Set(all.map((q) => topicOf(q.id)));
for (const t of topicsInUse) {
  if (KNOWN_GAPS.has(t)) continue;
  const cards = ALL_CARDS.filter((c) => c.topic === t).length;
  check(`topic "${t}" has flashcards`, cards > 0, "no cards to send a student to");
}
console.log(`  topics in use: ${[...topicsInUse].sort().join(" | ")}`);

console.log(failures === 0 ? "\n✅ All topic checks passed\n" : `\n❌ ${failures} failed\n`);
process.exit(failures === 0 ? 0 : 1);
