import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { QuizRunner } from "@/components/quiz-runner";
import { getSection } from "@/lib/types";
import { ALL_QUIZZES, getQuiz } from "@/data";
import { createClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ quizId: string }> };

export function generateStaticParams() {
  return ALL_QUIZZES.map((q) => ({ quizId: q.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { quizId } = await params;
  const quiz = getQuiz(quizId);
  return { title: quiz?.title ?? "Quiz" };
}

export default async function QuizPage({ params }: Props) {
  const { quizId } = await params;
  const quiz = getQuiz(quizId);
  if (!quiz) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/quiz/${quizId}`);

  const section = getSection(quiz.section);

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <div className="mb-6">
          <Link
            href="/quiz"
            className="text-sm text-[--color-muted] hover:underline"
          >
            ← All quizzes
          </Link>
          <h1 className="mt-2 text-2xl font-semibold">{quiz.title}</h1>
          <p className="mt-1 text-sm text-[--color-muted]">
            {section.shortName} · {quiz.questions.length} questions
          </p>
        </div>

        <QuizRunner quiz={quiz} section={section} />
      </main>
    </>
  );
}
