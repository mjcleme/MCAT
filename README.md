# MCAT Prep

A spaced-repetition flashcard and practice-quiz app for the MCAT, built with Next.js 16, Supabase auth, and Tailwind. Deploys to Vercel.

- **606 flashcards** and **101 practice questions** across all four sections (Bio/Biochem, Chem/Phys, Psych/Soc, CARS)
- **A 120-question timed diagnostic exam** with section timers, flagging, breaks, and a 472–528 scaled score
- **A missed-question review loop** — everything you've ever gotten wrong, tagged by why you missed it, retestable until it sticks
- **SM-2 spaced repetition** — cards you find hard resurface sooner; cards you know get out of the way
- **Real accounts** via Supabase, so card schedules and exam history sync across devices
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

2. **Create the tables.** Open the project's **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql), and run it. This creates six tables (`profiles`, `card_reviews`, `quiz_attempts`, `exam_attempts`, `question_notes`, `study_sessions`), enables row-level security on each, and adds a trigger that creates a profile row on signup.

   **The script is idempotent — re-run the whole file whenever you pull changes.** It uses `create table if not exists` and drops/recreates policies, so it will add anything new without disturbing existing data. `exam_attempts` arrived with the diagnostic exam and `question_notes` with the review loop; re-running is what creates them.

3. **Copy your keys.** In **Settings → API Keys**, copy the Project URL and the **publishable** key into `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```

   Older projects show a legacy JWT anon key (`eyJhb…`) instead. That still works — name it `NEXT_PUBLIC_SUPABASE_ANON_KEY` and the app will pick it up either way.

   Either key is meant to be public — it ships to the browser, and row-level security is what actually protects the data. Never put the secret key (`sb_secret_…` / `service_role`) in this file.

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

1. Add both environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, or `NEXT_PUBLIC_SUPABASE_ANON_KEY` on older projects) in **Project Settings → Environment Variables**, for all environments.
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

Quizzes and exams are graded on the server (`submitQuiz`, `submitExam`) against the canonical answer key — the client only submits which options were chosen.

### The review loop

The highest-leverage MCAT habit is reviewing what you got wrong and naming *why*, so `/review` collects every missed question from every quiz and exam, lets you tag the cause (didn't know it / misread / rushed / fell for the distractor / blind guess), and retests only those. Get one right and it clears; miss it again and it stays.

**The miss list is derived, never stored.** `quiz_attempts.answers` and `exam_attempts.answers` already record every response, so `lib/review.ts` reconstructs the list from them. That keeps one source of truth and means the feature works retroactively — attempts from before it existed show up too. `question_notes` stores only what can't be derived: the cause you diagnosed and whether a retest cleared it.

**Client/server split matters here.** `lib/review.ts` imports the server Supabase client, which pulls in `next/headers`. Client components need `CAUSE_LABELS` at runtime, so importing it from there drags server-only code into the browser bundle and fails the build — which it did, once. Anything a client component touches lives in `lib/review-types.ts`.

### Topic tagging

`src/data/question-topics.ts` maps every quiz and exam question id to a topic drawn from the same vocabulary the flashcards use, which is what lets a missed question route you to the cards covering it. Flashcards carry their topic inline; questions don't, so the tags live in one map rather than across 221 objects in six files. The tradeoff is that adding a question means editing two files — `npm run verify` fails on any untagged question, which is what keeps that honest.

`Research Methods` is the one tag with no flashcards behind it. That's a real content gap, not an oversight: Psych/Soc tests study design heavily and the deck doesn't cover it. The verify script asserts it stays the *only* such gap, so a typo can't silently orphan a topic.

### The diagnostic exam

120 questions (30 per section) timed at real MCAT pacing: ~1.6 min per science question, ~1.7 for CARS, with 10-minute breaks between sections. Sections auto-advance when the clock expires and cannot be reopened.

**Answer balancing** (`src/lib/exam-balance.ts`) is worth knowing about. Written naturally, correct answers cluster badly — the first draft put 63% of them at B and exactly one at D, which a test-wise student could exploit without knowing any content. Each question's options are permuted to a target slot derived from a hash of its id, and the letter references inside explanations ("Choice A is wrong") are remapped to match. It's deterministic by question id, so letters stay stable across retakes and deploys — **never randomize it at request time**, since stored attempts record option indices.

**The scaled score is an approximation**, and the UI says so. The AAMC equates its raw→scaled curve per administration and never publishes it, and this test is half-length. The anchors in `src/lib/exam-scoring.ts` are fitted so ~65% correct lands near 125 (the historical median, where ~500 total sits at roughly the 47th percentile). It's useful for spotting a weak section; it is not a score prediction.

**In-progress state lives in localStorage** (`src/lib/exam-progress.ts`), written on every answer, so a refresh or a crashed tab doesn't destroy a four-hour sitting. Section deadlines are stored as absolute timestamps rather than remaining seconds — a countdown held in memory would silently reset on reload and hand back time.

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
    exam/             Diagnostic intro, runner, score report
  components/         UI primitives, flashcard session, quiz + exam runners
  data/
    flashcards/       Flashcard content
    quizzes/          Short quiz content
    exam/             Diagnostic exam content (120 questions)
  lib/
    srs.ts            SM-2 scheduling
    progress.ts       Progress queries and aggregation
    exam-scoring.ts   Raw → scaled (118–132) conversion, percentiles
    exam-balance.ts   Answer-position balancing + explanation letter remapping
    exam-progress.ts  localStorage persistence, timers, section state machine
    supabase/         Browser and server clients
  proxy.ts            Session refresh + route protection
supabase/schema.sql   Tables, RLS policies, signup trigger
```

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # eslint
npm run verify   # content integrity, scoring, and exam-state checks
```

`npm run verify` is worth running before you commit new content. It checks that
ids are unique, every question has four options and a valid answer index, exam
answers aren't clustered on one letter, the balancing transform preserves the
correct answer's text, and the exam timer state machine terminates. See
[`scripts/README.md`](scripts/README.md) for what each script covers and the two
bugs that motivated them.

---

A study tool, not affiliated with or endorsed by the AAMC. MCAT is a registered trademark of the Association of American Medical Colleges.
