import { render, screen } from '@testing-library/react';
import { GetInTouch } from '@/features/contact/components/GetInTouch';
import { getInTouchContent } from '@/mocks/mock-contact';

describe('GetInTouch', () => {
  it('renders contact heading, description and every contact detail', () => {
    render(<GetInTouch />);

    expect(
      screen.getByRole('heading', { name: getInTouchContent.heading })
    ).toBeInTheDocument();
    expect(screen.getByText(getInTouchContent.description)).toBeInTheDocument();

    getInTouchContent.address.lines.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });

    expect(screen.getByText(getInTouchContent.phone)).toBeInTheDocument();
    expect(screen.getByText(getInTouchContent.email)).toBeInTheDocument();
  });
});
