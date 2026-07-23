


import { render, screen } from '@testing-library/react';
import { CompanyOverview } from '@/features/home/components/CompanyOverview';
import { companyOverviewContent } from '@/mocks/mock-home';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('CompanyOverview', () => {
  it('renders the company overview heading and description', () => {
    render(<CompanyOverview />);

    expect(
      screen.getByRole('heading', { name: companyOverviewContent.heading })
    ).toBeInTheDocument();
    expect(screen.getByText(companyOverviewContent.description)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read more/i })).toBeInTheDocument();
  });
});
