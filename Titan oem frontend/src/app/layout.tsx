import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'OEM Product Catalog',
    template: '%s | OEM Product Catalog',
  },
  description: 'Browses our complete OEM product catalog and inventory solutions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
