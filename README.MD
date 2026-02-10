# DevGraph

A developer network explorer built with Gremlin and Next.js. Select a developer and discover what skills their network brings — powered by graph traversals.

## Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **State**: Redux Toolkit with RTK Query
- **Database**: Gremlin Server (TinkerGraph locally, Neptune-compatible)
- **Infra**: Docker Compose, Cloudflare Tunnel

## Getting Started

```bash
# Start Gremlin Server
docker-compose up -d

# Install dependencies
npm install

# Seed demo data (27 vertices, 94 edges)
npm run seed

# Run dev server
npm run dev
```

App runs at `http://localhost:3000`.

## Graph Model

```
developer --knows--> skill
developer --worked_on--> project
developer --works_at--> company
developer --collaborates_with--> developer
project --uses--> skill
```

## Pages

- `/` — Landing page with project overview
- `/explorer` — Interactive force-directed graph visualization
- `/recommend` — Skill recommender based on network traversals

## Environment

```
GREMLIN_URL=ws://localhost:8182/gremlin
```

For Neptune, swap to `wss://<endpoint>:8182/gremlin` — no code changes needed.
