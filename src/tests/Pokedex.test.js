import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

const POKEMON_ID = 'next-pokemon';
const TYPE_BUTTON = 'pokemon-type-button';

describe('Test the Pokedex Component', () => {
  it('Test if the page have a heading h2 with the text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText(/Encountered pokémons/);
    expect(heading).toBeInTheDocument();
  });
  it('Test if shows the next Pokemon of the list', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId(POKEMON_ID)).toHaveTextContent('Próximo pokémon');

    userEvent.click(screen.getByTestId(POKEMON_ID));
    expect(screen.getByText('Charmander'));

    for (let index = 1; index <= data.length - 1; index += 1) {
      userEvent.click(screen.getByTestId(POKEMON_ID));
    }
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  it('Test if shows one pokemon at time', () => {
    renderWithRouter(<App />);
    const pokemonShowed = screen.getAllByTestId('pokemon-name');
    expect(pokemonShowed).toHaveLength(1);
  });
  it('Test if the Pokedex have the filter button', () => {
    const YES_MAGIC_NUMBER = 7;
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    renderWithRouter(<App />);
    const filtersShowed = screen.getAllByTestId(TYPE_BUTTON);
    expect(filtersShowed).toHaveLength(YES_MAGIC_NUMBER);
    const filtersTypesShowed = screen.getAllByTestId(TYPE_BUTTON);
    types.forEach((type, index) => {
      expect(filtersTypesShowed[index]).toHaveTextContent(type);
      userEvent.click(screen.getAllByTestId(TYPE_BUTTON)[index]);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
      const AllButtons = screen.getAllByRole('button');
      expect(AllButtons[0]).toBeEnabled();
    });
  });
  it('Test if the Pokedex have a reset button that reset the filter', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId(POKEMON_ID);
    const filterButtons = screen.getAllByRole('button');
    userEvent.click(filterButtons[3]);
    userEvent.click(filterButtons[0]);
    data.forEach(() => userEvent.click(nextButton));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(filterButtons[0]).toHaveTextContent('All');
  });
});
