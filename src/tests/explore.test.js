import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Explore from '../pages/Explore';
import App from '../App';
import { fetchDrink, fetchFood } from '../services/API';

const exploreDrinks = '/explore/drinks';

describe('Tests Explore', () => {
  test('Verify if the elements are correctly render', () => {
    renderWithRouter(<Explore />);
    const profileIcon = screen.getByRole('img', {
      name: /Profile Icon/i,
    });
    expect(profileIcon).toBeInTheDocument();
    const foodsButton = screen.getByRole('button', {
      name: /Explore Foods/i,
    });
    expect(foodsButton).toBeInTheDocument();
    const drinksButton = screen.getByRole('button', {
      name: /Explore Drinks/i,
    });
    expect(drinksButton).toBeInTheDocument();
    const drinkIcon = screen.getByRole('img', {
      name: /Drink Icon/i,
    });
    expect(drinkIcon).toBeInTheDocument();
    const foodIcon = screen.getByRole('img', {
      name: /Food Icon/i,
    });
    expect(foodIcon).toBeInTheDocument();
    const exploreIcon = screen.getByRole('img', {
      name: /Explore Icon/i,
    });
    expect(exploreIcon).toBeInTheDocument();
  });

  test('Test buttons redirection', () => {
    const { history } = renderWithRouter(<Explore />);
    const foodsButton = screen.getByRole('button', {
      name: /Explore Foods/i,
    });
    expect(foodsButton).toBeInTheDocument();
    userEvent.click(foodsButton);
    expect(history.location.pathname).toBe('/explore/foods');

    const drinksButton = screen.getByRole('button', {
      name: /Explore Drinks/i,
    });
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe(exploreDrinks);
  });

  test('Verify if the button surprise me redirect correctly, ExploreDrinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');

    const surpriseMeButton = screen.getByRole('button', {
      name: /Surprise me!/i,
    });
    expect(surpriseMeButton).toBeInTheDocument();
    userEvent.click(surpriseMeButton);

    const data = await fetchFood();
    history.push(`/foods/${data[0].idMeal}`);
    expect(history.location.pathname).toBe(`/foods/${data[0].idMeal}`);
  });

  test('Verify if the elements are correctly render - Explore Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinks);
    const byIngredientsButton = screen.getByRole('button', {
      name: /By Ingredient/i,
    });
    expect(byIngredientsButton).toBeInTheDocument();
    const profileIcon = screen.getByRole('img', {
      name: /Profile Icon/i,
    });
    expect(profileIcon).toBeInTheDocument();
    const drinkIcon = screen.getByRole('img', {
      name: /Drink Icon/i,
    });
    expect(drinkIcon).toBeInTheDocument();
    const foodIcon = screen.getByRole('img', {
      name: /Food Icon/i,
    });
    expect(foodIcon).toBeInTheDocument();
    const exploreIcon = screen.getByRole('img', {
      name: /Explore Icon/i,
    });
    expect(exploreIcon).toBeInTheDocument();

    const surpriseMeButton = screen.getByRole('button', {
      name: /Surprise me!/i,
    });
    expect(surpriseMeButton).toBeInTheDocument();
  });
  test('Verify if button surprise me redirect correctly - ExploreDrinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinks);
    const surpriseMeButton = screen.getByRole('button', {
      name: /Surprise me!/i,
    });
    expect(surpriseMeButton).toBeInTheDocument();
    userEvent.click(surpriseMeButton);

    const data = await fetchDrink();
    history.push(`/drinks/${data[0].idDrink}`);
    expect(history.location.pathname).toBe(`/drinks/${data[0].idDrink}`);
  });
});
