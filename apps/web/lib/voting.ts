import { votingRounds, type VotingRound } from "@/content/voting";
import { currentFeatureMonth } from "./species-rules";

/**
 * The round members can vote in now: the earliest one whose month has not started yet, by Toronto
 * time. Returns null when every round's month has already begun, so voting is closed.
 */
export function openRound(
  now: Date = new Date(),
  rounds: readonly VotingRound[] = votingRounds,
): VotingRound | null {
  const thisMonth = currentFeatureMonth(now);
  const upcoming = rounds.filter((round) => round.month > thisMonth);
  upcoming.sort((a, b) => a.month.localeCompare(b.month));
  return upcoming[0] ?? null;
}
