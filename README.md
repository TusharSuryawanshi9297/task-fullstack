# 🛒 Smart Store Rating App

A full-stack web application that allows users to rate stores, while providing different dashboards for Admins, Store Owners, and Users.

---

## 🧱 Tech Stack

### 🖥 Frontend
- React 19
- React Router DOM 7
- Bootstrap 5
- Axios
- GSAP
- Vite

### 🛠 Backend
- Node.js + Express
- MySQL
- Sequelize (raw queries)
- JWT Authentication
- Joi validation
- Helmet, XSS-clean, CORS
- Nodemon for dev

---

## 📁 Project Structure

PROJECT (B) - TASK/
└── backend/
├── src/
├── scripts/
└── package.json

PROJECT (F) - TASK/
└── frontend/
├── src/
└── package.json

---

## 🚀 Getting Started

### 1. Clone the repo

git clone https://github.com/TusharSuryawanshi9297/task-fullstack.git
cd task-fullstack

**Backend Setup**

cd PROJECT\ (B)\ -\ TASK/backend

# Install dependencies
npm install

# Create DB tables
npm run db:setup

# Insert sample data
npm run db:seed

# Start development server
npm run dev

Make sure to configure your database credentials in a .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=smart_store
JWT_SECRET=your_jwt_secret

**Frontend Setup**

cd ../../PROJECT\ (F)\ -\ TASK/frontend

# Install dependencies
npm install

# Start frontend
npm run dev

👤 User Roles

Admin: Manage users and stores

Store Owner: View ratings and feedback on their store

User: View and rate nearby stores

🧪 Sample Credentials

You can use the following hardcoded credentials to test:

| Role        | Email                                         | Password   |
| ----------- | --------------------------------------------- | ---------- |
| Admin       | [admin@example.com](mailto:admin@example.com) | Admin\@123 |
| Store Owner | [owner@example.com](mailto:owner@example.com) | Owner\@123 |
| User        | [user@example.com](mailto:user@example.com)   | User\@123  |

🗃 **Database Info**
Tables

users (admin, store_owner, user)

stores (owned by store_owners)

ratings (store ratings by users)

📜 **Scripts**
**scripts/seed.js**

Inserts sample:

Admin & store owners

Stores owned by them

Ratings data

Also includes commented section to bulk-insert multiple users and stores (for testing).

**scripts/sync.js**

Creates tables if they don’t exist:

users

stores

ratings

📌 **Future Improvements**

Add store search/filtering

Advanced rating analytics

Admin control panel

Store location maps

📄 **License**

This project is licensed under the ISC License.

