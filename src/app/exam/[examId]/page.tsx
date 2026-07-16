import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ExamRunnerClient } from "@/components/exam-runner-client";
import { ALL_EXAMS, getExam } from "@/data/exam";
import { createClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ examId: string }> };

export function generateStaticParams() {
  return ALL_EXAMS.map((e) => ({ examId: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  return { title: getExam(examId)?.title ?? "Exam" };
}

export default async function ExamPage({ params }: Props) {
  const { examId } = await params;
  const exam = getExam(examId);
  if (!exam) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/exam/${examId}`);

  // No Nav here on purpose: an exam in progress should not offer navigation
  // away from itself, the same way the real testing interface doesn't.
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <ExamRunnerClient exam={exam} />
    </main>
  );
}
