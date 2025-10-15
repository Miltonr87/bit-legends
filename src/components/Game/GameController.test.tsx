import { render, screen } from '@testing-library/react';
import { GameController } from './GameController';

jest.mock('lucide-react', () => ({
  Gamepad2: ({ className }: { className?: string }) => (
    <svg data-testid="gamepad-icon" className={className} />
  ),
  Keyboard: ({ className }: { className?: string }) => (
    <svg data-testid="keyboard-icon" className={className} />
  ),
}));

describe('GameController Component', () => {
  it('renders the title and icons', () => {
    render(<GameController />);

    expect(screen.getByText(/controller/i)).toBeInTheDocument();
    expect(screen.getByTestId('gamepad-icon')).toBeInTheDocument();
    expect(screen.getByTestId('keyboard-icon')).toBeInTheDocument();
  });

  it('renders the movement section with directional keys', () => {
    render(<GameController />);

    expect(screen.getByText(/movement/i)).toBeInTheDocument();
    expect(screen.getByText('↑')).toBeInTheDocument();
    expect(screen.getByText('↓')).toBeInTheDocument();
    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('renders the system section with Start and Coin buttons', () => {
    render(<GameController />);

    expect(screen.getByText(/system/i)).toBeInTheDocument();
    expect(screen.getByText(/start/i)).toBeInTheDocument();
    expect(screen.getByText(/coin/i)).toBeInTheDocument();
    expect(screen.getByText(/enter/i)).toBeInTheDocument();
    expect(screen.getByText(/shift/i)).toBeInTheDocument();
  });

  it('renders all action buttons', () => {
    render(<GameController />);

    const actions = ['Z', 'X', 'A', 'S', 'E', 'T'];
    actions.forEach((key) => {
      expect(screen.getByText(key)).toBeInTheDocument();
    });
  });

  it('renders both trigger buttons', () => {
    render(<GameController />);

    expect(screen.getByText('Q')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
  });
});
