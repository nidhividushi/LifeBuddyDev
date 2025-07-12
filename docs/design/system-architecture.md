# System Architecture

## 🏗️ Architecture Overview

LifeBuddy follows a modern, scalable microservices architecture designed for high availability, performance, and maintainability.

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Applications                      │
├─────────────────────────────────────────────────────────────────┤
│  📱 Mobile App (React Native)  │  🌐 Web App (React.js)        │
│  └─────────────────────────────┴────────────────────────────────┘
│                                │
│                    ┌─────────────────┐
│                    │   API Gateway   │
│                    │   (Express.js)  │
│                    └─────────────────┘
│                                │
│         ┌──────────────────────┼──────────────────────┐
│         │                      │                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  │   Auth Service  │  │   User Service  │  │   Goal Service  │
│  │   (JWT/OAuth)   │  │   (Profiles)    │  │   (Goals/Tasks) │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘
│         │                      │                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  │   AI Service    │  │  Community      │  │   Analytics     │
│  │   (OpenAI API)  │  │   Service       │  │   Service       │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘
│         │                      │                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  │   File Service  │  │   Chat Service  │  │  Notification   │
│  │   (AWS S3)      │  │   (Socket.io)   │  │   Service       │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘
│                                │
│                    ┌─────────────────┐
│                    │   Database      │
│                    │   (MongoDB)     │
│                    └─────────────────┘
│                                │
│         ┌──────────────────────┼──────────────────────┐
│         │                      │                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  │   Redis Cache   │  │   Elasticsearch │  │   File Storage  │
│  │   (Sessions)    │  │   (Search)      │  │   (AWS S3)      │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘
└─────────────────────────────────────────────────────────────────┘
```

## 🏗️ Service Architecture

### **1. API Gateway Service**
**Purpose**: Central entry point for all client requests
**Technology**: Express.js with rate limiting and authentication middleware

**Responsibilities**:
- Request routing and load balancing
- Authentication and authorization
- Rate limiting and security
- Request/response transformation
- API versioning

**Key Components**:
```javascript
// API Gateway Structure
src/
├── middleware/
│   ├── auth.js          // JWT validation
│   ├── rateLimit.js     // Rate limiting
│   ├── cors.js          // CORS configuration
│   └── validation.js    // Request validation
├── routes/
│   ├── auth.js          // Authentication routes
│   ├── goals.js         // Goal management routes
│   ├── chat.js          // AI chat routes
│   ├── community.js     // Community features routes
│   └── analytics.js     // Analytics routes
└── services/
    ├── userService.js   // User service client
    ├── goalService.js   // Goal service client
    └── aiService.js     // AI service client
