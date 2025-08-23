import Link from 'next/link';

export default function PatientDashboard() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Patient Dashboard</h1>
      <ul className="list-disc list-inside space-y-2">
        <li><Link href="/upload" className="underline">Upload Record</Link></li>
        <li><Link href="/records" className="underline">My Records</Link></li>
        <li><Link href="/consents" className="underline">Consent Requests</Link></li>
      </ul>
    </div>
  );
}
