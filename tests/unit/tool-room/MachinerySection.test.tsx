import { render, screen } from '@testing-library/react';
import { MachinerySection } from '@/features/tool-room/components/MachinerySection';
import { machineryContent } from '@/mocks/mock-tool-room';

describe('MachinerySection', () => {
  it('renders the heading and a card for every machine', () => {
    render(<MachinerySection />);

    expect(screen.getByRole('heading', { name: machineryContent.heading })).toBeInTheDocument();
    expect(screen.getByText(machineryContent.description)).toBeInTheDocument();

    machineryContent.items.forEach((item, index) => {
      expect(screen.getByRole('heading', { name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(String(index + 1).padStart(2, '0'))).toBeInTheDocument();
    });
  });
});
