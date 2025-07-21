# 🚀 ASTRA Backend Development Plan

## Phase 2: Backend Development

### Tech Stack
- **Backend Framework**: Node.js with Express.js
- **Database**: PostgreSQL (primary) + Redis (caching)
- **Authentication**: JWT tokens + OAuth (Google, GitHub)
- **Real-time**: Socket.io for live features
- **File Storage**: AWS S3 or Cloudinary
- **API**: RESTful + GraphQL for complex queries

### Quick Setup Checklist

#### 1. Backend Server Setup
```bash
mkdir backend
cd backend
npm init -y
npm install express cors helmet morgan compression
npm install jsonwebtoken bcryptjs
npm install socket.io
npm install pg redis
npm install dotenv
npm install -D nodemon @types/node typescript
```

#### 2. Database Schema (PostgreSQL)
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_urls TEXT[],
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Follow relationships
CREATE TABLE follows (
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);
```

#### 3. API Endpoints Structure
```
/api/auth/
  POST /login
  POST /register
  POST /logout
  POST /refresh
  GET /profile

/api/users/
  GET /:id
  PUT /:id
  GET /:id/posts
  POST /:id/follow
  DELETE /:id/unfollow

/api/posts/
  GET /feed
  POST /
  GET /:id
  PUT /:id
  DELETE /:id
  POST /:id/like
  DELETE /:id/unlike

/api/wallet/
  GET /balance
  POST /transaction
  GET /history
```

### Immediate Next Steps
1. **Set up Express server** with basic structure
2. **Database connection** and migrations
3. **Authentication middleware** 
4. **Basic CRUD operations**
5. **Real-time features** with Socket.io
6. **File upload handling**

### Deployment Options
- **Backend**: Railway, Render, or Heroku
- **Database**: Railway PostgreSQL, Supabase, or AWS RDS
- **Redis**: Railway Redis or AWS ElastiCache
- **File Storage**: Cloudinary (free tier) or AWS S3

---

*This is a quick overview. Each step needs detailed implementation.*
