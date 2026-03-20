"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient, type User } from "@supabase/supabase-js";

function makeSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
}

function getDisplayName(user: User | null) {
  if (!user) return "Guest";

  const metadata = user.user_metadata ?? {};
  const name =
    metadata.display_name ||
    metadata.full_name ||
    metadata.name ||
    metadata.user_name;

  if (typeof name === "string" && name.trim()) {
    return name.trim();
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "User";
}

export function Topbar() {
  const [user, setUser] = useState<User | null>(null);

  const supabase = useMemo(() => makeSupabase(), []);

  useEffect(() => {
    if (!supabase) return;

    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) {
        setUser(data.user ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const displayName = getDisplayName(user);

  return (
    <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Command Center
        </div>
        <div className="mt-1 text-lg font-semibold text-white">
          Welcome, {displayName}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
          {user?.email ?? "Not signed in"}
        </div>
      </div>
    </div>
  );
}