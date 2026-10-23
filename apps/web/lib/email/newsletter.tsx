import { eq } from "drizzle-orm";
import { NewsletterEmail } from "@/emails/newsletter-email";
import { newsletters } from "@/db/newsletter-schema";
import type { AppDb } from "@/db/schema";
import { getEnv } from "../env";
import { createToken } from "../mailing-list";
import { newsletterAddress } from "../newsletter-address";
import { sendBatch, type BatchResult, type DeliveryJob } from "../newsletters";
import { sendEmail } from "./send";

/** How many newsletter emails one run sends, so a run always finishes within its time limit. */
export const NEWSLETTER_BATCH = 40;
/** Resend allows about two sends a second on a new account, so go a little slower than that. */
const PACE_MS = 600;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface NewsletterContent {
  subject: string;
  preview: string;
  body: string;
  buttonLabel: string | null;
  buttonUrl: string | null;
}

/** The address a person's unsubscribe link and the one-click header point at. */
export function unsubscribeUrls(subscriberId: string, secret: string, baseUrl: string) {
  const token = encodeURIComponent(
    createToken(secret, { subscriberId, purpose: "unsubscribe", expiresAtMs: null }),
  );
  return {
    page: `${baseUrl}/unsubscribe?token=${token}`,
    oneClick: `${baseUrl}/api/unsubscribe?token=${token}`,
  };
}

/** Sends one newsletter email to one person, with the unsubscribe link and headers. */
export async function sendNewsletterEmail(
  content: NewsletterContent,
  to: { email: string; subscriberId: string },
): Promise<void> {
  const address = newsletterAddress();
  if (address === null) {
    throw new Error("Newsletters can't be sent until the business postal address is set");
  }
  const env = getEnv();
  const urls = unsubscribeUrls(to.subscriberId, env.BETTER_AUTH_SECRET, env.BETTER_AUTH_URL);
  await sendEmail({
    to: to.email,
    subject: content.subject,
    headers: {
      "List-Unsubscribe": `<${urls.oneClick}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    react: <NewsletterEmail {...content} unsubscribeUrl={urls.page} postalAddress={address} />,
  });
}

/** Sends the next batch of every newsletter that is being sent. Used by the page and the cron job. */
export async function processNewsletterQueue(
  db: AppDb,
  input: { newsletterId?: string; limit?: number; now?: Date } = {},
): Promise<BatchResult> {
  const paced = Boolean(getEnv().RESEND_API_KEY);
  const contentCache = new Map<string, NewsletterContent>();

  const send = async (job: DeliveryJob) => {
    let content = contentCache.get(job.newsletterId);
    if (!content) {
      const [row] = await db.select().from(newsletters).where(eq(newsletters.id, job.newsletterId));
      if (!row) throw new Error("Newsletter not found");
      content = {
        subject: row.subject,
        preview: row.preview,
        body: row.body,
        buttonLabel: row.buttonLabel,
        buttonUrl: row.buttonUrl,
      };
      contentCache.set(job.newsletterId, content);
    }
    await sendNewsletterEmail(content, { email: job.email, subscriberId: job.subscriberId });
    if (paced) await sleep(PACE_MS);
  };

  return sendBatch(db, {
    newsletterId: input.newsletterId,
    limit: input.limit ?? NEWSLETTER_BATCH,
    now: input.now ?? new Date(),
    send,
  });
}

/** Sends a preview to the writer's own address, with a sample unsubscribe link that does nothing. */
export async function sendNewsletterTest(content: NewsletterContent, to: string): Promise<void> {
  const address = newsletterAddress();
  if (address === null) {
    throw new Error("Newsletters can't be sent until the business postal address is set");
  }
  await sendEmail({
    to,
    subject: `[Test] ${content.subject}`,
    react: (
      <NewsletterEmail
        {...content}
        unsubscribeUrl={`${getEnv().BETTER_AUTH_URL}/unsubscribe?token=test-preview`}
        postalAddress={address}
      />
    ),
  });
}
