import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as auth from "./auth-schema";
import * as audit from "./audit-schema";
import * as mailing from "./mailing-schema";
import * as newsletter from "./newsletter-schema";
import * as speciesTables from "./species-schema";

export const schema = { ...auth, ...audit, ...mailing, ...newsletter, ...speciesTables };

/** The database handle every function expects: `drizzle(pool, { schema })`. */
export type AppDb = NodePgDatabase<typeof schema>;
