<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
</p>

# Dribble Backend API

**Book. Play. Score.**

A robust, production-ready RESTful API for managing futsal court bookings, users, and schedules. Built with [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/), and [PostgreSQL](https://www.postgresql.org/).

---

## 🚀 Features
- User authentication (JWT, role-based access)
- Court management (CRUD)
- Booking management (CRUD, schedule conflict prevention)
- Dashboard analytics endpoints
- Fully documented API with Swagger (OpenAPI)
- DTO validation and error handling

---

## 🛠️ Tech Stack
| Category      | Technology         |
|---------------|-------------------|
| Framework     | [NestJS](https://nestjs.com/) |
| ORM           | [Prisma](https://www.prisma.io/) |
| Database      | PostgreSQL        |
| Auth          | JWT, Passport     |
| Docs          | Swagger (OpenAPI) |
| Language      | TypeScript        |
| Testing       | Jest, Supertest   |

---

## 📦 Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/) instance
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## ⚡ Getting Started

Clone the repository and install dependencies:
```bash
# Clone
$ git clone https://github.com/Revou-FSSE-Feb25/final-project-be-MuhammadIrfanDzaky.git
$ cd final-project-be-MuhammadIrfanDzaky

# Install dependencies
$ npm install
```

Set up your environment variables:
```bash
# Copy and edit .env file
$ cp .env.example .env
# Edit .env with your DB credentials
```

Generate Prisma client and run migrations:
```bash
$ npx prisma generate
$ npx prisma migrate dev --name init
```

Seed the database (optional):
```bash
$ npx ts-node prisma/seed.ts
```

---

## 🏃 Running the Server

```bash
# Development
$ npm run start:dev

# Production
$ npm run start:prod
```

API will be available at: `http://localhost:3001`

---

## 🧪 Testing

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

---

## 📖 API Documentation

- **Swagger UI:** [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
- All endpoints, request/response DTOs, and error models are documented.
- Example endpoints:
  - `POST /auth/login` — User login
  - `POST /auth/register` — User registration
  - `GET /courts` — List all courts
  - `POST /bookings` — Create a booking
  - `GET /dashboard/summary` — Dashboard analytics

---

## 🏗️ Project Structure

```
final-project-be-MuhammadIrfanDzaky/
├── src/
│   ├── auth/         # Auth module (JWT, login, register)
│   ├── users/        # User management
│   ├── courts/       # Court management
│   ├── bookings/     # Booking management
│   ├── dashboard/    # Analytics endpoints
│   └── global/       # Guards, middlewares
├── prisma/           # Prisma schema, migrations, seed
├── test/             # E2E tests
└── ...
```

---

## 🚀 Deployment

- Configure your production `.env` with the correct database and JWT secrets.
- Build the project:
  ```bash
  npm run build
  ```
- Start with Node.js:
  ```bash
  node dist/main.js
  ```
- Or use a process manager (e.g., PM2, Docker, etc.)

---

## 🖼️ Diagrams

> _Add architecture or ER diagrams here if available._

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/feature-name`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📫 Contact & Support
- Project by Muhammad Irfan Dzaky
- For issues, use the GitHub Issues tab
- For questions, contact: [your-email@example.com]

---

## 📝 License

This project is licensed under the MIT License.
