'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetCategories } from '../hooks/useGetCategories';
import { CategoryCard } from './CategoryCard';

export function CategorySection() {
  const { data: categories, isLoading, error } = useGetCategories();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToIndex(index: number) {
    const container = scrollRef.current;
    const child = container?.children[index];
    if (child instanceof HTMLElement) {
      child.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  }

  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;

    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(childCenter - scrollCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  }

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="container-page text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-600">
          Product Categories
        </p>
        <span className="mx-auto mt-2 block h-1 w-12 bg-brand-600" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Explore Our Product Categories
        </h2>
        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          High-quality OEM solutions across a wide range of product categories.
        </p>

        {isLoading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-96 animate-pulse rounded-lg bg-gray-200" />
            ))}
          </div>
        )}

        {error && (
          <div className="mt-12 rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
            Failed to load categories. Please try again later.
          </div>
        )}

        {categories && (
          <div className="relative mt-12 px-2 sm:px-0">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous category"
              className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-md backdrop-blur-sm disabled:opacity-30 sm:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 text-left [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
            >
              {categories.map((category) => (
                <div key={category.id} className="w-[82vw] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(categories.length - 1, activeIndex + 1))}
              disabled={activeIndex >= categories.length - 1}
              aria-label="Next category"
              className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-md backdrop-blur-sm disabled:opacity-30 sm:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  aria-label={`Go to ${category.name}`}
                  className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-brand-600' : 'w-2 bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
