# OctoFit Tracker Frontend

This React 19 + Vite frontend uses the backend API on port 8000.

## Environment variable

Define `VITE_CODESPACE_NAME` (for example in `.env.local`) so the app can call the Codespaces backend URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the frontend calls:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

## Run

```bash
npm install
npm run dev
```
