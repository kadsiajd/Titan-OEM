import { render, screen } from '@testing-library/react';
import AboutHero from '@/features/about/components/aboutHero';
import { aboutData } from '@/features/about/data/aboutData';

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} src="" />,
}));

describe('AboutHero', () => {
  it('renders the hero subtitle, description and call-to-action', () => {
    render(<AboutHero />);

    expect(screen.getByText(aboutData.hero.subtitle)).toBeInTheDocument();
    expect(screen.getByText(aboutData.hero.description)).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Building ideas');
    expect(heading).toHaveTextContent('into reality.');

    expect(screen.getByRole('button', { name: /discover more/i })).toBeInTheDocument();
  });
});
