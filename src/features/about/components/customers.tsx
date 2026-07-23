'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { aboutData } from '../data/aboutData';

export default function Customers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild?.clientWidth ?? 200;
    el.scrollBy({
      left: direction === 'left' ? -(cardWidth + 16) : cardWidth + 16,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild?.clientWidth ?? 200;
    setActiveIndex(Math.round(el.scrollLeft / (cardWidth + 16)));
  };

  return (
    <section id="customers" className="flex min-h-screen flex-col justify-center bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00b2ad]">
            Our Customers
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trusted by Leading Brands
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            We are proud to partner with global leaders across industries.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12 flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#00b2ad] text-[#00b2ad] transition-colors hover:bg-[#00b2ad] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00b2ad]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {aboutData.customers.map((customer) => (
              <div
                key={customer.name}
                className="flex w-[42%] shrink-0 snap-start flex-col items-center gap-3 border border-slate-200 p-5 transition-colors hover:border-[#00b2ad] sm:w-[30%] sm:p-6 lg:w-[180px]"
              >
                <div className="relative h-9 w-full sm:h-10">
                  <Image
                    src={customer.logo}
                    alt={customer.name}
                    fill
                    sizes="180px"
                    className="object-contain grayscale transition-all duration-300 hover:grayscale-0"
                  />
                </div>

                <p className="text-[11px] font-medium text-slate-600 sm:text-xs">
                  {customer.name}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#00b2ad] text-[#00b2ad] transition-colors hover:bg-[#00b2ad] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00b2ad]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {aboutData.customers.map((customer, index) => (
            <span
              key={customer.name}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? 'w-5 bg-[#00b2ad]' : 'w-1.5 bg-[#00b2ad]/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}