import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection, LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Sharkly collects, why, and who helps us run the site.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        <strong>The short version:</strong> we collect as little as we can. If you only read
        Sharkly, we keep nothing about you beyond the ordinary records any hosting service makes. If
        you join the club, we keep your name, your email and a scrambled password. We do not use
        ads, analytics or tracking cookies, and we never sell your information.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>If you just visit:</strong> like every website, our hosting service sees your
          network address and what kind of device you use while it sends you the pages. It keeps
          short-term logs to keep the site running and safe.
        </li>
        <li>
          <strong>If you join the club:</strong> your name, your email address, a password, and the
          date you joined. Your password is stored scrambled, so nobody, including us, can read it.
        </li>
        <li>
          <strong>When you sign in:</strong> a sign-in record that keeps your network address and a
          description of your device, so we can keep you signed in and spot misuse.
        </li>
        <li>
          <strong>If you vote:</strong> which shark you chose and when. Only you see your own vote;
          other members only see the totals after they vote.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> ask for your age, birthday, home address, a photo of you, or any
        payment details. We do not save quiz answers or quiz results in our database.
      </p>

      <h2>Why we need it</h2>
      <p>
        To run the club: to confirm your email, to sign you in (with a password or an emailed link),
        to send the emails you ask for, to count votes, and to protect the site from misuse.
      </p>

      <h2>Who helps us run Sharkly</h2>
      <p>These services handle information for us, only to provide their service:</p>
      <ul>
        <li>
          <strong>Vercel</strong> hosts the website.
        </li>
        <li>
          <strong>Railway</strong> stores our database, including accounts and votes.
        </li>
        <li>
          <strong>Resend</strong> sends our emails, so it sees the address it is sending to.
        </li>
        <li>
          <strong>Wikimedia</strong> hosts the shark photos. When a photo loads, Wikimedia&apos;s
          servers see your network address, as with any picture on the web. See the{" "}
          <Link href="/credits">photo credits</Link>.
        </li>
      </ul>
      <p>The fonts on this site come from Sharkly itself, not from another company.</p>

      <h2>Cookies</h2>
      <p>
        When you are signed in, we set one cookie that keeps you signed in. That is the only cookie.
        There are no advertising, analytics or tracking cookies.
      </p>

      <h2>Children</h2>
      <p>
        Sharkly accounts are for grown-ups. If you are a parent or guardian signing up for a young
        reader, the account is yours, and we ask only for your name, email and a password. We do not
        knowingly collect information from children on their own. If you think a child has made an
        account, tell us and we will delete it.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your account for as long as you have one. When an account is deleted, its sign-in
        records and its votes are deleted too. Our hosting service keeps short-term server logs for
        a limited time.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask to see what we hold about you, to correct it, or to have your account deleted.
        There is no delete button yet, so please ask us.
      </p>

      <h2>Changes</h2>
      <p>
        If we change what we collect, for example when we add a newsletter, we will update this page
        and its date first.
      </p>

      <ContactSection />
    </LegalPage>
  );
}
