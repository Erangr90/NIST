# NIST CVE

A full-stack application for browsing **NIST CVE** (Common Vulnerabilities and Exposures) data. It provides a React frontend to search and view CVE records stored in MongoDB, backed by a Node.js/Express API.

## Stack

- **Client:** React (Vite), Redux Toolkit
- **API:** Node.js, Express
- **Database:** MongoDB
- **Reverse proxy:** nginx

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- For the API, create `api/.env` with at least:
  - `MONGO_URI` — e.g. `mongodb://mongo:27017` when using Docker
  - `DB_NAME` — database name (e.g. `nist` or `cve`)

## Run with Docker Compose

From the project root:

```bash
docker compose up -d
```

- **App (via nginx):** http://localhost
- **API:** http://localhost:8080
- **MongoDB:** localhost:27017

To use the dev setup (hot reload, dev Dockerfiles):

```bash
docker compose -f docker-compose-dev.yaml up -d
```

## Seed the database (while containers are running)

With the stack up, run the seeder inside the API container so it can reach MongoDB:

```bash
docker compose exec api npm run seed
```

This runs the script that loads CVE records from `api/data/data.json` into MongoDB. You can run it again to add more data; duplicate handling depends on your seed script and CVE model.

## Project layout

- `api/` — Express server, CVE model, routes, and seeder
- `client/` — React (Vite) app
- `nginx/` — nginx config and static build
- `mongo/data/` — MongoDB data directory (created by Docker)
