# MCAT Prep

A spaced-repetition flashcard and practice-quiz app for the MCAT, built with Next.js 16, Supabase auth, and Tailwind. Deploys to Vercel.

- **303 flashcards** and **101 practice questions** across all four sections (Bio/Biochem, Chem/Phys, Psych/Soc, CARS)
- **SM-2 spaced repetition** — cards you find hard resurface sooner; cards you know get out of the way
- **Real accounts** via Supabase, so card schedules and quiz history sync across devices
- **CARS passages** with original prose and explanations that name the trap in each distractor

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the two values below
npm run dev
```

The app runs without Supabase configured — you'll see setup guidance instead of a login form, and protected routes redirect to `/login`.

## Supabase setup (~4 minutes)

1. **Create a project** at [supabase.com/dashboard](https://supabase.com/dashboard). Any region, free tier.

2. **Create the tables.** Open the project's **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql), and run it. This creates four tables (`profiles`, `card_reviews`, `quiz_attempts`, `study_sessions`), enables row-level security on each, and adds a trigger that creates a profile row on signup. The script is idempotent — safe to re-run.

3. **Copy your keys.** In **Settings → API**, copy the Project URL and the `anon` public key into `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
   ```

   The anon key is meant to be public — it ships to the browser, and row-level security is what actually protects the data. Never put the `service_role` key in this file.

4. **Restart the dev server** and sign up at `/signup`.

### Email confirmation

By default Supabase emails a confirmation link before an account works. For local development, turn it off under **Authentication → Sign In / Providers → Email → Confirm email**, and you can sign up and land straight in the app. Leave it **on** in production.

If you keep it on, add your deployed URL under **Authentication → URL Configuration**:

- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: `https://your-app.vercel.app/auth/callback`

Without this, confirmation links bounce to `localhost`.

## Deploying to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). Either way:

1. Add both environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in **Project Settings → Environment Variables**, for all environments.
2. Redeploy so the build picks them up.
3. Add your Vercel URL to Supabase's redirect allow-list as described above.

No other configuration is needed — no `vercel.json`, no build overrides.

## How it works

### Auth

`src/proxy.ts` (Next.js 16 renamed Middleware to Proxy) refreshes the Supabase session cookie on every navigation and guards `/dashboard`, `/flashcards`, and `/quiz`. It calls `getUser()` rather than `getSession()` — the latter trusts unverified cookie contents.

Auth itself runs through Server Actions in `src/app/actions/auth.ts`, so passwords are never handled client-side.

### Spaced repetition

`src/lib/srs.ts` implements a trimmed SM-2. Rating a card **Again / Hard / Good / Easy** maps onto SM-2 quality scores:

- First correct review → 1 day, second → 6 days, thereafter × the card's ease factor
- **Again** resets the interval, records a lapse, and requeues the card in the same session
- Ease is floored at 1.3 so a card can never become unreviewably frequent

The study queue puts never-seen cards first, then overdue cards by how long they've waited. Card state is read server-side on each review rather than trusted from the client.

### Grading

Quizzes are graded in `submitQuiz` on the server against the canonical answer key — the client only submits which options were chosen.

## Adding content

Content is plain TypeScript, no CMS. Add to the arrays in `src/data/flashcards/` or `src/data/quizzes/`; the aggregator in `src/data/index.ts` picks them up and every count on the site updates automatically.

```ts
{
  id: "bb-aa-99",        // must be globally unique and stable —
  section: "bb",         // it's the key for review scheduling
  topic: "Amino Acids",
  front: "...",
  back: "...",
}
```

Card IDs are the primary key for a user's review history. Changing an existing ID orphans that card's schedule, so treat them as permanent.

## Project layout

```
src/
  app/
    actions/          Server Actions (auth, study progress)
    auth/callback/    Email-confirmation / OAuth code exchange
    dashboard/        Progress overview
    flashcards/       Section list + study session
    quiz/             Quiz list + runner
  components/         UI primitives, flashcard session, quiz runner
  data/               Flashcard and quiz content
  lib/
    srs.ts            SM-2 scheduling
    progress.ts       Progress queries and aggregation
    supabase/         Browser and server clients
  proxy.ts            Session refresh + route protection
supabase/schema.sql   Tables, RLS policies, signup trigger
```

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # eslint
```

---

A study tool, not affiliated with or endorsed by the AAMC. MCAT is a registered trademark of the Association of American Medical Colleges.
