import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { EmptyState, LinkButton } from "@/components/ui";
import { RetestRunner } from "@/components/retest-runner";
import { createClient } from "@/lib/supabase/server";
import { getMissedQuestions } from "@/lib/review";

export const metadata: Metadata = { title: "Retest" };

type Props = { searchParams: Promise<{ topic?: string }> };

export default async function RetestPage({ searchParams }: Props) {
  const { topic } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/review/retest");

  const missed = (await getMissedQuestions(user.id))
    .filter((m) => !m.note?.resolved)
    .filter((m) => (topic ? m.topic === topic : true));

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <div className="mb-6">
          <Link
            href="/review"
            className="text-sm text-[--color-muted] hover:underline"
          >
            ← Review
          </Link>
          <h1 className="mt-2 text-2xl font-semibold">
            Retest{topic ? `: ${topic}` : ""}
          </h1>
          <p className="mt-1 text-sm text-[--color-muted]">
            Only questions you&apos;ve missed. Get one right and it clears; miss
            it again and it stays.
          </p>
        </div>

        {missed.length === 0 ? (
          <EmptyState
            title="Nothing to retest"
            description="You've cleared every question you previously missed. Take a quiz or the exam to find more."
            action={
              <LinkButton href="/quiz" size="sm">
                Take a quiz
              </LinkButton>
            }
          />
        ) : (
          <RetestRunner questions={missed} />
        )}
      </main>
    </>
  );
}
