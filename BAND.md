1. Technology Stack
- Framework: React (v18+) initialized via Vite
- Language: JavaScript (ES6+)
- Styling: Tailwind CSS
- State Management: React Context API (for local prototype state)
- Routing: React Router
- Data: Local mock data (no backend API calls)

2. Architecture & Scope
- Scope: Frontend UI Prototype ONLY. 
- Backend: None. Do not write server-side Node.js, Express, or database schemas.
- Data Handling: Use hardcoded arrays/objects in state to simulate tasks and users.

3. Deployment Targets
- Deployment: None. Local development environment only.

4. Design & Architecture Rules
- Build a responsive layout focusing on user experience.
- Implement UI states for Loading, Error, and Empty states using simulated delays if necessary.
- Form submissions (like Login or Create Task) should update local React state and prevent default page reloads, rather than making HTTP requests.

5. Source Control
- Repository: https://github.com/akntara/Software-factory.git
- Primary Branch: main
- Working Branch: feature/ui-prototype
