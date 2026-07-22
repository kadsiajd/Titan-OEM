'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/' },
  { label: 'Tool Room', href: '#' },
  { label: 'Technical Information', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Contact Us', href: '#' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/titan-logo.png" alt="Titan OEM" className="h-16 w-auto" />
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[16px] font-semibold text-brand-600 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            className="text-brand-600 lg:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-gray-200 px-4 pb-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-brand-600 hover:bg-gray-100 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
