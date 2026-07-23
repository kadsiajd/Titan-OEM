import { ArrowDownToLine } from "lucide-react";

export default function DocumentButton({
  label,
  href,
}: {
  label: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="shrink-0 text-[10px] font-bold text-red-500">
          PDF
        </span>

        <span className="truncate text-[8px] font-medium text-brand-900">
          {label}
        </span>
      </div>

      <ArrowDownToLine
        className="h-3.5 w-3.5 shrink-0 text-brand-600"
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="flex min-h-[38px] items-center justify-between gap-2 border border-slate-200 px-2.5 py-1.5 transition-colors hover:border-brand-600 hover:bg-brand-50"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled
      className="flex min-h-[38px] cursor-not-allowed items-center justify-between gap-2 border border-slate-200 px-2.5 py-1.5 text-left opacity-50"
      aria-label={`${label} is not available`}
    >
      {content}
    </button>
  );
}