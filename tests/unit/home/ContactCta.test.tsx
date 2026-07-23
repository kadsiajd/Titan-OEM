import { render, screen } from '@testing-library/react';
import { ContactCta } from '@/features/home/components/ContactCta';
import { contactCtaContent } from '@/mocks/mock-home';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('ContactCta', () => {
  it('renders the heading, description and phone number', () => {
    render(<ContactCta />);

    expect(screen.getByRole('heading', { name: contactCtaContent.heading })).toBeInTheDocument();
    expect(screen.getByText(contactCtaContent.description)).toBeInTheDocument();
    expect(screen.getByText(contactCtaContent.phone)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
  });
});
