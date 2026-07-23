import { infrastructureContent } from '@/mocks/mock-tool-room';

export function InfrastructureSection() {
  return (
    <section id="infrastructure" className="flex min-h-screen items-center bg-white py-16">
      <div className="container-page text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {infrastructureContent.heading}
        </h2>
        <p className="mt-4 text-lg text-gray-600">{infrastructureContent.description}</p>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
          {infrastructureContent.items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <div className="aspect-[4/3] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
