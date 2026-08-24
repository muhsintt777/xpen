# List User Expenses API Load Test

## Configuration

- Endpoint: `GET /expense/currentuser?limit=20`
- Node.js: **2 CPU / 1 GB RAM**
- Database pool: **10 connections**
- Test duration: **60 seconds**
- Error threshold: **<1%**
- Latency threshold: **p95 <500 ms**

## Results

|     VUs |      Throughput |  Avg Latency |   p95 Latency | Error Rate |
| ------: | --------------: | -----------: | ------------: | ---------: |
| **200** | **1,392 req/s** | **19.37 ms** |  **57.38 ms** |     **0%** |
| **300** | **1,441 req/s** |  **72.9 ms** | **167.01 ms** |     **0%** |

## Key Findings

- **200 VUs:** ~1,392 req/s with 57.38 ms p95.
- **300 VUs:** ~1,441 req/s with 167.01 ms p95.
- Both tests maintained **0% errors**.
- Increasing from 200 to 300 VUs increased throughput by only **~3.5%**.
- p95 latency increased significantly from **57 ms → 167 ms**.
- **200 VUs is the preferred operating point** because it provides nearly the same throughput with substantially lower latency.
- 300 VUs demonstrates that the API can handle higher concurrency while remaining below the 500 ms latency threshold.

## Current Baseline

**~1,392 req/s at 200 VUs, 57 ms p95, and 0% errors.**

The API demonstrated a maximum tested throughput of approximately **1,441 req/s at 300 VUs** with **167 ms p95 latency**.
