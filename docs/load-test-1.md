| Component                 | Current configuration       |
| ------------------------- | --------------------------- |
| Host                      | Windows laptop              |
| PostgreSQL                | Docker container `postgres` |
| PostgreSQL image          | `postgres`                  |
| PostgreSQL CPU limit      | **4 cores**                 |
| PostgreSQL memory limit   | **8 GiB**                   |
| PostgreSQL swap allowance | **0 GiB**                   |
| pgAdmin                   | Docker container `pgadmin`  |
| pgAdmin port              | `localhost:8080`            |
| PostgreSQL port           | `localhost:5432`            |

| Setting                |      Value |
| ---------------------- | ---------: |
| `max_connections`      |    **100** |
| `shared_buffers`       | **128 MB** |
| `effective_cache_size` |   **4 GB** |
| `work_mem`             |   **4 MB** |

| Component                | Current configuration                          |
| ------------------------ | ---------------------------------------------- |
| Runtime                  | Node.js                                        |
| Framework                | Express                                        |
| PostgreSQL driver        | `pg`                                           |
| Node processes           | **1**                                          |
| PostgreSQL pool size     | **10 connections**                             |
| Start mode for benchmark | Production build (`pnpm build` → `pnpm start`) |

| Metric     |          Value |
| ---------- | -------------: |
| Users      |        **100** |
| Categories |         **14** |
| Expenses   | **10,000,000** |
| Database   |     PostgreSQL |
