import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
// import App from '../App';
import Profile from '../pages/Profile';

describe('Tests Explore', () => {
  test('Verify if the elements are correctly render', () => {
    renderWithRouter(<Profile />);
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
});
