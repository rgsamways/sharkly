export const site = {
  name: "Sharkly",
  tagline: "Meet a new shark every month. Facts for curious kids and grown-ups.",
  /** Newsletters are blocked in production until this is set (anti-spam law requires it). */
  postalAddress: "",
  /** The public menu. Pages are added here as they are built. */
  nav: [
    { label: "Sharks", href: "/sharks" },
    { label: "Shark of the Month", href: "/shark-of-the-month" },
    { label: "Facts", href: "/facts" },
    { label: "The club", href: "/join" },
  ],
};
