import { render, screen } from '@testing-library/react';
import { CategorySection } from '@/features/home/components/CategorySection';
import { useGetCategories } from '@/features/home/hooks/useGetCategories';
import type { Category } from '@/features/home/types/category.types';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/features/home/hooks/useGetCategories');

const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Motors', description: 'Precision motors', imageUrl: '/motors.jpg' },
  { id: 'cat-2', name: 'Bearings', description: 'Durable bearings', imageUrl: '/bearings.jpg' },
];

describe('CategorySection', () => {
  it('shows loading placeholders while categories are being fetched', () => {
    vi.mocked(useGetCategories).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as unknown as ReturnType<typeof useGetCategories>);

    render(<CategorySection />);

    expect(screen.getByText('Explore Our Product Categories')).toBeInTheDocument();
    expect(screen.queryByText('Motors')).not.toBeInTheDocument();
  });

  it('shows an error message when the request fails', () => {
    vi.mocked(useGetCategories).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Network error'),
    } as unknown as ReturnType<typeof useGetCategories>);

    render(<CategorySection />);

    expect(screen.getByText(/failed to load categories/i)).toBeInTheDocument();
  });

  it('renders a card for each category once loaded', () => {
    vi.mocked(useGetCategories).mockReturnValue({
      data: mockCategories,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useGetCategories>);

    render(<CategorySection />);

    expect(screen.getByRole('heading', { name: 'Motors' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bearings' })).toBeInTheDocument();
  });

  it('disables both carousel arrows when the category list is empty', () => {
    vi.mocked(useGetCategories).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useGetCategories>);

    render(<CategorySection />);

    expect(screen.getByRole('button', { name: /previous category/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next category/i })).toBeDisabled();
  });
});
