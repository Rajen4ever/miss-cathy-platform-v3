# Notifications notes

This repository uses two notification layers:

1. **Local Android reminders** through `expo-notifications`
   - Works for follow-up reminders without a server send.
   - Useful for task nudges, daily dashboard reminders, and health follow-up prompts.

2. **Push delivery path**
   - Mobile app registers an Expo push token.
   - Token is saved in `device_push_tokens`.
   - The web app includes a server route scaffold at `apps/web/app/api/push/send/route.ts`.
   - Real delivery still requires valid notification credentials and a deployed server.

Recommended v1 path:
- Start with local reminders.
- Add Expo push delivery after auth and token registration are verified.
