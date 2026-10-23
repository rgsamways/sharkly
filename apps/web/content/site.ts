export const site = {
  name: "Sharkly",
  tagline: "Meet a new shark every month. Facts for curious kids and grown-ups.",
  /**
   * An address that receives mail, shown on the privacy and terms pages. Leave it empty until a
   * mailbox exists: the pages leave the contact section out instead of showing a dead address.
   */
  contactEmail: "",
  /** When the privacy and terms pages were last changed. Update it whenever you edit them. */
  legalUpdated: "October 23, 2026",
  /** Newsletters are blocked in production until this is set (anti-spam law requires it). */
  postalAddress: "",
  /** The public menu. Pages are added here as they are built. */
  nav: [
    { label: "Sharks", href: "/sharks" },
    { label: "Shark of the Month", href: "/shark-of-the-month" },
    { label: "Facts", href: "/facts" },
    { label: "Quiz", href: "/quiz" },
    { label: "Vote", href: "/vote" },
  ],
};
