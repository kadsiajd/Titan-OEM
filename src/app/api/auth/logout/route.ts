import { NextResponse } from 'next/server';
import { useMockData } from '@/config/use-mock-data';
import { clearSessionCookie } from '@/lib/auth/session';

export async function POST() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

  if (!useMockData) {
    try {
      await fetch(`${apiUrl}/auth/logout`, { method: 'POST' });
    } catch {
      // Continue clearing local session even if backend logout fails.
    }
  }

  await clearSessionCookie();

  return NextResponse.json({ success: true });
}
