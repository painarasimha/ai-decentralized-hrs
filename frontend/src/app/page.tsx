import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Decentralized Healthcare Records (Phase 1)</h1>
      {!session && (
        <Link href="/signin" className="underline">Sign in</Link>
      )}
      {session && (
        <div className="space-x-4">
          {role === 'PATIENT' && <Link href="/patient" className="underline">Patient Dashboard</Link>}
          {role === 'DOCTOR' && <Link href="/doctor" className="underline">Doctor Dashboard</Link>}
          <Link href="/records" className="underline">Records</Link>
        </div>
      )}
    </div>
  );
}
