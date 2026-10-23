import { EmailButton, EmailHeading, EmailShell, EmailSmall, EmailText } from "./layout";

export interface ActionEmailProps {
  preview: string;
  heading: string;
  body: string;
  buttonLabel: string;
  url: string;
  footnote: string;
}

/** One layout for every "click this button" email: sign-in link, verify email, reset password. */
export function ActionEmail({
  preview,
  heading,
  body,
  buttonLabel,
  url,
  footnote,
}: ActionEmailProps) {
  return (
    <EmailShell preview={preview}>
      <EmailHeading>{heading}</EmailHeading>
      <EmailText>{body}</EmailText>
      <EmailButton href={url}>{buttonLabel}</EmailButton>
      <EmailSmall>{footnote}</EmailSmall>
    </EmailShell>
  );
}
