"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Exam, FlatQuestion } from "@/lib/exam-types";
import { flattenSection } from "@/lib/exam-types";
import { getSection } from "@/lib/types";
import {
  advance,
  clearProgress,
  formatClock,
  loadProgress,
  newProgress,
  saveProgress,
  secondsRemaining,
  type ExamProgress,
} from "@/lib/exam-progress";
import { submitExam } from "@/app/actions/exam";
import { Button, Card } from "./ui";

const LETTERS = ["A", "B", "C", "D"];

/**
 * Rendered client-only (see exam-runner-client.tsx). localStorage holds the
 * in-flight exam, so there is nothing meaningful to server-render, and skipping
 * SSR lets state initialize straight from storage without a hydration mismatch.
 */
export function ExamRunner({ exam }: { exam: Exam }) {
  const router = useRouter();
  const [progress, setProgress] = useState<ExamProgress>(
    () => loadProgress(exam.id) ?? newProgress(exam),
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submittedRef = useRef(false);

  const update = useCallback((next: ExamProgress) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  const section = exam.sections[progress.sectionIndex];
  const questions: FlatQuestion[] = useMemo(
    () => flattenSection(section),
    [section],
  );

  const finish = useCallback(
    async (final: ExamProgress) => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      setSubmitting(true);
      try {
        const { attemptId } = await submitExam(exam.id, final.answers);
        clearProgress(exam.id);
        router.push(`/exam/results/${attemptId}`);
      } catch (e) {
        submittedRef.current = false;
        setError(
          e instanceof Error
            ? e.message
            : "Could not submit your exam. Your answers are still saved — try again.",
        );
        setSubmitting(false);
      }
    },
    [exam.id, router],
  );

  const goNextPhase = useCallback(() => {
    const next = advance(exam, progress);
    update(next);
    setQuestionIndex(0);
    setShowReview(false);
    if (next.phase === "done") void finish(next);
  }, [exam, progress, update, finish]);

  // The interval is the external system driving both the visible clock and
  // expiry. Reading the latest values through refs keeps the interval stable
  // rather than tearing it down and rebuilding it on every answer.
  const goNextPhaseRef = useRef(goNextPhase);
  const progressRef = useRef(progress);

  // Refs must be written after render, not during it.
  useEffect(() => {
    goNextPhaseRef.current = goNextPhase;
    progressRef.current = progress;
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      const p = progressRef.current;
      // Time's up: advance without asking, exactly as the real exam does.
      if (p.phase !== "done" && current >= p.deadline) {
        goNextPhaseRef.current();
      }
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  if (progress.phase === "done" || submitting) {
    return (
      <Card className="p-10 text-center">
        <p className="font-medium">Scoring your exam…</p>
        {error && (
          <>
            <p className="mx-auto mt-3 max-w-md text-sm text-rose-600">{error}</p>
            <Button className="mt-4" onClick={() => void finish(progress)}>
              Retry submission
            </Button>
          </>
        )}
      </Card>
    );
  }

  if (progress.phase === "break") {
    return (
      <BreakScreen
        secondsLeft={secondsRemaining(progress, now)}
        nextSectionName={
          getSection(exam.sections[progress.sectionIndex + 1].id).shortName
        }
        onResume={goNextPhase}
      />
    );
  }

  const current = questions[questionIndex];
  const answered = questions.filter(
    (q) => progress.answers[q.question.id] !== undefined,
  ).length;
  const secondsLeft = secondsRemaining(progress, now);
  const sectionMeta = getSection(section!.id);

  function choose(optionIndex: number) {
    update({
      ...progress!,
      answers: { ...progress!.answers, [current.question.id]: optionIndex },
    });
  }

  function toggleFlag() {
    const id = current.question.id;
    const flagged = progress!.flagged.includes(id)
      ? progress!.flagged.filter((f) => f !== id)
      : [...progress!.flagged, id];
    update({ ...progress!, flagged });
  }

  if (showReview) {
    return (
      <ReviewScreen
        questions={questions}
        answers={progress.answers}
        flagged={progress.flagged}
        sectionName={sectionMeta.shortName}
        secondsLeft={secondsLeft}
        onJump={(i) => {
          setQuestionIndex(i);
          setShowReview(false);
        }}
        onBack={() => setShowReview(false)}
        onEndSection={goNextPhase}
        isLastSection={progress.sectionIndex === exam.sections.length - 1}
      />
    );
  }

  const selected = progress.answers[current.question.id];
  const isFlagged = progress.flagged.includes(current.question.id);

  return (
    <div>
      <ExamBar
        sectionName={sectionMeta.shortName}
        dot={sectionMeta.dot}
        sectionNumber={progress.sectionIndex + 1}
        totalSections={exam.sections.length}
        questionNumber={questionIndex + 1}
        totalQuestions={questions.length}
        answered={answered}
        secondsLeft={secondsLeft}
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {current.passage && (
          <Card className="max-h-[32rem] overflow-y-auto p-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[--color-muted]">
              {current.passage.title}
            </p>
            {current.passage.text.split("\n\n").map((para, i) => (
              <p key={i} className="mb-3 text-sm leading-relaxed last:mb-0">
                {para}
              </p>
            ))}
          </Card>
        )}

        <div className={current.passage ? "" : "lg:col-span-2"}>
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="text-base font-medium leading-snug">
                {current.question.prompt}
              </p>
              <button
                onClick={toggleFlag}
                aria-pressed={isFlagged}
                className={`shrink-0 rounded-lg border px-2.5 py-1 text-xs transition-colors ${
                  isFlagged
                    ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                    : "border-[--color-border] text-[--color-muted] hover:border-amber-400"
                }`}
              >
                ⚑ {isFlagged ? "Flagged" : "Flag"}
              </button>
            </div>

            <div className="mt-5 space-y-2.5">
              {current.question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  aria-pressed={selected === i}
                  className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors ${
                    selected === i
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-950/40"
                      : "border-[--color-border] hover:border-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[--color-border] text-xs font-medium">
                    {LETTERS[i]}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </button>
              ))}
            </div>
          </Card>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              onClick={() => setQuestionIndex((i) => Math.max(0, i - 1))}
              disabled={questionIndex === 0}
            >
              ← Previous
            </Button>

            <Button variant="ghost" onClick={() => setShowReview(true)}>
              Review all
            </Button>

            {questionIndex < questions.length - 1 ? (
              <Button onClick={() => setQuestionIndex((i) => i + 1)}>
                Next →
              </Button>
            ) : (
              <Button onClick={() => setShowReview(true)}>Finish section</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamBar({
  sectionName,
  dot,
  sectionNumber,
  totalSections,
  questionNumber,
  totalQuestions,
  answered,
  secondsLeft,
}: {
  sectionName: string;
  dot: string;
  sectionNumber: number;
  totalSections: number;
  questionNumber: number;
  totalQuestions: number;
  answered: number;
  secondsLeft: number;
}) {
  const urgent = secondsLeft <= 300;
  return (
    <Card className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <span className="text-sm font-medium">{sectionName}</span>
        <span className="text-xs text-[--color-muted]">
          Section {sectionNumber} of {totalSections}
        </span>
      </div>

      <span className="text-sm tabular-nums text-[--color-muted]">
        Question {questionNumber} of {totalQuestions}
      </span>

      <span className="text-xs text-[--color-muted]">
        {answered} answered
      </span>

      <span
        role="timer"
        aria-live={urgent ? "polite" : "off"}
        className={`ml-auto rounded-lg px-3 py-1 text-lg font-semibold tabular-nums ${
          urgent
            ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
            : "text-[--color-foreground]"
        }`}
      >
        {formatClock(secondsLeft)}
      </span>
    </Card>
  );
}

function ReviewScreen({
  questions,
  answers,
  flagged,
  sectionName,
  secondsLeft,
  onJump,
  onBack,
  onEndSection,
  isLastSection,
}: {
  questions: FlatQuestion[];
  answers: Record<string, number>;
  flagged: string[];
  sectionName: string;
  secondsLeft: number;
  onJump: (index: number) => void;
  onBack: () => void;
  onEndSection: () => void;
  isLastSection: boolean;
}) {
  const [confirming, setConfirming] = useState(false);
  const unanswered = questions.filter(
    (q) => answers[q.question.id] === undefined,
  ).length;

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <h2 className="font-semibold">Review — {sectionName}</h2>
          <p className="mt-1 text-sm text-[--color-muted]">
            {unanswered === 0
              ? "All questions answered."
              : `${unanswered} unanswered. There's no penalty for guessing.`}
          </p>
        </div>
        <span className="ml-auto text-lg font-semibold tabular-nums">
          {formatClock(secondsLeft)}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-6 gap-2 sm:grid-cols-10">
        {questions.map((q, i) => {
          const isAnswered = answers[q.question.id] !== undefined;
          const isFlagged = flagged.includes(q.question.id);
          return (
            <button
              key={q.question.id}
              onClick={() => onJump(i)}
              className={`relative flex h-10 items-center justify-center rounded-lg border text-sm tabular-nums transition-colors ${
                isAnswered
                  ? "border-sky-500 bg-sky-50 font-medium dark:bg-sky-950/40"
                  : "border-[--color-border] text-[--color-muted] hover:border-sky-400"
              }`}
            >
              {i + 1}
              {isFlagged && (
                <span className="absolute -right-1 -top-1 text-xs text-amber-500">
                  ⚑
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[--color-muted]">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-sky-500 bg-sky-50 dark:bg-sky-950/40" />
          Answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-[--color-border]" />
          Unanswered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-amber-500">⚑</span> Flagged for review
        </span>
      </div>

      {!confirming ? (
        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <Button variant="secondary" onClick={onBack}>
            Back to questions
          </Button>
          <Button onClick={() => setConfirming(true)}>
            {isLastSection ? "Finish exam" : "End section"}
          </Button>
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/40">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            {isLastSection
              ? "Submit your exam for scoring?"
              : `End this section?`}
          </p>
          <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
            {unanswered > 0 && `${unanswered} question${unanswered === 1 ? " is" : "s are"} still unanswered. `}
            You can&apos;t return to this section afterward — just like the real exam.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" size="sm" onClick={() => setConfirming(false)}>
              Keep working
            </Button>
            <Button size="sm" onClick={onEndSection}>
              {isLastSection ? "Submit exam" : "End section"}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

function BreakScreen({
  secondsLeft,
  nextSectionName,
  onResume,
}: {
  secondsLeft: number;
  nextSectionName: string;
  onResume: () => void;
}) {
  return (
    <Card className="p-10 text-center">
      <p className="text-sm text-[--color-muted]">Break</p>
      <p className="mt-3 text-5xl font-semibold tabular-nums">
        {formatClock(secondsLeft)}
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm text-[--color-muted]">
        Next up: <span className="font-medium">{nextSectionName}</span>. Stand
        up, get water. The section starts automatically when the break ends, so
        don&apos;t wander far.
      </p>
      <Button className="mt-6" onClick={onResume}>
        Start {nextSectionName} now
      </Button>
    </Card>
  );
}
