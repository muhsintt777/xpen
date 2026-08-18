# List User Expenses API Load Test Results

## Results

| VUs |    Throughput | Avg Latency | p95 Latency | Error Rate |      CPU |  RAM |
| --: | ------------: | ----------: | ----------: | ---------: | -------: | ---: |
|  50 |     199 req/s |     4.85 ms |    12.89 ms |         0% |   20–30% | 3–4% |
| 100 |     435 req/s |    13.83 ms |    68.09 ms |         0% |  40–104% | 4–6% |
| 200 | **991 req/s** |    61.09 ms |   115.26 ms |         0% |    ~100% | 4–6% |
| 300 |     768 req/s |   212.06 ms |   359.09 ms |         0% | 100–130% | 7–8% |

## Key Findings

- Throughput increased from **199 req/s at 50 VUs** to **991 req/s at 200 VUs**.
- **200 VUs** produced the highest throughput at approximately **991 req/s**.
- CPU reached approximately **100% at 200 VUs**.
- Increasing to **300 VUs** reduced throughput to **768 req/s**.
- At 300 VUs, p95 latency increased to **359.09 ms**.
- All tests maintained a **0% error rate**.
- RAM remained low compared with CPU usage.

## Capacity Point

The current Node.js setup reaches its practical capacity around **200 VUs**.

At 200 VUs:

- Throughput: **~991 req/s**
- p95 latency: **115.26 ms**
- Error rate: **0%**
- CPU: **~100%**
- RAM: **4–6%**

Increasing concurrency beyond this point increases latency and reduces throughput, indicating **CPU saturation** as the current limiting resource.
