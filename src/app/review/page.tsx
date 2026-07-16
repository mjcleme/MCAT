import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import { Card, EmptyState, LinkButton } from "@/components/ui";
import { ReviewList } from "@/components/review-list";
import { createClient } from "@/lib/supabase/server";
import { getMissedQuestions, CAUSE_LABELS, type MissCause } from "@/lib/review";

export const metadata: Metadata = { title: "Review" };

type Props = {
  searchParams: Promise<{ topic?: string; show?: string }>;
};

export default async function ReviewPage({ searchParams }: Props) {
  const { topic: topicFilter, show } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/review");

  const all = await getMissedQuestions(user.id);
  const showResolved = show === "all";

  const visible = all
    .filter((m) => (showResolved ? true : !m.note?.resolved))
    .filter((m) => (topicFilter ? m.topic === topicFilter : true));

  const unresolved = all.filter((m) => !m.note?.resolved);
  const resolvedCount = all.length - unresolved.length;

  // Topic counts drive the filter chips.
  const byTopic = new Map<string, number>();
  for (const m of unresolved) {
    byTopic.set(m.topic, (byTopic.get(m.topic) ?? 0) + 1);
  }
  const topics = [...byTopic.entries()].sort((a, b) => b[1] - a[1]);

  // Cause breakdown, so the student can see their own pattern.
  const byCause = new Map<MissCause, number>();
  for (const m of all) {
    if (m.note?.cause) {
      byCause.set(m.note.cause, (byCause.get(m.note.cause) ?? 0) + 1);
    }
  }
  const untagged = all.filter((m) => !m.note?.cause).length;

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Review</h1>
            <p className="mt-1 text-sm text-[--color-muted]">
              Every question you&apos;ve missed, from quizzes and the exam.
              Reviewing these is worth more than doing new questions.
            </p>
          </div>
          {unresolved.length > 0 && (
            <LinkButton href="/review/retest">
              Retest these ({unresolved.length})
            </LinkButton>
          )}
        </div>

        {all.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="Nothing to review yet"
              description="Take a quiz or the diagnostic exam. Anything you miss shows up here with its explanation, so you can work out why and retest it."
              action={
                <LinkButton href="/quiz" size="sm">
                  Take a quiz
                </LinkButton>
              }
            />
          </div>
        ) : (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-3">
              <Card className="p-5">
                <p className="text-sm text-[--color-muted]">To review</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums">
                  {unresolved.length}
                </p>
              </Card>
              <Card className="p-5">
                <p className="text-sm text-[--color-muted]">Fixed on retest</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums text-emerald-600">
                  {resolvedCount}
                </p>
              </Card>
              <Card className="p-5">
                <p className="text-sm text-[--color-muted]">Untagged</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums">
                  {untagged}
                </p>
                <p className="mt-1 text-xs text-[--color-muted]">
                  Naming the cause is the point
                </p>
              </Card>
            </section>

            {byCause.size > 0 && (
              <section className="mt-6">
                <h2 className="text-sm font-medium">Your pattern</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[...byCause.entries()]
                    .sort((a, b) => b[1] - a[1])
                    .map(([cause, count]) => (
                      <span
                        key={cause}
                        className="rounded-lg border border-[--color-border] px-3 py-1.5 text-xs"
                      >
                        {CAUSE_LABELS[cause].label}{" "}
                        <span className="font-semibold tabular-nums">
                          {count}
                        </span>
                      </span>
                    ))}
                </div>
              </section>
            )}

            {topics.length > 0 && (
              <section className="mt-6">
                <h2 className="text-sm font-medium">By topic</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <TopicChip
                    href={buildHref(undefined, show)}
                    active={!topicFilter}
                    label="All"
                    count={unresolved.length}
                  />
                  {topics.map(([t, count]) => (
                    <TopicChip
                      key={t}
                      href={buildHref(t, show)}
                      active={topicFilter === t}
                      label={t}
                      count={count}
                    />
                  ))}
                </div>
              </section>
            )}

            <div className="mt-6 flex items-center justify-between gap-4 text-xs text-[--color-muted]">
              <span>
                Showing {visible.length}{" "}
                {topicFilter ? `in ${topicFilter}` : "question(s)"}
              </span>
              {resolvedCount > 0 && (
                <LinkButton
                  href={buildHref(topicFilter, showResolved ? undefined : "all")}
                  size="sm"
                  variant="ghost"
                >
                  {showResolved ? "Hide fixed" : `Show fixed (${resolvedCount})`}
                </LinkButton>
              )}
            </div>

            <div className="mt-4">
              {visible.length === 0 ? (
                <EmptyState
                  title="Nothing here"
                  description="You've cleared everything matching this filter."
                />
              ) : (
                <ReviewList missed={visible} />
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}

function buildHref(topic?: string, show?: string): string {
  const params = new URLSearchParams();
  if (topic) params.set("topic", topic);
  if (show) params.set("show", show);
  const qs = params.toString();
  return qs ? `/review?${qs}` : "/review";
}

function TopicChip({
  href,
  active,
  label,
  count,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
}) {
  return (
    <a
      href={href}
      className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
        active
          ? "border-sky-500 bg-sky-50 font-medium text-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
          : "border-[--color-border] text-[--color-muted] hover:border-sky-400"
      }`}
    >
      {label} <span className="tabular-nums opacity-70">{count}</span>
    </a>
  );
}
