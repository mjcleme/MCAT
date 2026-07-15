import { Suspense } from "react";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { AuthForm } from "@/components/auth-form";
import { SetupRequired } from "@/components/setup-required";
import { login } from "@/app/actions/auth";
import { isSupabaseConfigured } from "@/lib/config";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        {isSupabaseConfigured() ? (
          <Suspense>
            <AuthForm mode="login" action={login} />
          </Suspense>
        ) : (
          <SetupRequired />
        )}
      </main>
    </>
  );
}
