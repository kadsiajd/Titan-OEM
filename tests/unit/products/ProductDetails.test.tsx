import { fireEvent, render, screen } from '@testing-library/react';

import ProductDetails from '@/features/products/components/productDetails';
import { productApi } from '@/features/products/services/productApi';
import type { Product } from '@/features/products/types/product.types';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/features/products/services/productApi', () => ({
  productApi: {
    getAllByCategory: vi.fn(),
  },
}));

const product: Product = {
  id: 'product-1',
  name: '6120',
  description: 'A reliable quartz movement.',
  categoryId: 'quartz',
  category: 'Quartz',
  imageUrl: '/products/6120.png',
  specificationSheetUrl: '/documents/6120-specification.pdf',
  technicalDrawingUrl: '',
  overview: [{ label: 'Battery Life', value: '36 M' }],
  productDetails: [],
};

describe('ProductDetails', () => {
  beforeEach(() => {
    vi.mocked(productApi.getAllByCategory).mockReset();
  });

  it('loads and displays the selected product with its documents below the image', async () => {
    vi.mocked(productApi.getAllByCategory).mockResolvedValue([product]);

    render(<ProductDetails categoryId="quartz" productId="product-1" />);

    expect(await screen.findByRole('heading', { name: '6120' })).toBeInTheDocument();
    expect(productApi.getAllByCategory).toHaveBeenCalledWith('quartz');
    expect(screen.getByText('Battery Life')).toBeInTheDocument();
    expect(screen.getByText('36 M')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /specification sheet/i })).toHaveAttribute(
      'href',
      '/documents/6120-specification.pdf'
    );
    expect(screen.getByText('Technical Drawing')).toBeInTheDocument();
    expect(screen.getByText('Not available')).toBeInTheDocument();

    const image = screen.getByRole('img', { name: '6120' });
    const documents = screen.getByRole('heading', { name: 'Product Documents' });
    expect(image.compareDocumentPosition(documents) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('opens and closes the image preview', async () => {
    vi.mocked(productApi.getAllByCategory).mockResolvedValue([product]);

    render(<ProductDetails categoryId="quartz" productId="product-1" />);

    await screen.findByRole('heading', { name: '6120' });
    fireEvent.click(screen.getByRole('button', { name: 'Zoom 6120 image' }));

    expect(screen.getByRole('dialog', { name: '6120 image preview' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close image preview' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows a not-found state when the requested product is absent', async () => {
    vi.mocked(productApi.getAllByCategory).mockResolvedValue([product]);

    render(<ProductDetails categoryId="quartz" productId="missing-product" />);

    expect(await screen.findByRole('heading', { name: 'Product not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to products' })).toHaveAttribute(
      'href',
      '/products/quartz'
    );
  });
});
