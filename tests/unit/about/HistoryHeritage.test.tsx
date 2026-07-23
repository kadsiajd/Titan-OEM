import { render, screen } from '@testing-library/react';
import HistoryHeritage from '@/features/about/components/historyHeritage';
import { aboutData } from '@/features/about/data/aboutData';

describe('HistoryHeritage', () => {
  it('renders the section heading and every timeline entry', () => {
    render(<HistoryHeritage />);

    expect(
      screen.getByRole('heading', { name: 'Our Journey of Excellence' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/our journey has been driven by quality, innovation, and trust/i)
    ).toBeInTheDocument();

    aboutData.history.forEach((item) => {
      expect(screen.getByText(item.year)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });
});
