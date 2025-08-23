"use client";
import { useState } from 'react';

export default function RequestAccessPage() {
  const [patientId, setPatientId] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/consents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId, payload: { note } }),
    });
    const json = await res.json();
    if (res.ok) setMessage(`Requested consent from ${json.patientId}`); else setMessage(json.error || 'Failed');
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Request Access</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="border p-2 w-full" placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
        <button className="bg-black text-white px-4 py-2" type="submit">Send</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
