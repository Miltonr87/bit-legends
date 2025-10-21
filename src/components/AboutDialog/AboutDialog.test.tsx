import { render, screen, fireEvent } from '@testing-library/react';
import { AboutDialog } from './index';

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('validateDOMNesting')) {
      return;
    }
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

jest.mock('framer-motion', () => ({
  motion: {
    span: ({ children }: { children: React.ReactNode }) => (
      <span>{children}</span>
    ),
  },
}));

describe('AboutDialog Component', () => {
  it('renders the About button', () => {
    render(<AboutDialog />);
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
  });

  it('opens the dialog when the About button is clicked', () => {
    render(<AboutDialog />);

    const button = screen.getByRole('button', { name: /about/i });
    fireEvent.click(button);

    expect(screen.getByText(/bit legends/i)).toBeInTheDocument();
    expect(screen.getByText(/project tech stack/i)).toBeInTheDocument();
  });

  it('renders all tech stack items', () => {
    render(<AboutDialog />);

    const button = screen.getByRole('button', { name: /about/i });
    fireEvent.click(button);

    const techs = [
      'ReactJS',
      'TypeScript',
      'Tailwind CSS',
      'Shadcn UI',
      'Framer Motion',
      'Radix UI',
      'EmulatorJS',
      'Firebase',
    ];

    techs.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('contains a link to Milton Rodrigues portfolio', () => {
    render(<AboutDialog />);

    const button = screen.getByRole('button', { name: /about/i });
    fireEvent.click(button);

    const link = screen.getByRole('link', { name: /milton rodrigues/i });
    expect(link).toHaveAttribute('href', 'https://miltonr87.vercel.app/');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
