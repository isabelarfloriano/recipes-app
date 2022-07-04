import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { nationatilyFoods } from './helpers/dataNationalities';
import dataMeals from './helpers/dataMeals';

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
    const nationalitiesTitle = screen.getByRole('heading');
    expect(nationalitiesTitle).toBeInTheDocument();
    const foodsImg = screen.getByAltText(/Food Icon/i);
    expect(foodsImg).toBeInTheDocument();
    const drinksImg = screen.getByAltText(/Drink Icon/i);
    expect(drinksImg).toBeInTheDocument();
    const exploreImg = screen.getByAltText(/Explore Icon/i);
    expect(exploreImg).toBeInTheDocument();
  });

  test('Verify filters are render', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_FOODS);
    expect(history.location.pathname).toBe(EXPLORE_FOODS);
    const nationalitiesButton = screen.getByRole('button', {
      name: /By Nationality/i,
    });
    userEvent.click(nationalitiesButton);
    expect(history.location.pathname).toBe(NATIONALITIES);
    const filters = await screen.findAllByRole('combobox');
    expect(filters.length).toBe(2);
  });

  test('Verify filter by nationalities', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      {
        json: jest.fn()
          .mockResolvedValue(nationatilyFoods),
        // .mockReturnValue(italian),
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
    const filters = await screen.findAllByRole('combobox');
    expect(filters.length).toBe(2);
    const optionItalian = await screen.findByRole('option', { name: 'Italian' });
    expect(optionItalian).toBeInTheDocument();
    userEvent.click(
      filters[0],
      screen.getByRole('option', { name: 'Italian' }),
      { skipPointerEventsCheck: true },
    );
    console.log(optionItalian.selected);
    expect(screen.getByRole('option', { name: 'Italian' }).selected).toBe(true);

    jest.restoreAllMocks();
  });
  test('Test card redirection', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      {
        json: jest.fn()
          .mockResolvedValue(nationatilyFoods)
          .mockReturnValue(dataMeals),
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
    const cardEl = await screen.findByText('Corba');
    expect(cardEl).toBeInTheDocument();
    userEvent.click(cardEl);
    expect(history.location.pathname).toBe('/foods/52977');
    jest.restoreAllMocks();
  });
});
