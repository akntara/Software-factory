

1. Backend Technology Stack
- Runtime: Node.js (v18+)
- Framework: Express.js
- Language: JavaScript / CommonJS
- Authentication: JSON Web Tokens (JWT) and bcrypt for password hashing
- Testing: Jest and Supertest

2. Frontend Technology Stack
- Framework: React (v18+) initialized via Vite
- Language: JavaScript (ES6+)
- Styling: Tailwind CSS
- State Management & Routing: React Context API and React Router
- API Client: Fetch API or Axios
- Testing: Vitest and React Testing Library

3. Database Architecture
- Database: PostgreSQL
- ORM: Prisma
- Models required:
  - User: id (UUID), email (String, unique), password_hash (String), created_at (DateTime).
  - Task: id (UUID), title (String), description (String), status (String, default: 'pending'), due_date (DateTime), user_id (UUID, relation to User).

4. Deployment Targets
- Backend Hosting: Render (Web Service)
- Database Hosting: Render PostgreSQL
- Frontend Hosting: Vercel (or Render Static Site)
- Environment Variables required: DATABASE_URL, JWT_SECRET, PORT, VITE_API_BASE_URL

5. Design & Architecture Rules
- Use standard RESTful routing conventions (e.g., POST /api/users/register, GET /api/tasks).
- Protect all backend task routes using JWT authentication middleware.
- All backend responses must return standard JSON (e.g., { "success": true, "data": ... } or { "success": false, "error": ... }).
- Frontend must implement responsive design and securely store the JWT (e.g., HttpOnly cookies or secure local storage).
- Frontend must handle and display loading states and API error messages gracefully.

6. Source Control
- Repository: https://github.com/akntara/Software-factory.git
- Primary Branch: main
- Working Branch: feature/frontend-initial-build
