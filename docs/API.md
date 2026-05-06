# 🔌 API Reference

The backend exposes several endpoints for data collection and frontend interaction.

## 📊 Metrics API

### Post Metrics
`POST /api/metrics`
Used by the agent to upload the latest network statistics.
**Body:**
```json
{
  "ping": 15.5,
  "jitter": 2.1,
  "packetLoss": 0.0
}
```

### Get History
`GET /api/metrics/history`
Used by the frontend to load historical data for charts.

---

## 🖥️ Processes API

### Post Processes
`POST /api/processes`
Used by the agent to update the list of network-heavy processes.

### Kill Process
`POST /api/processes/kill/{pid}`
Used by the frontend to request a process termination. This triggers a WebSocket message to the agent.

---

## 🤖 Suggestions API
`GET /api/suggestions`
Retrieves intelligent network optimization tips based on recent metrics.

---

## 📡 WebSocket Topics
- `/topic/metrics`: Live stream of network stats.
- `/topic/processes`: Live stream of process activity.
- `/topic/commands`: Control channel for sending instructions to the agent.
