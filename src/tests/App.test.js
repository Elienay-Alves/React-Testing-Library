import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Test if the aplication has the navegation links', () => {
  it('Test if opens the URL / when click in the link Home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/home/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('Test if opens the URL /about, when click in the link About', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('Test if opens the URL /favorites, when click in the link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  it('Test if opens the page Not Found when entering in an unknown URL', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
