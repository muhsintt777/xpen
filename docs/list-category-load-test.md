# List Category API Load Test

## Configuration

- Endpoint: `GET /category`
- Test duration: **40 seconds**
- Max VUs: **300**
- Error threshold: **<1%**
- Latency threshold: **p95 <500 ms**
- Node.js: **2 CPU / 1 GB RAM**
- Database pool: **10 connections**

## Results

|     VUs |      Throughput |  Avg Latency |   p95 Latency | Error Rate |         CPU |   Memory |
| ------: | --------------: | -----------: | ------------: | ---------: | ----------: | -------: |
| **200** | **1,495 req/s** | **11.05 ms** |  **52.61 ms** |     **0%** |  **70–80%** |  **~7%** |
| **300** | **1,761 req/s** | **48.54 ms** | **129.46 ms** |     **0%** | **90–100%** | **7–8%** |

## Key Findings

- **Preferred operating point:** 200 VUs.
- **Peak tested throughput:** ~**1,761 req/s** at 300 VUs.
- 200 → 300 VUs increased throughput by **~17.8%**.
- p95 latency increased from **52.61 ms → 129.46 ms**.
- Both tests maintained **0% errors**.
- CPU reached **90–100%** at 300 VUs, indicating **CPU saturation**.
- Memory remained low at **7–8%**, so memory is **not a bottleneck**.

## Baseline

**~1,495 req/s at 200 VUs, 52.61 ms p95, 0% errors, ~70–80% CPU, ~7% memory.**

## High-Concurrency Result

**~1,761 req/s at 300 VUs, 129.46 ms p95, 0% errors, ~90–100% CPU, 7–8% memory.**
