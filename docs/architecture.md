# Architecture (Phase 1)

 Next.js App Router (frontend + API routes)
 Prisma + PostgreSQL for users, records, consents, grants, audit logs
 Mock IPFS: store CIDs generated from file hash
 Mock blockchain: Solidity placeholders only
 NextAuth credentials with JWT sessions

 Data models: see `frontend/prisma/schema.prisma`.

 Flows:
 - Upload: authenticated user posts file -> mock CID -> HealthRecord + AuditLog
 - Consent: doctor POST -> ConsentRequest; patient PATCH approves -> AccessGrant per record
 - Listing: patient sees own; doctor sees granted via AccessGrant
