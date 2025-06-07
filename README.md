# DataPusher Backend

A scalable Node.js backend system that receives JSON events via webhooks and asynchronously forwards them to user-configured destinations. This system includes user authentication, account and member management, role-based access control (RBAC), logging, rate-limiting, and asynchronous processing using Bull and Redis.

---

## 🚀 Features

- 🔐 JWT-based Authentication & Role-based Access (Admin / Normal User)
- 🧾 Webhook Event Receiver & Async Forwarding
- 📦 Accounts, Destinations, Members, and Role Management
- 📊 Logging and Event Tracking
- 🔁 Rate Limiting & Caching (Redis)
- 🔍 Advanced Search & Filter APIs
- 🧪 Ready for Testing and API Documentation (Postman)

---

## 📚 Technologies Used

- **Node.js** (Latest LTS)
- **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for Auth
- **Bull.js** with **Redis** for async queue processing
- **Express-Validator** for input validation
- **Postman** for API documentation
- **TypeScript** (if applicable)
- **Mocha / Chai / Supertest** for testing

---

## 🔐 Authentication & Roles

- New users are registered as `admin` by default.
- **Admin** can:
  - Full CRUD on accounts, destinations, account members
  - View logs
  - Invite users and assign roles
- **Normal User** can:
  - Read/update destinations & accounts
  - View logs and members

---

## 📦 Modules & Endpoints

### 1. Authentication
- `POST /auth/register` – Register user
- `POST /auth/login` – Login and get JWT
- `POST /auth/logout` – Logout

### 2. Account Management
- CRUD endpoints: `/accounts`
- Search: `/accounts/search?q=...`

### 3. Destination Management
- CRUD endpoints: `/destination/:accountId/destinations`
- Search: `/destination/:accountId/destinations/search?q=...`

### 4. Webhook Data Handler
- `POST /server/incoming_data`
  - Headers:
    - `CL-X-TOKEN`: Secret Token
    - `CL-X-EVENT-ID`: Unique Event ID
- Queues and logs events asynchronously

### 5. Account Members
- `POST /:accountId/members` – Add member (admin only)
- `GET /:accountId/members` – Get members
- `PUT /:accountId/members/:userId/role` – Update member role
- `DELETE /:accountId/members/:userId` – Remove member
- `GET /user/accounts` – View user's accounts

### 6. Logs
- `GET /logs/:accountId` – Get all logs for an account
- `GET /logs/id/:id` – Get log by log ID
- `GET /logs/event/:eventId` – Get log by event ID
- `GET /logs/:accountId/status?status=...` – Filter by status
- `GET /logs/:accountId/daterange?startDate=...&endDate=...` – Filter by date range
- `GET /logs/:accountId/stats` – Log stats
- `GET /logs/:accountId/search?q=...` – Search logs

### 7. Health Check
- `GET /health` – Check server status

---

## 🛠️ Getting Started

### 🔧 Prerequisites

- Node.js (v16 or later)
- MongoDB
- Redis
- Git

### 📦 Installation

```bash
git clone https://github.com/harishk2010/DataPusher-Backend.git
cd DataPusher-Backend
npm install
### ⚙️ Environment Setup

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/DataPusher
JWT_SECRET=your_jwt_secret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
