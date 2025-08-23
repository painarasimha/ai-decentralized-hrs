"use client";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function RecordsPage() {
  const { data, error } = useSWR('/api/records', fetcher);

  if (error) return <div className="p-6">Failed to load</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Records</h1>
      <ul className="space-y-2">
        {data.map((r: any) => (
          <li key={r.id} className="border p-3 rounded">
            <div className="font-medium">{r.title}</div>
            <div className="text-sm text-gray-600">CID: {r.ipfsCid}</div>
            <div className="text-sm">{r.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
