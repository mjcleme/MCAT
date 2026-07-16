import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Card, LinkButton } from "@/components/ui";
import { getSection } from "@/lib/types";
import { sectionQuestionCount } from "@/lib/exam-types";
import { DIAGNOSTIC_EXAM, examMinutes, examQuestionCount } from "@/data/exam";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Practice Exam" };

export default async function ExamIndexPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/exam");

  const exam = DIAGNOSTIC_EXAM;

  const { data: attempts } = await supabase
    .from("exam_attempts")
    .select("id, total_scaled, completed_at")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(5);

  const testingMinutes = exam.sections.reduce((sum, s) => sum + s.minutes, 0);

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
        <h1 className="text-2xl font-semibold">{exam.title}</h1>
        <p className="mt-1 text-sm text-[--color-muted]">
          {examQuestionCount(exam)} questions · {Math.floor(testingMinutes / 60)}h{" "}
          {testingMinutes % 60}m of testing · ~
          {(examMinutes(exam) / 60).toFixed(1)}h with breaks
        </p>

        <Card className="mt-8 p-6">
          <h2 className="font-semibold">What this is</h2>
          <p className="mt-2 text-sm leading-relaxed text-[--color-muted]">
            A half-length diagnostic built to real MCAT pacing — about 1.6
            minutes per science question and 1.7 for CARS. Sections are timed
            and advance automatically, you can flag questions and revisit them
            within a section, and no answers or explanations appear until the
            whole exam is scored. Once a section ends you cannot return to it.
          </p>

          <h2 className="mt-6 font-semibold">Section order</h2>
          <div className="mt-3 space-y-2">
            {exam.sections.map((section, i) => {
              const meta = getSection(section.id);
              return (
                <div
                  key={section.id}
                  className="flex items-center gap-3 rounded-xl border border-[--color-border] px-4 py-3 text-sm"
                >
                  <span className="w-4 text-xs text-[--color-muted]">
                    {i + 1}
                  </span>
                  <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                  <span className="font-medium">{meta.shortName}</span>
                  <span className="ml-auto tabular-nums text-[--color-muted]">
                    {sectionQuestionCount(section)} q · {section.minutes} min
                  </span>
                </div>
              );
            })}
            <p className="pt-1 text-xs text-[--color-muted]">
              A {exam.breakMinutes}-minute break is offered between sections.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              About the score
            </p>
            <p className="mt-1 text-sm leading-relaxed text-amber-800 dark:text-amber-300">
              You&apos;ll get a 472–528 estimate, but treat it as a rough read
              on which sections need work — not a prediction. The real
              conversion is equated per administration and never published, and
              this test is half the length, so a genuine score has considerably
              more information behind it than this one does.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={`/exam/${exam.id}`} size="lg">
              Start exam
            </LinkButton>
            <LinkButton href="/quiz" size="lg" variant="secondary">
              Shorter quizzes instead
            </LinkButton>
          </div>
          <p className="mt-3 text-xs text-[--color-muted]">
            Your progress saves as you go, so a closed tab won&apos;t cost you
            the session — but the section clock keeps running.
          </p>
        </Card>

        {attempts && attempts.length > 0 && (
          <section className="mt-10">
            <h2 className="font-semibold">Your attempts</h2>
            <div className="mt-3 space-y-2">
              {attempts.map((a) => (
                <Link
                  key={a.id}
                  href={`/exam/results/${a.id}`}
                  className="flex items-center gap-4 rounded-xl border border-[--color-border] bg-[--color-card] px-5 py-4 text-sm transition-colors hover:border-sky-400"
                >
                  <span className="text-2xl font-semibold tabular-nums">
                    {a.total_scaled}
                  </span>
                  <span className="text-[--color-muted]">
                    {new Date(a.completed_at).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="ml-auto text-xs text-sky-600">
                    View report →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
