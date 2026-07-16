import { Card } from "./ui";

/**
 * Shown in place of the auth form when Supabase credentials are missing, so a
 * fresh clone explains itself instead of failing on submit.
 */
export function SetupRequired() {
  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="text-2xl font-semibold">One setup step left</h1>
      <p className="mt-2 text-sm text-[--color-muted]">
        Accounts need a Supabase project. It takes about four minutes and the
        free tier is plenty.
      </p>

      <ol className="mt-6 space-y-3 text-sm">
        <Step n={1}>
          Create a project at{" "}
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sky-600 hover:underline"
          >
            supabase.com/dashboard
          </a>
          .
        </Step>
        <Step n={2}>
          Run <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">supabase/schema.sql</code>{" "}
          in the project&apos;s SQL Editor.
        </Step>
        <Step n={3}>
          Copy the Project URL and publishable key from Settings → API Keys
          into{" "}
          <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">
            .env.local
          </code>
          .
        </Step>
        <Step n={4}>Restart the dev server.</Step>
      </ol>

      <pre className="mt-6 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
        {`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...`}
      </pre>

      <p className="mt-3 text-xs text-[--color-muted]">
        Older projects show a legacy anon key (<code>eyJhb…</code>) instead —
        name it{" "}
        <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">
          NEXT_PUBLIC_SUPABASE_ANON_KEY
        </code>{" "}
        and it works the same.
      </p>

      <p className="mt-4 text-xs text-[--color-muted]">
        The README walks through the same steps, including Vercel deployment.
      </p>
    </Card>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-xs font-medium text-white">
        {n}
      </span>
      <span className="pt-0.5">{children}</span>
    </li>
  );
}
