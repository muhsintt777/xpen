# Xpen Server

A TypeScript and PostgreSQL REST API for personal expense tracking. The project is organized around explicit feature modules, shared HTTP and security infrastructure, and SQL-backed services, with separate load-test and query-plan notes documenting performance work.

## Architecture

```mermaid
flowchart LR
    Client --> Middleware[Express middleware]
    Middleware --> Routers[Feature routers]
    Routers --> Controllers[Controllers]
    Controllers --> Services[Feature services]
    Services --> Pool[PostgreSQL connection pool]
    Pool --> Database[(PostgreSQL)]
    Middleware --> Shared[Validation, responses, errors, logging]
    Services --> Security[Password and token services]
```

The codebase keeps HTTP concerns and business operations in separate layers. Feature modules under `src/apis/` own their route, controller, service, types, and validation; reusable middleware, security helpers, configuration, and database connectivity live in dedicated shared modules.

## Engineering Highlights

- **Feature-oriented structure:** Auth, users, categories, expenses, and dashboard behavior are isolated into modules, while shared concerns are centralized instead of duplicated across endpoints.
- **Validated request boundaries:** Zod schemas validate request bodies, parameters, and query values before controllers use them. A shared error handler translates validation and application errors into a consistent API response shape.
- **Explicit persistence behavior:** Services use PostgreSQL queries with bound parameters. Expense listing uses limit-plus-one pagination to determine whether another page exists, and update/delete queries scope mutations to the authenticated user's records.
- **Refresh-token rotation:** Refresh tokens are JWTs with unique IDs; only SHA-256 token hashes are persisted. Refresh replaces the stored hash in one conditional update, so concurrent reuse of a consumed token cannot succeed twice.
- **Database lifecycle and pooling:** The `pg` pool is configured centrally, startup validates environment variables and checks database connectivity before listening, and shutdown support is exposed through a pool close function.
- **Operational safeguards:** Helmet, configured CORS, request logging, a global rate limit, and a stricter auth-route limit are wired at the application boundary. Unknown routes and unexpected errors receive centralized handling.
- **Query and load-test evidence:** The repository records `EXPLAIN ANALYZE` results for a 10-million-row expense dataset and load-test reports for health, category, and expense endpoints. These are documented measurements, not general capacity guarantees.

## Capabilities

- Authentication: login, refresh, and logout
- User and category endpoints
- Expense creation, update, deletion, and paginated listing
- Dashboard summary by expense type and category for the current UTC month
- Health endpoint at `GET /health`

## Stack

Node.js 24+, TypeScript, Express 5, PostgreSQL, `pg`, Zod, JSON Web Tokens, bcrypt, Helmet, CORS, Pino, and `express-rate-limit`.

## Setup

### Requirements

- Node.js 24+
- pnpm
- PostgreSQL

### Configure

Install dependencies:

```bash
pnpm install
```

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=3500
DB_URL=postgresql://user:password@localhost:5432/xpen
DB_SSL=false
ACCESS_TOKEN_KEY=replace-with-a-long-secret
REFRESH_TOKEN_KEY=replace-with-a-different-long-secret
```

Run the SQL files in `sql/migration/` in numeric order to create the schema. Optional seed SQL is in `sql/seed/`.

### Run

Development with watch mode:

```bash
pnpm dev
```

Build and start the production output:

```bash
pnpm build
pnpm start
```

The server validates its environment and database connection at startup, then listens on the configured port.

## API Surface

- `GET /health`
- `/auth`
- `/user`
- `/category`
- `/expense`
- `/dashboard`

API routes are limited to 200 requests per 15 minutes; auth routes have an additional limit of 20 requests per 15 minutes.

## Performance Notes

Performance results and methodology are in [`docs/`](docs/). Highlights from the checked-in reports:

- The expense-list query used `idx_expenses_user_date` on a 10-million-expense dataset; the recorded plan returned 20 rows in 0.110 ms execution time.
- The health endpoint load test recorded about 3,941 requests/second at 200 virtual users, with 93.72 ms p95 latency, on a container limited to 2 CPUs and 1 GB RAM.
- The user-expense endpoint report recorded about 1,392 requests/second at 200 virtual users, with 57.38 ms p95 latency.

These figures describe the documented test setup and should not be treated as production SLOs.

## Docker

```bash
docker compose up --build
```

Compose builds and runs the API, reads configuration from `.env`, and publishes port `3500`. The Compose file expects an existing external Docker network named `xpen-network`; PostgreSQL is not defined in this Compose file and must be reachable using `DB_URL`.

## Quality Checks

```bash
pnpm build
pnpm lint
pnpm format:check
```
