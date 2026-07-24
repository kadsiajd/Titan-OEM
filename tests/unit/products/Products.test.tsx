import { render, screen } from '@testing-library/react';

import CategoryProductsPage from '@/features/products/components/products';
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
  name: '602A',
  description: 'Compact micromotor movement.',
  categoryId: 'category-1',
  category: 'Micromotor',
  imageUrl: '',
  specificationSheetUrl: '',
  technicalDrawingUrl: '',
  overview: [{ label: 'Thickness', value: '2.600 mm' }],
  productDetails: [],
};

describe('CategoryProductsPage', () => {
  beforeEach(() => {
    vi.mocked(productApi.getAllByCategory).mockReset();
  });

  it('shows a loading state while products are being fetched', () => {
    vi.mocked(productApi.getAllByCategory).mockReturnValue(new Promise(() => {}));

    render(<CategoryProductsPage categoryId="category-1" />);

    expect(screen.getByText('Loading Products')).toBeInTheDocument();
  });

  it('renders product cards after a successful request', async () => {
    vi.mocked(productApi.getAllByCategory).mockResolvedValue([product]);

    render(<CategoryProductsPage categoryId="category-1" />);

    expect(await screen.findByRole('heading', { name: '602A' })).toBeInTheDocument();
    expect(screen.getByText(/micro motors are at the heart/i)).toBeInTheDocument();
    expect(productApi.getAllByCategory).toHaveBeenCalledWith('category-1');
  });

  it('shows an error message when loading products fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.mocked(productApi.getAllByCategory).mockRejectedValue(new Error('Network error'));

    render(<CategoryProductsPage categoryId="category-1" />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to load products. Please try again later.'
    );
  });
});
