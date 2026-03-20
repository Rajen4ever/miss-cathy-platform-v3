import { Sidebar } from "../../components/sidebar";
import { Topbar } from "../../components/topbar";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
      <Sidebar />
      <div className="min-w-0 flex-1 space-y-6">
        <Topbar />
        {children}
      </div>
    </main>
  );
}
