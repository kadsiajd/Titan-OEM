import { render, screen } from '@testing-library/react';
import { CapabilitiesSection } from '@/features/tool-room/components/CapabilitiesSection';
import { capabilitiesContent } from '@/mocks/mock-tool-room';

describe('CapabilitiesSection', () => {
  it('renders the heading and every capability item', () => {
    render(<CapabilitiesSection />);

    expect(
      screen.getByRole('heading', { name: capabilitiesContent.heading })
    ).toBeInTheDocument();
    expect(screen.getByText(capabilitiesContent.description)).toBeInTheDocument();

    capabilitiesContent.items.forEach((item) => {
      expect(screen.getByRole('heading', { name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });
});
