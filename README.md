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

## Species content

The sharks live in `apps/web/content/species.ts`: the text, sizes, sources and conservation statuses, plus the Shark of the Month schedule at the bottom. Edit that file in a pull request, then load it into a database with:

```
pnpm --filter @sharkly/web seed:content      # uses DATABASE_URL from apps/web/.env.local
```

It is safe to run more than once: species are matched by their slug and months by their month. It refuses to load an entry with no source link. New or changed database tables need `pnpm --filter @sharkly/web db:migrate` first.

Conservation statuses come from Wikipedia and FishBase, which cite the IUCN Red List. The IUCN site itself was not opened, so check the IUCN links before turning search indexing on.

## Facts

The shark facts and "myth or fact?" answers live in `apps/web/content/facts.ts`, each with its sources, and are loaded by the same `seed:content` command. The home page shows one fact a day, chosen by the Toronto date, from the entries that are not myths. Entries marked as medium confidence in comments there are worth a second look before search indexing is switched on.

## Quiz

"Which shark are you?" lives at `/quiz`. The questions and the eight results are in `apps/web/content/quiz.ts`; a unit test checks that every result is a real species and that every shark can be reached. It needs no database.

## Photos

Species photos come from Wikimedia Commons (public domain, CC BY, or CC BY-SA only) and are listed with their photographer and license in `apps/web/content/species-images.ts`; `seed:content` copies them onto the species rows and refuses a photo with no author or an unaccepted license. Credits show under the big photos and on `/credits`, which the footer links to. Photos load straight from Wikimedia's servers.
