import { render, screen } from '@testing-library/react';
import { ContactHero } from '@/features/contact/components/ContactHero';
import { contactHeroContent } from '@/mocks/mock-contact';

describe('ContactHero', () => {
  it('renders the page heading and description', () => {
    render(<ContactHero />);

    expect(
      screen.getByRole('heading', { name: contactHeroContent.heading })
    ).toBeInTheDocument();
    expect(screen.getByText(contactHeroContent.description)).toBeInTheDocument();
  });
});
