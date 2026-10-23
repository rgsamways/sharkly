import { render } from "@react-email/render";
import { Resend } from "resend";
import type { ReactElement } from "react";
import { getEnv } from "../env";

/**
 * Sends one email. With no RESEND_API_KEY (local development only, production requires it) the
 * email is printed to the log instead, so the app needs no email account to run.
 */
export async function sendEmail(input: {
  to: string | string[];
  subject: string;
  react: ReactElement;
  /** Where replies go, for example the person who filled in the contact form. */
  replyTo?: string;
  /** Extra email headers, such as List-Unsubscribe for newsletters. */
  headers?: Record<string, string>;
}): Promise<void> {
  const env = getEnv();
  const [html, text] = await Promise.all([
    render(input.react),
    render(input.react, { plainText: true }),
  ]);

  if (!env.RESEND_API_KEY) {
    console.log(
      `[email] (RESEND_API_KEY not set) to=${[input.to].flat().join(",")} subject="${input.subject}"\n${text}`,
    );
    return;
  }

  const { error } = await new Resend(env.RESEND_API_KEY).emails.send({
    from: env.EMAIL_FROM,
    to: input.to,
    subject: input.subject,
    ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    ...(input.headers ? { headers: input.headers } : {}),
    html,
    text,
  });
  if (error) throw new Error(`Email send failed: ${error.message}`);
}
