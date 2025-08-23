# API (Phase 1)

Base URL: http://localhost:3000

- POST /api/auth/[...nextauth] — NextAuth endpoints
- GET /api/records — list records (patient: own; doctor: granted)
- POST /api/records — upload record (multipart/form-data)
	- fields: title, description, file, patientId (for doctor uploads)
- GET /api/consents — list consent requests (for role)
- POST /api/consents — doctor requests access { patientId, payload }
- PATCH /api/consents — patient responds { id, status, recordIds? }

Auth: NextAuth JWT, credentials provider.

