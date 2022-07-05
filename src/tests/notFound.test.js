import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../pages/NotFound';

const TOTAL_IMG = 4;

describe('Test NotFound Page', () => {
  test('Verify render elements', () => {
    renderWithRouter(<NotFound />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(TOTAL_IMG);
    // const text = screen.getBy('heading');
    // expect(text).toBeOnDocument();
    const foodsImg = screen.getByAltText(/Food Icon/i);
    expect(foodsImg).toBeInTheDocument();
    const drinksImg = screen.getByAltText(/Drink Icon/i);
    expect(drinksImg).toBeInTheDocument();
    const exploreImg = screen.getByAltText(/Explore Icon/i);
    expect(exploreImg).toBeInTheDocument();
  });
});
