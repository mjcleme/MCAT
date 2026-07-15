import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import {
  Card,
  EmptyState,
  LinkButton,
  ProgressBar,
  Stat,
} from "@/components/ui";
import { SECTIONS, getSection } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import {
  getAttempts,
  getReviews,
  getStreak,
  summarizeSection,
} from "@/lib/progress";
import { getQuiz, TOTAL_CARDS } from "@/data";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const [reviews, attempts, streak] = await Promise.all([
    getReviews(user.id),
    getAttempts(user.id, 10),
    getStreak(user.id),
  ]);

  const bySection = SECTIONS.map((s) => summarizeSection(s.id, reviews));
  const totalDue = bySection.reduce((sum, s) => sum + s.due, 0);
  const totalSeen = reviews.length;
  const totalMastered = bySection.reduce((sum, s) => sum + s.mastered, 0);

  const graded = attempts.reduce(
    (acc, a) => ({ score: acc.score + a.score, total: acc.total + a.total }),
    { score: 0, total: 0 },
  );
  const quizAccuracy =
    graded.total > 0 ? Math.round((graded.score / graded.total) * 100) : null;

  const displayName =
    (user.user_metadata?.display_name as string | undefined) ??
    user.email?.split("@")[0];

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <h1 className="text-2xl font-semibold">
          {greeting()}, {displayName}
        </h1>
        <p className="mt-1 text-sm text-[--color-muted]">
          {totalDue > 0
            ? `${totalDue} card${totalDue === 1 ? "" : "s"} ready for review.`
            : "Nothing due right now — everything is scheduled ahead."}
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Cards due"
            value={totalDue}
            hint={totalDue > 0 ? "Across all sections" : "You're caught up"}
          />
          <Stat
            label="Cards seen"
            value={`${totalSeen}`}
            hint={`of ${TOTAL_CARDS} total`}
          />
          <Stat
            label="Mastered"
            value={totalMastered}
            hint="Interval of 21+ days"
          />
          <Stat
            label="Study streak"
            value={streak > 0 ? `${streak}🔥` : "0"}
            hint={streak === 1 ? "1 day" : `${streak} days`}
          />
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Section mastery</h2>
              <LinkButton href="/flashcards" size="sm" variant="secondary">
                Study cards
              </LinkButton>
            </div>

            <div className="mt-4 space-y-3">
              {bySection.map((progress) => {
                const section = getSection(progress.section);
                const pct =
                  progress.total > 0
                    ? Math.round((progress.mastered / progress.total) * 100)
                    : 0;
                return (
                  <Card key={progress.section} className="p-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${section.dot}`}
                      />
                      <span className="font-medium">{section.shortName}</span>
                      <span className="ml-auto text-sm tabular-nums text-[--color-muted]">
                        {pct}% mastered
                      </span>
                    </div>
                    <ProgressBar
                      value={progress.mastered}
                      max={progress.total}
                      className="mt-3"
                      barClassName={section.dot}
                    />
                    <div className="mt-2 flex justify-between text-xs text-[--color-muted]">
                      <span>
                        {progress.seen}/{progress.total} seen
                      </span>
                      <span>
                        {progress.due > 0
                          ? `${progress.due} due`
                          : "nothing due"}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Recent quizzes</h2>
              <LinkButton href="/quiz" size="sm" variant="secondary">
                Take one
              </LinkButton>
            </div>

            {quizAccuracy !== null && (
              <p className="mt-2 text-sm text-[--color-muted]">
                {quizAccuracy}% across your last {attempts.length} attempt
                {attempts.length === 1 ? "" : "s"}.
              </p>
            )}

            <div className="mt-4">
              {attempts.length === 0 ? (
                <EmptyState
                  title="No attempts yet"
                  description="Quiz scores and the questions you missed will show up here."
                  action={
                    <LinkButton href="/quiz" size="sm">
                      Browse quizzes
                    </LinkButton>
                  }
                />
              ) : (
                <div className="space-y-2">
                  {attempts.map((attempt) => {
                    const quiz = getQuiz(attempt.quiz_id);
                    const pct = Math.round(
                      (attempt.score / attempt.total) * 100,
                    );
                    return (
                      <Card key={attempt.id} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {quiz?.title ?? attempt.quiz_id}
                            </p>
                            <p className="mt-0.5 text-xs text-[--color-muted]">
                              {formatDate(attempt.completed_at)}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 text-sm font-semibold tabular-nums ${
                              pct >= 75
                                ? "text-emerald-600"
                                : pct >= 50
                                  ? "text-amber-600"
                                  : "text-rose-600"
                            }`}
                          >
                            {attempt.score}/{attempt.total}
                          </span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
