import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { enquiryBannerContent } from '@/mocks/mock-contact';

export function EnquiryBanner() {
  return (
    <section className="bg-white pb-16">
      <div className="container-page">
        <div className="flex flex-col items-start gap-6 rounded-lg bg-brand-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
              <Info className="h-4 w-4" />
            </span>
            <p className="text-sm text-gray-700">{enquiryBannerContent.message}</p>
          </div>

          <Link
            href="#"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Enquire Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
