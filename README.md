# 🚀 Mini Social Post Application

A full-stack **Mini Social Media Application** where users can sign up, log in, create posts, and interact with content in a clean, modern UI.

🔗 **Live Demo**

* **Frontend:** [https://mini-social-post-application.vercel.app](https://mini-social-post-application.vercel.app)
* **Backend API:** [https://mini-social-post-application-x0vv.onrender.com](https://mini-social-post-application-x0vv.onrender.com)

---

## 📸 Screenshots

```md
![Signup Page](./screenshots/signup.png)
![Login Page](./screenshots/login.png)
![Create Post](./screenshots/create-post.png)
![Post Feed](./screenshots/feed.png)
```

📁 Suggested folder structure:

```
screenshots/
 ├── signup.png
 ├── login.png
 ├── create-post.png
 └── feed.png
```

---

## ✨ Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Secure password hashing

### 📝 Posts

* Create posts
* Fetch all posts
* User-specific post handling

### 🌐 Full Stack

* Modern React frontend
* RESTful API with Express
* MongoDB database integration

### 🚀 Deployment

* Frontend deployed on **Vercel**
* Backend deployed on **Render**
* CORS properly configured for production

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Fetch API
* CSS 

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* dotenv
* CORS

### Deployment

* **Vercel** (Frontend)
* **Render** (Backend)

---

## 🌍 Architecture Overview

```
Frontend (Vercel)
        |
        | HTTPS Requests
        ↓
Backend API (Render)
        |
        ↓
MongoDB Database
```

---

## 🔗 API Endpoints

### Auth Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/api/auth/signup` | Register new user |
| POST   | `/api/auth/login`  | Login user        |

### Post Routes

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| POST   | `/api/posts` | Create new post |
| GET    | `/api/posts` | Get all posts   |
| PUT    | `/api/posts/:id/like` |  like on Post  |  
| POST   | `/api/posts/:id/comment` |  Comment on Post  |  
---

## ⚙️ Environment Variables

### Backend (`.env`)

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

---

## 🏃‍♂️ Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/mini-social-post-application.git
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## 🚧 Future Improvements

* Like & comment system
* User profiles
* Image uploads
* Pagination
* Dark mode
* Refresh token authentication

---

## 👨‍💻 Author

**Sufal Thakre**

* GitHub: [https://github.com/Sufalthakre18](https://github.com/Sufalthakre18)
* LinkedIn: [https://www.linkedin.com/in/sufal-thakre/](https://www.linkedin.com/in/sufal-thakre/)

---

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🧠 Give feedback
