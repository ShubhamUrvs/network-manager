FROM jenkins/jenkins:lts
USER root

# Install Maven and Docker CLI
RUN apt-get update && apt-get install -y \
    maven \
    docker.io \
    curl

# Install Docker Compose plugin
RUN mkdir -p /usr/local/lib/docker/cli-plugins && \
    curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose && \
    chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

USER jenkins
