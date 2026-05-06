# 📡 Network Agent Documentation

The Network Agent is a lightweight Python script that monitors local system networking and process activity.

## ⚙️ How it Works
1.  **Metric Collection:** Every 5 seconds, it pings `8.8.8.8` multiple times to calculate latency (ping) and jitter.
2.  **Process Scanning:** It uses `psutil` to find the top 10 processes with active network connections.
3.  **Data Transmission:** Data is sent via POST requests to the backend API.
4.  **Command Listening:** The agent maintains a STOMP connection to the `/topic/commands` WebSocket to receive remote instructions (like `KILL`).

## 🛠️ Installation
```bash
cd agent
python -m venv venv
venv/Scripts/activate
pip install -r requirements.txt
```

## 🔧 Configuration
Settings are located at the top of `src/main.py`:
- `BACKEND_URL`: URL of the Spring Boot API (default: `http://localhost:8082`).
- `WS_HOST`: WebSocket server host (default: `localhost`).
- `WS_PORT`: WebSocket server port (default: `8082`).
- `INTERVAL`: Frequency of data collection in seconds (default: `5`).

## 🛡️ Security Note
The agent requires permissions to access network statistics and terminate processes. Run as Administrator/Root if process termination fails due to `AccessDenied`.
