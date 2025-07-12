# LifeBuddy Port Configuration

This document outlines the port assignments for all LifeBuddy services to prevent conflicts during development.

## Port Assignments

| Service | Port | Description | URL |
|---------|------|-------------|-----|
| **Backend API** | 3001 | Express.js API server | http://localhost:3001 |
| **Web App** | 5174 | Vite dev server | http://localhost:5174 |
| **LifeBuddy App** | 3002 | Next.js Vercel app | http://localhost:3002 |
| **Mobile Metro** | 8083 | React Native Metro bundler | http://localhost:8083 |

## Health Checks

- **Backend Health**: http://localhost:3001/health
- **Backend API Docs**: http://localhost:3001/api
- **Web App**: http://localhost:5174
- **LifeBuddy App**: http://localhost:3002

## Configuration Files Updated

### Backend (`backend/src/index.ts`)
- Port: `3001` (was 3000)
- CORS origins updated to use port 3001
- Socket.IO configuration updated

### Mobile (`mobile/package.json`)
- Metro bundler port: `8083` (was 8082)
- Start script: `react-native start --port 8083`

### Web (`web/vite.config.ts`)
- Vite dev server port: `5174` (was 5173)
- Added server configuration

### Web App (`web/src/App.tsx`)
- API base URL: `http://localhost:3001/api` (was 3000)

### LifeBuddy App (`lifebuddy-app/`)
- Next.js app port: `3002`
- Vercel deployment ready

## Development Commands

```bash
# Start all services
make setup

# Start individual services
cd backend && pnpm run dev    # Backend on port 3001
cd web && pnpm run dev        # Web on port 5174
cd lifebuddy-app && npm run dev  # LifeBuddy app on port 3002
cd mobile && pnpm start       # Mobile Metro on port 8083
```

## Troubleshooting

If you encounter port conflicts:

1. **Check running processes**:
   ```bash
   lsof -i :3001,3002,5174,8083
   ```

2. **Kill conflicting processes**:
   ```bash
   lsof -ti:3001,3002,5174,8083 | xargs kill -9
   ```

3. **Verify ports are free**:
   ```bash
   netstat -an | grep LISTEN | grep -E "3001|3002|5174|8083"
   ```

## Notes

- All ports are now fixed and non-overlapping
- Backend API is accessible at port 3001
- Web app connects to backend at port 3001
- LifeBuddy app runs on port 3002 (Vercel deployment)
- Mobile Metro bundler runs on port 8083
- No more port conflicts during development 


# Port Assignments

- Backend API: 3001
- Web (Vite): 5174
- LifeBuddy App (Next.js): 3002
- Mobile Metro Bundler: 8083
- (Add DB and other service ports as needed) 