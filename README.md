# Software Factory API

Node.js 18+ Express API using PostgreSQL and Prisma.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`, `JWT_SECRET`, and `PORT`.
3. Apply the database migrations with `npm run db:migrate`.
4. Start the API with `npm start`.

The health endpoint is `GET /health`. User authentication is available at
`POST /api/users/register` and `POST /api/users/login`. All `/api/tasks` routes
require `Authorization: Bearer <token>`.

Successful responses use `{ "success": true, "data": ... }`; errors use
`{ "success": false, "error": { "message": "..." } }`.

## Task endpoints

- `GET /api/tasks` lists the authenticated user's tasks.
- `POST /api/tasks` creates a task. `title`, `description`, and `due_date` are
  required; `status` defaults to `pending`.
- `GET /api/tasks/:id` reads an owned task.
- `PUT /api/tasks/:id` replaces an owned task.
- `PATCH /api/tasks/:id` updates supplied task fields.
- `DELETE /api/tasks/:id` deletes an owned task.

## Tests

Tests use the configured PostgreSQL database and create disposable records. Set
the required environment variables and apply migrations before running
`npm test`. Do not point tests at a database containing data that must be kept.

## Render deployment

Create a Render PostgreSQL database and configure `DATABASE_URL`, `JWT_SECRET`,
and `PORT` in the web service environment. Use `npm install && npm run prisma:generate`
as the build command and `npm run db:migrate && npm start` as the start command.
