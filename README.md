# Chatbot Demo Studio

A responsive dashboard prototype for turning websites into interactive AI chatbot demos.

## Features

- Overview dashboard with project statistics and onboarding checklist
- Project listing and search
- New demo flow with website URL validation
- AI Knowledge and Recordings sections
- Workspace settings screen
- Responsive desktop and mobile navigation

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current limitations

This repository currently contains the frontend prototype. Project creation uses temporary browser state; it does not crawl websites or persist projects. Supabase authentication/database/storage, website crawling, embeddings/vector search, AI chat generation, browser recordings, and share links still need backend integration.

## Planned stack

- Next.js + TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, pgvector, and Storage
- Website crawler and background jobs
- AI provider integration
- Playwright and FFmpeg for demo recordings
