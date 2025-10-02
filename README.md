# 📌 Task Manager API

A simple RESTful API for managing a to-do list, built to practice backend fundamentals such as HTTP methods, data validation, and CRUD operations.
Optional features include JWT authentication and a basic frontend.

---

## 🚀 Features

* Create, read, update and delete tasks (CRUD)
* Input validation with **Zod**
* RESTful architecture
* Optional: JWT authentication and user management
* Optional: Simple frontend with HTML + JS

---

## 📂 Project Structure

```
task-manager-api/
│── src/
│   ├── controllers/     # Route logic (CRUD)
│   ├── middlewares/     # Middlewares (ex: auth)
│   ├── models/          # Data structures
│   ├── routes/          # API routes
│   ├── utils/           # Helpers (schemas, etc)
│   ├── app.js           # Express config
│   └── server.js        # App entry point
│
├── tests/               # Unit and integration tests
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/LeonardoLBraga/task-manager-api.git
cd task-manager-api
```

2. Install dependencies (with pnpm):

```bash
pnpm install
```

3. Run in development mode:

```bash
pnpm dev
```

The server will be running at:
👉 `http://localhost:3000`

---

## 📌 Endpoints

* ### Create Task

**POST** `/tasks`
Body (JSON):

```json
{
  "title": "Buy milk",
  "description": "Remember to get skimmed milk"
}
```

* ### List All Tasks

**GET** `/tasks`

* ### Get Task by ID

**GET** `/tasks/:id`

* ### Update Task

**PUT** `/tasks/:id`
Body (JSON):

```json
{
  "title": "Buy bread",
  "completed": true
}
```

* ### Delete Task

**DELETE** `/tasks/:id`

---

## 🧪 Tests

Run tests with:

```bash
pnpm test
```

---

## 📜 License

This project is licensed under the MIT License.