```

### **2. Authentication Service**
**Purpose**: Handle user authentication and authorization
**Technology**: JWT tokens with OAuth integration

**Responsibilities**:
- User registration and login
- OAuth integration (Google, Apple)
- JWT token management
- Password reset and email verification
- Session management

**Key Features**:
- Multi-factor authentication support
- Social login integration
- Secure password hashing
- Token refresh mechanism

### **3. User Service**
**Purpose**: Manage user profiles and preferences
**Technology**: Node.js with MongoDB

**Responsibilities**:
- User profile management
- Life area scoring
- User preferences
- Avatar and media management
- User analytics

**Data Model**:
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  avatar: String,
  preferences: {
    notifications: Boolean,
    theme: String,
    language: String,
    privacy: Object
  },
  lifeAreas: {
    health: Number,      // 0-100 score
    finance: Number,
    family: Number,
    career: Number,
    learning: Number,
    creativity: Number
  },
  stats: {
    goalsCompleted: Number,
    streakDays: Number,
    totalProgress: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### **4. Goal Service**
**Purpose**: Manage goals, tasks, and progress tracking
**Technology**: Node.js with MongoDB

**Responsibilities**:
- Goal CRUD operations
- Sub-task management
- Progress tracking
- Reminder scheduling
- Goal analytics

**Key Features**:
- Hierarchical goal structure
- Progress calculation algorithms
- Smart reminder system
- Goal templates and suggestions

### **5. AI Service**
**Purpose**: Handle AI-powered conversations and guidance
**Technology**: Node.js with OpenAI API integration

**Responsibilities**:
- Natural language processing
- Goal setting assistance
- Motivational responses
- Action trigger detection
- Voice-to-text conversion

**Key Features**:
- Context-aware conversations
- Goal creation from chat
- Progress updates via AI
- Personalized recommendations

### **6. Community Service**
**Purpose**: Manage social features and content sharing
**Technology**: Node.js with MongoDB and Redis

**Responsibilities**:
- Post creation and management
- Like, comment, and save functionality
- Content moderation
- User connections
- Feed generation

**Key Features**:
- Content filtering by categories
- AI-generated motivational content
- Community guidelines enforcement
- Engagement analytics

### **7. Chat Service**
**Purpose**: Real-time messaging and audio processing
**Technology**: Socket.io with WebRTC

**Responsibilities**:
- Real-time chat functionality
- Audio recording and playback
- Message history
- File sharing
- Typing indicators

**Key Features**:
- WebRTC audio streaming
- Message encryption
- Offline message queuing
- Read receipts

### **8. Analytics Service**
**Purpose**: Generate insights and progress reports
**Technology**: Node.js with MongoDB aggregation

**Responsibilities**:
- Progress analytics
- Life balance calculations
- Achievement tracking
- Performance metrics
- Data visualization

**Key Features**:
- Real-time progress updates
- Predictive analytics
- Custom report generation
- Data export functionality

## 🏗️ Database Architecture

### **Primary Database: MongoDB**
**Purpose**: Store all application data
**Configuration**: Replica set for high availability

**Collections**:
1. **users** - User profiles and preferences
2. **goals** - Goals and sub-tasks
3. **journal_entries** - Personal journal posts
4. **community_posts** - Social media posts
5. **chat_messages** - AI conversation history
6. **notifications** - Push notifications
7. **analytics** - User analytics data

### **Cache Layer: Redis**
**Purpose**: Improve performance and session management
**Use Cases**:
- User sessions
- API response caching
- Real-time data
- Rate limiting counters

### **Search Engine: Elasticsearch**
**Purpose**: Full-text search and content discovery
**Indexes**:
- Community posts
- Journal entries
- User profiles
- Goal content

### **File Storage: AWS S3**
**Purpose**: Store media files and documents
**Buckets**:
- User avatars
- Post media
- Audio recordings
- Document uploads

## 🏗️ Security Architecture

### **Authentication & Authorization**
- JWT tokens with short expiration
- Refresh token rotation
- Role-based access control (RBAC)
- API key management for services

### **Data Protection**
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- PII data masking
- GDPR compliance measures

### **API Security**
- Rate limiting per user/IP
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### **Infrastructure Security**
- VPC isolation
- Security groups and firewalls
- Regular security audits
- Vulnerability scanning

## 🏗️ Scalability Design

### **Horizontal Scaling**
- Stateless service design
- Load balancer configuration
- Auto-scaling groups
- Database sharding strategy

### **Performance Optimization**
- CDN for static assets
- Database indexing strategy
- Query optimization
- Caching layers

### **Monitoring & Observability**
- Application performance monitoring (APM)
- Distributed tracing
- Log aggregation
- Health checks and alerting

## 🏗️ Deployment Architecture

### **Development Environment**
- Docker containers
- Local development setup
- Hot reloading
- Debugging tools

### **Staging Environment**
- Production-like setup
- Automated testing
- Performance testing
- Security scanning

### **Production Environment**
- AWS ECS/EKS
- Auto-scaling
- Blue-green deployments
- Disaster recovery

## 🏗️ Integration Points

### **External APIs**
- OpenAI GPT API
- OpenAI Whisper API
- OpenAI TTS API
- Firebase Cloud Messaging
- AWS S3 SDK

### **Third-Party Services**
- Google OAuth
- Apple Sign-In
- Mixpanel Analytics
- Sentry Error Tracking
- Stripe Payments (Future)

## 🏗️ Data Flow Architecture

### **User Registration Flow**
```
1. User submits registration → API Gateway
2. API Gateway → Auth Service
3. Auth Service validates → User Service
4. User Service creates profile → Database
5. Auth Service generates JWT → User
6. User receives confirmation → Email Service
```

### **Goal Creation Flow**
```
1. User creates goal → API Gateway
2. API Gateway → Goal Service
3. Goal Service validates → User Service
4. Goal Service creates goal → Database
5. Goal Service triggers → Analytics Service
6. Analytics Service updates → User profile
```

### **AI Chat Flow**
```
1. User sends message → Chat Service
2. Chat Service processes → AI Service
3. AI Service calls → OpenAI API
4. AI Service generates response → Chat Service
5. Chat Service stores → Database
6. Chat Service sends → User
```

## 🏗️ Error Handling Strategy

### **Service-Level Errors**
- Graceful degradation
- Circuit breaker pattern
- Retry mechanisms
- Fallback responses

### **User Experience**
- User-friendly error messages
- Offline mode support
- Data synchronization
- Progress preservation

### **Monitoring & Alerting**
- Error tracking and reporting
- Performance monitoring
- User impact assessment
- Automated recovery procedures 