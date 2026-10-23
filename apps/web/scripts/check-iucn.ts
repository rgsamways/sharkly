/**
 * Compares each species' conservation status and assessment year with what its IUCN Red List page
 * says, and checks the page is for the right species. Run it by hand now and then, since species
 * are reassessed over time (it makes about 30 web requests, so it is not part of CI):
 *
 *   pnpm --filter @sharkly/web check:iucn
 *
 * It only reads. If it reports a difference, update content/species.ts and run seed:content.
 * It uses the `curl` command, because the IUCN site turns away Node's built-in fetch.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { speciesEntries } from "../content/species";
import { IUCN_STATUSES } from "../lib/species-rules";

const run = promisify(execFile);

const CATEGORY =
  /(Critically Endangered|Least Concern|Near Threatened|Data Deficient|Vulnerable|Endangered)/g;

async function check(entry: (typeof speciesEntries)[number]): Promise<string | null> {
  const { stdout } = await run("curl", [
    "--silent",
    "--location",
    "--fail",
    "--max-time",
    "40",
    "--user-agent",
    "Mozilla/5.0 (compatible; Sharkly status check)",
    entry.iucnSourceUrl,
  ]).catch(
    (error: { code?: number }) =>
      ({ stdout: "", failed: error.code ?? 1 }) as { stdout: string; failed: number },
  );
  if (!stdout) return "could not read the IUCN page (blocked or offline)";
  const text = stdout.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  const problems: string[] = [];
  if (!text.toLowerCase().includes(entry.scientificName.toLowerCase())) {
    problems.push(`page does not mention ${entry.scientificName}`);
  }
  const official = IUCN_STATUSES.find((s) => s.value === entry.iucnStatus)!.official;
  const pageCategory = text.match(CATEGORY)?.[0];
  if (pageCategory !== official)
    problems.push(`status: ours ${official}, page ${pageCategory ?? "none found"}`);
  const year = Number(text.match(/assessed for .{0,60}? in (\d{4})/)?.[1]);
  if (year !== entry.iucnAssessedYear)
    problems.push(`year: ours ${entry.iucnAssessedYear}, page ${year || "none found"}`);
  return problems.length ? problems.join("; ") : null;
}

async function main() {
  let attention = 0;
  const queue = [...speciesEntries];
  async function worker() {
    for (let entry = queue.shift(); entry; entry = queue.shift()) {
      let result: string | null;
      try {
        result = await check(entry);
      } catch (error) {
        result = error instanceof Error ? error.message : String(error);
      }
      if (result) {
        attention++;
        console.log(`CHECK  ${entry.slug}: ${result}`);
      }
    }
  }
  await Promise.all(Array.from({ length: 5 }, worker));
  console.log(
    attention === 0
      ? `All ${speciesEntries.length} species match their IUCN pages.`
      : `${attention} of ${speciesEntries.length} need attention.`,
  );
  process.exit(attention === 0 ? 0 : 1);
}

void main();
