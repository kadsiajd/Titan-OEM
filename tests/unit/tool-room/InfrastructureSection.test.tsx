import { render, screen } from '@testing-library/react';
import { InfrastructureSection } from '@/features/tool-room/components/InfrastructureSection';
import { infrastructureContent } from '@/mocks/mock-tool-room';

describe('InfrastructureSection', () => {
  it('renders the heading and a card for every infrastructure item', () => {
    render(<InfrastructureSection />);

    expect(
      screen.getByRole('heading', { name: infrastructureContent.heading })
    ).toBeInTheDocument();
    expect(screen.getByText(infrastructureContent.description)).toBeInTheDocument();

    infrastructureContent.items.forEach((item) => {
      expect(screen.getByRole('heading', { name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });
});
