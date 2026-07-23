import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Breadcrumb({
  categoryName,
}: {
  categoryName: string;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs"
        >
          <Link
            href="/"
            className="font-medium text-brand-600 transition-colors hover:text-brand-700"
          >
            Home
          </Link>

          <ChevronRight
            className="h-3.5 w-3.5 text-slate-400"
            aria-hidden="true"
          />

          <Link
            href="#"
            className="font-medium text-brand-600 transition-colors hover:text-brand-700"
          >
            Products
          </Link>

          <ChevronRight
            className="h-3.5 w-3.5 text-slate-400"
            aria-hidden="true"
          />

          <span className="font-medium text-slate-600">
            {categoryName}
          </span>
        </nav>
      </div>
    </section>
  );
}