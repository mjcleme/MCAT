"use client";

import { useState } from "react";
import Link from "next/link";
import type { MissedQuestion } from "@/lib/review-types";
import { getSection } from "@/lib/types";
import { submitRetestAnswer, logRetestSession } from "@/app/actions/review";
import { Button, Card, LinkButton, ProgressBar } from "./ui";

type Result = { correct: boolean; correctAnswer: number };

export function RetestRunner({ questions }: { questions: MissedQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | undefined>();
  const [result, setResult] = useState<Result | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fixed, setFixed] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[index];

  async function check() {
    if (selected === undefined || saving) return;
    setSaving(true);
    setError(null);
    try {
      const r = await submitRetestAnswer(current.question.id, selected);
      setResult(r);
      if (r.correct) setFixed((n) => n + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save that answer.");
    } finally {
      setSaving(false);
    }
  }

  async function next() {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(undefined);
      setResult(null);
      return;
    }
    setDone(true);
    try {
      await logRetestSession(questions.length);
    } catch {
      // A failed streak log shouldn't interrupt a finished session.
    }
  }

  if (done) {
    return (
      <Card className="p-10 text-center">
        <p className="text-3xl">✓</p>
        <h2 className="mt-3 text-xl font-semibold">Retest complete</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-[--color-muted]">
          You cleared {fixed} of {questions.length}. Anything you missed again
          stays in your review list — those are the ones worth studying rather
          than retrying.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <LinkButton href="/review" variant="secondary">
            Back to review
          </LinkButton>
          <LinkButton href="/flashcards">Study flashcards</LinkButton>
        </div>
      </Card>
    );
  }

  const meta = getSection(current.section);

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <ProgressBar
          value={index}
          max={questions.length}
          barClassName={meta.dot}
        />
        <span className="shrink-0 text-sm tabular-nums text-[--color-muted]">
          {index + 1} / {questions.length}
        </span>
      </div>

      {current.passage && (
        <Card className="mb-4 max-h-72 overflow-y-auto p-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[--color-muted]">
            Passage
          </p>
          {current.passage.split("\n\n").map((para, i) => (
            <p key={i} className="mb-3 text-sm leading-relaxed last:mb-0">
              {para}
            </p>
          ))}
        </Card>
      )}

      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
          <span className="text-xs uppercase tracking-wide text-[--color-muted]">
            {meta.shortName} · {current.topic}
          </span>
          {current.timesMissed > 1 && (
            <span className="ml-auto text-xs text-rose-600">
              Missed {current.timesMissed}× before
            </span>
          )}
        </div>

        <p className="mt-4 text-lg font-medium leading-snug">
          {current.question.prompt}
        </p>

        <div className="mt-6 space-y-2.5">
          {current.question.options.map((option, i) => {
            let tone =
              "border-[--color-border] hover:border-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800/60";
            if (result && i === result.correctAnswer) {
              tone = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
            } else if (result && selected === i) {
              tone = "border-rose-500 bg-rose-50 dark:bg-rose-950/40";
            } else if (result) {
              tone = "border-[--color-border] opacity-60";
            } else if (selected === i) {
              tone = "border-sky-500 bg-sky-50 dark:bg-sky-950/40";
            }
            return (
              <button
                key={i}
                onClick={() => !result && setSelected(i)}
                disabled={Boolean(result)}
                aria-pressed={selected === i}
                className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors disabled:cursor-default ${tone}`}
              >
                <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[--color-border] text-xs font-medium">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="leading-relaxed">{option}</span>
              </button>
            );
          })}
        </div>

        {result && (
          <div className="mt-6 rounded-xl border border-[--color-border] bg-[--color-background] p-4">
            <p
              className={`text-sm font-medium ${result.correct ? "text-emerald-600" : "text-rose-600"}`}
            >
              {result.correct
                ? "Correct — cleared from your review list."
                : "Missed again — this one stays. Worth studying the topic rather than retrying."}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[--color-muted]">
              {current.question.explanation}
            </p>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-4 text-sm text-rose-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          {!result ? (
            <Button
              onClick={() => void check()}
              disabled={selected === undefined || saving}
            >
              {saving ? "Checking…" : "Check answer"}
            </Button>
          ) : (
            <Button onClick={() => void next()}>
              {index < questions.length - 1 ? "Next question" : "Finish"}
            </Button>
          )}
        </div>
      </Card>

      <p className="mt-6 text-center text-xs text-[--color-muted]">
        <Link href="/review" className="hover:underline">
          End retest
        </Link>{" "}
        · {fixed} cleared
      </p>
    </div>
  );
}
