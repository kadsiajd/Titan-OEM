import { contactHeroContent } from '@/mocks/mock-contact';

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="flex h-[420px] sm:h-[480px]">
        <div className="relative z-10 flex w-[85%] shrink-0 flex-col justify-center pl-6 sm:w-[440px] sm:pl-8 lg:w-[540px] lg:pl-12 xl:w-[620px] xl:pl-16">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {contactHeroContent.heading}
          </h1>
          <span className="mt-6 block h-1 w-12 bg-brand-500" />
          <p className="mt-6 text-gray-300">{contactHeroContent.description}</p>
        </div>

        <div className="relative -ml-16 flex-1 sm:-ml-24 lg:-ml-32">
          <div
            className="absolute inset-0 bg-brand-500 [clip-path:polygon(60px_0,100%_0,100%_100%,0_100%)] sm:[clip-path:polygon(92px_0,100%_0,100%_100%,0_100%)] lg:[clip-path:polygon(124px_0,100%_0,100%_100%,0_100%)]"
            aria-hidden
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/contact-hero.jpg"
            alt="Titan OEM facility"
            className="absolute inset-0 h-full w-full object-cover [clip-path:polygon(64px_0,100%_0,100%_100%,0_100%)] sm:[clip-path:polygon(96px_0,100%_0,100%_100%,0_100%)] lg:[clip-path:polygon(128px_0,100%_0,100%_100%,0_100%)]"
          />
        </div>
      </div>
    </section>
  );
}
