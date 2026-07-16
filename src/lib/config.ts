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

/**
 * Absolute origin to send confirmation-email links back to.
 *
 * Prefers the request's own origin so a signup started on localhost confirms on
 * localhost, and one started on a preview deployment confirms on that preview.
 * Falls back through explicit config and Vercel's injected URLs, because the
 * Origin header is not guaranteed — and interpolating a null into the redirect
 * produces a URL Supabase silently rejects.
 *
 * Whatever this returns must be in Supabase's Redirect URLs allow-list.
 */
export function siteOrigin(originHeader?: string | null): string {
  if (originHeader) return originHeader.replace(/\/$/, "");

  // Set this when you want links to always point at one canonical host.
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  // Vercel injects these; neither includes a protocol.
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;

  return "http://localhost:3000";
}
