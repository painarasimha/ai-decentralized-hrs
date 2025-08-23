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
    const toMe = await prisma.consentRequest.findMany({ where: { patientId: userId }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json(toMe);
  } else {
    const mine = await prisma.consentRequest.findMany({ where: { requesterId: userId }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json(mine);
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;
  const body = await req.json();

  if (role !== 'DOCTOR') return NextResponse.json({ error: 'Only doctors can request consent' }, { status: 403 });

  const created = await prisma.consentRequest.create({
    data: { requesterId: userId, patientId: body.patientId, payload: body.payload || {} },
  });

  await prisma.auditLog.create({ data: { actorId: userId, action: 'REQUEST_CONSENT', targetId: created.id, meta: body } });

  return NextResponse.json(created, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;
  const body = await req.json();

  if (role !== 'PATIENT') return NextResponse.json({ error: 'Only patients can respond' }, { status: 403 });

  const updated = await prisma.consentRequest.update({
    where: { id: body.id },
    data: { status: body.status, respondedAt: new Date() },
  });

  if (body.status === 'APPROVED' && Array.isArray(body.recordIds)) {
    for (const recordId of body.recordIds) {
      await prisma.accessGrant.upsert({
        where: { recordId_granteeId: { recordId, granteeId: updated.requesterId } },
        update: {},
        create: { recordId, granteeId: updated.requesterId, grantedById: userId },
      });
    }
  }

  await prisma.auditLog.create({ data: { actorId: userId, action: 'RESPOND_CONSENT', targetId: updated.id, meta: body } });

  return NextResponse.json(updated);
}
