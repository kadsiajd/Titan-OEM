import { publicClient } from '@/utils/api-client';
import type {
  Product,
} from '../types/product.types';

export const productApi = {
  getAllByCategory: async (category: string): Promise<Product[]> => {
    const { data } = await publicClient.get<Product[]>(`/products?category=${category}`);
    return data;
  },


}
