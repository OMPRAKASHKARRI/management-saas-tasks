# 🚀 Task Manager SaaS Application

A full-stack Task Management SaaS application that allows users to securely manage their tasks with authentication, multi-user support, and a modern UI.

---

## 🔗 Live Demo

- 🌐 Frontend: https://managetastks.netlify.app/
- ⚙️ Backend: https://management-saas-tasks.onrender.com

---

## 📌 Features

- 🔐 User Authentication (JWT + bcrypt)
- 👤 Multi-user support (each user sees only their tasks)
- ➕ Create tasks
- ✏️ Update tasks (mark as completed)
- 🗑️ Delete tasks
- ⏰ Due date tracking
- 🔥 Priority levels (Low, Medium, High)
- 📊 Dashboard stats (Total, Completed, Pending)
- 📈 Progress bar
- 🌙 Dark mode toggle
- 📱 Responsive UI

---

## 🛠️ Tech Stack

Frontend:
- React.js
- Tailwind CSS
- React Router

Backend:
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

Authentication:
- JWT (JSON Web Token)
- bcrypt (password hashing)

Deployment:
- Frontend → Netlify
- Backend → Render
- Database → PostgreSQL (Render)

---

## 📂 Project Structure

task-manager-saas/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx

---

## ⚙️ Installation & Setup

1️⃣ Clone the repository

bash
git clone https://github.com/YOUR_USERNAME/management-saas-tasks.git
cd management-saas-tasks

## 2️⃣ Backend Setup
cd backend
npm install
reate a .env file:

PORT=5001
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key

Run backend:

npm start

##3️⃣ Frontend Setup

cd frontend
npm install
npm run dev
🔐 API Endpoints

## Auth:

POST /api/auth/signup
POST /api/auth/login

##  Tasks:

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

## Future Improvements
Real-time updates (WebSockets)
Team collaboration features
Notifications & reminders
File attachments
## Author
Your Name : Omprakashkarri
