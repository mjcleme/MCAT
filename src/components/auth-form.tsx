"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { AuthState } from "@/app/actions/auth";
import { Button, Card } from "./ui";

type Props = {
  mode: "login" | "signup";
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
};

export function AuthForm({ mode, action }: Props) {
  const [state, formAction] = useActionState<AuthState, FormData>(action, {});
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const urlError = searchParams.get("error");

  const isSignup = mode === "signup";
  const error = state.error ?? urlError;

  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="text-2xl font-semibold">
        {isSignup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-[--color-muted]">
        {isSignup
          ? "Your progress and card schedule are saved to your account."
          : "Pick up where you left off."}
      </p>

      {state.message ? (
        <p className="mt-6 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
          {state.message}
        </p>
      ) : (
        <form action={formAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={next} />

          {isSignup && (
            <Field
              label="Name"
              name="displayName"
              type="text"
              autoComplete="name"
              placeholder="Optional"
            />
          )}

          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />

          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            hint={isSignup ? "At least 8 characters." : undefined}
          />

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm text-rose-900 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
            >
              {error}
            </p>
          )}

          <SubmitButton isSignup={isSignup} />
        </form>
      )}

      <p className="mt-6 text-center text-sm text-[--color-muted]">
        {isSignup ? "Already have an account? " : "No account yet? "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-sky-600 hover:underline"
        >
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </p>
    </Card>
  );
}

function SubmitButton({ isSignup }: { isSignup: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending
        ? isSignup
          ? "Creating account…"
          : "Signing in…"
        : isSignup
          ? "Create account"
          : "Log in"}
    </Button>
  );
}

function Field({
  label,
  name,
  hint,
  ...props
}: {
  label: string;
  name: string;
  hint?: string;
} & React.ComponentProps<"input">) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="mt-1.5 h-11 w-full rounded-xl border border-[--color-border] bg-[--color-background] px-3 text-sm outline-none focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500/30"
        {...props}
      />
      {hint && <p className="mt-1 text-xs text-[--color-muted]">{hint}</p>}
    </div>
  );
}
