import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import { Card, LinkButton } from "@/components/ui";
import { SECTIONS } from "@/lib/types";
import { quizzesForSection } from "@/data";
import { createClient } from "@/lib/supabase/server";
import { getAttempts } from "@/lib/progress";

export const metadata: Metadata = { title: "Quizzes" };

export default async function QuizIndexPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/quiz");

  const attempts = await getAttempts(user.id, 200);

  // Best score per quiz, so the list shows a personal record rather than a
  // discouraging most-recent result.
  const best = new Map<string, { score: number; total: number }>();
  for (const a of attempts) {
    const current = best.get(a.quiz_id);
    if (!current || a.score / a.total > current.score / current.total) {
      best.set(a.quiz_id, { score: a.score, total: a.total });
    }
  }

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <h1 className="text-2xl font-semibold">Practice quizzes</h1>
        <p className="mt-1 text-sm text-[--color-muted]">
          Every question explains its answer — and why the distractor was
          tempting. Retake any quiz as often as you like; your best score is
          kept.
        </p>

        <div className="mt-8 space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.id}>
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${section.dot}`} />
                <h2 className="font-semibold">{section.name}</h2>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quizzesForSection(section.id).map((quiz) => {
                  const record = best.get(quiz.id);
                  return (
                    <Card key={quiz.id} className="flex flex-col p-5">
                      <h3 className="font-medium leading-snug">{quiz.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-[--color-muted]">
                        {quiz.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-xs text-[--color-muted]">
                          {quiz.questions.length} questions
                          {record && (
                            <>
                              {" · "}
                              <span className="font-medium text-emerald-600">
                                best {record.score}/{record.total}
                              </span>
                            </>
                          )}
                        </span>
                        <LinkButton
                          href={`/quiz/${quiz.id}`}
                          size="sm"
                          variant={record ? "secondary" : "primary"}
                        >
                          {record ? "Retake" : "Start"}
                        </LinkButton>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
