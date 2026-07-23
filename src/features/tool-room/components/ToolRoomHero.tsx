import { toolRoomHeroContent } from '@/mocks/mock-tool-room';

export function ToolRoomHero() {
  return (
    <section className="flex min-h-screen items-center bg-white py-16">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-600">
            {toolRoomHeroContent.label}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {toolRoomHeroContent.heading}
          </h1>
          <p className="mt-6 max-w-md text-gray-600">{toolRoomHeroContent.description}</p>
          <p className="mt-4 max-w-md text-gray-600">
            {toolRoomHeroContent.secondaryDescription}
          </p>
        </div>

        <div className="overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tool-room/hero.jpg"
            alt="Titan OEM manufacturing facility"
            className="h-72 w-full object-cover sm:h-96"
          />
        </div>
      </div>
    </section>
  );
}
