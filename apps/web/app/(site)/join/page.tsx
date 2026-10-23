import type { Metadata } from "next";
import { JoinForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Join the club" };

export default function JoinPage() {
  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12">
      <JoinForm />
    </main>
  );
}
