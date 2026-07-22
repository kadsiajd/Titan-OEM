import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../services/categoryApi';

export function useGetCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAll(),
  });
}
