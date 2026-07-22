import { publicClient } from '@/utils/api-client';
import type { Category } from '../types/category.types';

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await publicClient.get<ApiEnvelope<Category[]>>('/categories');
    return data.data;
  },
};
