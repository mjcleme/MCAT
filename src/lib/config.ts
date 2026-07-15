/**
 * The app builds and renders without Supabase credentials so that a fresh
 * clone (or a Vercel build before env vars are set) shows setup guidance
 * rather than a crash.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
