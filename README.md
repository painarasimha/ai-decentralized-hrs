# Decentralized AI Health Record Management System

Phase 1 focuses on a working full-stack demo with patient/doctor roles, record uploads, a basic consent flow, and mocked IPFS/blockchain. Phase 2 will harden and extend features.

Tech highlights:
- Next.js (App Router, TypeScript), TailwindCSS, shadcn/ui (optional)
- NextAuth (credentials) with Prisma (PostgreSQL)
- Mock IPFS (hash-only) and blockchain placeholders
- Ethers.js for future web3 interactions
- Basic FHIR-compatible metadata shaping (DocumentReference)

## Quickstart (Dev)

1) Start Postgres via Docker

Create a local Postgres instance with Docker Compose at repo root:

```bash
docker compose up -d
```

2) Configure environment

Copy env example and fill secrets:

```bash
cd frontend
copy .env.example .env
```

Set `DATABASE_URL` to match the docker compose service and set `NEXTAUTH_SECRET` to a strong random string.

3) Install deps and initialize DB

```bash
cd frontend
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

4) Demo users
- Patient: patient@example.com / Passw0rd!
- Doctor: doctor@example.com / Passw0rd!

## Monorepo Layout
- `frontend/` — Next.js application (API + UI)
- `backend/` — reserved (not used in Phase 1)
- `blockchain/` — Solidity placeholders for Phase 2
- `ai-service/` — reserved for future AI modules
- `docs/` — API, architecture, demo script, and threat model

## Phase 1 Features
- Auth with roles (Patient, Doctor)
- Patient dashboard: upload/view records, share with doctors
- Doctor dashboard: request access, view approved records, upload if consented
- Mock IPFS CID stored in DB, audit log of actions
- Smart contract placeholders (no on-chain writes yet)

See `docs/` for API and architecture details.
