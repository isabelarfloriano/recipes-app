import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const PATH_FOODS = '/foods';
const PATH_DRINKS = '/drinks';

describe('Test Recipes Page', () => {
  test('Verify foods category filter',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(PATH_FOODS);
      expect(history.location.pathname).toBe(PATH_FOODS);
      const beefFilter = await screen.findByRole('button', { name: /beef/i });
      expect(beefFilter).toBeInTheDocument();
      userEvent.click(beefFilter);
      const recipeBeef = await screen
        .findByRole('link', { name: /beef and mustard pie/i });
      expect(recipeBeef).toBeInTheDocument();
    });
  test('Verify drinks category filter',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(PATH_DRINKS);
      expect(history.location.pathname).toBe(PATH_DRINKS);
      const ordinaryDrinkCategory = await screen
        .findByRole('button', { name: /ordinary drink/i });
      expect(ordinaryDrinkCategory).toBeInTheDocument();
      userEvent.click(ordinaryDrinkCategory);
      const ordinaryDrinkCards = await screen
        .findByText(/410 Gone/i);
      expect(ordinaryDrinkCards).toBeInTheDocument();
    });
});
