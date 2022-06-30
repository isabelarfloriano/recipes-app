import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test Header component', () => {
  test('Verify when search for a foods with one result go to that page', async () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    history.push('/foods');
    const getShowSearchBarBtn = await screen
      .findByRole('button', { name: /search icon/i });
    expect(getShowSearchBarBtn).toBeInTheDocument();
    userEvent.click(getShowSearchBarBtn);
    const getInputSearch = screen.getByRole('textbox');
    expect(getInputSearch).toBeInTheDocument();
    userEvent.type(getInputSearch, 'Corba');
    const getInputIngredients = screen.getByTestId('name-search-radio');
    userEvent.click(getInputIngredients);
    const getSearchBtn = screen.getAllByRole('button', { name: /Search/ });
    expect(getInputSearch).toHaveValue('Corba');
    userEvent.click(getSearchBtn[1]);
    const findIngredientTitle = await screen.findByText(/corba/i);
    expect(findIngredientTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/foods/52977');
  });
  test('Verify when search for a drink with one result go to that page', async () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    history.push('/drinks');
    const getShowSearchBarBtn = await screen
      .findByRole('button', { name: /search icon/i });
    expect(getShowSearchBarBtn).toBeInTheDocument();
    userEvent.click(getShowSearchBarBtn);
    const getInputSearch = screen.getByRole('textbox');
    expect(getInputSearch).toBeInTheDocument();
    userEvent.type(getInputSearch, 'A1');
    const getInputIngredients = screen.getByTestId('name-search-radio');
    userEvent.click(getInputIngredients);
    const getSearchBtn = screen.getAllByRole('button', { name: /Search/ });
    expect(getInputSearch).toHaveValue('A1');
    userEvent.click(getSearchBtn[1]);
    const findIngredientTitle = await screen.findByText(/A1/i);
    expect(findIngredientTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/17222');
  });
  test('Verify when search for a ingrients shows the results', async () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    history.push('/drinks');
    const getShowSearchBarBtn = await screen
      .findByRole('button', { name: /search icon/i });
    expect(getShowSearchBarBtn).toBeInTheDocument();
    userEvent.click(getShowSearchBarBtn);
    const getInputSearch = screen.getByRole('textbox');
    expect(getInputSearch).toBeInTheDocument();
    userEvent.type(getInputSearch, 'vodka');
    const getInputIngredients = screen.getByTestId('ingredient-search-radio');
    userEvent.click(getInputIngredients);
    const getSearchBtn = screen.getAllByRole('button', { name: /Search/ });
    expect(getInputSearch).toHaveValue('vodka');
    userEvent.click(getSearchBtn[1]);
    const findIngredientTitle = await screen.findByText(/155 Belmont/i);
    expect(findIngredientTitle).toBeInTheDocument();
  });
  test('Verify when search for a letter shows the results', async () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    history.push('/foods');
    const getShowSearchBarBtn = await screen
      .findByRole('button', { name: /search icon/i });
    expect(getShowSearchBarBtn).toBeInTheDocument();
    userEvent.click(getShowSearchBarBtn);
    const getInputSearch = screen.getByRole('textbox');
    expect(getInputSearch).toBeInTheDocument();
    userEvent.type(getInputSearch, 'v');
    const getInputIngredients = screen.getByTestId('first-letter-search-radio');
    userEvent.click(getInputIngredients);
    const getSearchBtn = screen.getAllByRole('button', { name: /Search/ });
    expect(getInputSearch).toHaveValue('v');
    userEvent.click(getSearchBtn[1]);
    const findIngredientTitle = await screen.findByText(/Vegan Lasagna/i);
    expect(findIngredientTitle).toBeInTheDocument();
  });
  test('Verify when search for two letter shows an error', async () => {
    const { history } = renderWithRouter(<App />);
    const globalAlertMock = jest.spyOn(global, 'alert').mockImplementation();
    expect(history.location.pathname).toBe('/');
    history.push('/foods');
    const getShowSearchBarBtn = await screen
      .findByRole('button', { name: /search icon/i });
    expect(getShowSearchBarBtn).toBeInTheDocument();
    userEvent.click(getShowSearchBarBtn);
    const getInputSearch = screen.getByRole('textbox');
    expect(getInputSearch).toBeInTheDocument();
    userEvent.type(getInputSearch, 'vvvvv');
    const getInputIngredients = screen.getByTestId('first-letter-search-radio');
    userEvent.click(getInputIngredients);
    const getSearchBtn = screen.getAllByRole('button', { name: /Search/ });
    expect(getInputSearch).toHaveValue('vvvvv');
    userEvent.click(getSearchBtn[1]);
    expect(globalAlertMock).toHaveBeenCalledTimes(1);
  });
  test('Verify when search do not shows an result', async () => {
    const { history } = renderWithRouter(<App />);
    const globalAlertMock = jest.spyOn(global, 'alert').mockImplementation();
    history.push('/foods');
    const getShowSearchBarBtn = await screen
      .findByRole('button', { name: /search icon/i });
    userEvent.click(getShowSearchBarBtn);
    const getInputSearch = screen.getByRole('textbox');
    expect(getInputSearch).toBeInTheDocument();
    userEvent.type(getInputSearch, 'fdsfsdfds');
    const getInputIngredients = screen.getByText(/ingredient/i);
    userEvent.click(getInputIngredients);
    console.log(getInputIngredients);
    const getSearchBtn = screen.getAllByRole('button', { name: /Search/ });
    expect(getInputSearch).toHaveValue('fdsfsdfds');
    userEvent.click(getSearchBtn[1]);
    const findIngredientTitle = await screen.findByText(/Corba/i);
    expect(findIngredientTitle).toBeInTheDocument();
    expect(globalAlertMock).toHaveBeenCalledTimes(1);
  });
});
