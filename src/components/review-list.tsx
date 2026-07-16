"use client";

import { useState, useTransition } from "react";
import type { MissCause, MissedQuestion } from "@/lib/review-types";
import { CAUSE_LABELS } from "@/lib/review-types";
import { getSection } from "@/lib/types";
import { setCause } from "@/app/actions/review";
import { Card } from "./ui";

const CAUSES = Object.keys(CAUSE_LABELS) as MissCause[];

export function ReviewList({ missed }: { missed: MissedQuestion[] }) {
  return (
    <div className="space-y-4">
      {missed.map((m) => (
        <MissedCard key={m.question.id} missed={m} />
      ))}
    </div>
  );
}

function MissedCard({ missed }: { missed: MissedQuestion }) {
  const [cause, setLocalCause] = useState<MissCause | null>(
    missed.note?.cause ?? null,
  );
  const [expanded, setExpanded] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const meta = getSection(missed.section);
  const resolved = missed.note?.resolved ?? false;

  function pick(next: MissCause) {
    const value = cause === next ? null : next;
    const previous = cause;
    setLocalCause(value); // optimistic
    setError(null);
    startTransition(async () => {
      try {
        await setCause(missed.question.id, value);
      } catch (e) {
        setLocalCause(previous); // roll back so the UI can't lie
        setError(e instanceof Error ? e.message : "Could not save that.");
      }
    });
  }

  return (
    <Card className={`p-6 ${resolved ? "opacity-70" : ""}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
        <span className="text-xs uppercase tracking-wide text-[--color-muted]">
          {meta.shortName} · {missed.topic}
        </span>
        <span className="text-xs text-[--color-muted]">
          — {missed.sourceTitle}
        </span>

        <div className="ml-auto flex items-center gap-2">
          {missed.timesMissed > 1 && (
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
              Missed {missed.timesMissed}×
            </span>
          )}
          {resolved && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              ✓ Fixed
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 font-medium leading-snug">{missed.question.prompt}</p>

      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 text-sm text-sky-600 hover:underline"
        >
          Show answer and explanation
        </button>
      ) : (
        <div className="mt-3">
          <p className="text-sm text-rose-600">
            You chose:{" "}
            {missed.lastChoice !== undefined
              ? `${String.fromCharCode(65 + missed.lastChoice)}. ${missed.question.options[missed.lastChoice]}`
              : "No answer"}
          </p>
          <p className="mt-1 text-sm text-emerald-600">
            Correct: {String.fromCharCode(65 + missed.question.answer)}.{" "}
            {missed.question.options[missed.question.answer]}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[--color-muted]">
            {missed.question.explanation}
          </p>
        </div>
      )}

      <div className="mt-5 border-t border-[--color-border] pt-4">
        <p className="text-xs font-medium text-[--color-muted]">
          Why did you miss it?
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {CAUSES.map((c) => (
            <button
              key={c}
              onClick={() => pick(c)}
              disabled={pending}
              title={CAUSE_LABELS[c].hint}
              className={`rounded-lg border px-3 py-1.5 text-xs transition-colors disabled:opacity-50 ${
                cause === c
                  ? "border-sky-500 bg-sky-50 font-medium text-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
                  : "border-[--color-border] text-[--color-muted] hover:border-sky-400"
              }`}
            >
              {CAUSE_LABELS[c].label}
            </button>
          ))}
        </div>
        {cause && (
          <p className="mt-2 text-xs text-[--color-muted]">
            {CAUSE_LABELS[cause].hint}
          </p>
        )}
        {error && (
          <p role="alert" className="mt-2 text-xs text-rose-600">
            {error}
          </p>
        )}
      </div>
    </Card>
  );
}
