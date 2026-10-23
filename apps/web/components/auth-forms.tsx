"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, useTransition, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { friendlyError, MIN_PASSWORD } from "@/lib/auth-messages";
import { authClient } from "@/lib/auth-client";
import { useSignOut } from "./use-sign-out";

/** Every sign-in lands here, and a server page sends the member on to where they were going. */
function afterSignIn(next: string): string {
  return next === "/account" ? "/auth/continue" : `/auth/continue?next=${encodeURIComponent(next)}`;
}

function Card({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-line bg-surface p-5 sm:p-8">
      <h1 className="font-display text-3xl leading-tight font-semibold">{title}</h1>
      {intro ? <p className="mt-2 mb-6 text-muted">{intro}</p> : <div className="mb-6" />}
      {children}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="h-11 text-base"
      />
      {hint && <p className="text-sm text-muted">{hint}</p>}
    </div>
  );
}

const Problem = ({ children }: { children: ReactNode }) => (
  <p className="text-sm text-bad" role="alert">
    {children}
  </p>
);

const textLink = "underline underline-offset-4 hover:text-fg";

export function SignInForm({
  passwordSaved = false,
  next = "/account",
}: {
  passwordSaved?: boolean;
  next?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function withPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    setError(null);
    setNotice(null);
    setNeedsVerification(null);
    startTransition(async () => {
      const { error: failure } = await authClient.signIn.email({
        email,
        password: String(form.get("password") ?? ""),
      });
      if (failure) {
        setError(friendlyError(failure));
        if (failure.code === "EMAIL_NOT_VERIFIED") setNeedsVerification(email);
        return;
      }
      router.push(afterSignIn(next));
      router.refresh();
    });
  }

  function withLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    setError(null);
    setNotice(null);
    startTransition(async () => {
      const { error: failure } = await authClient.signIn.magicLink({
        email,
        callbackURL: afterSignIn(next),
      });
      if (failure) setError(friendlyError(failure));
      else router.push("/check-email?kind=sign-in");
    });
  }

  return (
    <Card title="Sign in" intro="Welcome back to the club.">
      {passwordSaved && (
        <p className="mb-6 text-sm text-ok" role="status">
          Your password is saved. Sign in below.
        </p>
      )}

      <form
        onSubmit={withPassword}
        className="space-y-4"
        aria-label="Sign in with email and password"
      >
        <Field label="Email" name="email" type="email" autoComplete="username" />
        <Field label="Password" name="password" type="password" autoComplete="current-password" />
        <Button type="submit" disabled={pending} className="h-11 w-full text-base">
          {pending ? "Signing in…" : "Sign in"}
        </Button>
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 text-sm text-muted">
          <span>
            New here?{" "}
            <Link href="/join" className={textLink}>
              Join the club
            </Link>
          </span>
          <Link href="/forgot-password" className={textLink}>
            Forgot password?
          </Link>
        </div>
      </form>

      <form
        onSubmit={withLink}
        className="mt-6 space-y-4 rounded-lg border border-line bg-surface-2 p-4"
        aria-label="Sign in with an emailed link"
      >
        <div>
          <h2 className="font-display text-lg font-semibold">Prefer not to use a password?</h2>
          <p className="mt-1 text-sm text-muted">We&rsquo;ll email you a link that signs you in.</p>
        </div>
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Button
          type="submit"
          variant="outline"
          disabled={pending}
          className="h-11 w-full gap-2 text-base"
        >
          <Mail className="size-4" aria-hidden /> Email me a link
        </Button>
      </form>

      {error && (
        <div className="mt-4 space-y-3">
          <Problem>{error}</Problem>
          {needsVerification && (
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              className="h-11"
              onClick={() =>
                startTransition(async () => {
                  await authClient.sendVerificationEmail({
                    email: needsVerification,
                    callbackURL: afterSignIn(next),
                  });
                  setError(null);
                  setNotice("We've sent a new confirmation link. Check your email.");
                })
              }
            >
              Send the confirmation link again
            </Button>
          )}
        </div>
      )}
      {notice && (
        <p className="mt-4 text-sm text-ok" role="status">
          {notice}
        </p>
      )}
    </Card>
  );
}

