import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

describe('Test the PokemonDetails component', () => {
  const renderedPokemon = data[0];
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${renderedPokemon.id}`);
  });

  it('Test if the page have a text "<name> Details"', () => {
    const text = screen.getByRole('heading', {
      level: 2,
      name: `${renderedPokemon.name} Details`,
    });
    expect(text).toBeInTheDocument();
  });
  it('Test if contains an h2 heading with the text ""Summary"', () => {
    const h2Heading = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(h2Heading).toBeInTheDocument();
  });
  it('Test if not exist a link for the selected Pokemon', () => {
    expect(screen.queryByText(/More details/i)).not.toBeInTheDocument();
  });
  it('Test if the details section have a resume of the specific Pokemon', () => {
    expect(screen.getByText(renderedPokemon.summary)).toBeInTheDocument();
  });
  it('Test if exist a map on the section with the pokemon locations', () => {
    const h2Heading = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${renderedPokemon.name}`,
    });
    expect(h2Heading).toBeInTheDocument();
  });
  it('Test if all pokemon locations is showed on details section', () => {
    const locations = screen.getAllByAltText(`${renderedPokemon.name} location`).length;
    expect(locations).toBe(renderedPokemon.foundAt.length);
    renderedPokemon.foundAt.forEach((local) => {
      expect(screen.getByText(local.location)).toBeInTheDocument();
    });
  });
  it('Test if contains the corresponded images of the locations', () => {
    const renderedImages = screen.getAllByAltText(`${renderedPokemon.name} location`);
    renderedPokemon.foundAt.forEach((img, index) => {
      expect(renderedImages[index]).toHaveAttribute('src', img.map);
    });
  });
  it('Test if the can favorite a pokemon on the details page', () => {
    const STAR_ALT_TEXT = `${renderedPokemon.name} is marked as favorite`;
    if (screen.queryByAltText(STAR_ALT_TEXT) === null) {
      expect(screen.getByLabelText('Pokémon favoritado?')).not.toBeChecked();
    } else {
      expect(screen.getByLabelText('Pokémon favoritado?')).toBeChecked();
    }
  });
});
