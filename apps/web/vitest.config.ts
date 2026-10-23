import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

// Unit tests only: no database, no browser. They should finish in seconds.
export default defineConfig({
  resolve: { alias: { "@": root } },
  test: {
    environment: "node",
    include: ["lib/**/*.test.{ts,tsx}"],
    env: {
      DATABASE_URL: "postgres://postgres:postgres@localhost:5452/sharkly_test",
      CRON_SECRET: "c".repeat(32),
      BETTER_AUTH_SECRET: "unit-Q7mZ4kLw9xT2vB8nR5cH1yJ6pD3fG0aS",
      BETTER_AUTH_URL: "http://localhost:3500",
      EMAIL_FROM: "Sharkly <test@example.com>",
    },
  },
});
