import { Factory, PenTool, ShieldCheck, Users } from 'lucide-react';
import { capabilitiesContent } from '@/mocks/mock-tool-room';

const ICONS = [Factory, Users, PenTool, ShieldCheck];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="flex min-h-screen items-center bg-white py-16">
      <div className="container-page text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {capabilitiesContent.heading}
        </h2>
        <p className="mt-4 text-lg text-gray-600">{capabilitiesContent.description}</p>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
          {capabilitiesContent.items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];

            return (
              <div
                key={item.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
