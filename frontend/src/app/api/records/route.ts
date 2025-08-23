import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;

  if (role === 'PATIENT') {
    const records = await prisma.healthRecord.findMany({ where: { patientId: userId }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json(records);
  } else {
    // Doctor: show records they have access to
    const grants = await prisma.accessGrant.findMany({ where: { granteeId: userId }, include: { record: true } });
    return NextResponse.json(grants.map((g) => g.record));
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;

  const form = await req.formData();
  const title = String(form.get('title') || 'Untitled');
  const description = String(form.get('description') || '');
  const file = form.get('file') as File | null;

  if (!file) return NextResponse.json({ error: 'File required' }, { status: 400 });

  // Mock IPFS: generate a fake CID based on file content and prefix
  const prefix = process.env.MOCK_IPFS_PREFIX || 'ipfs://mock/';
  const bytes = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const mockCid = prefix + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 46);

  // Consent check: doctors can upload only if consent is approved
  let targetPatientId = role === 'PATIENT' ? userId : String(form.get('patientId') || '');
  if (role === 'DOCTOR') {
    if (!targetPatientId) return NextResponse.json({ error: 'patientId required' }, { status: 400 });
    const consent = await prisma.consentRequest.findFirst({
      where: { requesterId: userId, patientId: targetPatientId, status: 'APPROVED' },
    });
    if (!consent) return NextResponse.json({ error: 'Consent required' }, { status: 403 });
  }

  const created = await prisma.healthRecord.create({
    data: {
      title,
      description,
      contentType: file.type || 'application/octet-stream',
      sizeBytes: file.size,
      ipfsCid: mockCid,
      patientId: targetPatientId,
      uploadedById: userId,
    },
  });

  await prisma.auditLog.create({
    data: { actorId: userId, action: 'UPLOAD_RECORD', targetId: created.id, meta: { title } as any },
  });

  return NextResponse.json(created, { status: 201 });
}
