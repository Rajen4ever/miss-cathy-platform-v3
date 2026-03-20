"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "../lib/repositories";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("Working...");

    const response =
      mode === "sign-in"
        ? await signIn(email, password)
        : await signUp(email, password, displayName);

    if (!response.ok) {
      setMessage(response.error ?? "Unable to continue.");
      return;
    }

    if (mode === "sign-in") {
      setMessage("Success. Opening your workspace...");
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setMessage("Account created. Please check your email, confirm your signup, then come back here and sign in.");
  }

  return (
    <form onSubmit={onSubmit} className="panel mx-auto max-w-md space-y-4 p-6">
      <div>
        <div className="text-2xl font-semibold">
          {mode === "sign-in" ? "Sign in" : "Create account"}
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {mode === "sign-in"
            ? "Sign in to open your Miss Cathy workspace."
            : "Create your account, confirm your email, then sign in."}
        </p>
      </div>

      {mode === "sign-up" ? (
        <label className="block text-sm">
          <span className="mb-2 block text-slate-300">Display name</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Your name"
          />
        </label>
      ) : null}

      <label className="block text-sm">
        <span className="mb-2 block text-slate-300">Email</span>
        <input
          type="email"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-2 block text-slate-300">Password</span>
        <input
          type="password"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-2xl bg-cyan-300 px-4 py-3 font-medium text-slate-950"
      >
        {mode === "sign-in" ? "Sign in" : "Create account"}
      </button>

      <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
        {message || "Waiting for input."}
      </div>
    </form>
  );
}