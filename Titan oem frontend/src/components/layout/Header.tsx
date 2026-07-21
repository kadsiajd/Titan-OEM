import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand-700">
          OEM Catalog
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-brand-600">
            Products
          </Link>
          <Link
            href="/admin-login"
            className="text-sm font-medium text-gray-600 hover:text-brand-600"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
