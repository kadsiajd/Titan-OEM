import type { AdminLoginRequest, AdminLoginResponse } from '@/features/auth/types/auth.types';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_ADMIN_CREDENTIALS = {
  email: 'admin@oem.com',
  password: 'password123',
};

export const mockAuthApi = {
  login: async (credentials: AdminLoginRequest): Promise<AdminLoginResponse> => {
    await delay();

    const isValid =
      credentials.email === MOCK_ADMIN_CREDENTIALS.email &&
      credentials.password === MOCK_ADMIN_CREDENTIALS.password;

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    return {
      token: 'mock-jwt-token',
      isAdmin: true,
      user: {
        id: 'admin-1',
        email: credentials.email,
        name: 'OEM Admin',
      },
    };
  },

  logout: async (): Promise<void> => {
    await delay(100);
  },
};
