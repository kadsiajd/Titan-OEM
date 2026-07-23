import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative flex w-full max-w-lg flex-col items-center text-center">
        <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-teal-500">
          Error 404
        </span>
        <div className="relative mt-4">
          <h1 className="text-[7rem] font-bold leading-none tracking-tight text-slate-900 sm:text-[9rem]">
            404
          </h1>
          <span className="absolute -right-3 top-2 h-4 w-4 border-r-2 border-t-2 border-teal-500 sm:h-5 sm:w-5" />
          <span className="absolute -left-3 bottom-2 h-4 w-4 border-b-2 border-l-2 border-teal-500 sm:h-5 sm:w-5" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
          Part not found in catalog
        </h2>
        <p className="mt-3 max-w-sm text-slate-600">
          The page you're looking for doesn't exist, was moved, or was
          discontinued. Let's get you back to something that's in stock.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/">
            <Button className="gap-2 bg-teal-500 uppercase tracking-wider text-white hover:bg-teal-500/90">
              Back to Catalog
            </Button>
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-slate-600 underline-offset-4 transition hover:text-teal-500 hover:underline"
          >
            Browse products instead
          </Link>
        </div>
      </div>
    </div>
  );
}