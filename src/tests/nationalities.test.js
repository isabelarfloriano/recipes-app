import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { nationalities, categories } from './helpers/dataNationalities';

const NATIONALITIES = '/explore/foods/nationalities';
const EXPLORE_FOODS = '/explore/foods';
describe('Tests Nationalities Foods', () => {
  test('Verify route for foods nationalities', () => {
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_FOODS);
    expect(history.location.pathname).toBe(EXPLORE_FOODS);
    const nationalitiesButton = screen.getByRole('button', {
      name: /By Nationality/i,
    });
    userEvent.click(nationalitiesButton);
    expect(history.location.pathname).toBe(NATIONALITIES);
  });
  test('Header and Footer must be render', () => {
    const { history } = renderWithRouter(<App />);
    history.push(NATIONALITIES);
    const ingredientsTitle = screen.getByRole('heading');
    expect(ingredientsTitle).toBeInTheDocument();
    const foodsImg = screen.getByAltText(/Food Icon/i);
    expect(foodsImg).toBeInTheDocument();
    const drinksImg = screen.getByAltText(/Drink Icon/i);
    expect(drinksImg).toBeInTheDocument();
    const exploreImg = screen.getByAltText(/Explore Icon/i);
    expect(exploreImg).toBeInTheDocument();
  });

  test('Verify filters are correctly render', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      {
        json: jest.fn()
          .mockResolvedValue(nationalities)
          .mockResolvedValueOnce(categories),
      },
    );
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_FOODS);
    expect(history.location.pathname).toBe(EXPLORE_FOODS);
    const nationalitiesButton = screen.getByRole('button', {
      name: /By Nationality/i,
    });
    userEvent.click(nationalitiesButton);
    expect(history.location.pathname).toBe(NATIONALITIES);

    // identificar os filtros

    jest.restoreAllMocks();
  });
});
