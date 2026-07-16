import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import { Card, LinkButton } from "@/components/ui";
import { getSection } from "@/lib/types";
import { getExam, flattenExam } from "@/data/exam";
import {
  approximatePercentile,
  scoreBand,
  MIN_SECTION_SCORE,
  MAX_SECTION_SCORE,
  type SectionScore,
} from "@/lib/exam-scoring";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Score Report" };

type Props = { params: Promise<{ attemptId: string }> };

export default async function ResultsPage({ params }: Props) {
  const { attemptId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/exam/results/${attemptId}`);

  // RLS also scopes this to the owner; the explicit filter keeps the intent
  // visible at the call site.
  const { data: attempt } = await supabase
    .from("exam_attempts")
    .select("*")
    .eq("id", attemptId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!attempt) notFound();

  const exam = getExam(attempt.exam_id);
  if (!exam) notFound();

  const sectionScores = attempt.section_scores as SectionScore[];
  const answers = attempt.answers as Record<string, number>;
  const percentile = approximatePercentile(attempt.total_scaled);
  const flat = flattenExam(exam);
  const missed = flat.filter(
    (f) => answers[f.question.id] !== f.question.answer,
  );

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
        <Card className="p-8 text-center">
          <p className="text-sm text-[--color-muted]">{exam.title}</p>
          <p className="mt-3 text-6xl font-semibold tabular-nums">
            {attempt.total_scaled}
          </p>
          <p className="mt-1 text-sm text-[--color-muted]">
            out of {MAX_SECTION_SCORE * 4} · approximately the {percentile}th
            percentile
          </p>
          <p className="mx-auto mt-4 max-w-lg text-xs leading-relaxed text-[--color-muted]">
            An estimate from a half-length test, not a prediction. The AAMC
            equates its curve per administration and never publishes it. Read
            the section breakdown below for where to put your time — that&apos;s
            the part of this report worth trusting.
          </p>
        </Card>

        <section className="mt-8">
          <h2 className="font-semibold">By section</h2>
          <div className="mt-3 space-y-2">
            {sectionScores.map((s) => {
              const meta = getSection(s.section);
              const band = scoreBand(s.scaled);
              const pct =
                ((s.scaled - MIN_SECTION_SCORE) /
                  (MAX_SECTION_SCORE - MIN_SECTION_SCORE)) *
                100;
              return (
                <Card key={s.section} className="p-5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                    <span className="font-medium">{meta.shortName}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs ${bandTone(band.tone)}`}
                    >
                      {band.label}
                    </span>
                    <span className="ml-auto text-2xl font-semibold tabular-nums">
                      {s.scaled}
                    </span>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full ${meta.dot}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="mt-2 flex justify-between text-xs text-[--color-muted]">
                    <span>
                      {s.raw}/{s.total} correct
                    </span>
                    <span>
                      {MIN_SECTION_SCORE}–{MAX_SECTION_SCORE} scale
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-semibold">
            Review what you missed ({missed.length})
          </h2>
          <p className="mt-1 text-sm text-[--color-muted]">
            For each one, name why the wrong answer attracted you. That&apos;s
            what changes your score — not the number at the top of this page.
          </p>

          {missed.length === 0 ? (
            <Card className="mt-4 p-8 text-center text-sm text-[--color-muted]">
              Nothing missed. Perfect score.
            </Card>
          ) : (
            <div className="mt-4 space-y-4">
              {missed.map((f) => {
                const meta = getSection(f.section);
                const chosen = answers[f.question.id];
                return (
                  <Card key={f.question.id} className="p-6">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                      <span className="text-xs uppercase tracking-wide text-[--color-muted]">
                        {meta.shortName}
                        {f.passage && ` · ${f.passage.title}`}
                      </span>
                    </div>

                    <p className="mt-3 font-medium leading-snug">
                      {f.question.prompt}
                    </p>

                    <p className="mt-3 text-sm text-rose-600">
                      You chose:{" "}
                      {chosen !== undefined
                        ? `${String.fromCharCode(65 + chosen)}. ${f.question.options[chosen]}`
                        : "No answer"}
                    </p>
                    <p className="mt-1 text-sm text-emerald-600">
                      Correct: {String.fromCharCode(65 + f.question.answer)}.{" "}
                      {f.question.options[f.question.answer]}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[--color-muted]">
                      {f.question.explanation}
                    </p>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <LinkButton href="/dashboard" variant="secondary">
            Dashboard
          </LinkButton>
          <LinkButton href="/flashcards">Study weak sections</LinkButton>
        </div>
      </main>
    </>
  );
}

function bandTone(tone: "strong" | "solid" | "developing" | "weak"): string {
  switch (tone) {
    case "strong":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300";
    case "solid":
      return "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300";
    case "developing":
      return "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300";
    case "weak":
      return "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300";
  }
}
