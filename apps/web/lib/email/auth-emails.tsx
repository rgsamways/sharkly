import { ActionEmail } from "@/emails/action-email";
import { sendEmail } from "./send";

export function sendSignInLink(to: string, url: string): Promise<void> {
  return sendEmail({
    to,
    subject: "Your link to sign in to Sharkly",
    react: (
      <ActionEmail
        preview="One click to sign in."
        heading="Sign in"
        body="Use the button to sign in. The link works once and expires in 10 minutes."
        buttonLabel="Sign in"
        url={url}
        footnote="If you didn't ask for this, you can ignore this email. Nobody can sign in without the link."
      />
    ),
  });
}

/** Tells someone they have been added to the team, with where to sign in. */
export function sendTeamWelcome(to: string, name: string, url: string): Promise<void> {
  return sendEmail({
    to,
    subject: "You've been added to the Sharkly team",
    react: (
      <ActionEmail
        preview="You can now sign in to the Sharkly admin."
        heading="Welcome to the team"
        body={`Hi ${name}, you now have access to the Sharkly admin. Open the sign-in page and enter this email address. The easiest way in is to choose "Email me a link", and we will send you a link that signs you in. If you would rather use a password, choose "Choose one here" on the sign-in page and we will email you a link to set one.`}
        buttonLabel="Go to sign in"
        url={url}
        footnote="If you weren't expecting this, you can ignore this email. Nothing happens until you sign in."
      />
    ),
  });
}

export function sendVerifyEmail(to: string, url: string): Promise<void> {
  return sendEmail({
    to,
    subject: "Confirm your email for Sharkly",
    react: (
      <ActionEmail
        preview="Confirm your email address."
        heading="Confirm your email"
        body="Confirm your email address to finish setting up your account."
        buttonLabel="Confirm email"
        url={url}
        footnote="If you didn't create an account, you can ignore this email."
      />
    ),
  });
}

export function sendPasswordReset(to: string, url: string): Promise<void> {
  return sendEmail({
    to,
    subject: "Choose or reset your Sharkly password",
    react: (
      <ActionEmail
        preview="Choose a password."
        heading="Choose your password"
        body="Use the button to choose a password. The link expires soon."
        buttonLabel="Choose a password"
        url={url}
        footnote="If you didn't ask for this, you can ignore this email. Your password won't change."
      />
    ),
  });
}

/** The link that opens the "are you sure?" page. It never deletes anything by itself. */
export function sendDeleteAccount(to: string, url: string): Promise<void> {
  return sendEmail({
    to,
    subject: "Confirm that you want to delete your Sharkly account",
    react: (
      <ActionEmail
        preview="Review and confirm deleting your account."
        heading="Delete your account?"
        body="You asked to delete your Sharkly account. Use the button to review what will be removed and confirm. Deleting removes your account, your sign-in records and your votes, and it cannot be undone. The link works once and expires in an hour."
        buttonLabel="Review and delete my account"
        url={url}
        footnote="If you didn't ask for this, ignore this email. Nothing is deleted unless you press the confirm button on the next page."
      />
    ),
  });
}
