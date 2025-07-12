# Database Schema

## 🗄️ Database Overview

LifeBuddy uses MongoDB as the primary database with Redis for caching and Elasticsearch for search functionality. The schema is designed for flexibility, scalability, and optimal query performance.

## 🗄️ MongoDB Collections

### **1. Users Collection**

**Purpose**: Store user profiles, preferences, and authentication data

```javascript
{
  _id: ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  avatar: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  preferences: {
    notifications: {
      push: { type: Boolean, default: true },
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr', 'de', 'zh', 'ja']
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'friends'
      },
      goalVisibility: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'private'
      },
      journalVisibility: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'private'
      }
    }
  },
  lifeAreas: {
    health: { type: Number, min: 0, max: 100, default: 50 },
    finance: { type: Number, min: 0, max: 100, default: 50 },
    family: { type: Number, min: 0, max: 100, default: 50 },
    career: { type: Number, min: 0, max: 100, default: 50 },
    learning: { type: Number, min: 0, max: 100, default: 50 },
    creativity: { type: Number, min: 0, max: 100, default: 50 }
  },
  stats: {
    goalsCompleted: { type: Number, default: 0 },
    goalsCreated: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    totalProgress: { type: Number, default: 0 },
    journalEntries: { type: Number, default: 0 },
    communityPosts: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
  },
  achievements: [{
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
    earnedAt: { type: Date, default: Date.now },
    metadata: { type: Object }
  }],
  socialConnections: [{
    userId: { type: ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'blocked'],
      default: 'pending'
    },
    connectedAt: { type: Date, default: Date.now }
  }],
  isActive: { type: Boolean, default: true },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

**Indexes**:
```javascript
// Primary indexes
{ email: 1 } // Unique index
{ _id: 1 } // Default index

