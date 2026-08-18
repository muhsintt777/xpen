# Health Endpoint Load Test

## Configuration

- Endpoint: `GET /health`
- Runtime: Node.js production build
- Docker CPU limit: **2 CPUs**
- Docker memory limit: **1 GB**
- Test duration: **30 seconds**
- Error rate: **0%**

## Results

| VUs |    Throughput | Avg Latency | p95 Latency |
| --: | ------------: | ----------: | ----------: |
|  10 | 2,052.6 req/s |     4.70 ms |     9.80 ms |
|  25 | 2,044.5 req/s |    12.06 ms |    26.01 ms |
|  50 | 2,138.7 req/s |    23.20 ms |    49.89 ms |

## Resource Usage

- CPU: **~100%**
- Memory: **~4%**

## Conclusion

With **2 CPUs and 1 GB RAM**, the Node.js `/health` endpoint sustains approximately **2.1k req/s**. Increasing concurrency beyond 10 VUs increases latency without significantly increasing throughput.

CPU is the likely limiting resource. Memory is not a bottleneck.
