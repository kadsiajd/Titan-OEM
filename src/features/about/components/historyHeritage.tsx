import { Flag, Settings, Users, Award, TrendingUp } from 'lucide-react';
import { aboutData } from '../data/aboutData';

const icons = [Flag, Settings, Users, Award, TrendingUp];

export default function HistoryHeritage() {
  return (
    <section id="history" className="bg-slate-50 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-teal-500" />
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-teal-500">
              History &amp; Heritage
            </p>
            <span className="h-px w-8 bg-teal-500" />
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Journey of Excellence
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            From our inception to becoming a trusted global partner, our
            journey has been driven by quality, innovation, and trust.
          </p>
        </div>

        {/* Timeline: stacked + left rail on mobile/tablet, horizontal on desktop */}
        <ol className="mt-14 flex flex-col gap-10 lg:mt-20 lg:flex-row lg:gap-4">
          {aboutData.history.map((item, index) => {
            const Icon = icons[index % icons.length];
            const isLast = index === aboutData.history.length - 1;

            return (
              <li key={item.year} className="relative flex flex-1 gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                {/* Connector: vertical rail on mobile, horizontal rail on desktop */}
                {!isLast && (
                  <span
                    className="absolute left-7 top-16 h-[calc(100%+1.5rem)] w-px bg-teal-500/25 lg:left-1/2 lg:top-7 lg:h-px lg:w-full lg:translate-x-1/2"
                    aria-hidden="true"
                  />
                )}

                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white shadow-sm ring-4 ring-slate-50">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>

                <div className="lg:mt-5">
                  <p className="font-mono text-sm font-bold text-teal-500">
                    {item.year}
                  </p>

                  <h3 className="mt-1 text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500 lg:mx-auto">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}