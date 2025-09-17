# RAG Chatbot Frontend (React)

This app provides a modern UI to interact with a Retrieval Augmented Generation (RAG) chatbot.

- Chat interface with history and assistant responses
- Retrieved context panel with pin/persist controls
- Document upload to enrich the vector database
- Light/Dark theme toggle
- Mocked API fallback (works without backend)

See README-RAG.md for API details and structure.

## Scripts

- npm start — start development server
- npm test — run tests
- npm run build — build production bundle

## Configure backend URL

Create `.env` in this folder and set:

REACT_APP_BACKEND_URL=http://localhost:8000

If not set, relative paths are used; when endpoints are not available, mocks are used.
