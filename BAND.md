
Goal: Build a complete backend API for a Task Management Platform.

Core Features:

Secure User Authentication: Implement registration and login endpoints using JWT.

Task CRUD Operations: Build endpoints to Create, Read, Update, and Delete tasks.

Database Schema & Health Check: Implement the relational database models for Users and Tasks. Include a /health endpoint.

Input Validation & Error Handling: Strictly validate all incoming API requests.

Execution Directive:

Follow these overarching architecture constraints strictly:

--- START OF BAND RULES ---
1. Technology Stack

Runtime: Node.js (v18+)

Framework: Express.js

Language: JavaScript / CommonJS

Authentication: JSON Web Tokens (JWT) and bcrypt for password hashing

Testing: Jest and Supertest

2. Database Architecture

Database: PostgreSQL

ORM: Prisma

Models required:

User: id (UUID), email (String, unique), password_hash (String), created_at (DateTime).

Task: id (UUID), title (String), description (String), status (String, default: 'pending'), due_date (DateTime), user_id (UUID, relation to User).

3. Deployment Targets

Hosting: Render (Web Service)

Database Hosting: Render PostgreSQL

Environment Variables required: DATABASE_URL, JWT_SECRET, PORT

4. Design & Architecture Rules

Use standard RESTful routing conventions (e.g., POST /api/users/register, GET /api/tasks).

Protect all task routes using a JWT authentication middleware.

All responses must return standard JSON (e.g., { "success": true, "data": ... } or { "success": false, "error": ... }).
--- END OF BAND RULES ---

Clone the empty repository at [https://github.com/akntara/Software-factory.git](https://github.com/akntara/Software-factory.git).

Save the exact text between "START OF BAND RULES" and "END OF BAND RULES" into a file named BAND in the repository root. Commit it and push it to the main branch so the rest of the factory agents can reference it.

Check out a new working branch named feature/initial-build.

Decompose the goal into non-overlapping units, identify the riskiest unknown, and assign strict state ownership.

Do not ask for clarification or output conversational summaries.

Output your strict JSON routing payload to trigger the Backend Implementer to begin work on the feature/initial-build branch.
