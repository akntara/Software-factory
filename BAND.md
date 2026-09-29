1. Technology Stack
- Runtime: Node.js (v18+)
- Framework: Express.js
- Language: JavaScript / CommonJS
- Authentication: JSON Web Tokens (JWT) and bcrypt for password hashing
- Testing: Jest and Supertest

2. Database Architecture
- Database: PostgreSQL
- ORM: Prisma
- Models required:
  - User: id (UUID), email (String, unique), password_hash (String), created_at (DateTime).
  - Task: id (UUID), title (String), description (String), status (String, default: 'pending'), due_date (DateTime), user_id (UUID, relation to User).

3. Deployment Targets
- Hosting: Render (Web Service)
- Database Hosting: Render PostgreSQL
- Environment Variables required: DATABASE_URL, JWT_SECRET, PORT

4. Design & Architecture Rules
- Use standard RESTful routing conventions (e.g., POST /api/users/register, GET /api/tasks).
- Protect all task routes using a JWT authentication middleware.
- All responses must return standard JSON (e.g., { "success": true, "data": ... } or { "success": false, "error": ... }).

5. Source Control
- Repository: https://github.com/akntara/Software-factory.git
- Primary Branch: main
- Working Branch: feature/initial-build
