"use client";
import { useState } from 'react';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [patientId, setPatientId] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('file', file);
    if (patientId) data.append('patientId', patientId);

    const res = await fetch('/api/records', { method: 'POST', body: data });
    const json = await res.json();
    if (res.ok) setMessage(`Uploaded: ${json.title}`); else setMessage(json.error || 'Failed');
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Upload Record</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="border p-2 w-full" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="border p-2 w-full" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="border p-2 w-full" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <input className="border p-2 w-full" placeholder="Patient ID (for doctors)" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        <button className="bg-black text-white px-4 py-2" type="submit">Upload</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
