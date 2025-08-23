# Threat Model (Phase 1)

- Data at rest: records are not actually stored in IPFS in Phase 1; CIDs are mocked. Avoid storing PHI.
- Authentication: credentials over HTTPS; JWT sessions. Rate-limit and lockout to be added in Phase 2.
- Authorization: enforced via AccessGrant. Add row-level constraints and checks before Phase 2.
- Audit: basic audit logs for uploads, requests, approvals.
- Secrets: ensure NEXTAUTH_SECRET is strong; guard DATABASE_URL.
