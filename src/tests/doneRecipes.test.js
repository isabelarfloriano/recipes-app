import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { doneRecipes } from './helpers/mock';

const DONE_RECIPES_PATH = '/done-recipes';

describe('Tests In Progress Recipe Page', () => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  test('Verify filter Foods',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(DONE_RECIPES_PATH);
      expect(history.location.pathname).toBe(DONE_RECIPES_PATH);
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
    history.push(DONE_RECIPES_PATH);
    expect(history.location.pathname).toBe(DONE_RECIPES_PATH);
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
    history.push(DONE_RECIPES_PATH);
    expect(history.location.pathname).toBe(DONE_RECIPES_PATH);
    const drinksFilterBtn = await screen.findByRole('button', { name: /drinks/i });
    expect(drinksFilterBtn).toBeInTheDocument();
    userEvent.click(drinksFilterBtn);
    const drinkTitle = await screen.findByText(/A1/i);
    expect(drinkTitle).toBeInTheDocument();
    const AllITypesFilterBtn = await screen.findByRole('button', { name: /All/i });
    expect(AllITypesFilterBtn).toBeInTheDocument();
    userEvent.click(AllITypesFilterBtn);
    expect(drinkTitle).toBeInTheDocument();
    const foodTitle = await screen.findByText(/tamiya/i);
    expect(foodTitle).toBeInTheDocument();
  });
});
