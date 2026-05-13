# 🌐 Smart Network Manager & Optimizer

A comprehensive real-time network monitoring and optimization suite. This project features a Python-based edge agent, a Java Spring Boot backend for data orchestration, and a modern React dashboard for visualization and control.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Jenkins](https://img.shields.io/badge/CI%2FCD-Jenkins-orange.svg)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue.svg)

---

## 🚀 Key Features

- **Real-time Monitoring:** Track Latency (Ping), Jitter, and Packet Loss with live charts.
- **Process Oversight:** Identify network-heavy processes in real-time.
- **Remote Termination:** Terminate intrusive processes directly from the dashboard.
- **Intelligent Insights:** Automatic suggestions for network optimization.
- **CI/CD Integrated:** Automated builds, tests, and deployments via GitHub Actions and Jenkins.

---

## 🏗️ System Architecture

1.  **Network Agent (Python):** Collects system and network metrics. Communicates via REST (upload) and STOMP/WebSocket (commands).
2.  **Backend (Java Spring Boot):** Orchestrates data flow, manages PostgreSQL storage, and broadcasts updates via WebSockets.
3.  **Frontend (React + Vite):** A high-performance glassmorphism dashboard styled with Tailwind CSS and Framer Motion.
4.  **Database (PostgreSQL):** Persistent storage for historical metrics and logs.

---

## 🛠️ Getting Started

### Prerequisites
- **Docker & Docker Desktop** (for containerization)
- **Python 3.10+** (for the agent)
- **Maven** (optional, for local backend builds)
- **Jenkins** (for CI/CD)

### 1. Run with Docker Compose
To start the entire environment (DB, Backend, Frontend):
```bash
docker compose up -d --build
```
- **Frontend:** [http://localhost:3001](http://localhost:3001)
- **Backend API:** [http://localhost:8082](http://localhost:8082)

### 2. Run the Network Agent
The agent runs locally on your machine to monitor its network:
```bash
cd agent
python -m venv venv
source venv/bin/activate  # Or venv\Scripts\activate on Windows
pip install -r requirements.txt
python src/main.py
```

---

## 🔄 CI/CD Workflows

This project is configured for a professional DevOps workflow using both **GitHub Actions** and **Jenkins**.

### GitHub Actions (Primary CI)
The `.github/workflows/ci.yml` handles automated checks on every push or pull request to `main` and `develop`:
- **Backend:** Maven build and test.
- **Frontend:** Dependency install, linting, and Vite build.
- **Agent:** Python dependency check.
- **Docker:** Verification of `docker compose build` for the entire stack.

### Jenkins (CD & Alternative CI)
1.  **Plugins:** Install `Docker Pipeline`, `GitHub Integration`, and `Git`.
2.  **Credentials:** Add your GitHub Personal Access Token as `github-creds`.
3.  **Pipeline:** Create a new Pipeline job pointing to the repository.
4.  **Webhook:** Set up a GitHub webhook to `http://YOUR_URL/github-webhook/`.

The `jenkins/Jenkinsfile` handles automated deployment on successful builds for primary branches.

---

## 📂 Project Structure

```text
├── agent/               # Python Network Agent
│   ├── src/             # Source code
│   └── requirements.txt # Python dependencies
├── backend/             # Java Spring Boot Backend
│   ├── src/             # Source code (MVC Pattern)
│   └── pom.xml          # Maven configuration
├── frontend/            # React + Vite Frontend
│   ├── src/             # Components, Hooks, Views
│   └── Dockerfile       # Production build config
├── jenkins/             # CI/CD Configuration
│   └── Jenkinsfile      # Pipeline-as-Code
└── docker-compose.yml   # Multi-container orchestration
```

---

## 📜 Documentation

Detailed documentation can be found in the `/docs` directory:
- [API Reference](./docs/API.md)
- [Agent Configuration](./docs/AGENT.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

---

## 🤝 Contributing
Feel free to open issues or submit pull requests to improve the optimizer!

---

## 📄 License
This project is licensed under the MIT License.
