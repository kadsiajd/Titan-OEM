import { SignJWT, jwtVerify } from 'jose';
import { SESSION_MAX_AGE_SECONDS } from './constants';

export interface SessionPayload {
  sub: string;
  email: string;
  name: string;
  isAdmin: boolean;
  apiToken?: string;
}

function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;

  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET must be set in production');
  }

  return new TextEncoder().encode(secret ?? 'dev-only-auth-secret-change-me');
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getAuthSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, getAuthSecret());

  return {
    sub: payload.sub as string,
    email: payload.email as string,
    name: payload.name as string,
    isAdmin: payload.isAdmin === true,
    apiToken: typeof payload.apiToken === 'string' ? payload.apiToken : undefined,
  };
}

export function isValidAdminSession(payload: SessionPayload): boolean {
  return Boolean(payload.sub && payload.email && payload.isAdmin);
}
