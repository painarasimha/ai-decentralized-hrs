"use client";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ConsentsPage() {
  const { data, error, mutate } = useSWR('/api/consents', fetcher);

  if (error) return <div className="p-6">Failed to load</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  async function respond(id: string, status: 'APPROVED' | 'DENIED') {
    await fetch('/api/consents', { method: 'PATCH', body: JSON.stringify({ id, status }), headers: { 'Content-Type': 'application/json' } });
    mutate();
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Consent Requests</h1>
      <ul className="space-y-2">
        {data.map((c: any) => (
          <li key={c.id} className="border p-3 rounded">
            <div className="font-medium">From: {c.requesterId}</div>
            <div className="text-sm">Status: {c.status}</div>
            {c.status === 'PENDING' && (
              <div className="space-x-2 mt-2">
                <button className="bg-green-600 text-white px-3 py-1" onClick={() => respond(c.id, 'APPROVED')}>Approve</button>
                <button className="bg-red-600 text-white px-3 py-1" onClick={() => respond(c.id, 'DENIED')}>Deny</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
