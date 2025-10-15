import { render, screen, fireEvent } from '@testing-library/react';
import { GameIframe } from '../GameIframe';
import type { Game } from '@/types';

jest.mock('lucide-react', () => ({
  Gamepad2: ({ className }: { className?: string }) => (
    <svg data-testid="gamepad-icon" className={className} />
  ),
}));

jest.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: jest.fn(),
}));

jest.mock('@/hooks/useDisplayDevice', () => ({
  useDisplayDevice: jest.fn(),
}));

const { useIsMobile } = jest.requireMock('@/hooks/useIsMobile');
const { useDisplayDevice } = jest.requireMock('@/hooks/useDisplayDevice');

const mockGame: Game = {
  id: 'castlevania-bloodlines-genesis',
  title: 'Castlevania: Bloodlines',
  slug: 'castlevania-bloodlines-genesis',
  embedId: '30108',
  year: 1994,
  genre: 'Action',
  folder: 'Konami',
  publisher: 'Konami',
  characters: ['John Morris', 'Eric Lecarde'],
  description: 'A gothic action platformer.',
  longDescription: 'Two vampire hunters fight to stop Dracula’s resurrection.',
  players: '1 Player',
  developer: 'Konami',
  platform: 'Sega Genesis',
  coverImage: '/assets/covers/cv-bloodlines.png',
  logo: '/assets/logos/cv.png',
  cover: '/assets/covers/cv-bloodlines.png',
};

describe('GameIframe Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useDisplayDevice.mockReturnValue('Desktop');
  });

  it('renders iframe with correct title and src', () => {
    useIsMobile.mockReturnValue(false);
    render(<GameIframe game={mockGame} />);

    const iframe = screen.getByTitle('Castlevania: Bloodlines');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.retrogames.cc/embed/30108-castlevania-bloodlines-genesis.html'
    );
  });

  it('renders footer with Gamepad icon and device info', () => {
    useIsMobile.mockReturnValue(false);
    useDisplayDevice.mockReturnValue('Laptop');
    render(<GameIframe game={mockGame} />);

    expect(screen.getByTestId('gamepad-icon')).toBeInTheDocument();
    expect(screen.getByText(/playing on/i)).toHaveTextContent('Laptop');
  });

  it('applies mobile layout and shows fullscreen button on mobile', () => {
    useIsMobile.mockReturnValue(true);
    render(<GameIframe game={mockGame} />);

    const fullscreenButton = screen.getByTitle(/fullscreen/i);
    expect(fullscreenButton).toBeInTheDocument();
  });

  it('toggles fullscreen class when fullscreen button is clicked', () => {
    useIsMobile.mockReturnValue(true);
    render(<GameIframe game={mockGame} />);

    const container = screen.getByTitle('Castlevania: Bloodlines')
      .parentElement!;
    const fullscreenButton = screen.getByTitle(/fullscreen/i);

    expect(container).not.toHaveClass('fullscreen-sim');
    fireEvent.click(fullscreenButton);
    expect(container).toHaveClass('fullscreen-sim');
  });
});
