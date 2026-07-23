import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { aboutData } from '@/features/about/data/aboutData';

export default function AboutHero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white text-slate-900"
    >
      <div className="mx-auto max-w-8xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">

          <div className="relative">

            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-brand-500" />
              <span className="font-mono text-[15px] font-bold uppercase tracking-[0.25em] text-brand-500">
                {aboutData.hero.subtitle}
              </span>
            </div>

            <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl">
              Building ideas
              <span className="block text-brand-500">
                into reality.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
              {aboutData.hero.description}
            </p>
            <button
              type="button"
              className="group mt-8 inline-flex items-center gap-3 border border-brand-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand-500 transition-all duration-300 hover:bg-brand-500 hover:text-white"
            >
              Discover More

              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>


            <div className="mt-10 grid max-w-lg grid-cols-2 border-y border-slate-200">
              <div className="border-r border-slate-200 py-5 pr-5">
                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-brand-500">
                  Expertise
                </p>

                <p className="mt-2 text-sm font-medium text-slate-800">
                  OEM Manufacturing
                </p>
              </div>

              <div className="py-5 pl-5">
                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-brand-500">
                  Approach
                </p>

                <p className="mt-2 text-sm font-medium text-slate-800">
                  Innovation Driven
                </p>
              </div>
            </div>

          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
              <Image
                src={aboutData.hero.image}
                alt="Titan OEM Manufacturing Facility"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                <div className="flex items-center gap-3 bg-brand-500 px-4 py-2.5">

                  <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-white">
                    Manufacturing Excellence
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 -z-0 h-24 w-24 border-b border-r border-brand-500 sm:-bottom-5 sm:-right-5 sm:h-32 sm:w-32" />


            <div className="absolute -left-3 -top-3 h-12 w-12 border-l border-t border-brand-500 sm:-left-5 sm:-top-5 sm:h-16 sm:w-16" />

          </div>
        </div>
      </div>
    </section>
  );
}