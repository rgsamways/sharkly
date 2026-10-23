import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Forgot password", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12">
      <ForgotPasswordForm />
    </main>
  );
}
