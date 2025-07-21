# Astra App Backend Architecture

## Technology Stack

### Backend Framework
- **Node.js** with **Express.js** for REST API
- **TypeScript** for type safety
- **Socket.io** for real-time features (chat, notifications)

### Database
- **PostgreSQL** (Primary database for user data, posts, transactions)
- **Redis** (Caching, session management, real-time data)
- **MongoDB** (Media metadata, logs, analytics)

### Authentication & Security
- **JWT** for authentication
- **bcrypt** for password hashing
- **OAuth 2.0** for social login
- **Rate limiting** with express-rate-limit

### File Storage
- **AWS S3** or **Cloudinary** for media files
- **Local storage** for development

### Real-time Features
- **WebSockets** for live chat
- **Server-Sent Events** for notifications
- **WebRTC** for video calls

## Database Schema

### Users Table
- id (UUID, Primary Key)
- username (Unique)
- email (Unique)
- password_hash
- full_name
- avatar_url
- bio
- location
- website
- phone
- is_verified
- verification_level (blue, gold, premium)
- is_business_account
- business_info (JSON)
- privacy_settings (JSON)
- notification_settings (JSON)
- wallet_id (Foreign Key)
- created_at
- updated_at

### Posts Table
- id (UUID, Primary Key)
- user_id (Foreign Key)
- content
- media_urls (JSON Array)
- post_type (text, image, video, reel)
- visibility (public, friends, private)
- location
- tags (JSON Array)
- likes_count
- comments_count
- shares_count
- created_at
- updated_at

### Wallet Table
- id (UUID, Primary Key)
- user_id (Foreign Key)
- balance (Decimal)
- total_earnings (Decimal)
- pending_balance (Decimal)
- linked_accounts (JSON)
- created_at
- updated_at

### Transactions Table
- id (UUID, Primary Key)
- wallet_id (Foreign Key)
- type (income, expense)
- amount (Decimal)
- description
- category
- status (pending, completed, failed)
- created_at

### Groups Table
- id (UUID, Primary Key)
- name
- description
- avatar_url
- cover_image_url
- privacy (public, private, secret)
- category
- members_count
- created_by (Foreign Key)
- created_at
- updated_at

### Messages Table
- id (UUID, Primary Key)
- sender_id (Foreign Key)
- receiver_id (Foreign Key)
- group_id (Foreign Key, nullable)
- content
- message_type (text, image, video, audio)
- media_url
- is_read
- created_at

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh
- POST /api/auth/forgot-password
- POST /api/auth/reset-password

### Users
- GET /api/users/profile
- PUT /api/users/profile
- GET /api/users/:id
- POST /api/users/follow/:id
- DELETE /api/users/unfollow/:id
- GET /api/users/followers
- GET /api/users/following

### Posts
- GET /api/posts (feed)
- POST /api/posts
- GET /api/posts/:id
- PUT /api/posts/:id
- DELETE /api/posts/:id
- POST /api/posts/:id/like
- POST /api/posts/:id/comment

### Wallet
- GET /api/wallet
- POST /api/wallet/transaction
- POST /api/wallet/withdraw
- GET /api/wallet/transactions

### Groups
- GET /api/groups
- POST /api/groups
- GET /api/groups/:id
- PUT /api/groups/:id
- DELETE /api/groups/:id
- POST /api/groups/:id/join
- DELETE /api/groups/:id/leave

### Messages
- GET /api/messages
- POST /api/messages
- GET /api/messages/:conversationId
- PUT /api/messages/:id/read

### Media
- POST /api/media/upload
- DELETE /api/media/:id
