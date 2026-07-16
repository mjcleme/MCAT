export function supabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

/**
 * Supabase's dashboard now issues publishable keys (`sb_publishable_…`) in
 * place of the legacy JWT anon key (`eyJhb…`). Both authenticate the same way,
 * so accept either name and prefer the current one.
 *
 * Both branches must be written as literal `process.env.NEXT_PUBLIC_*`
 * expressions — that is what Next.js statically replaces at build time. A
 * computed lookup would come back undefined in the browser bundle.
 */
export function supabaseKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * The app builds and renders without Supabase credentials so that a fresh
 * clone (or a Vercel build before env vars are set) shows setup guidance
 * rather than a crash.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl() && supabaseKey());
}
