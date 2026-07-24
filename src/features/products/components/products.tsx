'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import type { Product } from '@/features/products/types/product.types';
import { ProductCardGrid } from './productCard';
import { productApi } from '../services/productApi';

export default function CategoryProductsPage({
  categoryId,
}: {
  categoryId: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryName = products[0]?.category || 'Products';
  const isMicroMotor = categoryName.toLowerCase() === 'micromotor';

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await productApi.getAllByCategory(categoryId);

        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        console.error(
          'Failed to load category products:',
          error
        );

        if (isMounted) {
          setError(
            'Unable to load products. Please try again later.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  /* ================================================================
     LOADING
  ================================================================= */

  if (loading) {
    return (
      <main className="bg-white">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2
              className="h-8 w-8 animate-spin text-brand-600"
              aria-hidden="true"
            />

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Loading Products
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* ================================================================
     PAGE
  ================================================================= */

  return (
    <main className="bg-white">
      {/* <Breadcrumb categoryName={categoryName} /> */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 mt-16">
        <h1 className="text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">
          {categoryName}
        </h1>

        <div className="mt-4 h-[3px] w-10 bg-brand-600 mb-10" />

        {isMicroMotor && (
          <p className="mb-10 max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px]">
            Micro motors are at the heart of modern watchmaking, converting
            electrical energy into precise mechanical motion. Our
            high-performance micromotors are engineered for accuracy,
            reliability and long service life — ideal for analogue, digital
            and multifunction quartz movements.
          </p>
        )}

        {/* ERROR */}

        {error && (
          <div
            role="alert"
            className="border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* EMPTY STATE */}

        {!error && products.length === 0 && (
          <div className="border border-dashed border-slate-300 px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-brand-900">
              No Products Found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              There are currently no products available in this
              category.
            </p>
          </div>
        )}

        {/* PRODUCTS ONLY */}

        {!error && products.length > 0 && (
          <ProductCardGrid
            products={products}
            categoryId={categoryId}
          />
        )}
      </section>
    </main>
  );
}
