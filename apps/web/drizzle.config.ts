import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: [
    "./db/auth-schema.ts",
    "./db/audit-schema.ts",
    "./db/mailing-schema.ts",
    "./db/newsletter-schema.ts",
  ],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5452/sharkly_dev",
  },
});
