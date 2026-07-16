"use client";

import dynamic from "next/dynamic";
import type { Exam } from "@/lib/exam-types";
import { Card } from "./ui";

/**
 * The runner reads localStorage during state initialization, so it must not be
 * server-rendered — there is no in-flight exam on the server to render, and
 * attempting it would produce a hydration mismatch on every resume.
 */
const ExamRunner = dynamic(
  () => import("./exam-runner").then((m) => m.ExamRunner),
  {
    ssr: false,
    loading: () => (
      <Card className="p-10 text-center text-sm text-[--color-muted]">
        Loading your exam…
      </Card>
    ),
  },
);

export function ExamRunnerClient({ exam }: { exam: Exam }) {
  return <ExamRunner exam={exam} />;
}
