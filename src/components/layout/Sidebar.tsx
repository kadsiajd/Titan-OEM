'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

const navItems = [{ href: '/console', label: 'Dashboard' }];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin-login');
  };

  return (
    <aside className="flex w-64 flex-col border-r border-gray-800 bg-gray-900 text-gray-100">
      <div className="border-b border-gray-800 px-6 py-5">
        <h1 className="text-lg font-bold text-white">OEM Console</h1>
        <p className="text-xs text-gray-400">Inventory Management</p>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <Button variant="ghost" className="w-full text-gray-300 hover:text-white" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </aside>
  );
}
