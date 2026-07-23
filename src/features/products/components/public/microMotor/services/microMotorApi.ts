import type { Product } from '@/features/products/types/product.types';
import { publicClient } from '@/utils/api-client';

interface ProductApiResponse {
  success: boolean;
  data: Product[];
}

export const microMotorApi = {
  getProductsByCategory: async (
    category: string
  ): Promise<Product[]> => {
    const response = await publicClient.get<ProductApiResponse>(
      `/products?category=${encodeURIComponent(category)}`
    );

    console.log('API Response:', response.data);

    return response.data.data;
  },
};