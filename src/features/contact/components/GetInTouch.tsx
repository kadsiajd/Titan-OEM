import { Mail, MapPin, Phone } from 'lucide-react';
import { getInTouchContent } from '@/mocks/mock-contact';

export function GetInTouch() {
  return (
    <section className="flex min-h-screen items-center bg-white py-16">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {getInTouchContent.heading}
          </h2>
          <span className="mt-4 block h-1 w-12 bg-brand-600" />
          <p className="mt-6 text-gray-600">{getInTouchContent.description}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 sm:divide-x sm:divide-gray-200">
          <div className="flex gap-4 sm:pl-8 sm:first:pl-0">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-brand-600">Address</p>
              {getInTouchContent.address.lines.map((line) => (
                <p key={line} className="text-sm text-gray-600">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="flex gap-4 sm:pl-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-brand-600">Phone</p>
              <p className="text-sm text-gray-600">{getInTouchContent.phone}</p>
            </div>
          </div>

          <div className="flex gap-4 sm:pl-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-brand-600">Email</p>
              <p className="text-sm text-gray-600">{getInTouchContent.email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
