# API Design

## 🌐 API Overview

LifeBuddy API follows RESTful principles with JSON responses, JWT authentication, and comprehensive error handling.

### **Base URL**
```
Development: http://localhost:3000/api
Production: https://api.lifebuddy.app/api
```

### **Authentication**
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### **Response Format**
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### **Error Format**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {}
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🔐 Authentication Endpoints

### **POST /api/auth/register**
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": null,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  },
  "message": "User registered successfully"
}
```

### **POST /api/auth/login**
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  },
  "message": "Login successful"
}
```

### **POST /api/auth/refresh**
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

### **POST /api/auth/logout**
Logout user and invalidate tokens.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### **GET /api/auth/profile**
Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "preferences": {
        "theme": "dark",
        "notifications": {
          "push": true,
          "email": true,
          "sms": false
        },
        "language": "en",
        "privacy": {
          "profileVisibility": "friends",
          "goalVisibility": "private",
          "journalVisibility": "private"
        }
      },
      "lifeAreas": {
        "health": 75,
        "finance": 60,
        "family": 85,
        "career": 70,
        "learning": 80,
        "creativity": 65
      },
      "stats": {
        "goalsCompleted": 12,
        "goalsCreated": 25,
        "streakDays": 7,
        "totalProgress": 68
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

---

## 🎯 Goals Endpoints

### **GET /api/goals**
Get user's goals with filtering and pagination.

**Query Parameters:**
- `status` - Filter by status (planned, in_progress, completed, etc.)
- `category` - Filter by category (health, finance, career, etc.)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort by (createdAt, dueDate, progress)

**Response:**
```json
{
  "success": true,
  "data": {
    "goals": [
      {
        "id": "507f1f77bcf86cd799439011",
        "title": "Exercise Regularly",
        "description": "Build a consistent exercise routine",
        "category": "health",
        "status": "in_progress",
        "priority": "high",
        "progress": 80,
        "dueDate": "2024-12-15T00:00:00Z",
        "startDate": "2024-01-01T00:00:00Z",
        "subTasks": [
          {
            "id": "507f1f77bcf86cd799439012",
            "title": "Morning Run",
            "completed": true,
            "dueDate": "2024-01-20T00:00:00Z"
          }
        ],
        "reminders": [
          {
            "id": "507f1f77bcf86cd799439013",
            "type": "daily",
            "time": "06:00",
            "isActive": true
          }
        ],
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

### **POST /api/goals**
Create a new goal.

**Request Body:**
```json
{
  "title": "Save $10,000",
  "description": "Build emergency fund",
  "category": "finance",
  "priority": "high",
  "dueDate": "2024-12-31T00:00:00Z",
  "subTasks": [
    {
      "title": "Set up automatic transfers",
      "description": "Transfer $500 monthly to savings"
    }
  ],
  "reminders": [
    {
      "type": "weekly",
      "time": "09:00",
      "days": [1] // Monday
    }
  ],
  "tags": ["savings", "emergency-fund"]
}
```

### **GET /api/goals/:id**
Get specific goal details.

**Response:**
```json
{
  "success": true,
  "data": {
    "goal": {
      "id": "507f1f77bcf86cd799439011",
      "title": "Exercise Regularly",
      "description": "Build a consistent exercise routine",
      "category": "health",
      "status": "in_progress",
      "priority": "high",
      "progress": 80,
      "dueDate": "2024-12-15T00:00:00Z",
      "startDate": "2024-01-01T00:00:00Z",
      "completedDate": null,
      "subTasks": [...],
      "milestones": [...],
      "reminders": [...],
      "progressHistory": [
        {
          "date": "2024-01-15T00:00:00Z",
          "progress": 80,
          "notes": "Completed 3 workouts this week",
          "updatedBy": "user"
        }
      ],
      "aiInsights": [
        {
          "date": "2024-01-15T10:30:00Z",
          "type": "suggestion",
          "message": "Great progress! Consider adding strength training to your routine."
        }
      ],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### **PUT /api/goals/:id**
Update a goal.

**Request Body:**
```json
{
  "title": "Exercise Regularly - Updated",
  "progress": 85,
  "status": "in_progress"
}
```

### **DELETE /api/goals/:id**
Delete a goal.

**Response:**
```json
{
  "success": true,
  "message": "Goal deleted successfully"
}
```

### **PUT /api/goals/:id/progress**
Update goal progress.

**Request Body:**
```json
{
  "progress": 85,
  "notes": "Completed 4 workouts this week"
}
```

---

## 🤖 AI Chat Endpoints

### **POST /api/chat/message**
Send a message to AI and get response.

**Request Body:**
```json
{
  "message": "I want to get healthier",
  "sessionId": "session_123",
  "context": {
    "currentGoals": ["Exercise Regularly"],
    "recentActivity": "Completed morning run"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": {
      "id": "507f1f77bcf86cd799439011",
      "content": "That's great! Let's set some specific goals. What area would you like to focus on first?",
      "sender": "ai",
      "type": "text",
      "actionData": {
        "type": "suggestion",
        "data": {
          "suggestions": [
            "Exercise 3x per week",
            "Eat more vegetables",
            "Get 8 hours of sleep"
          ]
        }
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### **POST /api/chat/audio**
Send audio message and get AI response.

**Request Body:**
```multipart/form-data
audio: <audio_file>
sessionId: "session_123"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transcript": "I want to get healthier",
    "message": {
      "id": "507f1f77bcf86cd799439011",
      "content": "I heard you want to get healthier! Let's work on that together.",
      "sender": "ai",
      "type": "text",
      "audioUrl": "https://example.com/ai-response.mp3",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### **GET /api/chat/history**
Get chat history for a session.

**Query Parameters:**
- `sessionId` - Session identifier
- `limit` - Number of messages to return (default: 50)

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "507f1f77bcf86cd799439011",
        "content": "I want to get healthier",
        "sender": "user",
        "type": "text",
        "createdAt": "2024-01-15T10:25:00Z"
      },
      {
        "id": "507f1f77bcf86cd799439012",
        "content": "That's great! Let's set some specific goals.",
        "sender": "ai",
        "type": "text",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

## 🌟 Community Endpoints

### **GET /api/community/posts**
Get community posts with filtering.

**Query Parameters:**
- `category` - Filter by category
- `page` - Page number
- `limit` - Items per page
- `sort` - Sort by (createdAt, likes, comments)

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "507f1f77bcf86cd799439011",
        "user": {
          "id": "507f1f77bcf86cd799439012",
          "name": "Sarah M.",
          "avatar": "https://example.com/avatar.jpg"
        },
        "content": "Just completed my first 5K! 🏃‍♀️ Started with just 1 minute runs. Consistency beats perfection! 💪",
        "category": "health",
        "media": [
          {
            "type": "image",
            "url": "https://example.com/5k-finish.jpg",
            "thumbnail": "https://example.com/5k-finish-thumb.jpg"
          }
        ],
        "tags": ["running", "achievement", "motivation"],
        "likes": 24,
        "comments": 8,
        "saves": 12,
        "isLiked": false,
        "isSaved": false,
        "createdAt": "2024-01-15T08:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 150,
      "pages": 15
    }
  }
}
```

### **POST /api/community/posts**
Create a new community post.

**Request Body:**
```json
{
  "content": "Just completed my first 5K! 🏃‍♀️",
  "category": "health",
  "tags": ["running", "achievement"],
  "visibility": "public",
  "media": [
    {
      "type": "image",
      "url": "https://example.com/5k-finish.jpg"
    }
  ]
}
```

### **PUT /api/community/posts/:id/like**
Like or unlike a post.

**Response:**
```json
{
  "success": true,
  "data": {
    "liked": true,
    "likesCount": 25
  }
}
```

### **POST /api/community/posts/:id/comments**
Add a comment to a post.

**Request Body:**
```json
{
  "content": "Amazing achievement! Keep it up! 💪"
}
```

---

## 📝 Journal Endpoints

### **GET /api/journal/entries**
Get user's journal entries.

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `tags` - Filter by tags
- `mood` - Filter by mood

**Response:**
```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "id": "507f1f77bcf86cd799439011",
        "title": "Amazing workout today!",
        "content": "Had an incredible workout session. Feeling energized and ready to tackle my goals.",
        "mood": "excited",
        "moodScore": 9,
        "tags": ["health", "motivation"],
        "media": [
          {
            "type": "image",
            "url": "https://example.com/workout.jpg"
          }
        ],
        "relatedGoals": [
          {
            "goalId": "507f1f77bcf86cd799439012",
            "impact": "positive",
            "notes": "Progress on Exercise Regularly goal"
          }
        ],
        "aiInsights": [
          {
            "type": "reflection",
            "message": "Your consistency is paying off! Consider tracking your energy levels."
          }
        ],
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "pages": 5
    }
  }
}
```

### **POST /api/journal/entries**
Create a new journal entry.

**Request Body:**
```json
{
  "title": "Amazing workout today!",
  "content": "Had an incredible workout session. Feeling energized and ready to tackle my goals.",
  "mood": "excited",
  "moodScore": 9,
  "tags": ["health", "motivation"],
  "relatedGoals": [
    {
      "goalId": "507f1f77bcf86cd799439012",
      "impact": "positive"
    }
  ]
}
```

---

## 📊 Analytics Endpoints

### **GET /api/analytics/dashboard**
Get user's analytics dashboard data.

**Response:**
```json
{
  "success": true,
  "data": {
    "goals": {
      "total": 25,
      "completed": 12,
      "inProgress": 8,
      "planned": 5,
      "completionRate": 48
    },
    "lifeAreas": {
      "health": 75,
      "finance": 60,
      "family": 85,
      "career": 70,
      "learning": 80,
      "creativity": 65
    },
    "streaks": {
      "current": 7,
      "longest": 21,
      "lastActivity": "2024-01-15T10:30:00Z"
    },
    "achievements": [
      {
        "type": "first_goal",
        "title": "First Goal Completed",
        "earnedAt": "2024-01-10T10:30:00Z"
      }
    ],
    "recentActivity": [
      {
        "type": "goal_completed",
        "title": "Exercise Regularly",
        "date": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### **GET /api/analytics/progress**
Get progress trends over time.

**Query Parameters:**
- `period` - Time period (week, month, year)
- `category` - Filter by category

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "trends": [
      {
        "date": "2024-01-01",
        "progress": 65,
        "goalsCompleted": 2
      },
      {
        "date": "2024-01-08",
        "progress": 70,
        "goalsCompleted": 3
      }
    ]
  }
}
```

---

## 🔔 Notification Endpoints

### **GET /api/notifications**
Get user's notifications.

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `unread` - Filter unread only

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "507f1f77bcf86cd799439011",
        "type": "goal_reminder",
        "title": "Goal Reminder",
        "message": "Time to work on your 'Exercise Regularly' goal!",
        "data": {
          "goalId": "507f1f77bcf86cd799439012"
        },
        "priority": "medium",
        "isRead": false,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

### **PUT /api/notifications/:id/read**
Mark notification as read.

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

## 📁 File Upload Endpoints

### **POST /api/upload/image**
Upload an image file.

**Request Body:**
```multipart/form-data
file: <image_file>
type: "avatar" | "post" | "journal"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://example.com/uploads/image.jpg",
    "thumbnail": "https://example.com/uploads/image-thumb.jpg",
    "size": 1024000,
    "type": "image/jpeg"
  }
}
```

### **POST /api/upload/audio**
Upload an audio file.

**Request Body:**
```multipart/form-data
file: <audio_file>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://example.com/uploads/audio.mp3",
    "duration": 15.5,
    "size": 2048000,
    "type": "audio/mpeg"
  }
}
```

---

## 🔍 Search Endpoints

### **GET /api/search**
Search across goals, journal entries, and community posts.

**Query Parameters:**
- `q` - Search query
- `type` - Search type (goals, journal, posts, all)
- `page` - Page number
- `limit` - Items per page

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "type": "goal",
        "id": "507f1f77bcf86cd799439011",
        "title": "Exercise Regularly",
        "content": "Build a consistent exercise routine",
        "category": "health",
        "score": 0.95
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "pages": 2
    }
  }
}
```

---

## 🚨 Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

## 📈 Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP
- **File Upload**: 10 requests per hour per user
- **AI Chat**: 50 requests per hour per user

---

## 🔐 Security

- **HTTPS**: All endpoints require HTTPS in production
- **JWT Tokens**: Access tokens expire in 1 hour
- **Refresh Tokens**: Refresh tokens expire in 7 days
- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Protection against abuse
- **CORS**: Configured for specific origins 