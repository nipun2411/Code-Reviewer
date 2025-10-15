Code Review Assistant
AI‑powered code reviews with a Vite React frontend and a Node/Express backend using Google Gemini for concise, actionable feedback.

Features
Upload a code file and get concise review bullets (issues, fixes, security, performance, improvements).

Fast Vite dev server with proxy to backend.

Local history dashboard using browser localStorage.

Clean API boundary: file upload to /api/review/analyze, Gemini analysis on the server.

Tech Stack
Frontend: React 18, Vite, Axios, React Router

Backend: Node.js, Express, Multer, dotenv, @google/generative-ai

Build/Dev: nodemon (backend)

Project Structure
text
code-review-assistant/
├── backend/
│   ├── controllers/
│   │   └── reviewController.js
│   ├── services/
│   │   ├── reviewService.js
│   │   └── geminiService.js
│   ├── server.js
│   ├── .env          # created locally; not committed
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── UploadSection.jsx
    │   │   ├── ReviewDisplay.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/api.js
    │   ├── utils/storage.js
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
Prerequisites
Node.js 18+ installed

A Google Gemini API key (create from Google AI Studio)

1) Clone
bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
2) Backend Setup
bash
cd backend
npm install
Create backend/.env:

text
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=5000
FRONTEND_URL=http://localhost:5173
package.json expected scripts (already present):

json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
Run backend:

bash
npm run dev
Health check:

Open http://localhost:5000/api/health to verify status OK.

3) Frontend Setup
Open a new terminal:

bash
cd frontend
npm install
Vite dev server runs with a proxy to the backend. vite.config.js should include:

js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
Start frontend:

bash
npm run dev
Open the app at:

http://localhost:5173

Usage
Click “Choose Code File” and pick a source file (.js, .jsx, .ts, .tsx, .py, .java, .cpp, .c, .html, .css, .go, .rb, .php).

Click “Analyze Code”.

The review appears in the results panel; it’s also stored in localStorage and shown in the dashboard.

Environment Variables Summary
backend/.env

GEMINI_API_KEY: your Gemini key

PORT: 5000

FRONTEND_URL: http://localhost:5173

No frontend env is required for local dev due to Vite proxy.

Common Scripts
Backend:

npm run dev — start backend with nodemon

npm start — start backend with node

Frontend:

npm run dev — start Vite dev server

npm run build — build production bundle

npm run preview — preview the production build

Troubleshooting
400 “No file uploaded”:

Ensure UploadSection uses e.target.files and not the FileList.

Confirm the input is not disabled and file size < 5 MB.

CORS or 404:

Backend must run on http://localhost:5000.

Keep the Vite proxy in vite.config.js.

ESM warning/crash on server:

Ensure "type": "module" exists in backend/package.json.

Gemini slow:

Normal for detailed analysis; use a concise prompt in reviewService.js if you want shorter/faster bullets.

Health check:

Visit http://localhost:5000/api/health; if down, restart backend and verify .env is loaded.

Clean Prompt (Concise Review)
backend/services/reviewService.js uses a brief, bullet‑only prompt to keep responses fast and actionable. You can swap templates there to adjust detail level.
