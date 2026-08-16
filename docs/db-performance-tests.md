# Database Performance Tests

## Dataset

| Metric          |                 Value |
| --------------- | --------------------: |
| Users           |                   100 |
| Categories      |                    14 |
| Expenses        |      10,000 initially |
| Scaling targets | 10K → 100K → 1M → 10M |

## Test Query

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

# Test 1. 10K Expenses

## Without `user_id` Index

| Metric                   |     Result |
| ------------------------ | ---------: |
| Rows in table            |     10,000 |
| Scan                     | `Seq Scan` |
| Estimated rows           |      1,000 |
| Actual rows              |      1,000 |
| Rows removed by filter   |      9,000 |
| Row width                |   80 bytes |
| Shared buffer hits       |        143 |
| Planning buffer hits     |         29 |
| Planning buffers dirtied |          1 |
| Planning time            |   0.383 ms |
| Execution time           |   0.879 ms |

# Test 2. 100K Expenses

## Without `user_id` Index

| Metric                 |     Result |
| ---------------------- | ---------: |
| Rows in table          |    100,000 |
| Scan                   | `Seq Scan` |
| Estimated rows         |      1,043 |
| Actual rows            |      1,000 |
| Rows removed by filter |     99,000 |
| Row width              |   81 bytes |
| Shared buffer hits     |      1,429 |
| Planning buffer hits   |         45 |
| Planning time          |   0.145 ms |
| Execution time         |   5.901 ms |

## 10K → 100K Scaling

| Metric         |      10K |     100K |       Change |
| -------------- | -------: | -------: | -----------: |
| Rows           |   10,000 |  100,000 |          10x |
| Rows returned  |    1,000 |    1,000 |         Same |
| Rows removed   |    9,000 |   99,000 |          11x |
| Buffer hits    |      143 |    1,429 |         ~10x |
| Planning time  | 0.383 ms | 0.145 ms |        Lower |
| Execution time | 0.879 ms | 5.901 ms | ~6.7x slower |

## With `user_id` Index

```sql
CREATE INDEX idx_expenses_user_id ON expenses (user_id);
```

| Metric                |                                   Result |
| --------------------- | ---------------------------------------: |
| Rows in table         |                                  100,000 |
| Scan                  | `Bitmap Index Scan` + `Bitmap Heap Scan` |
| Estimated rows        |                                    1,043 |
| Actual rows           |                                    1,000 |
| Heap blocks           |                                 15 exact |
| Shared buffers        |                          18 hit + 2 read |
| Planning buffer hits  |                                       16 |
| Planning buffer reads |                                        1 |
| Planning time         |                                 0.202 ms |
| Execution time        |                                 0.170 ms |

### Bitmap Index Scan

| Metric          |                 Result |
| --------------- | ---------------------: |
| Index           | `idx_expenses_user_id` |
| Index condition |          `user_id = 1` |
| Estimated rows  |                  1,043 |
| Actual rows     |                  1,000 |
| Buffers         |         3 hit + 2 read |
| Execution time  |              ~0.061 ms |

### Bitmap Heap Scan

| Metric         |          Result |
| -------------- | --------------: |
| Heap blocks    |        15 exact |
| Actual rows    |           1,000 |
| Buffers        | 18 hit + 2 read |
| Execution time |       ~0.130 ms |

## Index Impact

| Metric         | Without Index |    With Index |        Change |
| -------------- | ------------: | ------------: | ------------: |
| Scan           |    `Seq Scan` | `Bitmap Scan` |       Changed |
| Execution time |      5.901 ms |      0.170 ms | ~34.7x faster |
| Buffer hits    |         1,429 |            18 |    ~79x fewer |
| Buffer reads   |             0 |             2 |       2 reads |
| Rows returned  |         1,000 |         1,000 |          Same |
| Rows removed   |        99,000 |             — |       Avoided |

# Overall Performance Summary

| Dataset | Index     | Scan          | Rows Returned | Rows Removed | Buffers         | Planning |    Execution |
| ------- | --------- | ------------- | ------------: | -----------: | --------------- | -------: | -----------: |
| 10K     | None      | `Seq Scan`    |         1,000 |        9,000 | 143 hit         | 0.383 ms | **0.879 ms** |
| 100K    | None      | `Seq Scan`    |         1,000 |       99,000 | 1,429 hit       | 0.145 ms | **5.901 ms** |
| 100K    | `user_id` | `Bitmap Scan` |         1,000 |            — | 18 hit + 2 read | 0.202 ms | **0.170 ms** |

# Key Findings

- 10K expenses: sequential scan completed in **0.879 ms**.
- 100K expenses: sequential scan increased to **5.901 ms**.
- The 100K sequential scan rejected **99,000 rows**.
- `idx_expenses_user_id` reduced execution time to **0.170 ms**.
- The indexed query was approximately **34.7x faster**.
- PostgreSQL selected a `Bitmap Index Scan` + `Bitmap Heap Scan`.
- The indexed query used only **15 exact heap blocks**.
- Buffer usage dropped from **1,429 hits** to **18 hits + 2 reads**.

# Next Test

Scale `expenses` to **1,000,000 rows**.

Keep the existing `idx_expenses_user_id` index and run:

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

Record the same metrics and compare:

```text
10K
 ↓
100K
 ↓
1M
 ↓
10M
```

Do not add additional indexes until the next benchmark is recorded.
