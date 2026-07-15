import { Suspense } from "react";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { AuthForm } from "@/components/auth-form";
import { SetupRequired } from "@/components/setup-required";
import { signup } from "@/app/actions/auth";
import { isSupabaseConfigured } from "@/lib/config";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        {isSupabaseConfigured() ? (
          <Suspense>
            <AuthForm mode="signup" action={signup} />
          </Suspense>
        ) : (
          <SetupRequired />
        )}
      </main>
    </>
  );
}
