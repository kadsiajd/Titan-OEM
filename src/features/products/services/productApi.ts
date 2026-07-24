import { publicClient } from '@/utils/api-client';
import { mapApiProductToProduct } from '../mappers/product.mapper';
import type { Product, ProductsResponse } from '../types/product.types';
// import type { ProductsResponse } from '../types/product-api.types';

export const productApi = {
  getAllByCategory: async (categoryId: string): Promise<Product[]> => {
    const { data } = await publicClient.get<ProductsResponse>(
      `/products`,
      {
        params: {
          categoryId,
        },
      }
    );

    if (!data.success || !Array.isArray(data.data)) {
      throw new Error('The products API returned an invalid response.');
    }

    return data.data.map(mapApiProductToProduct);
  },
};
