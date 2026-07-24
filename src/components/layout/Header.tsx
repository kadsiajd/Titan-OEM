'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';

import { categoryApi } from '../../features/home/services/categoryApi';
import type { Category } from '../../features/home/types/category.types';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products/micromotor' },
  { label: 'Tool Room', href: '/tool-room' },
  { label: 'Technical Information', href: '#' },
  { label: 'About Us', href: '/about' },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Check normal navigation links.
   */
  const isLinkActive = (href: string) => {
    if (!href || href === '#' || href === '/#') {
      return false;
    }
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /**
   * Fetch all product categories.
   */
  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const data = await categoryApi.getAll();
        if (isMounted) {
          setCategories(data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Close dropdown on outside click
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Handle category selection.
   */
  const handleCategoryClick = (category: Category) => {
    setIsProductsOpen(false);
    setIsMobileProductsOpen(false);
    setIsMobileMenuOpen(false);
    router.push(`/products/${encodeURIComponent(category.id)}`);
  };

  const handleProductsEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsProductsOpen(true);
  };

  const handleProductsLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="container-page flex h-[72px] items-center sm:h-20">
        <Link href="/" className="flex h-full items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/titan-logo.png"
            alt="Titan OEM"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        <nav className="ml-auto hidden items-center lg:flex">
          {NAV_LINKS.map((link) => {
            const isProducts = link.label === 'Products';
            const active = isLinkActive(link.href);

            if (isProducts) {
              return (
                <div
                  key={link.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleProductsEnter}
                  onMouseLeave={handleProductsLeave}
                >
                  <button
                    type="button"
                    aria-expanded={isProductsOpen}
                    aria-haspopup="true"
                    onClick={() => setIsProductsOpen((open) => !open)}
                    className={`group relative flex h-20 items-center gap-1.5 px-3 text-base font-medium tracking-wide transition-colors duration-300 xl:px-4 ${isProductsOpen || active ? 'text-brand-500' : 'text-slate-600 hover:text-brand-500'
                      }`}
                  >
                    Products
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''
                        }`}
                    />
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-[2px] origin-left bg-brand-500 transition-transform duration-300 ${isProductsOpen || active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                    />
                  </button>

                  {/* Bridge gap for hover */}
                  <div className="absolute left-0 top-full h-2 w-full" />

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 top-[calc(100%+2px)] w-64 rounded-b-md border border-slate-200 bg-white shadow-xl transition-all duration-200 ${isProductsOpen
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible -translate-y-2 opacity-0'
                      }`}
                  >
                    {isLoadingCategories ? (
                      <div className="px-4 py-3 text-sm text-slate-400">Loading categories...</div>
                    ) : categories.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-slate-400">No categories found.</div>
                    ) : (
                      <ul className="max-h-96 overflow-y-auto py-2">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <button
                              type="button"
                              onClick={() => handleCategoryClick(category)}
                              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-brand-50 hover:text-brand-600"
                            >
                              <span>{category.name}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative flex h-20 items-center px-3 text-base font-medium tracking-wide transition-colors duration-300 hover:text-brand-500 xl:px-4 ${active ? 'text-brand-500' : 'text-slate-600'
                  }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[2px] origin-left bg-brand-500 transition-transform duration-300 group-hover:scale-x-100 ${active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                />
              </Link>
            );
          })}

          <Link
            href="/contact-us"
            className="ml-4 flex items-center gap-2 bg-brand-500 px-3 py-1.5 text-base   tracking-wider text-white transition hover:bg-brand-600 xl:ml-6"
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
          className="ml-auto flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-900 transition hover:border-brand-500 hover:text-brand-500 lg:hidden"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 lg:hidden ${isMobileMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <nav className="px-4 py-3 sm:px-8">
          {NAV_LINKS.map((link) => {
            const isProducts = link.label === 'Products';
            const active = isLinkActive(link.href);

            if (isProducts) {
              return (
                <div key={link.label} className="border-b border-slate-100">
                  <button
                    type="button"
                    aria-expanded={isMobileProductsOpen}
                    onClick={() => setIsMobileProductsOpen((open) => !open)}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-slate-700 transition hover:text-brand-500"
                  >
                    Products
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180 text-brand-500' : 'text-slate-400'
                        }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${isMobileProductsOpen ? 'max-h-96 pb-3' : 'max-h-0'
                      }`}
                  >
                    {isLoadingCategories ? (
                      <p className="py-2 pl-4 text-xs text-slate-400">Loading...</p>
                    ) : (
                      categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleCategoryClick(category)}
                          className="flex w-full items-center justify-between py-2 pl-4 pr-2 text-left text-sm text-slate-600 transition hover:text-brand-500"
                        >
                          {category.name}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      ))
                    )}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-slate-100 py-2 text-xs font-base transition hover:text-brand-500 ${active ? 'text-brand-500' : 'text-slate-700'
                  }`}
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 text-brand-500" />
              </Link>
            );
          })}
{/* 
          <Link
            href="/contact-us"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 bg-brand-500 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-brand-600"
          >
            Get In Touch
            <ArrowUpRight className="h-4 w-4" />
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
