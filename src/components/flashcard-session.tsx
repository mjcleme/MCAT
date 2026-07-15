"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CardReview, Flashcard, Rating, Section } from "@/lib/types";
import { INITIAL_STATE, intervalLabel, type SrsState } from "@/lib/srs";
import { reviewCard, logStudySession } from "@/app/actions/study";
import { Button, Card, LinkButton, ProgressBar } from "./ui";

const RATINGS: { rating: Rating; label: string; key: string; style: string }[] =
  [
    {
      rating: "again",
      label: "Again",
      key: "1",
      style: "bg-rose-600 text-white hover:bg-rose-500",
    },
    {
      rating: "hard",
      label: "Hard",
      key: "2",
      style: "bg-amber-600 text-white hover:bg-amber-500",
    },
    {
      rating: "good",
      label: "Good",
      key: "3",
      style: "bg-sky-600 text-white hover:bg-sky-500",
    },
    {
      rating: "easy",
      label: "Easy",
      key: "4",
      style: "bg-emerald-600 text-white hover:bg-emerald-500",
    },
  ];

type Props = {
  section: Section;
  queue: Flashcard[];
  reviews: CardReview[];
};

export function FlashcardSession({ section, queue, reviews }: Props) {
  const stateById = useMemo(() => {
    const map = new Map<string, SrsState>();
    for (const r of reviews) map.set(r.card_id, r);
    return map;
  }, [reviews]);

  // Cards rated "Again" are appended to the back of the working queue.
  const [cards, setCards] = useState(queue);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const sessionLogged = useRef(false);

  const card = cards[index];
  const done = index >= cards.length;

  const srsState = card
    ? (stateById.get(card.id) ?? INITIAL_STATE)
    : INITIAL_STATE;

  const rate = useCallback(
    async (rating: Rating) => {
      if (!card || saving) return;
      setSaving(true);
      setError(null);
      try {
        await reviewCard(card.id, rating);
        setReviewed((n) => n + 1);
        if (rating === "again") setCards((prev) => [...prev, card]);
        setFlipped(false);
        setIndex((i) => i + 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not save that review.");
      } finally {
        setSaving(false);
      }
    },
    [card, saving],
  );

  // Keyboard: space flips, 1-4 rate.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done) return;
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
        return;
      }
      if (!flipped) return;
      const match = RATINGS.find((r) => r.key === e.key);
      if (match) {
        e.preventDefault();
        void rate(match.rating);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, done, rate]);

  // Log the session once, when the user finishes the queue.
  useEffect(() => {
    if (done && reviewed > 0 && !sessionLogged.current) {
      sessionLogged.current = true;
      void logStudySession("flashcards", reviewed).catch(() => {
        // A failed streak log shouldn't interrupt a finished session.
      });
    }
  }, [done, reviewed]);

  if (done) {
    return (
      <Card className="p-10 text-center">
        <p className="text-3xl">✓</p>
        <h2 className="mt-3 text-xl font-semibold">
          {reviewed > 0 ? "Session complete" : "Nothing due right now"}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-[--color-muted]">
          {reviewed > 0
            ? `You reviewed ${reviewed} card${reviewed === 1 ? "" : "s"} in ${section.shortName}. Cards you found hard will come back sooner.`
            : "Every card in this section is scheduled for a later date. Come back when they're due, or try another section."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <LinkButton href="/flashcards" variant="secondary">
            All sections
          </LinkButton>
          <LinkButton href="/dashboard">View progress</LinkButton>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <ProgressBar
          value={index}
          max={cards.length}
          barClassName={section.dot}
        />
        <span className="shrink-0 text-sm tabular-nums text-[--color-muted]">
          {index + 1} / {cards.length}
        </span>
      </div>

      <div className="flip-scene h-[22rem] sm:h-80">
        <div className={`flip-inner ${flipped ? "is-flipped" : ""}`}>
          <CardFace
            side="front"
            topic={card.topic}
            body={card.front}
            section={section}
          />
          <CardFace
            side="back"
            topic={card.topic}
            body={card.back}
            section={section}
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm text-rose-900 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
        >
          {error}
        </p>
      )}

      <div className="mt-6">
        {!flipped ? (
          <Button size="lg" className="w-full" onClick={() => setFlipped(true)}>
            Show answer
            <kbd className="ml-1 rounded bg-white/20 px-1.5 py-0.5 text-xs">
              space
            </kbd>
          </Button>
        ) : (
          <div>
            <p className="mb-3 text-center text-xs text-[--color-muted]">
              How well did you recall it?
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {RATINGS.map(({ rating, label, key, style }) => (
                <button
                  key={rating}
                  onClick={() => void rate(rating)}
                  disabled={saving}
                  className={`flex h-16 flex-col items-center justify-center rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${style}`}
                >
                  <span>{label}</span>
                  <span className="text-xs opacity-80">
                    {intervalLabel(srsState, rating)}
                  </span>
                  <kbd className="mt-0.5 text-[10px] opacity-70">{key}</kbd>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-[--color-muted]">
        <Link href="/flashcards" className="hover:underline">
          End session
        </Link>{" "}
        · {reviewed} reviewed
      </p>
    </div>
  );
}

function CardFace({
  side,
  topic,
  body,
  section,
}: {
  side: "front" | "back";
  topic: string;
  body: string;
  section: Section;
}) {
  const isBack = side === "back";
  return (
    <div
      className={`flip-face ${isBack ? "flip-face-back" : ""} rounded-2xl border border-[--color-border] bg-[--color-card] p-8 shadow-sm`}
    >
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${section.dot}`} />
        <span className="text-xs font-medium uppercase tracking-wide text-[--color-muted]">
          {topic}
        </span>
        <span className="ml-auto text-xs text-[--color-muted]">
          {isBack ? "Answer" : "Question"}
        </span>
      </div>
      <div className="flex flex-1 items-center overflow-y-auto py-4">
        <p
          className={
            isBack
              ? "text-base leading-relaxed"
              : "text-xl font-medium leading-snug sm:text-2xl"
          }
        >
          {body}
        </p>
      </div>
    </div>
  );
}
