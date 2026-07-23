import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} src="" />,
}));

describe('Footer', () => {
  it('renders the brand tagline, every link group and the current year copyright', () => {
    render(<Footer />);

    expect(screen.getByText(/trusted OEM products\./i)).toBeInTheDocument();

    [
      'All Products',
      'Categories',
      'Tool Room',
      'About TITAN',
      'Contact Us',
      'Help Center',
      'Privacy Policy',
      'Terms of Use',
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} TITAN OEM Product Catalog. All rights reserved.`)
    ).toBeInTheDocument();
  });
});
