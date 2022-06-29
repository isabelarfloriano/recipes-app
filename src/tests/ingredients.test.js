import React, { useContext } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import ingredients from './helpers/data';

describe('Tests Ingredients Recipes', () => {
  test('Verify route for foods ingredients', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');
    expect(history.location.pathname).toBe('/explore/foods');
    const ingredientsButton = screen.getByRole('button', {
      name: /By Ingredient/i,
    });
    userEvent.click(ingredientsButton);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });
  test('Verify route for drinks ingredients', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    expect(history.location.pathname).toBe('/explore/drinks');
    const ingredientsButton = screen.getByRole('button', {
      name: /By Ingredient/i,
    });
    userEvent.click(ingredientsButton);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });
  test('Header and Footer must be render', () => {
    const { history } = renderWithRouter(<App />)
    history.push('/explore/foods');
    const ingredientsTitle = screen.getByRole('heading')
    expect(ingredientsTitle).toBeInTheDocument();
    const foodsImg = screen.getByAltText(/Food Icon/i);
    expect(foodsImg).toBeInTheDocument();
    const drinksImg = screen.getByAltText(/Drink Icon/i);
    expect(drinksImg).toBeInTheDocument();
    const exploreImg = screen.getByAltText(/Explore Icon/i);
    expect(exploreImg).toBeInTheDocument();
    history.push('/explore/drinks');
    expect(ingredientsTitle).toBeInTheDocument();
    expect(foodsImg).toBeInTheDocument();
    expect(drinksImg).toBeInTheDocument();
    expect(exploreImg).toBeInTheDocument();
  });
  test('Coming from explore foods must have ingredients foods', () => {
/*     const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');
    expect(history.location.pathname).toBe('/explore/foods');
    const ingredientsButton = screen.getByRole('button', {
      name: /By Ingredient/i,
    });
    userEvent.click(ingredientsButton);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
    history.push('/explore/foods/ingredients')
    const foodIngredient = screen.getByText(/Chicken/i)
    expect(foodIngredient).toBe(ingredients.food[1])*/
  });
})
