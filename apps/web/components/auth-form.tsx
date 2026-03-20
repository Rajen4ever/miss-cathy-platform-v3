"use client";

import { FormEvent, useState } from "react";
import { signIn, signUp } from "../lib/repositories";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [displayName, setDisplayName] = useState("Miss Cathy Operator");
  const [email, setEmail] = useState("demo@misscathy.local");
  const [password, setPassword] = useState("ChangeMe123!");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("Working...");
    const response =
      mode === "sign-in"
        ? await signIn(email, password)
        : await signUp(email, password, displayName);

    if (response.ok) {
      setMessage(response.demo ? "Demo auth path complete. Add real env vars to activate Supabase." : "Success.");
      return;
    }

    setMessage(response.error ?? "Unable to continue.");
  }

  return (
    <form onSubmit={onSubmit} className="panel mx-auto max-w-md space-y-4 p-6">
      <div>
        <div className="text-2xl font-semibold">{mode === "sign-in" ? "Sign in" : "Create account"}</div>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Email/password auth is wired. When env vars are absent, the form stays in truthful demo mode.
        </p>
      </div>

      {mode === "sign-up" ? (
        <label className="block text-sm">
          <span className="mb-2 block text-slate-300">Display name</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
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
        />
      </label>

      <label className="block text-sm">
        <span className="mb-2 block text-slate-300">Password</span>
        <input
          type="password"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <button type="submit" className="w-full rounded-2xl bg-cyan-300 px-4 py-3 font-medium text-slate-950">
        {mode === "sign-in" ? "Sign in" : "Create account"}
      </button>

      <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">{message || "Waiting for input."}</div>
    </form>
  );
}
