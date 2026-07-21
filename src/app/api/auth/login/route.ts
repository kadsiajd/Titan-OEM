import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useMockData } from '@/config/use-mock-data';
import { MOCK_ADMIN_CREDENTIALS } from '@/mocks/mock-auth';
import { signSessionToken } from '@/lib/auth/jwt';
import { setSessionCookie } from '@/lib/auth/session';
import type { AdminLoginRequest } from '@/features/auth/types/auth.types';

interface LoginResult {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

async function authenticateWithMock(credentials: AdminLoginRequest): Promise<LoginResult | null> {
  const isValid =
    credentials.email === MOCK_ADMIN_CREDENTIALS.email &&
    credentials.password === MOCK_ADMIN_CREDENTIALS.password;

  if (!isValid) {
    return null;
  }

  const token = await signSessionToken({
    sub: 'admin-1',
    email: credentials.email,
    name: 'OEM Admin',
    isAdmin: true,
  });

  return {
    token,
    user: {
      id: 'admin-1',
      email: credentials.email,
      name: 'OEM Admin',
    },
  };
}

async function authenticateWithApi(credentials: AdminLoginRequest): Promise<LoginResult | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  const token = await signSessionToken({
    sub: data.user.id,
    email: data.user.email,
    name: data.user.name,
    isAdmin: data.isAdmin,
    apiToken: data.token,
  });

  return {
    token,
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const credentials = (await request.json()) as AdminLoginRequest;

    if (!credentials.email || !credentials.password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const result = useMockData
      ? await authenticateWithMock(credentials)
      : await authenticateWithApi(credentials);

    if (!result) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    await setSessionCookie(result.token);

    return NextResponse.json({ user: result.user });
  } catch {
    return NextResponse.json({ message: 'Login failed. Please try again.' }, { status: 500 });
  }
}