// Performance indexes
{ "stats.lastActive": -1 } // For active user queries
{ "preferences.privacy.profileVisibility": 1 } // For public profiles
{ createdAt: -1 } // For user registration analytics
```

### **2. Goals Collection**

**Purpose**: Store user goals, sub-tasks, and progress tracking

```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['health', 'finance', 'family', 'career', 'learning', 'creativity', 'other']
  },
  status: {
    type: String,
    required: true,
    enum: ['planned', 'in_progress', 'completed', 'paused', 'cancelled', 'mentor_needed'],
    default: 'planned'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  dueDate: {
    type: Date,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  completedDate: {
    type: Date,
    default: null
  },
  parentGoalId: {
    type: ObjectId,
    ref: 'Goal',
    default: null // For sub-tasks
  },
  subTasks: [{
    _id: ObjectId,
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
    dueDate: Date,
    completedDate: Date,
    order: { type: Number, default: 0 }
  }],
  milestones: [{
    _id: ObjectId,
    title: { type: String, required: true },
    description: String,
    targetDate: Date,
    completed: { type: Boolean, default: false },
    completedDate: Date
  }],
  reminders: [{
    _id: ObjectId,
    type: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'custom'],
      required: true
    },
    message: String,
    time: String, // HH:MM format
    days: [Number], // 0-6 for days of week
    date: Date, // For custom reminders
    isActive: { type: Boolean, default: true },
    lastSent: Date,
    nextSend: Date
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  attachments: [{
    _id: ObjectId,
    type: { type: String, enum: ['image', 'document', 'link'] },
    url: String,
    title: String,
    description: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  progressHistory: [{
    date: { type: Date, required: true },
    progress: { type: Number, required: true },
    notes: String,
    updatedBy: { type: String, enum: ['user', 'ai', 'system'] }
  }],
  aiInsights: [{
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['suggestion', 'motivation', 'warning'] },
    message: String,
    actionTaken: Boolean
  }],
  visibility: {
    type: String,
    enum: ['public', 'friends', 'private'],
    default: 'private'
  },
  isTemplate: { type: Boolean, default: false },
  templateCategory: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

**Indexes**:
```javascript
// Primary indexes
{ userId: 1 } // For user's goals
{ _id: 1 } // Default index

// Performance indexes
{ userId: 1, status: 1 } // For filtering goals by status
{ userId: 1, category: 1 } // For filtering by category
{ userId: 1, dueDate: 1 } // For upcoming goals
{ parentGoalId: 1 } // For sub-tasks
{ "reminders.nextSend": 1 } // For reminder processing
{ createdAt: -1 } // For recent goals
{ "progressHistory.date": -1 } // For progress tracking
```

### **3. Journal Entries Collection**

**Purpose**: Store personal journal entries and reflections

```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000
  },
  mood: {
    type: String,
    enum: ['excited', 'happy', 'content', 'neutral', 'sad', 'anxious', 'angry', 'stressed'],
    default: 'neutral'
  },
  moodScore: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  media: [{
    _id: ObjectId,
    type: { type: String, enum: ['image', 'video', 'audio', 'document'] },
    url: String,
    thumbnail: String,
    title: String,
    description: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  relatedGoals: [{
    goalId: { type: ObjectId, ref: 'Goal' },
    impact: { type: String, enum: ['positive', 'negative', 'neutral'] },
    notes: String
  }],
  aiInsights: [{
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['reflection', 'suggestion', 'pattern'] },
    message: String,
    confidence: { type: Number, min: 0, max: 1 }
  }],
  weather: {
    condition: String,
    temperature: Number,
    location: String
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  },
  visibility: {
    type: String,
    enum: ['public', 'friends', 'private'],
    default: 'private'
  },
  isTemplate: { type: Boolean, default: false },
  templateCategory: String,
  wordCount: { type: Number, default: 0 },
  readingTime: { type: Number, default: 0 }, // in minutes
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

**Indexes**:
```javascript
// Primary indexes
{ userId: 1 } // For user's journal entries
{ _id: 1 } // Default index

// Performance indexes
{ userId: 1, createdAt: -1 } // For chronological order
{ userId: 1, tags: 1 } // For tag filtering
{ userId: 1, mood: 1 } // For mood tracking
{ "location.coordinates": "2dsphere" } // For location-based queries
{ createdAt: -1 } // For recent entries
```

### **4. Community Posts Collection**

**Purpose**: Store social media-style posts and community content

```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  category: {
    type: String,
    required: true,
    enum: ['health', 'finance', 'family', 'career', 'learning', 'creativity', 'motivation', 'achievement', 'tip', 'question']
  },
  media: [{
    _id: ObjectId,
    type: { type: String, enum: ['image', 'video', 'audio', 'document'] },
    url: String,
    thumbnail: String,
    title: String,
    description: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  likes: [{
    userId: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  comments: [{
    _id: ObjectId,
    userId: { type: ObjectId, ref: 'User' },
    content: { type: String, required: true, maxlength: 500 },
    likes: [{
      userId: { type: ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }],
    replies: [{
      _id: ObjectId,
      userId: { type: ObjectId, ref: 'User' },
      content: { type: String, required: true, maxlength: 500 },
      createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
  }],
  saves: [{
    userId: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  shares: [{
    userId: { type: ObjectId, ref: 'User' },
    platform: { type: String, enum: ['internal', 'facebook', 'twitter', 'linkedin'] },
    createdAt: { type: Date, default: Date.now }
  }],
  isAIGenerated: { type: Boolean, default: false },
  aiPrompt: String, // For AI-generated content
  visibility: {
    type: String,
    enum: ['public', 'friends', 'private'],
    default: 'public'
  },
  moderation: {
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'flagged'],
      default: 'approved'
    },
    reviewedBy: { type: ObjectId, ref: 'User' },
    reviewedAt: Date,
    reason: String
  },
  engagement: {
    viewCount: { type: Number, default: 0 },
    uniqueViews: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 } // in seconds
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

**Indexes**:
```javascript
// Primary indexes
{ userId: 1 } // For user's posts
{ _id: 1 } // Default index

// Performance indexes
{ category: 1, createdAt: -1 } // For category feeds
{ "likes.userId": 1 } // For user's liked posts
{ "saves.userId": 1 } // For user's saved posts
{ createdAt: -1 } // For recent posts
{ "moderation.status": 1 } // For moderation queries
{ tags: 1 } // For tag-based search
```

### **5. Chat Messages Collection**

**Purpose**: Store AI conversation history and user interactions

```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'audio', 'action', 'system'],
    default: 'text'
  },
  sender: {
    type: String,
    enum: ['user', 'ai', 'system'],
    required: true
  },
  audioUrl: String,
  audioDuration: Number, // in seconds
  transcript: String,
  actionData: {
    type: { type: String, enum: ['add_goal', 'update_goal', 'set_reminder', 'create_journal', 'celebrate_win'] },
    data: Object,
    executed: { type: Boolean, default: false },
    executedAt: Date
  },
  aiContext: {
    model: String,
    tokens: Number,
    responseTime: Number, // in milliseconds
    confidence: Number // 0-1
  },
  metadata: {
    userAgent: String,
    platform: String,
    location: String,
    timezone: String
  },
  isRead: { type: Boolean, default: false },
  readAt: Date,
  createdAt: { type: Date, default: Date.now }
}
```

**Indexes**:
```javascript
// Primary indexes
{ userId: 1 } // For user's messages
{ sessionId: 1 } // For conversation sessions
{ _id: 1 } // Default index

// Performance indexes
{ userId: 1, createdAt: -1 } // For chronological order
{ sessionId: 1, createdAt: 1 } // For session messages
{ "actionData.type": 1 } // For action tracking
{ sender: 1 } // For AI vs user messages
```

### **6. Notifications Collection**

**Purpose**: Store push notifications and in-app alerts

```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['goal_reminder', 'goal_completed', 'milestone_reached', 'streak_broken', 'community_interaction', 'ai_insight', 'achievement_unlocked', 'system'],
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    maxlength: 500
  },
  data: {
    goalId: { type: ObjectId, ref: 'Goal' },
    postId: { type: ObjectId, ref: 'CommunityPost' },
    journalId: { type: ObjectId, ref: 'JournalEntry' },
    achievementId: String,
    actionUrl: String
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  channels: [{
    type: String,
    enum: ['push', 'email', 'sms', 'in_app'],
    default: ['in_app']
  }],
  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'read', 'failed'],
    default: 'pending'
  },
  scheduledFor: {
    type: Date,
    default: Date.now
  },
  sentAt: Date,
  readAt: Date,
  expiresAt: Date,
  retryCount: { type: Number, default: 0 },
  maxRetries: { type: Number, default: 3 },
  createdAt: { type: Date, default: Date.now }
}
```

**Indexes**:
```javascript
// Primary indexes
{ userId: 1 } // For user's notifications
{ _id: 1 } // Default index

// Performance indexes
{ userId: 1, status: 1 } // For unread notifications
{ scheduledFor: 1 } // For notification scheduling
{ type: 1 } // For notification analytics
{ createdAt: -1 } // For recent notifications
```

### **7. Analytics Collection**

**Purpose**: Store user analytics and performance metrics

```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  metrics: {
    goals: {
      created: { type: Number, default: 0 },
      completed: { type: Number, default: 0 },
      inProgress: { type: Number, default: 0 },
      averageProgress: { type: Number, default: 0 }
    },
    journal: {
      entries: { type: Number, default: 0 },
      words: { type: Number, default: 0 },
      averageMood: { type: Number, default: 5 }
    },
    community: {
      posts: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      saves: { type: Number, default: 0 }
    },
    ai: {
      conversations: { type: Number, default: 0 },
      actions: { type: Number, default: 0 },
      averageResponseTime: { type: Number, default: 0 }
    },
    engagement: {
      sessions: { type: Number, default: 0 },
      sessionDuration: { type: Number, default: 0 }, // in seconds
      features: {
        conversations: { type: Number, default: 0 },
        goals: { type: Number, default: 0 },
        community: { type: Number, default: 0 },
        journal: { type: Number, default: 0 }
      }
    }
  },
  lifeAreas: {
    health: { type: Number, min: 0, max: 100 },
    finance: { type: Number, min: 0, max: 100 },
    family: { type: Number, min: 0, max: 100 },
    career: { type: Number, min: 0, max: 100 },
    learning: { type: Number, min: 0, max: 100 },
    creativity: { type: Number, min: 0, max: 100 }
  },
  streaks: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastActivity: Date
  },
  achievements: [{
    type: String,
    title: String,
    earnedAt: { type: Date, default: Date.now }
  }],
  insights: [{
    type: { type: String, enum: ['pattern', 'trend', 'suggestion'] },
    message: String,
    confidence: { type: Number, min: 0, max: 1 },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
}
```

**Indexes**:
```javascript
// Primary indexes
{ userId: 1 } // For user's analytics
{ date: 1 } // For date-based queries
{ _id: 1 } // Default index

// Performance indexes
{ userId: 1, date: -1 } // For user's analytics history
{ date: 1 } // For global analytics
```

## 🗄️ Redis Data Structures

### **User Sessions**
```
Key: session:{userId}
Value: {
  token: "jwt_token",
  lastActivity: timestamp,
  deviceInfo: {...},
  permissions: [...]
}
TTL: 24 hours
```

### **API Rate Limiting**
```
Key: rate_limit:{userId}:{endpoint}
Value: request_count
TTL: 1 hour
```

### **Real-time Data**
```
Key: user:{userId}:online
Value: timestamp
TTL: 5 minutes
```

### **Cached Queries**
```
Key: cache:{query_hash}
Value: serialized_response
TTL: 15 minutes
```

## 🗄️ Elasticsearch Indexes

### **Search Index: lifebuddy_content**
```javascript
{
  mappings: {
    properties: {
      type: { type: "keyword" }, // goal, journal, post
      userId: { type: "keyword" },
      title: { type: "text", analyzer: "standard" },
      content: { type: "text", analyzer: "standard" },
      tags: { type: "keyword" },
      category: { type: "keyword" },
      createdAt: { type: "date" },
      updatedAt: { type: "date" },
      visibility: { type: "keyword" },
      searchable: { type: "boolean" }
    }
  }
}
```

## 🗄️ Data Relationships

### **One-to-Many Relationships**
- User → Goals (one user can have many goals)
- User → Journal Entries (one user can have many journal entries)
- User → Community Posts (one user can have many posts)
- User → Chat Messages (one user can have many messages)
- Goal → Sub-tasks (one goal can have many sub-tasks)

### **Many-to-Many Relationships**
- Users ↔ Users (social connections)
- Users ↔ Posts (likes, saves, shares)
- Users ↔ Goals (collaborative goals - future feature)

### **Referential Integrity**
- All foreign key references use ObjectId
- Cascade deletion for dependent documents
- Soft deletion for important data

## 🗄️ Data Validation

### **MongoDB Schema Validation**
```javascript
// Example validation for Goals collection
{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "title", "category", "dueDate"],
      properties: {
        title: {
          bsonType: "string",
          minLength: 1,
          maxLength: 200
        },
        progress: {
          bsonType: "int",
          minimum: 0,
          maximum: 100
        },
        category: {
          enum: ["health", "finance", "family", "career", "learning", "creativity", "other"]
        }
      }
    }
  }
}
```

## 🗄️ Backup and Recovery

### **Backup Strategy**
- **Daily**: Full database backup
- **Hourly**: Incremental backup
- **Real-time**: WAL (Write-Ahead Log) replication

### **Recovery Procedures**
- Point-in-time recovery capability
- Cross-region backup replication
- Automated backup testing

## 🗄️ Performance Optimization

### **Indexing Strategy**
- Compound indexes for common query patterns
- Partial indexes for filtered queries
- Text indexes for search functionality
- Geospatial indexes for location-based features

### **Query Optimization**
- Aggregation pipeline optimization
- Projection to limit returned fields
- Pagination for large result sets
- Caching for frequently accessed data

### **Data Archiving**
- Archive old chat messages after 1 year
- Archive old analytics data after 2 years
- Compress archived data for storage efficiency 