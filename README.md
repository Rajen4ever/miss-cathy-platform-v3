# Miss Cathy Platform v2

Miss Cathy is a premium **website + Android mobile app** that turns the Miss Cathy Total Export Work into a real product scaffold with live-ready auth, database repositories, reminders, connector registry, and truthful execution boundaries.

## What is included

- **Web command center** built with Next.js App Router
- **Android companion app** built with Expo Router
- **Supabase-ready auth and repository wiring**
- **Connector registry and action-pack model**
- **Android reminder integration** with `expo-notifications`
- **Task / Project / Savepoint / Content / Health / Monitoring / Archive** surfaces
- Shared type contracts, command-routing logic, and demo data
- SQL schema, RLS policies, seed data, and deployment runbooks

## Truthful current state

This repository is **implementation-complete and deployment-ready**, but it is **not already live** because external credentials were not available in-session.

External items still required by a human operator:
- Create a Supabase project
- Add environment variables
- Create storage buckets
- Run the SQL schema
- Build Android with EAS / Gradle
- Deploy web hosting
- Configure notification credentials for push delivery

## Core doctrine preserved

- Additive upgrades only
- Knowledge-first operation
- Dashboard-first UX
- Auto Command with truthful execution bands
- Connector honesty
- Health safety boundaries
- Continuity through briefs, savepoints, decisions, and archive state

## Monorepo

```text
apps/
  web/          Next.js command center
  mobile/       Expo Android companion
packages/
  types/        Shared domain contracts
  core/         Demo data, module catalog, command router, helper logic
  api-client/   Shared fetch client
services/
  db/           SQL schema, seed, policies
  notifications/ Expo push notes + server helper
docs/
  architecture/ System blueprint
  deploy/       Runbook
  qa/           Acceptance checklist
  handoff/      Current status
```

## Quick start

```bash
pnpm install
pnpm --filter @misscathy/web dev
pnpm --filter @misscathy/mobile start
```

## Environment

Copy `.env.example` into app-specific env files:

- `apps/web/.env.local`
- `apps/mobile/.env`

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server routes only)
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `EXPO_PUBLIC_EAS_PROJECT_ID`

## Suggested launch order

1. Create Supabase project
2. Run `services/db/schema.sql`
3. Run `services/db/seed.sql`
4. Add web + mobile environment variables
5. Verify email/password auth on web and mobile
6. Register Android push tokens
7. Connect Expo Push or FCM delivery path
8. Deploy web
9. Build Android internal testing APK / AAB
10. Move connector registry from starter status to verified status
