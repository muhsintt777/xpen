# Xpen-Server

TypeScript REST API for managing users, categories, and expenses.

## Requirements

- Node.js 24+
- pnpm
- PostgreSQL

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env` file in the project root:

   ```env
   PORT=3500
   DB_URL=postgresql://user:password@localhost:5432/xpen
   DB_SSL=false
   ACCESS_TOKEN_KEY=replace-with-a-long-secret
   REFRESH_TOKEN_KEY=replace-with-a-different-long-secret
   ```

3. Create the database schema by running the files in `sql/migration/` in numeric order. Seed data is available in `sql/seed/` and `src/seeds/`.

## Run

Development with watch mode:

```bash
pnpm dev
```

Production build and start:

```bash
pnpm build
pnpm start
```

The API listens on the port configured by `PORT` and checks the database connection during startup.

## Routes

- `GET /health`
- `/auth`
- `/user`
- `/category`
- `/expense`

Unknown routes return a `404` response. API routes use a global limit of 200 requests per 15 minutes; authentication routes use an additional limit of 20 requests per 15 minutes.

## Docker

```bash
docker compose up --build
```

Docker Compose reads environment variables from `.env` and exposes the API on port `3500`.

## Checks

```bash
pnpm build
pnpm lint
pnpm format:check
```
