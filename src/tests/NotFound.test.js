import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

const IMG_SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
const IMG_ALT = 'Pikachu crying because the page requested was not found';

describe('Test the NotFound component', () => {
  it('Have an h2 tag with the text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
  it('Have an image source', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(IMG_ALT);
    expect(img).toHaveAttribute('src', IMG_SRC);
  });
});
