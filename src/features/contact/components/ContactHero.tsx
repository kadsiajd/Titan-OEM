import { contactHeroContent } from '@/mocks/mock-contact';

export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/contact-hero.jpg"
        alt="Titan OEM facility"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/40" />

      <div className="container-page relative flex min-h-screen flex-col justify-center">
        <h1 className="max-w-xl text-4xl font-bold text-white sm:text-5xl">
          {contactHeroContent.heading}
        </h1>
        <span className="mt-6 block h-1 w-12 bg-brand-500" />
        <p className="mt-6 max-w-lg text-gray-300">{contactHeroContent.description}</p>
      </div>
    </section>
  );
}
