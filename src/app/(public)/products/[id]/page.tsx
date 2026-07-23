import type { Metadata } from 'next';
import Link from 'next/link';
import { productApi } from '@/features/products/services/productApi';
import { TechnicalSpecs } from '@/features/products/components/public/TechnicalSpecs';
import { Button } from '@/components/ui/Button';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await productApi.getById(id);
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.imageUrl ? [product.imageUrl] : [],
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
    };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  let product;
  try {
    product = await productApi.getById(id);
  } catch {
    return (
      <div className="container-page flex min-h-screen flex-col items-center justify-center py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
        <p className="mt-2 text-gray-600">The product you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block">
          <Button variant="secondary">Back to Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page min-h-screen py-10">
      <Link href="/" className="mb-6 inline-block text-sm text-brand-600 hover:underline">
        &larr; Back to Catalog
      </Link>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-1 text-sm text-gray-500">SKU: {product.sku}</p>
          <p className="mt-6 text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              Availability:{' '}
              <span className="font-medium text-gray-900">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </p>
          </div>
        </div>
      </div>
      <TechnicalSpecs product={product} />
    </div>
  );
}
