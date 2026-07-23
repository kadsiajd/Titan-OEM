'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCustomers } from '../services/aboutApi';
import { Customer } from '../types/about.types';

const FALLBACK_LOGO = '/about/m1.jpeg';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stores customer IDs whose logo URL failed
  const [failedLogos, setFailedLogos] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCustomers();

        setCustomers(data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
        setError('Unable to load customers.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleImageError = (customerId: string) => {
    setFailedLogos((previous) => {
      const updated = new Set(previous);
      updated.add(customerId);
      return updated;
    });
  };

  const getLogoUrl = (customer: Customer) => {
    if (
      !customer.logoUrl ||
      failedLogos.has(customer.id)
    ) {
      return FALLBACK_LOGO;
    }

    return customer.logoUrl;
  };

  // Duplicate the list so the track can loop seamlessly from -50%.
  const marqueeItems = [...customers, ...customers];

  // Slower glide the more logos there are, so spacing feels consistent.
  const durationSeconds = Math.max(customers.length * 3, 15);

  return (
    <section id="customers" className="flex min-h-screen flex-col justify-center bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-[#00b2ad]">
            Our Customers
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trusted by Leading Brands
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            We are proud to partner with global leaders across industries.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-12 flex justify-center">
            <p className="text-sm text-slate-500">
              Loading customers...
            </p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="mt-12 flex justify-center">
            <p className="text-sm text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading &&
          !error &&
          customers.length === 0 && (
            <div className="mt-12 flex justify-center">
              <p className="text-sm text-slate-500">
                No customers found.
              </p>
            </div>
          )}

        {/* Marquee */}
        {!isLoading &&
          !error &&
          customers.length > 0 && (
            <div className="group relative mt-12 overflow-hidden">
              {/* Fade edges so logos glide in/out instead of clipping hard */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />

              <div
                className="marquee-track flex w-max items-center gap-14 sm:gap-20"
                style={{ animationDuration: `${durationSeconds}s` }}
              >
                {marqueeItems.map((customer, index) => (
                  <div
                    key={`${customer.id}-${index}`}
                    className="flex shrink-0 flex-col items-center gap-3"
                  >
                    {/* Logo */}
                    <div className="relative h-14 w-32 sm:h-16 sm:w-36">
                      <Image
                        src={getLogoUrl(customer)}
                        alt={`${customer.name} logo`}
                        fill
                        sizes="144px"
                        className="object-contain"
                        onError={() => handleImageError(customer.id)}
                      />
                    </div>

                    {/* Company Name */}
                    <p className="whitespace-nowrap text-center text-xs font-semibold tracking-wide text-slate-700">
                      {customer.name}
                    </p>
                  </div>
                ))}
              </div>

              <style jsx>{`
                .marquee-track {
                  animation: marquee-scroll linear infinite;
                }

                .group:hover .marquee-track {
                  animation-play-state: paused;
                }

                @keyframes marquee-scroll {
                  from {
                    transform: translateX(0);
                  }
                  to {
                    transform: translateX(-50%);
                  }
                }

                @media (prefers-reduced-motion: reduce) {
                  .marquee-track {
                    animation: none;
                  }
                }
              `}</style>
            </div>
          )}
      </div>
    </section>
  );
}