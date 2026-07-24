import { publicClient } from '@/utils/api-client';
import type { Category } from '../types/category.types';

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 'micromotor',
    name: 'Micro Motor',
    description: 'High performance micro motors for watch movements',
    imageUrl: '/micromotor/image.png',
  },
  {
    id: 'quartz-movement',
    name: 'Quartz Movement',
    description: 'Precision engineered quartz watch movements',
    imageUrl: '/micromotor/image.png',
  },
  {
    id: 'mechanical-movement',
    name: 'Mechanical Movement',
    description: 'Automatic and manual mechanical movements',
    imageUrl: '/micromotor/image.png',
  },
  {
    id: 'tool-room',
    name: 'Tool Room & Machining',
    description: 'High-precision tooling and OEM manufacturing services',
    imageUrl: '/micromotor/image.png',
  },
];

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    try {
      const { data } = await publicClient.get<ApiEnvelope<Category[]>>('/categories');
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
      return FALLBACK_CATEGORIES;
    } catch (error) {
      console.warn('Category API unavailable, using fallback categories:', error);
      return FALLBACK_CATEGORIES;
    }
  },
};
