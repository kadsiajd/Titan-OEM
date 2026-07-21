import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { AdminLoginRequest, AdminLoginSuccessResponse } from '../types/auth.types';

async function loginRequest(credentials: AdminLoginRequest): Promise<AdminLoginSuccessResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed. Please check your credentials.');
  }

  return data;
}

export function useAdminLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      router.push('/console');
    },
  });
}
