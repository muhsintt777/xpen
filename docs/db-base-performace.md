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

## 100K Expenses - user_id Index

### Without Index

- Scan: `Seq Scan`
- Rows returned: `1,000`
- Rows removed: `99,000`
- Shared buffers: `1,429`
- Execution time: `5.901 ms`

### With `idx_expenses_user_id`

- Scan: `Bitmap Index Scan` + `Bitmap Heap Scan`
- Rows returned: `1,000`
- Heap blocks: `15`
- Shared buffers: `18 hit + 2 read`
- Execution time: `0.170 ms`

### Improvement

- Execution time: ~34.7x faster
