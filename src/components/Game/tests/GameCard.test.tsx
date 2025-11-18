import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GameCard } from '../GameCard';
import type { Game } from '@/types';
import '@testing-library/jest-dom';

describe('GameCard Component', () => {
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
    longDescription:
      'Two vampire hunters fight to stop Dracula’s resurrection.',
    players: '1 Player',
    developer: 'Konami',
    platform: 'Genesis',
    coverImage: '/assets/covers/cv-bloodlines.png',
    logo: '/assets/logos/cv.png',
    cover: '/assets/covers/cv-bloodlines.png',
  };

  it('renders game title, year, genre and platform', () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <GameCard game={mockGame} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Castlevania: Bloodlines/i)).toBeInTheDocument();
    expect(screen.getByText(/1994/i)).toBeInTheDocument();
    expect(screen.getByText(/Action/i)).toBeInTheDocument();
    expect(screen.getByText(/Genesis/i)).toBeInTheDocument();
  });

  it('renders the cover image with correct alt text', () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    const img = screen.getByRole('img', { name: /Castlevania: Bloodlines/i });
    expect(img).toHaveAttribute('src', mockGame.coverImage);
    expect(img).toHaveAttribute('alt', mockGame.title);
  });

  it('links to the correct game page', () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/game/${mockGame.id}`);
  });
});
