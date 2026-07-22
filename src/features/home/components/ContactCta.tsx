import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { contactCtaContent } from '@/mocks/mock-home';

export function ContactCta() {
  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-2xl bg-gray-50 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto">
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

          <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-brand-600" />
              <span className="text-sm font-bold uppercase tracking-wide text-brand-600">
                Let&apos;s Connect
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {contactCtaContent.heading}
            </h2>

            <p className="mt-4 text-gray-600">{contactCtaContent.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-md border border-brand-600 px-5 py-3 text-sm font-semibold text-brand-600 hover:bg-brand-600 hover:text-white"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="flex items-center gap-3 border-l border-gray-300 pl-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-600 text-brand-600">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-brand-600">Call Us</p>
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
