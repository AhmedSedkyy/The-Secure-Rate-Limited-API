# 🛡️ Secure Rate-Limited Task API

A secure, and scalable RESTful API for task management, built with **Node.js**, **Express**, and **Prisma**. T.


## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Validation:** Joi


## 🔗 API Endpoints

### User
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/login` | Login and get Token |
| `GET` | `/api/profile` |  Get user's profile (Protected) |
| `GET` | `/api/log` |  Get all system logs  (ADMIN) |




### Tasks (Protected)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/task` | Get all tasks for user |
| `POST` | `/api/task` | Create a new task |
| `GET` | `/api/task/:id` | Get task by id  |
| `PATCH` | `/api/task/:id` | Update task by id |
| `DELETE` | `/api/task/:id` | Delete task by id |


## 👤 Author

**[Ahmed Sedky]**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmedsedkyy/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AhmedSedkyy)
