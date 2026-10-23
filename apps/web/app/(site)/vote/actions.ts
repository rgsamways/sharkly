"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";
import { saveVote } from "@/lib/votes";
import { openRound } from "@/lib/voting";

/**
 * Casts (or changes) the signed-in member's vote. Everything is decided on the server: a signed-out
 * visitor is sent to sign in, the round is whichever one is open now (never taken from the form),
 * and only one of that round's candidates is accepted.
 */
export async function castVote(formData: FormData): Promise<void> {
  const user = await requireUser("/vote");
  const round = openRound();
  const slug = String(formData.get("candidate") ?? "");
  if (round && round.candidates.includes(slug)) {
    await saveVote(user.id, round.month, slug);
    revalidatePath("/vote");
  }
  redirect("/vote");
}
