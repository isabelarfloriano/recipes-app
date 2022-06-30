import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { inProgressRecipeMock } from './helpers/mock';

const FOODS_IN_PROGRESS_URL = '/foods/52977/in-progress';
const DRINKS_IN_PROGRESS_URL = '/drinks/17222/in-progress';

describe('Tests In Progress Recipe Page', () => {
  test('Verify if "Finish Recipe" btn is disabled', () => {
    const { history } = renderWithRouter(<App />);
    history.push(FOODS_IN_PROGRESS_URL);
    expect(history.location.pathname).toBe(FOODS_IN_PROGRESS_URL);
    const finishRecipeBtn = screen.getByRole('button', { name: /finish recipe/i });
    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeDisabled();
  });
  test(
    `Verify when all checkbox are mark has true, finish btn be able and redirects to 
    "/done-recipes"`,
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(FOODS_IN_PROGRESS_URL);
      expect(history.location.pathname).toBe(FOODS_IN_PROGRESS_URL);
      const ingredientsCheckBox = await screen.findAllByRole('checkbox');
      console.log(ingredientsCheckBox.length);
      ingredientsCheckBox.forEach((ingredient) => userEvent.click(ingredient));
      const finishRecipeBtn = await screen
        .findByRole('button', { name: /finish recipe/i });
      expect(finishRecipeBtn).toBeInTheDocument();
      await expect(finishRecipeBtn).not.toBeDisabled();
      userEvent.click(finishRecipeBtn);
      const doneRecipesTitle = await screen
        .findByRole('heading', { name: /done recipes/i });
      expect(doneRecipesTitle).toBeInTheDocument();
      expect(history.location.pathname).toBe('/done-recipes');
    },
  );
  test('Verify when enter drinks recipe in progress returns the correct page',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(DRINKS_IN_PROGRESS_URL);
      expect(history.location.pathname).toBe(DRINKS_IN_PROGRESS_URL);
      const drinkTitle = await screen.findByText(/a1/i);
      expect(drinkTitle).toBeInTheDocument();
    });
  test('Verify when enter in recipe in progress page load LocalStorage data',
    async () => {
      const { history } = renderWithRouter(<App />);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipeMock));
      history.push(DRINKS_IN_PROGRESS_URL);
      expect(history.location.pathname).toBe(DRINKS_IN_PROGRESS_URL);
      const drinkTitle = await screen.findByText(/a1/i);
      expect(drinkTitle).toBeInTheDocument();
      const ingredientsCheckBox = await screen.findAllByRole('checkbox');
      expect(ingredientsCheckBox[0].checked).toBe(true);
      expect(ingredientsCheckBox[1].checked).toBe(false);
    });
});
