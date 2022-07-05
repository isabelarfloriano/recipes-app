import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { detailsHeader } from './helpers/mock';
import {
  FAVORITE_RECIPES_TOKEN,
  readStorage,
  saveStorageData,
} from '../services/recipesStorage';

jest.mock('clipboard-copy', () => jest.fn());
const copy = require('clipboard-copy');

const PATH = '/foods/52977';

describe('Test Details Header Component', () => {
  test('Verify if favorite button is checked has true save recipe has favorite',
    async () => {
      saveStorageData('favoriteRecipes', detailsHeader.withoutFavoriteRecipe);
      const { history } = renderWithRouter(<App />);
      history.push(PATH);
      expect(readStorage(FAVORITE_RECIPES_TOKEN))
        .toStrictEqual(detailsHeader.withoutFavoriteRecipe);
      const ingredientItem = await screen.findByText(/lentils/i);
      expect(ingredientItem).toBeInTheDocument();
      const favoriteIcon = await screen.findByRole('button', { name: /favorite icon/i });
      expect(favoriteIcon).toBeInTheDocument();
      userEvent.click(favoriteIcon);
      expect(readStorage(FAVORITE_RECIPES_TOKEN))
        .toStrictEqual(detailsHeader.withFavoriteRecipe);
    });
  test('Verify if favorite button is checked has false remove recipe has favorite',
    async () => {
      saveStorageData('favoriteRecipes', detailsHeader.withFavoriteRecipe);
      const { history } = renderWithRouter(<App />);
      history.push(PATH);
      expect(readStorage(FAVORITE_RECIPES_TOKEN))
        .toStrictEqual(detailsHeader.withFavoriteRecipe);
      const ingredientItem = await screen.findByText(/lentils/i);
      expect(ingredientItem).toBeInTheDocument();
      const favoriteIcon = await screen.findByRole('button', { name: /favorite icon/i });
      expect(favoriteIcon).toBeInTheDocument();
      userEvent.click(favoriteIcon);
      expect(readStorage(FAVORITE_RECIPES_TOKEN))
        .toStrictEqual(detailsHeader.withoutFavoriteRecipe);
    });
  test('Verify share-btn mensage', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);
    const ingredientItem = await screen.findByText(/lentils/i);
    expect(ingredientItem).toBeInTheDocument();
    const shareButton = screen.getByRole('img', {
      name: /share icon/i,
    });
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
    expect(copy).toHaveBeenCalled();
    const mensage = await screen.findByText(/Link copied!/i);
    expect(mensage).toBeInTheDocument();
  });
});
