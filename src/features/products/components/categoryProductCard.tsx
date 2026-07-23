import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/features/products/types/product.types';
import DocumentButton from './documentButton';

const FALLBACK_IMAGE = '/micromotor/image.png';

interface ProductCardProps {
  product: Product;
  categorySlug: string;
  index: number;
}

const getProductImage = (product: Product): string => {
  return product.imageUrl || FALLBACK_IMAGE;
};

export default function ProductCard({
  product,
  categorySlug,
  index,
}: ProductCardProps) {
  const imageUrl = getProductImage(product);

  const productDetailsUrl = `/products/${categorySlug}/${product.id}`;

  return (
    <article className="group border border-slate-200 bg-white transition-all duration-300 hover:border-brand-300 hover:shadow-[0_6px_20px_rgba(0,178,173,0.08)]">
      {/* ================================================================
          PRODUCT IMAGE
      ================================================================= */}

      <div className="relative border-b border-slate-200 bg-slate-50">
        <div className="relative h-[145px] w-full">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <span className="absolute bottom-2 right-3 text-[9px] text-slate-400">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* ================================================================
          PRODUCT CONTENT
      ================================================================= */}

      <div className="p-4">
        {/* PRODUCT NAME */}

        <h3 className="mt-1 font-mono text-sm font-semibold text-brand-900">
          {product.name}
        </h3>

        {/* DESCRIPTION */}

        <p className="mt-2 line-clamp-2 text-[11px] leading-4 text-slate-500">
          {product.description ||
            'High-performance product designed for precision applications.'}
        </p>

        {/* ================================================================
            PRODUCT OVERVIEW
        ================================================================= */}

        {product.overview?.length > 0 && (
          <ProductOverview fields={product.overview} />
        )}

        {/* ================================================================
            DOCUMENTS
        ================================================================= */}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <DocumentButton
            label="Specification Sheet"
            href={product.specificationSheetUrl}
          />

          <DocumentButton
            label="Technical Drawing"
            href={product.technicalDrawingUrl}
          />
        </div>

        {/* ================================================================
            DETAILS BUTTON
        ================================================================= */}

        <Link
          href={productDetailsUrl}
          className="mt-3 flex items-center justify-center border border-brand-600 px-3 py-2 text-[10px] font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
        >
          View Product Details
        </Link>
      </div>
    </article>
  );
}

/* ============================================================================
   PRODUCT OVERVIEW
============================================================================ */

interface ProductOverviewProps {
  fields: Product['overview'];
}

function ProductOverview({
  fields,
}: ProductOverviewProps) {
  return (
    <div className="mt-4 border-t border-slate-200 pt-3">
      <h4 className="mb-2.5 text-[14px] font-bold text-brand-900">
        Product Overview
      </h4>

      <div className="grid grid-cols-2 gap-x-5 gap-y-2">
        {fields.map((field) => (
          <div
            key={field.label}
            className="min-w-0"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 shrink-0 bg-brand-600"
                aria-hidden="true"
              />

              <span className="truncate text-[11px] font-medium uppercase text-brand-900">
                {field.label}
              </span>
            </div>

            <p className="mt-0.5 pl-2.5 font-mono text-[11px] font-medium leading-4 text-slate-500">
              {field.value || '—'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}