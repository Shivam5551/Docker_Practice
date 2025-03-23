# Docker Commands Cheatsheet

This guide covers essential Docker commands for managing images, containers, networks, volumes, and more. It also provides extended examples, including how to pass environment variables during container startup and how to work with PostgreSQL (psql).

## Table of Contents
- [Images](#images)
- [Containers](#containers)
  - [Basic Run Commands](#basic-run-commands)
  - [Advanced Run Examples](#advanced-run-examples)
  - [Environment Variables](#environment-variables)
- [Networking](#networking)
- [Volumes](#volumes)
- [Building Images](#building-images)
- [Docker Compose](#docker-compose)
- [PostgreSQL (psql)](#postgresql-psql)
- [Additional Commands & Cleanup](#additional-commands--cleanup)

---

## Images

### View Available Images
```bash
docker images
```
Lists all locally available Docker images with details like repository, tag, ID, creation date, and size.

### Pull Images
```bash
docker pull [IMAGE_NAME]
```
Downloads the specified image from Docker Hub or another registry.

### Remove Images
```bash
docker rmi [IMAGE_NAME or IMAGE_ID]
```
Deletes a specified image from local storage.

---

## Containers

### Basic Run Commands
Create and start a new container from an image:
```bash
docker run [OPTIONS] [IMAGE]
```

**Common Options:**
- `--name [NAME]`: Assign a custom name to the container.
- `-d`: Run container in detached mode (background).
- `-p [HOST_PORT]:[CONTAINER_PORT]`: Map container ports to host.
- `--network [NETWORK]`: Connect container to a specific network.
- `--volume [VOLUME]:[CONTAINER_PATH]`: Mount a volume.

**Example:**
```bash
docker run --name my-nginx -d -p 80:80 nginx
```

### Advanced Run Examples
You can combine multiple options for a more detailed setup:
```bash
docker run -d --name container_name --network network_name --volume volname:/data/db -p 27017:27017 mongo
```
This command runs a MongoDB container with:
- **Detached mode (`-d`)**: Runs in the background.
- **Named container (`--name`)**: Identifies it easily.
- **Network connection (`--network`)**: Enables container communication.
- **Volume mount (`--volume`)**: Provides persistent storage.
- **Port mapping (`-p`)**: Allows external access.

### Environment Variables
Passing environment variables is crucial for configuring containers. Use the `-e` flag with `docker run`:
```bash
docker run -d --name my-postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 postgres
```
Useful for database configuration, service credentials, or other runtime settings.

### Accessing Container Shell
To run commands interactively inside a running container:
```bash
docker exec -it [CONTAINER_ID or NAME] /bin/bash
```

### Stopping Containers
```bash
docker kill [CONTAINER_ID or NAME]
```
Stops a running container forcefully.

---

## Networking

### List Networks
```bash
docker network ls
```
Displays all Docker networks.

### Create a New Network
```bash
docker network create [NETWORK_NAME]
```
Creates a network for container communication.

### Manage Networks
```bash
docker network connect [NETWORK_NAME] [CONTAINER_NAME]
docker network disconnect [NETWORK_NAME] [CONTAINER_NAME]
docker network inspect [NETWORK_NAME]
```
---

## Volumes

### Manage Volumes
```bash
docker volume create [VOLUME_NAME]
docker volume inspect [VOLUME_NAME]
docker volume prune
```
### Mount a Volume During Container Run
```bash
docker run -v [VOLUME_NAME]:[CONTAINER_PATH] [IMAGE]
```
---

## Building Images

### Build an Image from a Dockerfile
```bash
docker build -t [NAME]:[TAG] [PATH]
```
Example:
```bash
docker build -t my-app:1.0 .
```
---

## Docker Compose

### Start Services Defined in `docker-compose.yml`
```bash
docker compose up -d
```
### Stop and Remove Services
```bash
docker compose down
```
### Example `docker-compose.yml`
```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - web-data:/usr/share/nginx/html
    networks:
      - app-network
  database:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network
networks:
  app-network:
volumes:
  web-data:
  db-data:
```
---

## PostgreSQL (psql)

### Running PostgreSQL in a Container
```bash
docker run -d --name my-postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 postgres
```

### Accessing the psql Command-Line Tool
```bash
docker exec -it my-postgres psql -U myuser -d mydb
```
---

## Additional Commands & Cleanup

### List Running Containers
```bash
docker ps -a
```
### View Container Logs
```bash
docker logs -f [CONTAINER_ID or NAME]
```
### Monitor Resource Usage
```bash
docker stats
```
### Remove Unused Resources
```bash
docker system prune -a --volumes
```
### Restart a Container
```bash
docker restart [CONTAINER_ID or NAME]
```
---
