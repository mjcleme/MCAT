import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import { Card, LinkButton, ProgressBar } from "@/components/ui";
import { SECTIONS } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { getReviews, summarizeSection } from "@/lib/progress";
import { topicsForSection } from "@/data";

export const metadata: Metadata = { title: "Flashcards" };

export default async function FlashcardsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/flashcards");

  const reviews = await getReviews(user.id);

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <h1 className="text-2xl font-semibold">Flashcards</h1>
        <p className="mt-1 text-sm text-[--color-muted]">
          Pick a section. Cards you haven&apos;t seen come first, then whatever
          is due for review.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {SECTIONS.map((section) => {
            const progress = summarizeSection(section.id, reviews);
            const topics = topicsForSection(section.id);
            return (
              <Card key={section.id} className="flex flex-col p-6">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${section.dot}`} />
                  <h2 className="font-semibold">{section.shortName}</h2>
                  <span className="ml-auto text-xs text-[--color-muted]">
                    {progress.total} cards
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-[--color-muted]">
                  {topics.slice(0, 5).join(" · ")}
                  {topics.length > 5 && " · …"}
                </p>

                <div className="mt-5">
                  <div className="mb-1.5 flex justify-between text-xs text-[--color-muted]">
                    <span>{progress.seen} seen</span>
                    <span>{progress.mastered} mastered</span>
                  </div>
                  <ProgressBar
                    value={progress.seen}
                    max={progress.total}
                    barClassName={section.dot}
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-sm">
                    {progress.due > 0 ? (
                      <span className="font-medium text-sky-600">
                        {progress.due} due now
                      </span>
                    ) : (
                      <span className="text-[--color-muted]">
                        Nothing due — all scheduled ahead
                      </span>
                    )}
                  </span>
                  <LinkButton
                    href={`/flashcards/${section.id}`}
                    size="sm"
                    variant={progress.due > 0 ? "primary" : "secondary"}
                  >
                    Study
                  </LinkButton>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </>
  );
}
