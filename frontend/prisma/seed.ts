import { PrismaClient, Role } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const patientEmail = process.env.SEED_PATIENT_EMAIL || 'patient@example.com';
  const doctorEmail = process.env.SEED_DOCTOR_EMAIL || 'doctor@example.com';
  const password = process.env.SEED_PASSWORD || 'Passw0rd!';
  const passwordHash = await bcrypt.hash(password, 10);

  const patient = await prisma.user.upsert({
    where: { email: patientEmail },
    update: {},
    create: {
      email: patientEmail,
      name: 'Alice Patient',
      role: Role.PATIENT,
      passwordHash,
    },
  });

  const doctor = await prisma.user.upsert({
    where: { email: doctorEmail },
    update: {},
    create: {
      email: doctorEmail,
      name: 'Dr. Bob',
      role: Role.DOCTOR,
      passwordHash,
    },
  });

  console.log('Seeded users:', { patient: patient.email, doctor: doctor.email });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
