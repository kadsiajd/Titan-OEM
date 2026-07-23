'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Crosshair,
  Loader2,
  Settings2,
  ShieldCheck,
} from 'lucide-react';

import type { Product } from '@/features/products/types/product.types';
import { microMotorApi } from './services/microMotorApi';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductCard from '../../categoryProductCard';

/* ============================================================================
   CONSTANTS
============================================================================ */

const FALLBACK_IMAGE = '/micromotor/image.png';

const FEATURES = [
  {
    icon: Crosshair,
    title: 'Precision Engineering',
    description:
      'Designed with advanced technology and tight tolerances to deliver accurate and consistent performance in every application.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Performance',
    description:
      'Built for durability and stability, our micromotors ensure dependable operation and long service life in demanding conditions.',
  },
  {
    icon: Settings2,
    title: 'Versatile Applications',
    description:
      'Suitable for a wide range of quartz movements, from standard to multifunction, including analogue, digital and hybrid designs.',
  },
] as const;

/* ============================================================================
   TYPES
============================================================================ */

interface ProductListingProps {
  categorySlug: string;
  heroImageUrl?: string;
}

/* ============================================================================
   HELPERS
============================================================================ */

const formatCategoryName = (slug: string): string => {
  return slug
    .split('-')
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
};



/* ============================================================================
   MAIN COMPONENT
============================================================================ */

export default function ProductListing({
  categorySlug,
  heroImageUrl,
}: ProductListingProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryName = formatCategoryName(categorySlug);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data =
          await microMotorApi.getProductsByCategory(categoryName);

        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to load products:', error);

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

  if (loading) {
    return <ProductListingLoader />;
  }

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <Breadcrumb categoryName={categoryName} />

      <HeroSection
        categoryName={categoryName}
        heroImageUrl={heroImageUrl}
      />

      <FeatureSection />

      <ProductRange
        products={products}
        error={error}
        categoryName={categoryName}
        categorySlug={categorySlug}
      />
    </main>
  );
}

/* ============================================================================
   LOADING
============================================================================ */

function ProductListingLoader() {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex min-h-[600px] items-center justify-center">
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

/* ============================================================================
   BREADCRUMB
============================================================================ */



function HeroSection({
  categoryName,
  heroImageUrl,
}: {
  categoryName: string;
  heroImageUrl?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-r from-white via-white to-brand-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid min-h-[330px] items-center lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="py-12 lg:py-14">
            <h1 className="text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">
              {categoryName}
            </h1>

            <div className="mt-4 h-[3px] w-10 bg-brand-600" />

            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px]">
              Micro motors are at the heart of modern
              watchmaking, converting electrical energy
              into precise mechanical motion. Our
              high-performance micromotors are engineered
              for accuracy, reliability and long service
              life — ideal for analogue, digital and
              multifunction quartz movements.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex min-h-[260px] items-center justify-center lg:min-h-[330px]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,178,173,0.10),_transparent_65%)]"
            />

            <Image
              src={heroImageUrl || FALLBACK_IMAGE}
              alt={`${categoryName} micro motor`}
              width={700}
              height={400}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="relative z-10 max-h-[300px] w-full object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   FEATURE SECTION
============================================================================ */

function FeatureSection() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl md:grid-cols-3">

        {FEATURES.map(
          (
            {
              icon: Icon,
              title,
              description,
            },
            index
          ) => (
            <div
              key={title}
              className={[
                'flex gap-5 px-6 py-8 lg:px-10',
                index > 0
                  ? 'border-t border-slate-200 md:border-l md:border-t-0'
                  : '',
              ].join(' ')}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-brand-100 bg-brand-50">
                <Icon
                  className="h-7 w-7 text-brand-600"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-brand-900">
                  {title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {description}
                </p>
              </div>
            </div>
          )
        )}

      </div>
    </section>
  );
}

/* ============================================================================
   PRODUCT RANGE
============================================================================ */

function ProductRange({
  products,
  error,
  categoryName,
  categorySlug,
}: {
  products: Product[];
  error: string | null;
  categoryName: string;
  categorySlug: string;
}) {
  return (
    <section
      id="range"
      className="bg-white py-12 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <header className="mb-7">
          <h2 className="text-xl font-bold text-brand-900">
            Our {categoryName} Range
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            High quality micromotors designed for precision,
            durability and optimal performance.
          </p>
        </header>

        {error && (
          <div
            role="alert"
            className="border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {!error && products.length === 0 && (
          <div className="border border-dashed border-slate-300 px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-slate-800">
              No Products Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              There are currently no products available
              in this category.
            </p>
          </div>
        )}

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

      </div>
    </section>
  );
}

/* ============================================================================
   PRODUCT CARD
============================================================================ */




/* ============================================================================
   DOCUMENT BUTTON
============================================================================ */

