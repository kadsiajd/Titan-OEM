'use client';

import { useGetProducts } from '../hooks/useGetProducts';
import { ProductGrid } from './public/ProductGrid';

export function ProductCatalog() {
  const { data, isLoading, error } = useGetProducts();

  return (
    <ProductGrid
      products={data?.products ?? []}
      isLoading={isLoading}
      error={error}
    />
  );
}
