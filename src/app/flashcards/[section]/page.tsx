import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { FlashcardSession } from "@/components/flashcard-session";
import { SECTIONS, type SectionId } from "@/lib/types";
import { cardsForSection } from "@/data";
import { createClient } from "@/lib/supabase/server";
import { getReviews } from "@/lib/progress";
import { buildQueue } from "@/lib/srs";

type Props = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: id } = await params;
  const section = SECTIONS.find((s) => s.id === id);
  return { title: section ? `${section.shortName} Flashcards` : "Flashcards" };
}

export default async function StudyPage({ params }: Props) {
  const { section: sectionId } = await params;
  const section = SECTIONS.find((s) => s.id === sectionId);
  if (!section) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/flashcards/${sectionId}`);

  const reviews = await getReviews(user.id);
  const reviewMap = new Map(reviews.map((r) => [r.card_id, r]));
  const queue = buildQueue(cardsForSection(section.id as SectionId), reviewMap);

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <div className="mb-6">
          <Link
            href="/flashcards"
            className="text-sm text-[--color-muted] hover:underline"
          >
            ← All sections
          </Link>
          <h1 className="mt-2 text-2xl font-semibold">{section.shortName}</h1>
        </div>

        <FlashcardSession
          section={section}
          queue={queue}
          reviews={reviews.filter((r) => r.section === section.id)}
        />
      </main>
    </>
  );
}
