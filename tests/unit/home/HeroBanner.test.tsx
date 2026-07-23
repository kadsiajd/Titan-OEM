import { render, screen } from '@testing-library/react';
import { HeroBanner } from '@/features/home/components/HeroBanner';
import { heroContent } from '@/mocks/mock-home';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('HeroBanner', () => {
  it('renders the heading, description and call-to-action link', () => {
    render(<HeroBanner />);

    expect(screen.getByRole('heading', { name: heroContent.heading })).toBeInTheDocument();
    expect(screen.getByText(heroContent.description)).toBeInTheDocument();

    const cta = screen.getByRole('link', { name: /explore products/i });
    expect(cta).toHaveAttribute('href', '/products');
  });
});
