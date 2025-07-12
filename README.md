# 🚀 LifeBuddy App

<div align="center">

![LifeBuddy Logo](https://img.shields.io/badge/LifeBuddy-AI%20Powered%20Growth-blue?style=for-the-badge&logo=robot)
![React Native](https://img.shields.io/badge/React%20Native-0.72.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green?style=for-the-badge&logo=mongodb)

**AI-powered personal growth and goal-tracking mobile app**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## ✨ Features

### 🤖 **AI Conversations**
- Natural language goal setting and guidance
- Voice-to-text and text-to-speech support
- Smart action triggers and reminders
- Personalized motivational responses

### 🎯 **Goal Management**
- Hierarchical goal structure with sub-tasks
- Progress tracking with visual indicators
- Smart reminders and notifications
- Goal templates and suggestions

### 🌟 **Community Inspiration**
- Instagram-style motivational feed
- AI-generated content and tips
- Like, comment, and save functionality
- Category-based content filtering

### 📝 **Personal Journal**
- Multimedia journal entries
- Mood tracking and analytics
- AI-powered insights and reflections
- Life balance wheel visualization

### 📊 **Progress Analytics**
- Visual dashboards and charts
- Achievement tracking and celebrations
- Streak monitoring and statistics
- Predictive analytics and insights

---

## 🛠️ Tech Stack

### **Frontend**
- **React Native** - Cross-platform mobile development
- **React.js** - Web application (future)
- **TypeScript** - Type safety and better DX
- **Redux Toolkit** - State management
- **React Navigation** - Mobile navigation
- **Framer Motion** - Smooth animations

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Primary database
- **Redis** - Caching and sessions
- **Elasticsearch** - Search functionality
- **Socket.io** - Real-time features

### **AI & External Services**
- **OpenAI GPT API** - Natural language processing
- **OpenAI Whisper** - Speech-to-text
- **OpenAI TTS** - Text-to-speech
- **AWS S3** - File storage
- **Firebase Cloud Messaging** - Push notifications

### **Infrastructure**
- **Docker** - Containerization
- **AWS** - Cloud platform
- **GitHub Actions** - CI/CD
- **Sentry** - Error tracking
- **Jest** - Testing framework

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and pnpm 8+
- MongoDB 6.0+ (via Docker)
- Redis 7.0+ (via Docker)
- Docker Desktop (for database services)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/lifebuddy-app.git
   cd lifebuddy-app
   ```

2. **Install dependencies**
   ```bash
   pnpm run setup
   ```

3. **Environment setup**
   ```bash
   # Copy environment files
   cp env.example .env
   
   # Edit with your configuration
   nano .env
   ```

4. **Start development servers**
   ```bash
   # Start all core services (Backend + Web/Vite + Web/Vercel)
   ./start --minimal
   
   # Start all services including mobile
   ./start
   
   # Start individual services
   pnpm run dev:backend    # Backend API only
   pnpm run dev:web        # Web/Vite app only
   pnpm run dev:lifebuddy  # LifeBuddy app only
   ```

### **Docker Setup**
```bash
# Build and start all services
pnpm run docker:build
pnpm run docker:up

# Stop services
pnpm run docker:down
```

---

## 🏗️ Architecture

```
LifeBuddy/
├── ⚙️ backend/         # Node.js API server (Port 3001)
├── 🌐 web/            # React/Vite development app (Port 5174)
├── 🚀 lifebuddy-app/  # Next.js production app (Port 3002)
├── 📱 mobile/         # React Native mobile app (Port 8083)
├── 📊 docs/           # Documentation
├── 🐳 docker-compose.yml # Database services
└── 📋 scripts/        # Build and deployment scripts
```

### **Service Architecture**

#### **Core Services (Minimal Mode)**
1. **Backend API** (Port 3001) - Express.js server with MongoDB/Redis
2. **Web/Vite** (Port 5174) - Local development and testing interface
3. **Web/Vercel** (Port 3002) - Next.js production app for Vercel deployment

#### **Full Services (Complete Mode)**
4. **Mobile Metro** (Port 8083) - React Native development server

#### **Database Services (Docker)**
- **MongoDB** (Port 27017) - Primary database
- **Redis** (Port 6379) - Caching and sessions
- **Elasticsearch** (Port 9200) - Search functionality
- **Kibana** (Port 5601) - Log management
- **MinIO** (Port 9000) - File storage

### **Service Communication**
- Backend API serves all frontend applications
- Web/Vite for local development and testing
- Web/Vercel for production deployment
- Mobile app connects to Backend API
- All services use shared database infrastructure

---

## 📱 App Screenshots

<div align="center">

### Conversations Tab
![Conversations](docs/assets/conversations.png)

### Goals Management
![Goals](docs/assets/goals.png)

### Community Feed
![Community](docs/assets/community.png)

### Analytics Dashboard
![Analytics](docs/assets/analytics.png)

</div>

---

## 🌐 Service Access & Ports

### **Core Services (Minimal Mode)**
| Service | Port | URL | Description |
|---------|------|-----|-------------|
| **Backend API** | 3001 | http://localhost:3001 | Express.js server with health check |
| **Web/Vite** | 5174 | http://localhost:5174 | Local development interface |
| **Web/Vercel** | 3002 | http://localhost:3002 | Next.js production app |

### **Full Services (Complete Mode)**
| Service | Port | URL | Description |
|---------|------|-----|-------------|
| **Mobile Metro** | 8083 | http://localhost:8083 | React Native development server |

### **Database Services (Docker)**
| Service | Port | URL | Description |
|---------|------|-----|-------------|
| **MongoDB** | 27017 | mongodb://localhost:27017 | Primary database |
| **Redis** | 6379 | redis://localhost:6379 | Caching and sessions |
| **Elasticsearch** | 9200 | http://localhost:9200 | Search functionality |
| **Kibana** | 5601 | http://localhost:5601 | Log management UI |
| **MinIO** | 9000 | http://localhost:9000 | File storage UI |

### **Health Checks**
- **Backend Health**: http://localhost:3001/health
- **Backend API Docs**: http://localhost:3001/api
- **Web/Vite**: http://localhost:5174
- **Web/Vercel**: http://localhost:3002

---

## 🔧 Development

### **Available Scripts**
```bash
# Development
./start --minimal        # Start core services (Backend + Web/Vite + Web/Vercel)
./start                  # Start all services including mobile
pnpm run dev:backend     # Start backend only
pnpm run dev:web         # Start Web/Vite only
pnpm run dev:lifebuddy   # Start LifeBuddy app only
pnpm run dev:mobile      # Start mobile only

# Building
pnpm run build            # Build all applications
pnpm run build:backend    # Build backend
pnpm run build:mobile     # Build mobile app

# Testing
pnpm run test             # Run all tests
pnpm run test:backend     # Test backend
pnpm run test:mobile      # Test mobile app

# Code Quality
npm run lint             # Lint all code
npm run format           # Format code with Prettier
```

### **Code Style**
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

---

## 🧪 Testing

### **Backend Testing**
```bash
cd backend
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### **Frontend Testing**
```bash
cd frontend
npm test                 # Run all tests
npm run test:e2e         # End-to-end tests
```

### **Mobile Testing**
```bash
cd mobile
npm test                 # Unit tests
npm run test:e2e         # Detox E2E tests
```

---

## 📊 API Documentation

### **Authentication**
```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/profile
```

### **Goals**
```http
GET    /api/goals
POST   /api/goals
GET    /api/goals/:id
PUT    /api/goals/:id
DELETE /api/goals/:id
```

### **AI Chat**
```http
POST   /api/chat/message
POST   /api/chat/audio
GET    /api/chat/history
```

### **Community**
```http
GET    /api/posts
POST   /api/posts
PUT    /api/posts/:id/like
POST   /api/posts/:id/comments
```

[Full API Documentation →](docs/api/README.md)

---

## 🚀 Deployment

### **Backend Deployment**
```bash
# Production build
npm run build:backend

# Deploy to AWS
aws deploy --template-file backend/template.yml
```

### **Mobile App Deployment**
```bash
# iOS
cd mobile && npx react-native run-ios --configuration Release

# Android
cd mobile && npx react-native run-android --variant=release
```

### **Environment Variables**
```bash
# Required environment variables
OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code of Conduct**
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI** for AI capabilities
- **React Native** community for mobile development
- **MongoDB** for database solutions
- **AWS** for cloud infrastructure

---

## 📚 Documentation

- **[Services Documentation](docs/SERVICES.md)** - Complete service architecture and workflows
- **[Port Configuration](docs/PORTS.md)** - Detailed port assignments
- **[API Documentation](docs/api/README.md)** - Backend API reference
- **[Contributing Guidelines](CONTRIBUTING.md)** - Development guidelines

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-username/lifebuddy-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/lifebuddy-app/discussions)
- **Email**: support@lifebuddy.app

---

<div align="center">

**Made with ❤️ by the LifeBuddy Team**

[![GitHub stars](https://img.shields.io/github/stars/your-username/lifebuddy-app?style=social)](https://github.com/your-username/lifebuddy-app)
[![GitHub forks](https://img.shields.io/github/forks/your-username/lifebuddy-app?style=social)](https://github.com/your-username/lifebuddy-app)
[![GitHub issues](https://img.shields.io/github/issues/your-username/lifebuddy-app)](https://github.com/your-username/lifebuddy-app/issues)

</div> 