import { render, screen } from '@testing-library/react';
import Customers from '@/features/about/components/customers';
import { aboutData } from '@/features/about/data/aboutData';

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} src="" />,
}));

describe('Customers', () => {
  it('renders the heading, description and a card for every customer', () => {
    render(<Customers />);

    expect(
      screen.getByRole('heading', { name: 'Trusted by Leading Brands' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('We are proud to partner with global leaders across industries.')
    ).toBeInTheDocument();

    aboutData.customers.forEach((customer) => {
      expect(screen.getByText(customer.name)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /scroll left/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /scroll right/i })).toBeInTheDocument();
  });
});
