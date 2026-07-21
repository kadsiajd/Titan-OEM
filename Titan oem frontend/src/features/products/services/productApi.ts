import { useMockData } from '@/config/use-mock-data';
import { mockProductApi } from '@/mocks/mock-products';
import { adminClient, publicClient } from '@/utils/api-client';
import type {
  CreateProductRequest,
  Product,
  ProductsResponse,
  UpdateProductRequest,
} from '../types/product.types';

export const productApi = {
  getAll: async (): Promise<ProductsResponse> => {
    if (useMockData) {
      return mockProductApi.getAll();
    }
    const { data } = await publicClient.get<ProductsResponse>('/products');
    return data;
  },

  getById: async (id: string): Promise<Product> => {
    if (useMockData) {
      return mockProductApi.getById(id);
    }
    const { data } = await publicClient.get<Product>(`/products/${id}`);
    return data;
  },

  create: async (payload: CreateProductRequest): Promise<Product> => {
    if (useMockData) {
      return mockProductApi.create(payload);
    }
    const { data } = await adminClient.post<Product>('/products', payload);
    return data;
  },

  update: async ({ id, ...payload }: UpdateProductRequest): Promise<Product> => {
    if (useMockData) {
      return mockProductApi.update({ id, ...payload });
    }
    const { data } = await adminClient.put<Product>(`/products/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    if (useMockData) {
      return mockProductApi.delete(id);
    }
    await adminClient.delete(`/products/${id}`);
  },
};
