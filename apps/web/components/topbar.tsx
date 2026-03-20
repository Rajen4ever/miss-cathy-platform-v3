import Link from "next/link";
import { Bell, Command, Search, Settings } from "lucide-react";

export function Topbar() {
  return (
    <div className="panel flex items-center justify-between gap-4 px-4 py-3">
      <div>
        <div className="kicker">Command Center</div>
        <div className="text-xl font-semibold">Operate with clarity and follow-through</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="badge"><Search className="mr-2 h-4 w-4" /> Search</button>
        <Link href="/command" className="badge"><Command className="mr-2 h-4 w-4" /> Command</Link>
        <button className="badge"><Bell className="mr-2 h-4 w-4" /> Alerts</button>
        <Link href="/settings" className="badge"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
      </div>
    </div>
  );
}
