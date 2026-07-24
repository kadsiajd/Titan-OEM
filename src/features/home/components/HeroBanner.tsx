import Link from 'next/link';
import {  ArrowUpRight } from 'lucide-react';
import { heroContent } from '@/mocks/mock-home';

export function HeroBanner() {
  return (
    <section
      className="relative flex min-h-[480px] items-center bg-[url('/hero-banner.jpg')] bg-cover bg-center bg-no-repeat py-16 sm:min-h-[560px] sm:py-24 lg:min-h-[640px] lg:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />
      <div className="container-page relative py-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heroContent.heading}
          </h1>
          <p className="mt-4 text-base text-gray-200 sm:text-lg lg:text-xl">{heroContent.description}</p>
          <Link
            href="/products/a0a6b1b8-da6a-4d30-b522-3da71860ae55"
            className="mt-8 inline-flex items-center gap-2 bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-500 sm:text-base"
          >
            Explore Products
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
