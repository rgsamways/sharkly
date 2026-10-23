import { site } from "@/content/site";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-4 py-16 sm:px-6">
      <h1 className="font-display text-5xl font-semibold">{site.name}</h1>
      <p className="text-lg text-muted">{site.tagline}</p>
      <p>The Shark of the Month club is coming soon.</p>
    </main>
  );
}
