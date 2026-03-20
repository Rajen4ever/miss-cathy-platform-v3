import Link from "next/link";
import { AuthForm } from "../../components/auth-form";

export default function SignInPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="badge">Back</Link>
        <Link href="/sign-up" className="badge">Create account</Link>
      </div>
      <AuthForm mode="sign-in" />
    </main>
  );
}
