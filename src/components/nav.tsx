import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";
import { isSupabaseConfigured } from "@/lib/config";
import { Button, LinkButton } from "./ui";

export async function Nav() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-40 border-b border-[--color-border] bg-[--color-background]/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
        <Link href={user ? "/dashboard" : "/"} className="font-semibold">
          MCAT<span className="text-sky-600">Prep</span>
        </Link>

        {user && (
          <div className="hidden items-center gap-1 text-sm sm:flex">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/flashcards">Flashcards</NavLink>
            <NavLink href="/quiz">Quizzes</NavLink>
            <NavLink href="/exam">Practice Exam</NavLink>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-[--color-muted] md:inline">
                {user.email}
              </span>
              <form action={signOut}>
                <Button type="submit" variant="secondary" size="sm">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <>
              <LinkButton href="/login" variant="ghost" size="sm">
                Log in
              </LinkButton>
              <LinkButton href="/signup" size="sm">
                Sign up
              </LinkButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-[--color-muted] transition-colors hover:bg-slate-100 hover:text-[--color-foreground] dark:hover:bg-slate-800"
    >
      {children}
    </Link>
  );
}

async function getUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
