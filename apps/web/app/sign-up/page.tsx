import Link from "next/link";
import { AuthForm } from "../../components/auth-form";

export default function SignUpPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="badge">Back</Link>
        <Link href="/sign-in" className="badge">Sign in</Link>
      </div>
      <AuthForm mode="sign-up" />
    </main>
  );
}
