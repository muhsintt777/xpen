# Xpen Server

A TypeScript and PostgreSQL REST API for personal expense tracking, built as a modular monolith. Its architecture makes feature ownership, module interfaces, business rules, and persistence responsibilities visible in the code, with documented query-plan and load-test work alongside the implementation.

## Architecture

```mermaid
flowchart LR
    Client --> Middleware[Express middleware]
    Middleware --> Routers[Feature routers]
    Routers --> Controllers[Controllers]
    Controllers --> Services[Feature services]
    Services --> Repositories[Feature repositories]
    Repositories --> Pool[PostgreSQL connection pool]
    Pool --> Database[(PostgreSQL)]
    Middleware --> Shared[Validation, responses, errors, logging]
    Services --> Security[Password and token services]
```

The API is one deployable application, divided into cohesive feature modules rather than technical-layer-only folders. Each feature owns its API and application behavior; shared infrastructure is kept outside those modules.

| Boundary              | Responsibility                                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| HTTP and middleware   | Application composition, routing, request validation, authentication, logging, response formatting, and centralized errors |
| Feature modules       | Auth, users, categories, expenses, and dashboard use cases, types, and route/controller adapters                           |
| Services              | Business decisions and orchestration, such as cursor pagination and translating missing updates into domain errors         |
| Repositories          | PostgreSQL queries and persistence operations, isolated from HTTP concerns                                                 |
| Shared infrastructure | Database pool, security primitives, environment configuration, and reusable HTTP middleware                                |

Modules expose intentional entry points through `index.ts`; cross-module imports use the `#modules/*` alias. This keeps consumers coupled to a module's exported surface rather than its internal file layout. TypeScript strictness options, including `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`, make boundary assumptions more explicit at compile time.

## Engineering Highlights

- **Explicit module contracts:** Feature ownership and public exports reduce accidental coupling while allowing one deployable application and shared infrastructure.
- **Validated request boundaries:** Zod schemas validate request bodies, parameters, and query values before controllers use them. A shared error handler translates validation and application errors into a consistent API response shape.
- **Separated application and persistence logic:** Services own workflow decisions; repositories own SQL. Parameterized queries, user-scoped expense mutations, and limit-plus-one cursor pagination make data access behavior explicit.
- **Security with stateful revocation:** Password hashing, access/refresh token handling, hashed refresh-token storage, and atomic token rotation are separated into focused services and repositories.
- **Operational lifecycle:** Environment validation and a database connectivity check happen before the server starts accepting traffic. Database pooling, Helmet, CORS, request logging, and layered rate limits are configured centrally.
- **Schema evolution:** Timestamped SQL migrations are managed through `node-pg-migrate`, keeping database changes ordered and repeatable.
- **Measured performance:** The repository includes an `EXPLAIN ANALYZE` report for a 10-million-row expense dataset and endpoint load-test reports. These are documented test results, not production capacity guarantees.

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

Apply pending schema and category-seed migrations from `migrations/`:

```bash
pnpm migrate:up
```

Optional user and expense seed SQL is in `seed/`.

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
