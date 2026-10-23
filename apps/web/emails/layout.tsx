import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

export const INK = "#072838";
export const BONE = "#ffffff";
export const PAPER = "#f3f9fb";
export const MUTED = "#6b6b72";
export const LINE = "#dcdcd6";
export const FONT = "Helvetica, Arial, sans-serif";
export const DISPLAY = "'Trebuchet MS', Arial, sans-serif";

/** The frame every email shares: dark header with the wordmark, a light card, a quiet footer. */
export function EmailShell({
  preview,
  children,
  footer = "Sharks are amazing. See you next month.",
}: {
  preview: string;
  children: ReactNode;
  footer?: string;
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ margin: 0, padding: "28px 12px", backgroundColor: INK }}>
        <Container style={{ maxWidth: 600 }}>
          <Text
            style={{
              margin: "0 4px 20px",
              fontFamily: DISPLAY,
              fontSize: 22,
              letterSpacing: 0,
              fontWeight: "bold",
              color: "#f4f4f5",
            }}
          >
            Sharkly
          </Text>
          <Section style={{ backgroundColor: PAPER, borderRadius: 8, padding: "34px 34px 30px" }}>
            {children}
          </Section>
          <Text
            style={{
              margin: "22px 10px 0",
              textAlign: "center",
              fontFamily: FONT,
              fontSize: 12,
              color: "#9a9aa3",
            }}
          >
            {footer}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailHeading({ children }: { children: ReactNode }) {
  return (
    <Heading
      as="h1"
      style={{
        margin: "0 0 6px",
        fontFamily: DISPLAY,
        fontSize: 30,
        lineHeight: 1.1,
        letterSpacing: 1,
        color: INK,
      }}
    >
      {children}
    </Heading>
  );
}

export function EmailText({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{
        margin: "14px 0 0",
        fontFamily: FONT,
        fontSize: 15,
        lineHeight: 1.6,
        color: "#2b2b30",
      }}
    >
      {children}
    </Text>
  );
}

export function EmailSmall({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{ margin: "14px 0 0", fontFamily: FONT, fontSize: 12, lineHeight: 1.6, color: MUTED }}
    >
      {children}
    </Text>
  );
}

export function EmailLabel({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{
        margin: "26px 0 8px",
        fontFamily: DISPLAY,
        fontSize: 12,
        letterSpacing: 0,
        fontWeight: "bold",
        color: MUTED,
      }}
    >
      {children}
    </Text>
  );
}

export function EmailButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button
      href={href}
      style={{
        margin: "26px 0 6px",
        padding: "14px 28px",
        backgroundColor: INK,
        color: BONE,
        borderRadius: 4,
        fontFamily: DISPLAY,
        fontSize: 14,
        letterSpacing: 2,
        fontWeight: "bold",
        textDecoration: "none",
      }}
    >
      {children}
    </Button>
  );
}
