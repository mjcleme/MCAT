import type { Exam } from "./exam-types";

/**
 * In-progress exam state, persisted to localStorage.
 *
 * A diagnostic runs nearly four hours. A refresh, a crashed tab, or a closed
 * laptop must not destroy that, so every answer and the section deadlines are
 * written synchronously as they change. Deadlines are stored as absolute epoch
 * timestamps rather than remaining seconds — a countdown held only in memory
 * would silently reset on reload and hand back time.
 */
export type ExamPhase = "section" | "break" | "done";

export type ExamProgress = {
  examId: string;
  version: 1;
  startedAt: number;
  sectionIndex: number;
  phase: ExamPhase;
  /** Absolute epoch ms when the current section or break expires. */
  deadline: number;
  answers: Record<string, number>;
  flagged: string[];
  /** Sections already submitted, so a reload cannot re-open them. */
  completedSections: string[];
};

const VERSION = 1;

export function storageKey(examId: string): string {
  return `mcat-exam-progress:${examId}`;
}

export function newProgress(exam: Exam, now = Date.now()): ExamProgress {
  return {
    examId: exam.id,
    version: VERSION,
    startedAt: now,
    sectionIndex: 0,
    phase: "section",
    deadline: now + exam.sections[0].minutes * 60_000,
    answers: {},
    flagged: [],
    completedSections: [],
  };
}

export function loadProgress(examId: string): ExamProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(examId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ExamProgress;
    // Reject anything written by an older shape rather than crash mid-exam.
    if (parsed.version !== VERSION || parsed.examId !== examId) return null;
    if (typeof parsed.deadline !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveProgress(progress: ExamProgress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(progress.examId), JSON.stringify(progress));
  } catch {
    // Quota or private-mode failure. The exam continues in memory; losing the
    // resume capability is better than losing the session.
  }
}

export function clearProgress(examId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey(examId));
  } catch {
    // Nothing to do.
  }
}

export function secondsRemaining(progress: ExamProgress, now = Date.now()): number {
  return Math.max(0, Math.round((progress.deadline - now) / 1000));
}

export function formatClock(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Advances to the next phase: section → break → next section → … → done. */
export function advance(
  exam: Exam,
  progress: ExamProgress,
  now = Date.now(),
): ExamProgress {
  const finishedSection = exam.sections[progress.sectionIndex];
  const completed = progress.completedSections.includes(finishedSection.id)
    ? progress.completedSections
    : [...progress.completedSections, finishedSection.id];

  const isLast = progress.sectionIndex >= exam.sections.length - 1;

  if (progress.phase === "section") {
    if (isLast) {
      return { ...progress, phase: "done", completedSections: completed, deadline: now };
    }
    return {
      ...progress,
      phase: "break",
      completedSections: completed,
      deadline: now + exam.breakMinutes * 60_000,
    };
  }

  // Coming off a break, open the next section.
  const nextIndex = progress.sectionIndex + 1;
  return {
    ...progress,
    phase: "section",
    sectionIndex: nextIndex,
    deadline: now + exam.sections[nextIndex].minutes * 60_000,
  };
}
