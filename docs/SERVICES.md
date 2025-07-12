# 🚀 LifeBuddy Services Documentation

This document provides comprehensive information about all LifeBuddy services, their architecture, ports, and how to access them.

## 📋 Table of Contents

- [Service Overview](#service-overview)
- [Core Services (Minimal Mode)](#core-services-minimal-mode)
- [Full Services (Complete Mode)](#full-services-complete-mode)
- [Database Services](#database-services)
- [Service Communication](#service-communication)
- [Development Workflows](#development-workflows)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Service Overview

LifeBuddy consists of **4 main services** that can be run in different configurations:

### **Minimal Mode** (Core Services)
- **Backend API** - Express.js server with database integration
- **Web/Vite** - Local development and testing interface
- **Web/Vercel** - Next.js production app for deployment

### **Complete Mode** (All Services)
- All minimal mode services +
- **Mobile Metro** - React Native development server

### **Infrastructure Services** (Docker)
- **MongoDB** - Primary database
- **Redis** - Caching and sessions
- **Elasticsearch** - Search functionality
- **Kibana** - Log management
- **MinIO** - File storage

---

## 🔧 Core Services (Minimal Mode)

### 1. **Backend API** - Port 3001

**Technology Stack:**
- Node.js with Express.js
- TypeScript
- MongoDB (primary database)
- Redis (caching and sessions)
- Socket.io (real-time features)

**Access URLs:**
- **Main API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **API Documentation**: http://localhost:3001/api
- **Socket.io**: ws://localhost:3001

**Key Features:**
- RESTful API endpoints
- Real-time WebSocket connections
- Authentication and authorization
- File upload handling
- Database operations
- External API integrations (OpenAI, etc.)

**Development Commands:**
```bash
# Start backend only
pnpm run dev:backend

# Build backend
pnpm run build:backend

# Test backend
pnpm run test:backend
```

**Environment Variables:**
```bash
PORT=3001
MONGODB_URI=mongodb://admin:lifebuddy123@localhost:27017/lifebuddy?authSource=admin
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=your-openai-api-key
```

### 2. **Web/Vite** - Port 5174

**Technology Stack:**
- React 19
- Vite (build tool)
- TypeScript
- Tailwind CSS
- Axios (HTTP client)

**Access URLs:**
- **Development Server**: http://localhost:5174
- **Preview Build**: http://localhost:4173 (after build)

**Key Features:**
- Local development interface
- Hot module replacement
- Fast build times
- Testing environment
- API integration testing

**Development Commands:**
```bash
# Start Web/Vite only
pnpm run dev:web

# Build for production
pnpm run build:web

# Preview production build
pnpm run preview:web
```

**Configuration Files:**
- `web/vite.config.ts` - Vite configuration
- `web/tsconfig.json` - TypeScript configuration
- `web/tailwind.config.js` - Tailwind CSS configuration

### 3. **Web/Vercel** - Port 3002

**Technology Stack:**
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Radix UI components
- React Hook Form
- Zod validation

**Access URLs:**
- **Development Server**: http://localhost:3002
- **Production Build**: http://localhost:3000 (default Next.js port)

**Key Features:**
- Production-ready Next.js app
- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes
- Vercel deployment ready
- Mobile-first responsive design

**Development Commands:**
```bash
# Start LifeBuddy app only
pnpm run dev:lifebuddy

# Build for production
pnpm run build:lifebuddy

# Start production server
pnpm run start:lifebuddy
```

**Configuration Files:**
- `lifebuddy-app/next.config.mjs` - Next.js configuration
- `lifebuddy-app/tailwind.config.ts` - Tailwind CSS configuration
- `lifebuddy-app/tsconfig.json` - TypeScript configuration
- `vercel.json` - Vercel deployment configuration

**App Structure:**
```
lifebuddy-app/
├── app/                 # Next.js 13+ app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── conversations.tsx
│   ├── todo.tsx
│   ├── get-inspired.tsx
│   ├── my-life.tsx
│   ├── support-network.tsx
│   └── ui/            # Radix UI components
└── lib/               # Utility functions
```

---

## 📱 Full Services (Complete Mode)

### 4. **Mobile Metro** - Port 8083

**Technology Stack:**
- React Native 0.72
- Metro bundler
- TypeScript
- React Navigation
- Redux Toolkit

**Access URLs:**
- **Metro Bundler**: http://localhost:8083
- **Metro Status**: http://localhost:8083/status

**Key Features:**
- React Native development server
- Hot reloading
- Bundle analysis
- Device debugging
- iOS/Android development

**Development Commands:**
```bash
# Start mobile Metro only
pnpm run dev:mobile

# iOS development
pnpm run dev:mobile:ios

# Android development
pnpm run dev:mobile:android
```

**Platform Support:**
- **iOS**: Requires Xcode and iOS Simulator
- **Android**: Requires Android Studio and emulator
- **Physical Devices**: USB debugging enabled

---

## 🗄️ Database Services

All database services run in Docker containers and are managed via `docker-compose.yml`.

### **MongoDB** - Port 27017

**Access:**
- **Connection String**: `mongodb://admin:lifebuddy123@localhost:27017/lifebuddy?authSource=admin`
- **Database**: `lifebuddy`
- **Username**: `admin`
- **Password**: `lifebuddy123`

**Features:**
- Primary application database
- User data, goals, conversations
- Indexed collections for performance
- Backup and restore capabilities

### **Redis** - Port 6379

**Access:**
- **Connection String**: `redis://localhost:6379`
- **No authentication** (development mode)

**Features:**
- Session storage
- Caching layer
- Real-time data
- Pub/Sub messaging

### **Elasticsearch** - Port 9200

**Access:**
- **HTTP API**: http://localhost:9200
- **Cluster Health**: http://localhost:9200/_cluster/health

**Features:**
- Full-text search
- Analytics and aggregations
- Log indexing
- Performance monitoring

### **Kibana** - Port 5601

**Access:**
- **Web UI**: http://localhost:5601

**Features:**
- Log visualization
- Search interface
- Dashboard creation
- Monitoring tools

### **MinIO** - Port 9000

**Access:**
- **Web UI**: http://localhost:9000
- **API Endpoint**: http://localhost:9000
- **Console**: http://localhost:9001

**Features:**
- S3-compatible object storage
- File uploads and downloads
- Image and media storage
- Backup storage

---

## 🔄 Service Communication

### **API Communication Flow**

```
┌─────────────┐    HTTP/REST    ┌─────────────┐
│   Web/Vite  │ ──────────────► │  Backend    │
│   (5174)    │                 │   API       │
└─────────────┘                 │  (3001)     │
                                └─────────────┘
┌─────────────┐    HTTP/REST         ▲
│ Web/Vercel  │ ──────────────┐      │
│   (3002)    │                │      │
└─────────────┘                │      │
                               │      │
┌─────────────┐    HTTP/REST   │      │
│   Mobile    │ ──────────────┘      │
│   (8083)    │                      │
└─────────────┘                      │
                                     │
┌─────────────┐    Database    ┌─────┴─────┐
│   MongoDB   │ ◄───────────── │   Redis   │
│   (27017)   │                │   (6379)  │
└─────────────┘                └───────────┘
```

### **Data Flow**

1. **Frontend Applications** (Web/Vite, Web/Vercel, Mobile) make HTTP requests to Backend API
2. **Backend API** processes requests and communicates with databases
3. **MongoDB** stores persistent data (users, goals, conversations)
4. **Redis** handles sessions, caching, and real-time data
5. **WebSocket connections** provide real-time updates to all clients

### **Authentication Flow**

1. User logs in through any frontend application
2. Backend API validates credentials
3. JWT token is generated and stored in Redis
4. Token is returned to client for subsequent requests
5. All API requests include JWT token in Authorization header

---

## 🛠️ Development Workflows

### **Starting Services**

#### **Minimal Mode (Recommended for Development)**
```bash
# Start core services only
./start --minimal

# This starts:
# - Backend API (3001)
# - Web/Vite (5174)
# - Web/Vercel (3002)
# - Database services (Docker)
```

#### **Complete Mode (Full Development)**
```bash
# Start all services including mobile
./start

# This starts everything in minimal mode plus:
# - Mobile Metro (8083)
# - iOS Simulator (if available)
```

#### **Individual Services**
```bash
# Start services individually
pnpm run dev:backend     # Backend only
pnpm run dev:web         # Web/Vite only
pnpm run dev:lifebuddy   # Web/Vercel only
pnpm run dev:mobile      # Mobile only
```

### **Development Workflow**

1. **Start with Minimal Mode**
   ```bash
   ./start --minimal
   ```

2. **Access Services**
   - Backend API: http://localhost:3001/health
   - Web/Vite: http://localhost:5174
   - Web/Vercel: http://localhost:3002

3. **Development Tasks**
   - Use Web/Vite for rapid development and testing
   - Use Web/Vercel for production-like testing
   - Backend API serves both frontend applications

4. **Add Mobile When Needed**
   ```bash
   ./start  # Full mode with mobile
   ```

### **Testing Workflow**

1. **Backend Testing**
   ```bash
   cd backend
   pnpm test
   ```

2. **Frontend Testing**
   ```bash
   cd web
   pnpm test
   
   cd ../lifebuddy-app
   pnpm test
   ```

3. **Integration Testing**
   - Start all services
   - Test API endpoints
   - Verify frontend-backend communication

### **Deployment Workflow**

1. **Backend Deployment**
   ```bash
   pnpm run build:backend
   # Deploy to cloud platform
   ```

2. **Web/Vercel Deployment**
   ```bash
   cd lifebuddy-app
   vercel  # Deploy to Vercel
   ```

3. **Mobile Deployment**
   ```bash
   cd mobile
   pnpm run build:ios     # iOS build
   pnpm run build:android # Android build
   ```

---

## 🔍 Troubleshooting

### **Common Issues**

#### **Port Conflicts**
```bash
# Check what's using a port
lsof -i :3001

# Kill process using port
lsof -ti:3001 | xargs kill -9
```

#### **Service Not Starting**
```bash
# Check logs
tail -f logs/backend.log
tail -f logs/web.log
tail -f logs/lifebuddy.log
tail -f logs/mobile.log
```

#### **Database Connection Issues**
```bash
# Check Docker containers
docker-compose ps

# Restart database services
docker-compose restart
```

#### **Dependencies Issues**
```bash
# Clean and reinstall
pnpm run clean
pnpm install

# Check for broken installations
./start --cleanup
```

### **Performance Issues**

#### **High System Load**
```bash
# Use minimal mode
./start --minimal

# Check system resources
./diagnose
```

#### **Memory Issues**
```bash
# Clear caches
pnpm store prune
npm cache clean --force

# Restart services
./stop
./start --minimal
```

### **Development Tips**

1. **Use Minimal Mode** for most development work
2. **Start with Backend** to ensure API is working
3. **Test on Web/Vite** for rapid iteration
4. **Verify on Web/Vercel** for production-like testing
5. **Add Mobile** only when needed for mobile-specific features

### **Log Locations**

- **Backend**: `logs/backend.log`
- **Web/Vite**: `logs/web.log`
- **Web/Vercel**: `logs/lifebuddy.log`
- **Mobile**: `logs/mobile.log`
- **iOS**: `logs/ios.log`

### **Useful Commands**

```bash
# Check all service status
./start --help

# Stop all services
./stop

# Clean up resources
./start --cleanup

# System diagnostics
./diagnose

# Check port usage
lsof -i :3001,3002,5174,8083
```

---

## 📚 Additional Resources

- [Port Configuration](PORTS.md) - Detailed port assignments
- [API Documentation](API.md) - Backend API reference
- [Deployment Guide](DEPLOYMENT.md) - Production deployment
- [Contributing Guidelines](CONTRIBUTING.md) - Development guidelines 