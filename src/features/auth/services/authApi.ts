import { useMockData } from '@/config/use-mock-data';
import { mockAuthApi } from '@/mocks/mock-auth';
import { publicClient } from '@/utils/api-client';
import type { AdminLoginRequest, AdminLoginResponse } from '../types/auth.types';

export const authApi = {
  login: async (credentials: AdminLoginRequest): Promise<AdminLoginResponse> => {
    if (useMockData) {
      return mockAuthApi.login(credentials);
    }
    const { data } = await publicClient.post<AdminLoginResponse>('/auth/login', credentials);
    return data;
  },

  logout: async (): Promise<void> => {
    if (useMockData) {
      return mockAuthApi.logout();
    }
    await publicClient.post('/auth/logout');
  },
};
