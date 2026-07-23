import { render, screen } from '@testing-library/react';
import { ToolRoomHero } from '@/features/tool-room/components/ToolRoomHero';
import { toolRoomHeroContent } from '@/mocks/mock-tool-room';

describe('ToolRoomHero', () => {
  it('renders the label, heading and both description paragraphs', () => {
    render(<ToolRoomHero />);

    expect(screen.getByText(toolRoomHeroContent.label)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: toolRoomHeroContent.heading })
    ).toBeInTheDocument();
    expect(screen.getByText(toolRoomHeroContent.description)).toBeInTheDocument();
    expect(screen.getByText(toolRoomHeroContent.secondaryDescription)).toBeInTheDocument();
  });
});
