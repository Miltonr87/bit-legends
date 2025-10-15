import { render, screen } from '@testing-library/react';
import { GameSidebar } from '../GameSidebar';
import { mockCastlevania } from '@/mocks/games';

jest.mock('lucide-react', () => ({
  Calendar: () => <svg data-testid="calendar-icon" />,
  Users: () => <svg data-testid="users-icon" />,
  Gamepad2: () => <svg data-testid="gamepad-icon" />,
}));

jest.mock('@/components/Game/LogoGame', () => ({
  LogoGame: ({ title }: { title: string }) => (
    <div data-testid="logo-game">{title}</div>
  ),
}));

jest.mock('@/components/Game/GameController', () => ({
  GameController: () => <div data-testid="game-controller" />,
}));

jest.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: jest.fn(),
}));

const { useIsMobile } = jest.requireMock('@/hooks/useIsMobile');

describe('GameSidebar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders logo, year, genre, players, developer and platform info', () => {
    useIsMobile.mockReturnValue(false);
    render(<GameSidebar game={mockCastlevania} />);

    expect(screen.getByTestId('logo-game')).toHaveTextContent(
      'Castlevania: Bloodlines'
    );
    expect(screen.getByText(/release year/i)).toBeInTheDocument();
    expect(
      screen.getByText(mockCastlevania.year.toString())
    ).toBeInTheDocument();
    expect(screen.getByText(mockCastlevania.genre)).toBeInTheDocument();
    expect(screen.getByText(mockCastlevania.players)).toBeInTheDocument();
    expect(
      screen.getAllByText(mockCastlevania.developer)[0]
    ).toBeInTheDocument();
    expect(screen.getByText(mockCastlevania.platform)).toBeInTheDocument();
    expect(
      screen.getAllByText(mockCastlevania.publisher)[0]
    ).toBeInTheDocument();
  });

  it('renders GameController when not mobile', () => {
    useIsMobile.mockReturnValue(false);
    render(<GameSidebar game={mockCastlevania} />);
    expect(screen.getByTestId('game-controller')).toBeInTheDocument();
  });

  it('does not render GameController on mobile', () => {
    useIsMobile.mockReturnValue(true);
    render(<GameSidebar game={mockCastlevania} />);
    expect(screen.queryByTestId('game-controller')).not.toBeInTheDocument();
  });
});
