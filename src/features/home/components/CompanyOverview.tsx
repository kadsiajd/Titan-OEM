import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { companyOverviewContent } from '@/mocks/mock-home';

export function CompanyOverview() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="block h-1 w-12 bg-brand-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {companyOverviewContent.heading}
          </h2>
          <p className="mt-6 text-base text-gray-600 sm:text-lg leading-relaxed">{companyOverviewContent.description}</p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 bg-brand-600 px-3 py-1.5 text-base font-medium text-white transition hover:bg-brand-500"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/company-overview.png"
            alt="Titan OEM facility"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
