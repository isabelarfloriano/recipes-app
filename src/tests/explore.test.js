import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Explore from '../pages/Explore';

describe('Tests Explore', () => {
  test('Verify if the elements are correctly render', () => {
    renderWithRouter(<Explore />);
    const profileIcon = screen.getByRole('img', {
      name: /Profile Icon/i,
    });
    expect(profileIcon).toBeInTheDocument();
    const exploreTitle = screen.getByTestId('page-title');
    expect(exploreTitle).toBeInTheDocument();
    const searchIcon = screen.getByRole('img', {
      name: /Search Icon/i,
    });
    expect(searchIcon).toBeInTheDocument();
    const foodsButton = screen.getByRole('button', {
      name: /Explore Foods/i,
    });
    expect(foodsButton).toBeInTheDocument();
    const drinksButton = screen.getByRole('button', {
      name: /Explore Drinks/i,
    });
    expect(drinksButton).toBeInTheDocument();
  });
  test('Test buttons redirection', async () => {
    const { history } = renderWithRouter(<Explore />);
    const foodsButton = screen.getByRole('button', {
      name: /Explore Foods/i,
    });
    userEvent.click(foodsButton);
    expect(history.location.pathname).toBe('/explore/foods');
    const drinksButton = screen.getByRole('button', {
      name: /Explore Drinks/i,
    });
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
