import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection, LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The simple rules for using Sharkly.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use">
      <p>
        These are the simple rules for using Sharkly. By using the site or joining the club, you
        agree to them and to our <Link href="/privacy">privacy page</Link>.
      </p>

      <h2>Using the site</h2>
      <p>
        Sharkly is free, and it is here for learning and fun. Please be kind, and do not try to
        break the site, overload it, or get into other people&apos;s accounts.
      </p>

      <h2>Your account</h2>
      <ul>
        <li>Accounts are for grown-ups. A parent or guardian can sign up for a young reader.</li>
        <li>Give us true information, and keep your password private.</li>
        <li>You are responsible for what happens on your account.</li>
        <li>One person, one account.</li>
      </ul>

      <h2>Votes and the quiz</h2>
      <p>
        Votes and the quiz are for fun. There are no prizes. We may ignore votes that look like
        misuse, such as one person using many accounts.
      </p>

      <h2>Facts and safety</h2>
      <p>
        We work hard to be accurate and to show where our facts come from, but science changes and
        we can make mistakes. Sharkly is for learning, not professional advice. Stay safe around
        wild animals, and never touch a wild shark.
      </p>

      <h2>Words and photos</h2>
      <p>
        Sharing a link to Sharkly is welcome. Please do not copy large parts of the site&apos;s
        words somewhere else without asking. The photos belong to their photographers and are shared
        under open licenses, which you can find on the <Link href="/credits">photo credits</Link>{" "}
        page.
      </p>

      <h2>Ending an account</h2>
      <p>
        You can ask us to delete your account at any time. We may close an account that misuses the
        site.
      </p>

      <h2>No guarantees</h2>
      <p>
        We provide Sharkly as it is, and it may sometimes be unavailable or contain errors. As far
        as the law allows, we are not responsible for losses that come from using it.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms, and we will change the date above when we do. Using the site
        after a change means you accept it.
      </p>

      <ContactSection />
    </LegalPage>
  );
}
