import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/layout/Header';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe('Header', () => {
  it('renders the logo and primary navigation links', () => {
    render(<Header />);

    expect(screen.getByAltText('Titan OEM')).toBeInTheDocument();

    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    expect(homeLinks[0]).toHaveAttribute('href', '/');

    const toolRoomLinks = screen.getAllByRole('link', { name: 'Tool Room' });
    expect(toolRoomLinks[0]).toHaveAttribute('href', '/tool-room');

    const aboutLinks = screen.getAllByRole('link', { name: 'About Us' });
    expect(aboutLinks[0]).toHaveAttribute('href', '/about');
  });

  it('toggles the mobile menu when the menu button is clicked', () => {
    render(<Header />);

    const toggle = screen.getByRole('button', { name: /toggle menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
