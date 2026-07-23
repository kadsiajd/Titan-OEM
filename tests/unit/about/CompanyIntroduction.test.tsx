import { render, screen } from '@testing-library/react';
import CompanyIntroduction from '@/features/about/components/companyIntroduction';

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} src="" />,
}));

describe('CompanyIntroduction', () => {
  it('renders the section heading, description and every highlight card', () => {
    render(<CompanyIntroduction />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Precision. Quality.');
    expect(heading).toHaveTextContent('Built on');
    expect(heading).toHaveTextContent('Trust.');

    expect(
      screen.getByText(/Titan OEM specializes in the manufacturing of high-precision/)
    ).toBeInTheDocument();

    expect(screen.getByText('Who We Are')).toBeInTheDocument();
    expect(screen.getByText('What We Do')).toBeInTheDocument();
    expect(screen.getByText('Our Promise')).toBeInTheDocument();

    expect(screen.getByAltText('Precision manufactured components')).toBeInTheDocument();
  });
});
