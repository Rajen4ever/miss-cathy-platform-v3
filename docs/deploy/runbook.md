# Deploy runbook

## 1) Create Supabase project
- Create project
- Copy project URL
- Copy publishable key
- Copy service role key for server-side routes

## 2) Run SQL
- Open SQL Editor
- Run `services/db/schema.sql`
- Run `services/db/seed.sql`

## 3) Web env
Create `apps/web/.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
EXPO_PUSH_ACCESS_TOKEN=...
```

## 4) Mobile env
Create `apps/mobile/.env`:
```bash
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
EXPO_PUBLIC_EAS_PROJECT_ID=...
```

## 5) Web
```bash
pnpm install
pnpm --filter @misscathy/web dev
pnpm --filter @misscathy/web build
```

## 6) Android
```bash
pnpm --filter @misscathy/mobile start
pnpm --filter @misscathy/mobile android
```

For production builds:
```bash
cd apps/mobile
eas build --platform android
```

## 7) Notification validation
- Sign in on Android
- Request notification permission
- Schedule a local reminder
- Confirm receipt on device
- Save Expo push token to Supabase
- Test push sending route

## 8) Hosting
- Web: Vercel, Netlify, or self-hosted Node
- Android: EAS Build / Play internal testing
