import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { heroContent } from '@/mocks/mock-home';

export function HeroBanner() {
  return (
    <section
      className="relative flex items-center bg-[url('/hero-banner.jpg')] bg-cover bg-left bg-no-repeat"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/30 to-transparent" />
      <div className="container-page relative py-16">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {heroContent.heading}
          </h1>
          <p className="mt-4 text-lg text-gray-200">{heroContent.description}</p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700"
          >
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
