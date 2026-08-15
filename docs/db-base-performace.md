# Database Performance Baseline

## Dataset

- Users: 100
- Categories: 14
- Expenses: 10,000

## Storage

| Table      |    Total |    Table |  Index |
| ---------- | -------: | -------: | -----: |
| users      |    80 KB |    16 KB |  32 KB |
| categories |    24 KB |     8 KB |  16 KB |
| expenses   | 1,416 KB | 1,144 KB | 240 KB |

## Query

```sql
EXPLAIN (
  ANALYZE,
  BUFFERS
)
SELECT
  *
FROM
  expenses
WHERE
  user_id = 1;
```

## Baseline Result

- Scan: `Seq Scan`
- Rows returned: `1,000`
- Rows removed: `9,000`
- Shared buffer hits: `143`
- Planning time: `0.383 ms`
- Execution time: `~0.879 ms`
