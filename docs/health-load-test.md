# Health Endpoint Load Test

## Configuration

- Endpoint: `GET /health`
- Runtime: Node.js production build
- Docker CPU limit: **2 CPUs**
- Docker memory limit: **1 GB**
- Test duration: **40 seconds**
- Error threshold: **<1%**
- Latency threshold: **p95 <500 ms**

## Results

|     VUs |        Throughput |  Avg Latency |   p95 Latency | Error Rate |       CPU |      RAM |
| ------: | ----------------: | -----------: | ------------: | ---------: | --------: | -------: |
|      10 |     2,052.6 req/s |      4.70 ms |       9.80 ms |         0% |     ~100% |      ~4% |
|      25 |     2,044.5 req/s |     12.06 ms |      26.01 ms |         0% |     ~100% |      ~4% |
|      50 |     2,138.7 req/s |     23.20 ms |      49.89 ms |         0% |     ~100% |      ~4% |
| **200** | **3,941.1 req/s** | **44.29 ms** |  **93.72 ms** |     **0%** | **~100%** | **7-8%** |
| **300** | **3,361.3 req/s** | **78.00 ms** | **129.26 ms** |     **0%** | **~100%** | **7-8%** |

## Key Findings

- **Peak tested throughput:** ~3,941 req/s at 200 VUs.
- **200 VUs is the preferred operating point.**
- Increasing from 200 → 300 VUs reduced throughput by **~14.7%**.
- p95 latency increased from **93.72 ms → 129.26 ms**.
- All tests maintained **0% errors**.
- CPU remained at **~100%**, indicating CPU saturation.
- RAM remained low at **~7-8%**, so memory is not a bottleneck.
- The 300-VU test produced a maximum latency of **9.76s**, showing occasional extreme latency outliers under saturation.

## Conclusion

With **2 CPUs and 1 GB RAM**, the `/health` endpoint demonstrated a practical peak of approximately **3.9k req/s at 200 VUs**, with **44.29 ms average latency** and **93.72 ms p95 latency**.

Increasing concurrency to 300 VUs does not improve capacity. Throughput drops to **3.36k req/s** while latency increases.

**Current baseline: ~3.9k req/s at 200 VUs, 93.72 ms p95, 0% errors.**

CPU is the current limiting resource. Memory is not a bottleneck.
