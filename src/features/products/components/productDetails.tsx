'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Download, FileText, Heart, Loader2, X, ZoomIn } from 'lucide-react';
import { useEffect, useState } from 'react';

import { productApi } from '../services/productApi';
import type { Product } from '../types/product.types';

const FALLBACK_IMAGE = '/micromotor/image.png';

interface ProductDetailsProps {
  categoryId: string;
  productId: string;
}

export default function ProductDetails({ categoryId, productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    let active = true;

    productApi
      .getAllByCategory(categoryId)
      .then((products) => products.find((item) => item.id === productId) ?? null)
      .then((data) => active && setProduct(data))
      .catch((error) => console.error('Failed to load product details:', error))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [categoryId, productId]);

  if (loading) {
    return <main className="flex min-h-[560px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand-600" /></main>;
  }

  if (!product) {
    return (
      <main className="flex min-h-[560px] flex-col items-center justify-center px-5">
        <h1 className="text-2xl font-bold text-brand-900">Product not found</h1>
        <Link href={`/products/${categoryId}`} className="mt-4 text-sm font-semibold text-brand-600">Back to products</Link>
      </main>
    );
  }

  const image = product.imageUrl || FALLBACK_IMAGE;
  const documents = [
    { label: 'Specification Sheet', href: product.specificationSheetUrl },
    { label: 'Technical Drawing', href: product.technicalDrawingUrl },
  ];

  return (
    <main className="bg-white">
      <div className="border-b border-slate-100">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-4 text-xs text-slate-400 sm:px-8 lg:px-10" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-600">Home</Link><span>›</span>
          <Link href={`/products/${categoryId}`} className="hover:text-brand-600">{product.category}</Link><span>›</span>
          <span className="font-medium text-brand-900">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-16">
          <ProductGallery image={image} name={product.name} onZoom={() => setIsZoomed(true)} />

          <div className="w-full max-w-2xl pt-1">
           

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">{product.name}</h1>
            </div>
            <p className="mt-3 text-sm font-medium text-brand-600">{product.category} movement</p>

            <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              {product.overview.map((field) => (
                <div key={field.label} className="grid grid-cols-[minmax(7.5rem,0.85fr)_minmax(0,1.15fr)] gap-4 py-3 text-sm">
                  <dt className="font-semibold text-brand-900">{field.label}</dt>
                  <dd className="text-slate-600">{field.value || '—'}</dd>
                </div>
              ))}
            </dl>

            <Link href={`/contact-us?product=${encodeURIComponent(product.name)}`} className="mt-7 flex h-12 w-full max-w-xl items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white transition hover:bg-brand-700">
              Enquiry Now <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <section className="mt-12 border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-brand-900">Product Documents</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {documents.map((document) => <DocumentCard key={document.label} {...document} />)}
          </div>
        </section>
      </section>

      {isZoomed && (
        <div role="dialog" aria-modal="true" aria-label={`${product.name} image preview`} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-5" onClick={() => setIsZoomed(false)}>
          <button type="button" onClick={() => setIsZoomed(false)} aria-label="Close image preview" className="absolute right-5 top-5 rounded-full bg-white p-2 text-slate-800"><X className="h-5 w-5" /></button>
          <div className="relative h-[min(82vh,760px)] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <Image src={image} alt={product.name} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </main>
  );
}

function ProductGallery({ image, name, onZoom }: { image: string; name: string; onZoom: () => void }) {
  return (
    <div className="w-full max-w-md justify-self-center lg:justify-self-start">
      <button type="button" onClick={onZoom} aria-label={`Zoom ${name} image`} className="relative aspect-[4/3] w-full overflow-hidden border border-slate-200 bg-slate-50 text-left">
        <Image src={image} alt={name} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-8" />
        <span className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm"><ZoomIn className="h-4 w-4" /></span>
      </button>
      <div className="mt-4 flex gap-3">
        <button type="button" aria-label={`View ${name} image`} className="relative h-16 w-16 border-2 border-brand-600 bg-slate-50">
          <Image src={image} alt="" fill sizes="64px" className="object-contain p-1" />
        </button>
      </div>
    </div>
  );
}

function DocumentCard({ label, href }: { label: string; href: string }) {
  if (!href) {
    return (
      <div className="flex items-center gap-3 border border-slate-200 bg-slate-50 p-4 text-slate-400">
        <FileText className="h-7 w-7 shrink-0" />
        <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-slate-500">{label}</span><span className="mt-1 block text-xs">Not available</span></span>
      </div>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-slate-200 p-4 transition hover:border-brand-400 hover:shadow-sm">
      <FileText className="h-7 w-7 shrink-0 text-red-500" />
      <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-brand-900">{label}</span><span className="mt-1 block text-xs text-slate-400">PDF document</span></span>
      <Download className="h-5 w-5 text-brand-600" />
    </a>
  );
}
