import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Exchanges the one-time code from a confirmation email (or OAuth redirect)
 * for a durable session cookie.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Only same-site paths — never bounce to a host an email link supplied.
  const requested = searchParams.get("next") ?? "/dashboard";
  const next =
    requested.startsWith("/") && !requested.startsWith("//")
      ? requested
      : "/dashboard";

  const base = redirectBase(request, origin);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${base}${next}`);
    }
  }

  return NextResponse.redirect(
    `${base}/login?error=${encodeURIComponent("Could not sign you in. That link may have expired.")}`,
  );
}

/**
 * Behind Vercel's load balancer, `request.url` carries the internal host rather
 * than the one the user typed, so redirecting to it would drop them somewhere
 * unreachable. The forwarded host is the user-facing one.
 */
function redirectBase(request: NextRequest, origin: string): string {
  if (process.env.NODE_ENV === "development") return origin;
  const forwardedHost = request.headers.get("x-forwarded-host");
  if (!forwardedHost) return origin;
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${forwardedHost}`;
}
