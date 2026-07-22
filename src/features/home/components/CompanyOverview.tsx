import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { companyOverviewContent } from '@/mocks/mock-home';

export function CompanyOverview() {
  return (
    <section className="bg-white pb-16 pt-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="block h-1 w-12 bg-brand-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {companyOverviewContent.heading}
          </h2>
          <span className="mt-4 block h-1 w-12 bg-brand-600" />
          <p className="mt-6 text-gray-600">{companyOverviewContent.description}</p>
          <Link
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg">
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
