import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Package,
  Building2,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterGroup {
  icon: LucideIcon;
  links: FooterLink[];
}

type FooterLinkGroups = Record<string, FooterGroup>;

const FOOTER_LINK_GROUPS: FooterLinkGroups = {
  Products: {
    icon: Package,
    links: [
      { label: "Micromotor", href: "/products/f66157de-7db9-40bc-8f1d-41fb961af00a" },
      { label: "Mechanical", href: "/products/a0a6b1b8-da6a-4d30-b522-3da71860ae55" },
      { label: "Quartz", href: "/products/a20c9719-750c-4ee8-9c3f-1716b2b0650c" },
    ],
  },
  Company: {
    icon: Building2,
    links: [
      { label: "About TITAN", href: "/about" },
      { label: "Tool Room", href: "/toolroom" },
      { label: "Technical Information", href: "/technical-information" },
      { label: "Contact Us", href: "/contact" },


    ],
  },
  Support: {
    icon: LifeBuoy,
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
};

const LOGO_SRC = "/logo/titan-logo.png";

function RiverEdge() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="h-16 w-full fill-slate-900 sm:h-20 lg:h-28"
    >
      <path d="M0,55 C 220,95 380,10 620,40 C 860,70 1000,15 1220,35 C 1320,45 1390,60 1440,50 L1440,120 L0,120 Z" />
    </svg>
  );
}

function BrandColumn() {
  return (
    <div className="mx-auto max-w-xs text-center md:mx-0 md:max-w-sm md:text-left">
      <Link
        href="/"
        aria-label="TITAN Company — home"
        className="inline-flex justify-center md:justify-start"
      >
        <Image
          src={LOGO_SRC}
          alt="TITAN Company"
          width={360}
          height={144}
          className="h-auto w-28 object-contain sm:w-36 lg:w-44"
        />
      </Link>

      <p className="mt-4 text-sm leading-6 text-slate-400">
        Connecting industries with{" "}
        <span className="text-teal-300">trusted OEM products.</span>
      </p>

      <Link
        href="/products/a0a6b1b8-da6a-4d30-b522-3da71860ae55"
        className="group mt-5 inline-flex items-center gap-2 border-b border-brand-600/50 pb-1 text-sm font-semibold text-white transition-colors hover:border-brand-600"
      >
        Explore Products
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

function LinkColumn({
  title,
  icon: Icon,
  links,
}: {
  title: string;
  icon: LucideIcon;
  links: FooterLink[];
}) {
  return (
    <div className="text-center sm:text-left">
      <h3 className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-white sm:justify-start">
        <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-teal-300" />
        {title}
      </h3>

      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center justify-center text-sm text-slate-400 transition-colors duration-200 hover:text-white sm:justify-start"
            >
              <ArrowRight
                aria-hidden="true"
                className="mr-0 h-3.5 w-0 shrink-0 overflow-hidden text-cyan-300 transition-all duration-200 group-hover:mr-2 group-hover:w-3.5"
              />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavigationGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
      {Object.entries(FOOTER_LINK_GROUPS).map(([title, group], index) => (
        <div
          key={title}
          className={index === 2 ? "col-span-2 sm:col-span-1" : "col-span-1"}
        >
          <LinkColumn title={title} icon={group.icon} links={group.links} />
        </div>
      ))}
    </div>
  );
}

/* =============================================================
   FOOTER
============================================================== */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative w-full">
      <RiverEdge />

      <footer className="relative w-full overflow-hidden bg-slate-900 text-white">
        <div className="container-page relative">
          <div className="grid gap-10 py-10 sm:py-12 md:grid-cols-12 md:gap-16 lg:py-14">
            <div className="md:col-span-5">
              <BrandColumn />
            </div>
            <div className="mt-6 md:col-span-7 md:mt-0">
              <NavigationGrid />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 border-t border-white/10 py-6 text-center text-xs sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-slate-400">
              © {currentYear} TITAN OEM Product Catalog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}