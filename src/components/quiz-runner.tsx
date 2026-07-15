"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Quiz, Section } from "@/lib/types";
import { submitQuiz } from "@/app/actions/study";
import { Button, Card, LinkButton, ProgressBar } from "./ui";

type Props = { quiz: Quiz; section: Section };

export function QuizRunner({ quiz, section }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Set on mount rather than during render, which must stay pure.
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const question = quiz.questions[index];
  const selected = answers[question.id];
  const isLast = index === quiz.questions.length - 1;
  const correctCount = quiz.questions.reduce(
    (sum, q) => sum + (answers[q.id] === q.answer ? 1 : 0),
    0,
  );

  function choose(optionIndex: number) {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  }

  async function next() {
    if (!isLast) {
      setIndex((i) => i + 1);
      setChecked(false);
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      const elapsed = startedAt.current
        ? Math.round((Date.now() - startedAt.current) / 1000)
        : 0;
      await submitQuiz(quiz.id, answers, elapsed);
    } catch (e) {
      setSaveError(
        e instanceof Error ? e.message : "Your score couldn't be saved.",
      );
    } finally {
      setSaving(false);
      setFinished(true);
    }
  }

  if (finished) {
    return (
      <Results
        quiz={quiz}
        answers={answers}
        score={correctCount}
        saveError={saveError}
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <ProgressBar
          value={index}
          max={quiz.questions.length}
          barClassName={section.dot}
        />
        <span className="shrink-0 text-sm tabular-nums text-[--color-muted]">
          {index + 1} / {quiz.questions.length}
        </span>
      </div>

      {quiz.passage && <Passage text={quiz.passage} />}

      <Card className="p-6 sm:p-8">
        <p className="text-lg font-medium leading-snug">{question.prompt}</p>

        <div className="mt-6 space-y-2.5">
          {question.options.map((option, i) => (
            <Option
              key={i}
              label={String.fromCharCode(65 + i)}
              text={option}
              selected={selected === i}
              correct={question.answer === i}
              checked={checked}
              onClick={() => choose(i)}
            />
          ))}
        </div>

        {checked && (
          <div className="mt-6 rounded-xl border border-[--color-border] bg-[--color-background] p-4">
            <p
              className={`text-sm font-medium ${
                selected === question.answer
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              {selected === question.answer ? "Correct" : "Not quite"} — the
              answer is {String.fromCharCode(65 + question.answer)}.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[--color-muted]">
              {question.explanation}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          {!checked ? (
            <Button
              onClick={() => setChecked(true)}
              disabled={selected === undefined}
            >
              Check answer
            </Button>
          ) : (
            <Button onClick={() => void next()} disabled={saving}>
              {saving
                ? "Saving…"
                : isLast
                  ? "Finish quiz"
                  : "Next question"}
            </Button>
          )}
        </div>
      </Card>

      <p className="mt-6 text-center text-xs text-[--color-muted]">
        <Link href="/quiz" className="hover:underline">
          Leave quiz
        </Link>{" "}
        · progress is saved when you finish
      </p>
    </div>
  );
}

function Option({
  label,
  text,
  selected,
  correct,
  checked,
  onClick,
}: {
  label: string;
  text: string;
  selected: boolean;
  correct: boolean;
  checked: boolean;
  onClick: () => void;
}) {
  let tone =
    "border-[--color-border] hover:border-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800/60";
  if (checked && correct) {
    tone = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
  } else if (checked && selected) {
    tone = "border-rose-500 bg-rose-50 dark:bg-rose-950/40";
  } else if (selected) {
    tone = "border-sky-500 bg-sky-50 dark:bg-sky-950/40";
  } else if (checked) {
    tone = "border-[--color-border] opacity-60";
  }

  return (
    <button
      onClick={onClick}
      disabled={checked}
      aria-pressed={selected}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors disabled:cursor-default ${tone}`}
    >
      <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[--color-border] text-xs font-medium">
        {label}
      </span>
      <span className="leading-relaxed">{text}</span>
    </button>
  );
}

function Passage({ text }: { text: string }) {
  return (
    <Card className="mb-4 max-h-80 overflow-y-auto p-6">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[--color-muted]">
        Passage
      </p>
      {text.split("\n\n").map((para, i) => (
        <p key={i} className="mb-3 text-sm leading-relaxed last:mb-0">
          {para}
        </p>
      ))}
    </Card>
  );
}

function Results({
  quiz,
  answers,
  score,
  saveError,
}: {
  quiz: Quiz;
  answers: Record<string, number>;
  score: number;
  saveError: string | null;
}) {
  const total = quiz.questions.length;
  const pct = Math.round((score / total) * 100);
  const missed = quiz.questions.filter((q) => answers[q.id] !== q.answer);

  return (
    <div>
      <Card className="p-8 text-center">
        <p className="text-sm text-[--color-muted]">{quiz.title}</p>
        <p className="mt-2 text-5xl font-semibold tabular-nums">
          {score}
          <span className="text-2xl text-[--color-muted]">/{total}</span>
        </p>
        <p className="mt-1 text-sm text-[--color-muted]">{pct}% correct</p>

        {saveError && (
          <p className="mx-auto mt-4 max-w-md rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            {saveError} Your answers below are still shown, but this attempt
            won&apos;t appear on your dashboard.
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <LinkButton href="/quiz" variant="secondary">
            More quizzes
          </LinkButton>
          <LinkButton href="/dashboard">View progress</LinkButton>
        </div>
      </Card>

      {missed.length > 0 && (
        <section className="mt-8">
          <h2 className="font-semibold">
            Review what you missed ({missed.length})
          </h2>
          <p className="mt-1 text-sm text-[--color-muted]">
            The explanation matters more than the score. Name why the wrong
            answer pulled you.
          </p>
          <div className="mt-4 space-y-4">
            {missed.map((q) => (
              <Card key={q.id} className="p-6">
                <p className="font-medium leading-snug">{q.prompt}</p>
                <p className="mt-3 text-sm text-rose-600">
                  You chose:{" "}
                  {answers[q.id] !== undefined
                    ? `${String.fromCharCode(65 + answers[q.id])}. ${q.options[answers[q.id]]}`
                    : "No answer"}
                </p>
                <p className="mt-1 text-sm text-emerald-600">
                  Correct: {String.fromCharCode(65 + q.answer)}.{" "}
                  {q.options[q.answer]}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[--color-muted]">
                  {q.explanation}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
