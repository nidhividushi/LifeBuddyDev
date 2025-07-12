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
- MongoDB 6.0+
- Redis 7.0+
- React Native development environment

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
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   cp mobile/.env.example mobile/.env
   
   # Edit with your configuration
   nano backend/.env
   ```

4. **Start development servers**
   ```bash
   # Start backend and mobile
   pnpm run dev
   
   # Or start mobile app only
   pnpm run dev:mobile
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
├── 📱 mobile/          # React Native mobile app
├── 🌐 frontend/        # React.js web app (future)
├── ⚙️ backend/         # Node.js API server
├── 📊 docs/           # Documentation
├── 🐳 docker/         # Docker configuration
└── 📋 scripts/        # Build and deployment scripts
```

### **Service Architecture**
- **API Gateway** - Central entry point with authentication
- **User Service** - Profile and preference management
- **Goal Service** - Goal tracking and progress
- **AI Service** - OpenAI integration and chat
- **Community Service** - Social features and content
- **Analytics Service** - Insights and reporting

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

## 🔧 Development

### **Available Scripts**
```bash
# Development
pnpm run dev              # Start backend + mobile
pnpm run dev:mobile       # Start mobile app
pnpm run dev:backend      # Start backend only

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