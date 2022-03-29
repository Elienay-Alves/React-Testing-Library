import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Test the FavoritePokemons component', () => {
  it('Have the message "No favorite pokemon found"', () => {
    render(<FavoritePokemons pokemons={ [] } />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  it('Shows all favorites pokemon cards', () => {
    const cards = [data[0], data[8]];
    renderWithRouter(<FavoritePokemons pokemons={ cards } />);
    expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
    expect(screen.getByText(/Dragonair/)).toBeInTheDocument();
  });
});
