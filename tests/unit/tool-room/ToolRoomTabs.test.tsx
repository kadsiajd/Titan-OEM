import { render, screen } from '@testing-library/react';
import { ToolRoomTabs } from '@/features/tool-room/components/ToolRoomTabs';

describe('ToolRoomTabs', () => {
  it('renders a tab link for each section with the correct anchor', () => {
    render(<ToolRoomTabs />);

    expect(screen.getByRole('link', { name: /capabilities/i })).toHaveAttribute(
      'href',
      '#capabilities'
    );
    expect(screen.getByRole('link', { name: /machinery/i })).toHaveAttribute(
      'href',
      '#machinery'
    );
    expect(screen.getByRole('link', { name: /infrastructure/i })).toHaveAttribute(
      'href',
      '#infrastructure'
    );
  });
});
