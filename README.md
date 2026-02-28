# Where's Scorpion?

A hidden-object web game inspired by photo tagging mechanics, built around Gus Morais' Mortal Kombat artwork.

## Features

- Start a new run with 3 random target characters from the Mortal Kombat board.
- Resume an unfinished run without login using a client-stored JWT session token.
- Click-to-tag gameplay with backend-side validation (frontend cannot decide correct/incorrect hits).
- Relative coordinate system (`0-100`) keeps hit detection and progress markers consistent across screen sizes.
- Real-time timer with centiseconds while the run is active.
- Restart flow that creates a fresh run instantly.
- Top 50 leaderboard sorted by fastest completion time.
- Post-finish name submission to publish a run on the leaderboard.

## Tech Stack

### Frontend

- React 19 + React Router v7 (Framework Mode, SSR disabled)
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui primitives (Radix-based components)
- date-fns

### Backend

- Node.js + Express 5
- TypeScript (`tsx` runtime for dev/start)
- Prisma ORM + PostgreSQL adapter
- Passport JWT strategy for stateless auth
- jsonwebtoken
- p-retry (query retry wrapper for Prisma operations)
- date-fns

### Data/Storage

- PostgreSQL (primary database)
- Cloudinary-hosted board and character images (stored as URLs in DB)

## Database Schema

![alt text](<public/Screenshot 2026-02-27 213054.png>)

### Table summary

- `Board`
  - `id`, `name` (unique), `image`
- `Character`
  - `id`, `boardId`, `name` (unique), `location` (JSON), `image`
  - `location` uses rectangle bounds: `x1`, `y1`, `x2`, `y2` in relative percentages.
- `History`
  - `id`, `playerName` (nullable), `startedAt`, `finishedAt` (nullable), `duration` (nullable int ms), `boardId`
- `Task`
  - `id`, `historyId`, `boardId`, `characterId`
  - Active targets still to be found in a run.
- `Progress`
  - `id`, `historyId`, `boardId`, `characterId`, `position` (JSON)
  - `position` stores clicked relative coordinates: `{ x, y }`.
- `_CharacterToHistory` (Prisma implicit many-to-many)
  - Stores the 3 randomly selected characters tied to each run.

## API Overview

- `GET /leaderboard` - fetch top 50 completed runs.
- `POST /game` - create a new run and return JWT token.
- `GET /game` - fetch board + selected characters for current JWT session.
- `GET /status` - fetch current run status (`tasks`, `progress`, timestamps).
- `PATCH /status` - submit a tagging attempt (`position`, `characterId`).
- `PATCH /game` - save player name after completion.

## Implementation Highlights

- Backend-authoritative game logic
  - Game start, tagging validation, progress updates, completion, and leaderboard writes are all enforced server-side.
  - Prevents cheating through client inspection or request tampering.
- Stateless session continuity
  - `POST /game` creates a new `History` and signs a JWT with `sub = historyId` (`expiresIn: 1 day`).
  - Frontend stores token in `localStorage` and sends it via `Authorization: bearer <token>`.
- Fast status updates using `Task` + `Progress`
  - `Task` tracks remaining targets; `Progress` stores found targets and click positions.
  - This avoids recomputing completion state from scratch each request.
- Relative coordinate correctness
  - Frontend converts click coordinates to percentages before submit.
  - Backend validates against `Character.location` rectangle bounds.
  - Progress markers are projected back to pixels using image dimensions (`ResizeObserver`).
- Randomized target selection
  - Uses a typed SQL query (`ORDER BY RANDOM() LIMIT 3`) to pick run-specific targets.

## How To Run

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL

### 1. Backend setup

```bash
cd backend
```

Create `backend/.env`:

```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
```

Install dependencies:

```bash
npm install
```

Apply migrations and seed data:

```bash
npx prisma migrate deploy
npm run seed
```

Run backend:

```bash
npm run dev
```

### 2. Frontend setup

```bash
cd ../frontend
```

Create `frontend/.env`:

```env
VITE_API_ROOT_URL="your-api-root-url"
```

Install dependencies and run frontend:

```bash
npm install
npm run dev
```

### 3. Play

- Open `http://localhost:5173`
- Click `Start` for a new game or `Resume` if a valid JWT exists in local storage.

## Credits

- Artwork: [Gus Morais](https://gus-morais.com/)
- Project: Hilman Fikry
