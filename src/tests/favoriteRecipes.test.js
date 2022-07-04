import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { doneRecipes } from './helpers/mock';
import { FAVORITE_RECIPES_TOKEN, readStorage } from '../services/recipesStorage';

const FAVORITE_RECIPES = '/favorite-recipes';

describe('Tests In Progress Recipe Page', () => {
  localStorage
    .setItem(FAVORITE_RECIPES_TOKEN, JSON.stringify(doneRecipes));

  test('Verify filter Foods',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(FAVORITE_RECIPES);
      expect(history.location.pathname).toBe(FAVORITE_RECIPES);
      const foodsFilterBtn = await screen.findByRole('button', { name: /foods/i });
      expect(foodsFilterBtn).toBeInTheDocument();
      userEvent.click(foodsFilterBtn);
      const foodTitle = await screen.findByText(/tamiya/i);
      expect(foodTitle).toBeInTheDocument();
      const drinkTitle = screen.queryByText(/A1/i);
      expect(drinkTitle).not.toBeInTheDocument();
    });
  test('Verify filter Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(FAVORITE_RECIPES);
    expect(history.location.pathname).toBe(FAVORITE_RECIPES);
    const drinksFilterBtn = await screen.findByRole('button', { name: /drinks/i });
    expect(drinksFilterBtn).toBeInTheDocument();
    userEvent.click(drinksFilterBtn);
    const drinkTitle = await screen.findByText(/A1/i);
    expect(drinkTitle).toBeInTheDocument();
    const foodTitle = screen.queryByText(/tamiya/i);
    expect(foodTitle).not.toBeInTheDocument();
  });
  test('Verify All ingredients filter', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(FAVORITE_RECIPES);
    expect(history.location.pathname).toBe(FAVORITE_RECIPES);
    const drinksFilterBtn = await screen.findByRole('button', { name: /drinks/i });
    expect(drinksFilterBtn).toBeInTheDocument();
    userEvent.click(drinksFilterBtn);
    const drinkTitle = await screen.findByText(/A1/i);
    expect(drinkTitle).toBeInTheDocument();
    const AllITypesFilterBtn = await screen.findByRole('button', { name: /All/i });
    expect(AllITypesFilterBtn).toBeInTheDocument();
    userEvent.click(AllITypesFilterBtn);
    const foodTitle = await screen.findByText(/tamiya/i);
    expect(foodTitle).toBeInTheDocument();
  });
  test('Verify remove favorite button', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(FAVORITE_RECIPES);
    expect(history.location.pathname).toBe(FAVORITE_RECIPES);
    expect(readStorage(FAVORITE_RECIPES_TOKEN))
      .toStrictEqual(doneRecipes);
    const recipeItem1 = await screen.findByText(/tamiya/i);
    const recipeItem2 = await screen.findByText(/A1/i);
    expect(recipeItem1).toBeInTheDocument();
    expect(recipeItem2).toBeInTheDocument();
    let favoriteIcons = await screen.findAllByRole('img', { name: /favorite icon/i });
    expect(favoriteIcons.length).toBe(2);
    userEvent.click(favoriteIcons[0]);
    await wait(() => {
      expect(screen.queryByText(/tamiya/i)).not.toBeInTheDocument();
      favoriteIcons = screen.getAllByRole('img', { name: /favorite icon/i });
      expect(favoriteIcons.length).toBe(1);
    });
  });
});
