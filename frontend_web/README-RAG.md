# RAG Chatbot Frontend (React)

This is a lightweight React UI for a Retrieval Augmented Generation (RAG) chatbot. It supports:
- Chat conversation with a grounded assistant
- Document retrieval context display with pinning
- Document upload for ingestion
- Theme toggle (light/dark)
- Mocked API fallbacks when backend is not available

## Run

- npm start
- npm test
- npm run build

## Environment variables

Create a `.env` in the `frontend_web` folder if needed:

REACT_APP_BACKEND_URL=https://your-backend-host

When not provided, API calls use relative paths (same origin). If no backend exists, the app falls back to mocked responses.

## API contract (intended)

POST /api/retrieval/context
- body: { query: string }
- returns: Array<{ id, score, source, page?, title?, text }>

POST /api/chat/ask
- body: { question: string, selectedContextIds?: string[], history?: {role, content}[] }
- returns: { id, role: "assistant", content: string, sources?: Array<{ id, title?, url? }> }

POST /api/documents/ingest
- multipart/form-data: files[]
- returns: { ok: boolean, count: number }

The frontend uses these endpoints if available; otherwise it provides mocked data.

## Structure

src/
- components/
  - Navbar.jsx
  - ChatPage.jsx
  - chat/
    - ChatPanel.jsx
    - ChatHistory.jsx
    - ChatInput.jsx
  - context/
    - ContextPanel.jsx
  - upload/
    - UploadPanel.jsx
- hooks/
  - useChat.js
- services/
  - ApiContext.jsx
  - api.js

## Keyboard shortcuts

- Enter to send
- Shift+Enter for newline
