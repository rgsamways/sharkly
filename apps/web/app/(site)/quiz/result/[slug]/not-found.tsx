import { LinkButton } from "@/components/link-button";

export default function QuizResultNotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="font-display text-3xl font-semibold">We don&apos;t have that result</h1>
      <p className="mt-3 text-muted">
        That shark isn&apos;t one of the quiz answers. Why not find yours?
      </p>
      <div className="mt-6 flex justify-center">
        <LinkButton href="/quiz">Take the quiz</LinkButton>
      </div>
    </div>
  );
}
