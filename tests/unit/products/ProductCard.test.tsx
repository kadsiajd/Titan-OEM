import { render, screen } from '@testing-library/react';

import ProductCard, { ProductCardGrid } from '@/features/products/components/productCard';
import type { Product } from '@/features/products/types/product.types';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const product: Product = {
  id: 'product-1',
  name: '6120',
  // description: 'A reliable quartz movement.',
  categoryId: 'category-1',
  category: 'Quartz',
  imageUrl: '/products/6120.png',
  specificationSheetUrl: '/documents/6120-specification.pdf',
  technicalDrawingUrl: '/documents/6120-drawing.pdf',
  overview: [
    { label: 'Battery Life', value: '36 M' },
    { label: 'Thickness', value: '2.60 mm' },
  ],
  productDetails: [],
};

describe('ProductCard', () => {
  it('renders product information, specifications, and document links', () => {
    render(<ProductCard product={product} categoryId="quartz" index={0} />);

    expect(screen.getByRole('heading', { name: '6120' })).toBeInTheDocument();
    // expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText('Battery Life')).toBeInTheDocument();
    expect(screen.getByText('36 M')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '6120' })).toHaveAttribute('src', product.imageUrl);
    expect(screen.getByRole('link', { name: /specification sheet/i })).toHaveAttribute(
      'href',
      product.specificationSheetUrl
    );
    expect(screen.getByRole('link', { name: /technical drawing/i })).toHaveAttribute(
      'href',
      product.technicalDrawingUrl
    );
    expect(screen.getByRole('link', { name: /view product details/i })).toHaveAttribute(
      'href',
      '/products/quartz/product-1'
    );
  });

  it('renders one card for every product in the grid', () => {
    render(
      <ProductCardGrid
        products={[product, { ...product, id: 'product-2', name: '6130' }]}
        categoryId="quartz"
      />
    );

    expect(screen.getByRole('heading', { name: '6120' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '6130' })).toBeInTheDocument();
  });
});
