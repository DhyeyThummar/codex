# PROJECT-CONNECT MVP

Monorepo containing:
- `backend/` (Node + Express + MongoDB + JWT auth)
- `frontend/` (React + Vite + Router + Axios + Tailwind)

## Backend setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Frontend setup
```bash
cd frontend
npm install
npm run dev
```

## Example API usage
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "name":"Aman",
    "email":"aman@example.com",
    "password":"123456",
    "university":"Charusat",
    "skills":["React","Node"],
    "domains":["Web"],
    "githubUsername":"aman-dev"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"aman@example.com","password":"123456"}'

# Get project feed (replace TOKEN)
curl http://localhost:5000/api/projects?space=university \
  -H 'Authorization: Bearer TOKEN'
```
