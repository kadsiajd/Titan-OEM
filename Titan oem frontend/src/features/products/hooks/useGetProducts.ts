import { useQuery } from '@tanstack/react-query';
import { productApi } from '../services/productApi';

export function useGetProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getAll(),
  });
}

export function useGetProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productApi.getById(id),
    enabled: Boolean(id),
  });
}
