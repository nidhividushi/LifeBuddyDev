# LifeBuddy Start Script

Simple script to start all LifeBuddy services.

## Usage

```bash
# Start all services
pnpm start

# Or run directly
./start
```

## What it starts

- ✅ **Backend API** - Port 3001
- ✅ **Web App** - Port 5174  
- ✅ **Mobile Metro** - Port 8083
- ✅ **Database** - Docker services (if available)

## Quick Commands

```bash
# Start everything
pnpm start

# Stop everything  
Ctrl+C

# Check logs
tail -f logs/backend.log
tail -f logs/web.log  
tail -f logs/mobile.log
```

## Services

| Service | Port | URL |
|---------|------|-----|
| Backend | 3001 | http://localhost:3001 |
| Web | 5174 | http://localhost:5174 |
| Mobile Metro | 8083 | http://localhost:8083 | 