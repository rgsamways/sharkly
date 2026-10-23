/**
 * Voting rounds. Each round decides the Shark of the Month for `month`; members vote for one of
 * the candidates (species slugs from content/species.ts). The open round is the earliest one whose
 * month has not started yet. After a round, add the winning shark to `featuredMonths` in
 * content/species.ts by hand.
 */

export interface VotingRound {
  /** The month being decided, as "YYYY-MM". */
  month: string;
  /** Species slugs. At least two. */
  candidates: string[];
  /** One friendly line per candidate, shown on the vote page. */
  hooks: Record<string, string>;
}

export const votingRounds: VotingRound[] = [
  {
    month: "2027-04",
    candidates: ["epaulette-shark", "common-thresher-shark", "basking-shark"],
    hooks: {
      "epaulette-shark": "A little reef shark that walks across the seabed on its fins.",
      "common-thresher-shark":
        "A shark with a tail nearly as long as its body, which it uses like a whip.",
      "basking-shark": "A gentle giant with a huge mouth that only eats tiny plankton.",
    },
  },
];
