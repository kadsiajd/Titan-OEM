import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../types/category.types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="aspect-[4/3] bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
        <span className="mx-auto mt-2 block h-1 w-8 bg-brand-600" />
        <p className="mt-4 text-sm text-gray-600">{category.description}</p>
        <Link
          href={`/products/${encodeURIComponent(category.id)}`}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-600 hover:text-white"
        >
          View Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
