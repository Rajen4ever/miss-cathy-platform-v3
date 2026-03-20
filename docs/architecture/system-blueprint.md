# System blueprint

## Product split

### Website
The website is the full command center:
- dashboard
- tasks + projects
- knowledge hub
- auto command
- content studio
- builder studio
- health ops
- connector center
- monitoring
- archive
- settings

### Android
Android is the high-frequency operational companion:
- home dashboard
- quick command
- tasks
- quick capture
- content capture
- health follow-up
- more / connectors / settings
- reminders

## Core architecture

- **Next.js App Router** for the web workspace
- **Expo Router** for Android navigation
- **Supabase** for auth, Postgres, storage, and server-ready functions
- **Workspace packages** for shared types and operating logic
- **Repository layer** so UI components are not tightly coupled to demo or live data

## Truthfulness boundary model

- **Direct**: planning, briefs, dashboards, code, content packs, health organization
- **Connector**: deployment, calendars, external write actions, notifications beyond local scheduling
- **Handoff**: prepared payloads, manual submissions, external model tests
- **Recommendation**: anything unsupported or lacking access

## Complexity control

- Keep MVP centered on the daily command loop.
- Hide specialist depth behind progressive module entry points.
- Never claim live status for connectors that are only templates or handoff-ready.
- Keep mobile narrow and fast.
