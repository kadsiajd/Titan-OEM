import { machineryContent } from '@/mocks/mock-tool-room';

export function MachinerySection() {
  return (
    <section id="machinery" className="flex min-h-screen items-center bg-gray-50 py-16">
      <div className="container-page text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {machineryContent.heading}
        </h2>
        <p className="mt-4 text-lg text-gray-600">{machineryContent.description}</p>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-5">
          {machineryContent.items.map((item, index) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {String(index + 1).padStart(2, '0')}
                </span>
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
