'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Loader2 } from 'lucide-react';

import type { Product } from '@/features/products/types/product.types';
import { microMotorApi } from '../microMotor/services/microMotorApi';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductCard from '../../categoryProductCard';

interface CategoryProductsPageProps {
  categorySlug: string;
}

const FALLBACK_IMAGE = '/micromotor/image.png';

const formatCategoryName = (slug: string): string => {
  return slug
    .split('-')
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(' ');
};

const getProductImage = (product: Product): string => {
  return product.imageUrl || FALLBACK_IMAGE;
};

export default function CategoryProductsPage({
  categorySlug,
}: CategoryProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryName = formatCategoryName(categorySlug);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await microMotorApi.getProductsByCategory(
            categoryName
          );

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
  }, [categoryName]);

  /* ================================================================
     LOADING
  ================================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
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
    <main className="min-h-screen bg-white">
      <Breadcrumb categoryName={categoryName} />
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 mt-16">
        <h1 className="text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">
          {categoryName}
        </h1>

        <div className="mt-4 h-[3px] w-10 bg-brand-600 mb-10" />
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={categorySlug}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}





