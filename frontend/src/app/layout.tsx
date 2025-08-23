import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Decentralized HRS',
  description: 'Phase 1 demo',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="border-b p-4 flex justify-between">
          <Link href="/" className="font-semibold">HRS</Link>
          <nav className="space-x-4">
            <Link href="/records">Records</Link>
            <Link href="/upload">Upload</Link>
            <Link href="/consents">Consents</Link>
          </nav>
          <div>
            {!session ? <Link href="/signin">Sign in</Link> : <span>{session.user?.email}</span>}
          </div>
        </header>
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