export function JoinForm() {
  const router = useRouter();
  const forId = useId();
  const [error, setError] = useState<string | null>(null);
  const [youngReader, setYoungReader] = useState(false);
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    setError(null);
    if (password.length < MIN_PASSWORD) {
      setError(`Please use a password of at least ${MIN_PASSWORD} characters.`);
      return;
    }
    startTransition(async () => {
      // Only the name, email and password are sent. "Who is this for?" is never saved.
      const { error: failure } = await authClient.signUp.email({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        password,
        callbackURL: "/auth/continue",
      });
      if (failure) setError(friendlyError(failure));
      else router.push("/check-email?kind=verify");
    });
  }

  return (
    <Card title="Join the club" intro="It's free. Every month you meet a new shark.">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor={forId} className="text-sm font-semibold">
            Who is this for?
          </Label>
          <select
            id={forId}
            name="for"
            value={youngReader ? "young" : "me"}
            onChange={(event) => setYoungReader(event.target.value === "young")}
            className="h-11 w-full rounded-lg border border-input bg-surface px-3 text-base"
          >
            <option value="me">Me</option>
            <option value="young">A young reader (a parent or guardian signs up)</option>
          </select>
          {youngReader && (
            <p className="rounded-lg bg-surface-2 p-3 text-sm" role="note">
              Sharkly accounts belong to a grown-up. You sign up, and your young reader can enjoy
              the sharks with you. We only ask for your name, email and a password.
            </p>
          )}
        </div>
        <Field label="Name" name="name" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          hint={`At least ${MIN_PASSWORD} characters. A few words in a row works well.`}
        />
        <Button type="submit" disabled={pending} className="h-11 w-full text-base">
          {pending ? "Joining…" : "Join for free"}
        </Button>
        {error && <Problem>{error}</Problem>}
        <p className="text-sm text-muted">
          By joining you agree to the{" "}
          <Link href="/terms" className={textLink}>
            terms
          </Link>{" "}
          and the{" "}
          <Link href="/privacy" className={textLink}>
            privacy page
          </Link>
          .
        </p>
        <p className="text-sm text-muted">
          Already a member?{" "}
          <Link href="/sign-in" className={textLink}>
            Sign in
          </Link>
        </p>
      </form>
    </Card>
  );
}

export function ForgotPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    setError(null);
    startTransition(async () => {
      const { error: failure } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });
      // The answer is the same whether or not the address has an account.
      if (failure && failure.status !== 400 && failure.status !== 404)
        setError(friendlyError(failure));
      else router.push("/check-email?kind=reset");
    });
  }

  return (
    <Card
      title="Forgot your password?"
      intro="Enter your email and we'll send you a link to choose a new one."
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Button type="submit" disabled={pending} className="h-11 w-full text-base">
          {pending ? "Sending…" : "Email me a link"}
        </Button>
        {error && <Problem>{error}</Problem>}
      </form>
    </Card>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    setError(null);
    if (password.length < MIN_PASSWORD) {
      setError(`Please use a password of at least ${MIN_PASSWORD} characters.`);
      return;
    }
    if (password !== String(form.get("confirm") ?? "")) {
      setError("The two passwords don't match.");
      return;
    }
    startTransition(async () => {
      const { error: failure } = await authClient.resetPassword({ newPassword: password, token });
      if (failure) setError(friendlyError(failure));
      else router.push("/sign-in?reset=1");
    });
  }

  return (
    <Card title="Choose a password">
      <form onSubmit={submit} className="space-y-4">
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          hint={`At least ${MIN_PASSWORD} characters.`}
        />
        <Field
          label="Confirm password"
          name="confirm"
          type="password"
          autoComplete="new-password"
        />
        <Button type="submit" disabled={pending} className="h-11 w-full text-base">
          {pending ? "Saving…" : "Save password"}
        </Button>
        {error && <Problem>{error}</Problem>}
      </form>
    </Card>
  );
}

export function SignOutButton() {
  const { signOut, pending } = useSignOut();
  return (
    <Button variant="outline" disabled={pending} onClick={signOut} className="h-11">
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
