import { getDb } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { readToken, unsubscribe } from "@/lib/mailing-list";

/**
 * One-click unsubscribe for mail apps that offer an "Unsubscribe" button (the List-Unsubscribe
 * header on newsletters). It only accepts POST, so a link scanner opening the address can't
 * unsubscribe anyone. The signed token proves which subscriber it is.
 */
export async function POST(request: Request): Promise<Response> {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const id = readToken(getEnv().BETTER_AUTH_SECRET, token, "unsubscribe", Date.now());
  if (!id) return new Response("Invalid link", { status: 400 });
  await unsubscribe(getDb(), { id, now: new Date() });
  return new Response("Unsubscribed", { status: 200 });
}
