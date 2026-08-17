# Database Performance Tests

## Dataset

| Metric     |          Value |
| ---------- | -------------: |
| Users      |            100 |
| Categories |             14 |
| Expenses   | **10,000,000** |

## Test Query

```sql
EXPLAIN (
  ANALYZE,
  BUFFERS
)
SELECT
  e.id,
  e.amount,
  e.note,
  e.category_id AS "categoryId",
  e.type,
  e.date,
  c.name AS "categoryName"
FROM expenses e
LEFT JOIN categories c ON e.category_id = c.id
WHERE user_id = $1
${cursorClause}
ORDER BY date DESC
LIMIT $2;
```

| Metric              | Result                   |
| ------------------- | ------------------------ |
| Scan                | `Index Scan`             |
| Index               | `idx_expenses_user_date` |
| Rows returned       | **20**                   |
| Shared buffer hits  | **7**                    |
| Shared buffers read | **20**                   |
| Planning time       | **0.205 ms**             |
| Execution time      | **0.110 ms**             |
| Sort                | **None**                 |
| JIT                 | **None**                 |

**Key Findings**

- 10M rows → 0.110 ms execution time
- Composite index is used for user_id + date.
- Only 20 rows are scanned for LIMIT 20.
- No sequential/bitmap scan.
- No sorting required.
