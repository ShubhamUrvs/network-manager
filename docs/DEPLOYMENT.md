# 🚀 Deployment Guide

This guide covers the two ways to deploy the Smart Network Manager: **Manual (Docker Compose)** and **Automated (Jenkins CI/CD)**.

---

## 📦 Option 1: Manual Deployment (Development/Local)

Use this method to get the project running quickly on your local machine.

### Prerequisites
- Docker Desktop installed and running.
- Git installed.

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/network-manager.git
   cd network-manager
   ```

2. **Launch Services**
   ```bash
   docker compose up -d --build
   ```
   *This will build the images for the Backend and Frontend and pull the Postgres image.*

3. **Verify Deployment**
   - **Frontend:** [http://localhost:3001](http://localhost:3001)
   - **Backend:** [http://localhost:8082](http://localhost:8082)
   - **Database:** `localhost:5433`

---

## 🤖 Option 2: Automated Deployment (Jenkins CI/CD)

Use this method for a professional "Push-to-Deploy" experience.

### Prerequisites
- Jenkins server running (locally or on a server).
- "Docker Pipeline" and "GitHub Integration" plugins installed in Jenkins.
- GitHub Personal Access Token (PAT).

### 1. Setup Jenkins Container
If you don't have Jenkins, use our included configuration:
```bash
docker compose -f docker-compose.jenkins.yml up -d
```

### 2. Configure Jenkins Pipeline
1. Create a **New Item** -> **Pipeline**.
2. Under **Build Triggers**, select **GitHub hook trigger for GITScm polling** or **Poll SCM** (`* * * * *`).
3. Under **Pipeline**, set Definition to **Pipeline script from SCM**.
4. Set SCM to **Git** and provide your Repository URL.
5. Add your GitHub PAT as credentials (ID: `github-creds`).
6. Set Branch Specifier to `**/main` (to only deploy production code).

---

## 🛠️ Troubleshooting

### Port Conflicts
If you see an error like `port is already allocated`, run the following to clear old containers:
```bash
docker compose down
docker stop $(docker ps -aq)
docker system prune -f
```

### Browser Cache (Important)
If the dashboard appears "Disconnected" or buttons don't work after an update, **Clear your Browser Cache** (Ctrl+Shift+Delete) or use **Incognito Mode**.

### Agent Permissions
Always run the agent in a terminal with **Administrator** privileges to allow for process termination.
