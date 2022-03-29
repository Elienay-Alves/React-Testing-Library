import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

const PARAGRAPH_1 = (
  'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
const PARAGRAPH_2 = (
  'One can filter Pokémons by type, and see more details for each one of them');
const IMG_SRCTST = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Test the About Component', () => {
  it('Have Pokédex infos', () => {
    render(<About />);
    const info = screen.getByText(/One can filter Pokémons by type/);
    expect(info).toBeInTheDocument();
  });
  it('Contains a heading', () => {
    render(<About />);
    const heading = screen.getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });
  it('Contains paragraphs', () => {
    render(<About />);
    const firstP = screen.getByText(PARAGRAPH_1);
    expect(firstP).toBeInTheDocument();
    const secondP = screen.getByText(PARAGRAPH_2);
    expect(secondP).toBeInTheDocument();
  });
  it('Contains an image', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image.src).toEqual(IMG_SRCTST);
  });
});
