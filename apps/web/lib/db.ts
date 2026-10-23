import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { schema, type AppDb } from "@/db/schema";
import { getEnv } from "./env";

// Kept on globalThis so hot reloads in development reuse one connection pool.
const globalForDb = globalThis as unknown as { __sharklyDb?: AppDb };

export function getDb(): AppDb {
  globalForDb.__sharklyDb ??= drizzle(
    new pg.Pool({
      connectionString: getEnv().DATABASE_URL,
      max: getEnv().DATABASE_POOL_MAX,
      // Let go of idle connections so a quiet site doesn't hold the database's slots.
      idleTimeoutMillis: 10_000,
    }),
    { schema },
  );
  return globalForDb.__sharklyDb;
}
