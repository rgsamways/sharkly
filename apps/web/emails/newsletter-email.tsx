import { Fragment } from "react";
import { EmailButton, EmailHeading, EmailShell, EmailSmall, EmailText } from "./layout";

export interface NewsletterEmailProps {
  subject: string;
  preview: string;
  /** Plain text; blank lines separate paragraphs. */
  body: string;
  buttonLabel: string | null;
  buttonUrl: string | null;
  unsubscribeUrl: string;
  /** The sender's postal address, which Canadian email rules require in every message. */
  postalAddress: string;
}

/** Splits plain text into paragraphs (blank lines) of lines (single line breaks). */
export function toParagraphs(body: string): string[][] {
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((p) => p.trim().split("\n"))
    .filter((lines) => lines.some((l) => l.trim() !== ""));
}

/** A newsletter: the team's own words, an optional button, and the legally required footer. */
export function NewsletterEmail({
  subject,
  preview,
  body,
  buttonLabel,
  buttonUrl,
  unsubscribeUrl,
  postalAddress,
}: NewsletterEmailProps) {
  return (
    <EmailShell preview={preview || subject}>
      <EmailHeading>{subject}</EmailHeading>
      {toParagraphs(body).map((lines, i) => (
        <EmailText key={i}>
          {lines.map((line, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </EmailText>
      ))}
      {buttonLabel && buttonUrl && <EmailButton href={buttonUrl}>{buttonLabel}</EmailButton>}
      <EmailSmall>
        You are getting this because you signed up to the Sharkly mailing list.{" "}
        <a href={unsubscribeUrl} style={{ color: "#6b6b72" }}>
          Unsubscribe
        </a>{" "}
        at any time.
        <br />
        Sharkly, {postalAddress}
      </EmailSmall>
    </EmailShell>
  );
}
