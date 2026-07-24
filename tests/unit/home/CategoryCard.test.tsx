import { render, screen } from '@testing-library/react';
import { CategoryCard } from '@/features/home/components/CategoryCard';
import type { Category } from '@/features/home/types/category.types';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const category: Category = {
  id: 'cat-1',
  name: 'Motors',
  description: 'High-precision OEM motors.',
  imageUrl: '/motors.jpg',
};

describe('CategoryCard', () => {
  it('renders the category name, description and a link to products', () => {
    render(<CategoryCard category={category} />);

    expect(screen.getByRole('heading', { name: category.name })).toBeInTheDocument();
    expect(screen.getByText(category.description)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view products/i })).toHaveAttribute(
      'href',
      '/products/cat-1'
    );
  });
});
