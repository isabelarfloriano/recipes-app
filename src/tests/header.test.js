import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test Header component', () => {
  test('Verify if click Profile button on header redirects to "/profile"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const getProfileIBTN = screen.getByRole('img', { name: /profile icon/i });
    userEvent.click(getProfileIBTN);
    expect(history.location.pathname).toBe('/profile');
  });
  test('Verify title matchs with router "/drinks"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const getHeaderPageTitle = await screen.findByRole('heading', { name: /drinks/i });
    expect(getHeaderPageTitle).toBeInTheDocument();
  });
  test('Verify title matchs with router "/done-recipes"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    const getHeaderPageTitle = await screen
      .findByRole('heading', { name: /Done Recipes/i });
    expect(getHeaderPageTitle).toBeInTheDocument();
  });
  test('Verify if searchbar appears when click on search icon', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const getShowSearchBarBtn = await screen
      .findByRole('button', { name: /search icon/i });
    expect(getShowSearchBarBtn).toBeInTheDocument();
    userEvent.click(getShowSearchBarBtn);
    const getSearchBtn = screen.getByRole('button', { name: /search icon/i });
    expect(getSearchBtn).toBeInTheDocument();
  });
});
