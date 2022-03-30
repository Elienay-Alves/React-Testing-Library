import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import { Pokemon } from '../components';

describe('Test the Pokemon Component', () => {
  const renderedPokemon = data[0];
  renderWithRouter(<Pokemon pokemon={ renderedPokemon } isFavorite={ false } />);
  it('Test if the correct Pokemon name showed', () => {
    expect(screen.getByText(renderedPokemon.name)).toBeInTheDocument();
  });
  it('Test if the correct Pokemon type showed', () => {
    renderWithRouter(<Pokemon pokemon={ renderedPokemon } isFavorite={ false } />);
    expect(screen.getByText(renderedPokemon.type)).toBeInTheDocument();
  });
  it('Test if the average weight of the pokemon showed', () => {
    renderWithRouter(<Pokemon pokemon={ renderedPokemon } isFavorite={ false } />);
    const averageWeightValue = renderedPokemon.averageWeight.value;
    const measureUnit = renderedPokemon.averageWeight.measurementUnit;
    const averageWeightText = `Average weight: ${averageWeightValue} ${measureUnit}`;
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(averageWeightText);
  });
  it('Test if the Pokemon image is showed', () => {
    renderWithRouter(<Pokemon pokemon={ renderedPokemon } isFavorite={ false } />);
    const IMG_ALT = `${renderedPokemon.name} sprite`;
    const img = screen.getByAltText(IMG_ALT);
    expect(img).toHaveAttribute('src', renderedPokemon.image);
  });
  it('Test if the Pokemon card have a link for details', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ renderedPokemon } isFavorite={ false } />,
    );
    userEvent.click(screen.getByText(/More details/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${renderedPokemon.id}`);
  });
  it('Test if when click the link will be redirected to the details page', () => {
    renderWithRouter(<Pokemon pokemon={ renderedPokemon } isFavorite={ false } />);
    userEvent.click(screen.getByText(/More details/i));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(renderedPokemon.name);
  });
  it('Test if exists a star icon on the favorites Pokemons', () => {
    const favorite = true;
    renderWithRouter(<Pokemon pokemon={ renderedPokemon } isFavorite={ favorite } />);
    const STAR_IMG_ALT = `${renderedPokemon.name} is marked as favorite`;
    const STAR_IMG_SRC = '/star-icon.svg';
    const star = screen.getByAltText(STAR_IMG_ALT);
    expect(star).toHaveAttribute('src', STAR_IMG_SRC);
  });
});
