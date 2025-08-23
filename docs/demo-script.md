# Demo Script (Phase 1)

1) Start app
- Ensure Postgres is running
- In `frontend/`: `npm run dev`

2) Sign in as patient (patient@example.com / Passw0rd!)
- Upload a record
- See it in Records

3) Sign in as doctor (doctor@example.com / Passw0rd!)
- Request access to the patient by ID

4) Switch back to patient
- Open Consents; approve request and select records

5) Back to doctor
- Records page now shows approved records

Note: IPFS and blockchain are mocked in Phase 1.
