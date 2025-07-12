# Deployment Guide

## Web
1. Build: `pnpm run build` in `web/`
2. Deploy `dist/` to your host (Vercel, Netlify, S3, etc.)
3. Set production env vars as needed

## Backend
1. Set production env vars (DB, API keys, etc.)
2. Deploy to your server/cloud
3. Run DB migrations if needed

## Mobile
- iOS: Build release in Xcode, upload to App Store Connect/TestFlight
- Android: Build release APK/AAB, upload to Play Console

## Checklist
- All tests pass
- No critical warnings
- Docs up to date
- Bug log started
- Env vars set 