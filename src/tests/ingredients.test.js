import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import ingredients from './helpers/data';

const exploreFoods = '/explore/foods';
const exploreDrinks = '/explore/drinks';

describe('Tests Ingredients Recipes', () => {
  test('Verify route for foods ingredients', () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoods);
    expect(history.location.pathname).toBe(exploreFoods);
    const ingredientsButton = screen.getByRole('button', {
      name: /By Ingredient/i,
    });
    userEvent.click(ingredientsButton);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });
  test('Verify route for drinks ingredients', () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinks);
    expect(history.location.pathname).toBe(exploreDrinks);
    const ingredientsButton = screen.getByRole('button', {
      name: /By Ingredient/i,
    });
    userEvent.click(ingredientsButton);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });
  test('Header and Footer must be render', () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoods);
    const ingredientsTitle = screen.getByRole('heading');
    expect(ingredientsTitle).toBeInTheDocument();
    const foodsImg = screen.getByAltText(/Food Icon/i);
    expect(foodsImg).toBeInTheDocument();
    const drinksImg = screen.getByAltText(/Drink Icon/i);
    expect(drinksImg).toBeInTheDocument();
    const exploreImg = screen.getByAltText(/Explore Icon/i);
    expect(exploreImg).toBeInTheDocument();
    history.push(exploreDrinks);
    expect(ingredientsTitle).toBeInTheDocument();
    expect(foodsImg).toBeInTheDocument();
    expect(drinksImg).toBeInTheDocument();
    expect(exploreImg).toBeInTheDocument();
  });
  // test('Coming from explore foods must have ingredients foods', () => {
  // const { history } = renderWithRouter(<App />);
  // history.push('/explore/foods');

  // ISA... aqui, precisa abordar o botão dos ingredientes, vai da linha 23-27 do IngredientsRecipes.jsx, aí o 100 vem, não pude dar sequência por falta de tempo, consertei os problemas de lint e amanhã ajudo mais...
});
// });
