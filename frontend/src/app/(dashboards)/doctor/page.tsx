import Link from 'next/link';

export default function DoctorDashboard() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>
      <ul className="list-disc list-inside space-y-2">
        <li><Link href="/records" className="underline">Approved Records</Link></li>
        <li><Link href="/consents" className="underline">My Consent Requests</Link></li>
        <li><Link href="/request-access" className="underline">Request Access</Link></li>
      </ul>
    </div>
  );
}
