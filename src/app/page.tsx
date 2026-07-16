import { Nav } from "@/components/nav";
import { Card, LinkButton } from "@/components/ui";
import { SECTIONS } from "@/lib/types";
import {
  TOTAL_CARDS,
  TOTAL_QUESTIONS,
  ALL_QUIZZES,
  cardsForSection,
} from "@/data";
import { DIAGNOSTIC_EXAM, examQuestionCount } from "@/data/exam";
import { isSupabaseConfigured } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
        {!isSupabaseConfigured() && <SetupBanner />}

        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-sky-600">
            {TOTAL_CARDS} flashcards · {TOTAL_QUESTIONS} practice questions ·{" "}
            {examQuestionCount(DIAGNOSTIC_EXAM)}-question diagnostic exam
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Study for the MCAT without losing track of what you know
          </h1>
          <p className="mt-5 text-lg text-[--color-muted]">
            Spaced-repetition flashcards and section quizzes across all four
            test sections. Sign in and your progress follows you — every card
            scheduled, every score kept.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/signup" size="lg">
              Create free account
            </LinkButton>
            <LinkButton href="/login" size="lg" variant="secondary">
              Log in
            </LinkButton>
          </div>
        </section>

        <section className="mt-20 grid gap-4 sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <Card key={section.id} className="p-6">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${section.dot}`} />
                <h2 className="font-semibold">{section.shortName}</h2>
              </div>
              <p className="mt-2 text-sm text-[--color-muted]">
                {section.blurb}
              </p>
              <p className="mt-4 text-xs text-[--color-muted]">
                {cardsForSection(section.id).length} cards ·{" "}
                {ALL_QUIZZES.filter((q) => q.section === section.id).length}{" "}
                quizzes
              </p>
            </Card>
          ))}
        </section>

        <section className="mt-20 grid gap-8 sm:grid-cols-3">
          <Feature
            title="Cards that come back when you need them"
            body="Every review feeds an SM-2 spaced-repetition schedule. Cards you find hard return sooner; cards you know get out of your way."
          />
          <Feature
            title="Explanations that teach the trap"
            body="Each question explains why the right answer is right and why the tempting wrong one pulled you — the part that actually moves your score."
          />
          <Feature
            title="A timed diagnostic exam"
            body="120 questions at real MCAT pacing, with section timers, flagging, and breaks. Scored 472–528 so you can see which section is actually costing you."
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[--color-muted]">{body}</p>
    </div>
  );
}

function SetupBanner() {
  return (
    <Card className="mb-10 border-amber-300 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/40">
      <p className="font-medium text-amber-900 dark:text-amber-200">
        Supabase isn&apos;t configured yet
      </p>
      <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
        Browsing works, but accounts and progress need a database. Add{" "}
        <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
          NEXT_PUBLIC_SUPABASE_URL
        </code>{" "}
        and{" "}
        <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
          NEXT_PUBLIC_SUPABASE_ANON_KEY
        </code>{" "}
        to <code>.env.local</code> — see the README for the four-minute setup.
      </p>
    </Card>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[--color-border] py-8">
      <p className="mx-auto max-w-6xl px-4 text-center text-xs text-[--color-muted]">
        A study tool, not affiliated with or endorsed by the AAMC. MCAT is a
        registered trademark of the Association of American Medical Colleges.
      </p>
    </footer>
  );
}
