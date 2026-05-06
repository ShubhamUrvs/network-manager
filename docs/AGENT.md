# 📡 Network Agent Documentation

The Network Agent is a lightweight Python script that monitors local system networking and process activity.

## ⚙️ How it Works
1.  **Metric Collection:** Every 5 seconds, it pings `8.8.8.8` multiple times to calculate latency (ping) and jitter.
2.  **Process Scanning:** It uses `psutil` to find the top 10 processes with active network connections.
3.  **Data Transmission:** Data is sent via POST requests to the backend API.
4.  **Command Polling:** The agent "polls" the backend every 5 seconds for pending commands (like `KILL`). This method is more robust than WebSockets for Windows environments.

## 🛠️ Installation & Execution
1. **Setup:**
```bash
cd agent
python -m venv venv
venv/Scripts/activate
pip install -r requirements.txt
```

2. **Run as Administrator (Required):**
On Windows, process termination and certain network stats require elevated privileges.
- Open **Command Prompt** or **PowerShell** as **Administrator**.
- Switch to the project drive (e.g., `D:`).
- Navigate to the folder and run:
```bash
agent\venv\Scripts\python agent\src\main.py
```

## 🔧 Configuration
Settings are located at the top of `src/main.py`:
- `BACKEND_URL`: URL of the Spring Boot API (default: `http://localhost:8082`).
- `INTERVAL`: Frequency of data collection and command polling (default: `5` seconds).

## 🛡️ Security Note
The agent uses `proc.kill()` for process termination to ensure high-usage applications are stopped immediately.
