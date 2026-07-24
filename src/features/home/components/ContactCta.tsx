import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { contactCtaContent } from '@/mocks/mock-home';

export function ContactCta() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-2xl bg-gray-50 lg:grid-cols-2">
          <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[360px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/home-contact.webp"
              alt="Titan OEM precision watch movement"
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-24 w-32 opacity-50"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgb(0 178 173) 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }}
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-brand-600" />
              <span className="text-sm font-bold uppercase tracking-wide text-brand-600">
                Let&apos;s Connect
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              {contactCtaContent.heading}
            </h2>

            <p className="mt-4 text-base text-gray-600 leading-relaxed">{contactCtaContent.description}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/contact-us"
                className="inline-flex text-base items-center justify-center gap-2 border border-brand-600 bg-brand-600 px-2 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-500"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="flex items-center gap-3 border-t border-gray-200 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-brand-600 text-brand-600">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Call Us</p>
                  <p className="text-sm font-bold text-gray-900">{contactCtaContent.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
