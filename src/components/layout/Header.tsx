'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/' },
  { label: 'Tool Room', href: '/tool-room' },
  { label: 'Technical Information', href: '#' },
  { label: 'About Us', href: '/about' },
  // { label: 'Contact Us', href: '#' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="container-page flex h-[72px] items-center sm:h-20">
        {/* Logo */}
        <Link href="/" className="flex h-full items-center">
          <div className="flex items-center bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/titan-logo.png"
              alt="Titan OEM"
              className="h-10 w-auto object-contain sm:h-12"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden items-center lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative flex h-20 items-center px-3 text-[13px] font-medium tracking-wide text-slate-600 transition-colors duration-300 hover:text-teal-500 xl:px-4"
            >
              {link.label}

              <span className="absolute bottom-0 left-3 right-3 h-[2px] origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}

          <Link
            href="/contact-us"
            className="ml-4 flex items-center gap-2 bg-teal-500 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-teal-500/90 xl:ml-6"
          >
           Contact Us
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="ml-auto flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-900 transition hover:border-teal-500 hover:text-teal-500 lg:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'max-h-[600px] opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-3 sm:px-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between border-b border-slate-100 py-4 text-sm font-medium text-slate-600 transition hover:text-teal-500"
            >
              {link.label}

              <ArrowUpRight className="h-4 w-4 text-teal-500" />
            </Link>
          ))}

          <Link
            href="/contact-us"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 bg-teal-500 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-teal-500/90"
          >
            Get In Touch
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}