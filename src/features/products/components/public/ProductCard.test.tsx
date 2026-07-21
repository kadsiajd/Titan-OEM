import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { mockProducts } from '@/mocks/mock-products';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe('ProductCard', () => {
  it('renders product headers and details from mock data', () => {
    const product = mockProducts[0];

    render(<ProductCard product={product} />);

    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`SKU: ${product.sku}`)).toBeInTheDocument();
  });
});
