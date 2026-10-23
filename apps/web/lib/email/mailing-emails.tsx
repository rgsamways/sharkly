import { ActionEmail } from "@/emails/action-email";
import { sendEmail } from "./send";

/** The "confirm your sign-up" email. Nobody gets marketing email until they use this link. */
export function sendSubscriptionConfirmation(to: string, url: string): Promise<void> {
  return sendEmail({
    to,
    subject: "Confirm your Sharkly sign-up",
    react: (
      <ActionEmail
        preview="One more step."
        heading="Confirm your email"
        body="Confirm to join the Sharkly mailing list. You won't get any emails until you do."
        buttonLabel="Confirm sign-up"
        url={url}
        footnote="If you didn't sign up, ignore this email and nothing will happen."
      />
    ),
  });
}
