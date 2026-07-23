import Image from 'next/image';
import { Building2, Cog, ShieldCheck } from 'lucide-react';
import { aboutData } from '@/features/about/data/aboutData';

const highlights = [
  {
    icon: Building2,
    title: 'Who We Are',
    description: 'OEM manufacturing experts since 2005.',
  },
  {
    icon: Cog,
    title: 'What We Do',
    description: 'Precision components & assemblies for global brands.',
  },
  {
    icon: ShieldCheck,
    title: 'Our Promise',
    description: 'Consistent quality, on-time delivery, every time.',
  },
];

export default function CompanyOverview() {
  return (
    <section id="company" className="flex min-h-screen flex-col justify-center bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* LEFT — Text */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-teal-500" />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-500">
                Company Overview
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Precision. Quality.
              <br />
              Built on <span className="text-teal-500">Trust.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Titan OEM specializes in the manufacturing of high-precision
              components and assemblies for the watch industry and other
              engineering sectors. With advanced technology, skilled
              craftsmanship, and a commitment to excellence, we deliver
              reliable solutions to global clients.
            </p>

            {/* Highlight items */}
            <div className="mt-9 grid grid-cols-1 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3 sm:gap-5">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-3 sm:flex-col sm:items-start sm:gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-teal-500 text-white">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
            <Image
              src={aboutData.company?.image}
              alt="Precision manufactured components"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-teal-500 sm:right-4 sm:top-4" />
          </div>
        </div>
      </div>
    </section>
  );
}