# Sharkly

A public site about sharks, with a Shark of the Month club, a species database, a fact library, accounts and newsletters.

## Run it

```
pnpm install
docker compose up -d                      # local Postgres on port 5452
cp .env.example apps/web/.env.local       # then fill in the secrets
pnpm --filter @sharkly/web db:migrate
pnpm dev                                  # http://localhost:3500
```

## Checks

`pnpm format:check && pnpm typecheck && pnpm lint && pnpm test && pnpm build` (the same as CI; no browser or database needed).

## How we plan work

Features are planned with [OpenSpec](https://github.com/Fission-AI/OpenSpec): `/opsx:propose "idea"`, then `/opsx:apply`, then `/opsx:archive`. Project context and conventions are in `openspec/config.yaml`.

## Mockups

Static page mockups are in `docs/design/mockups/` (open `index.html`).

## Accounts

Joining is free at `/join`; sign-in is at `/sign-in`. With no `RESEND_API_KEY` set, emails (confirm your email, sign-in link, password reset) are printed in the `pnpm dev` terminal instead of being sent, so you can copy the link from there.
