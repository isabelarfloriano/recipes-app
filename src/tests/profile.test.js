import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Profile from '../pages/Profile';

const TOTAL_BUTTONS = 6;

describe('Tests Profile', () => {
  test('Verify if email is correctly render', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    const idPassword = screen.getByTestId('password-input');
    userEvent.type(idPassword, 'Goiabada');
    const idEmail = screen.getByTestId('email-input');
    userEvent.type(idEmail, 'goiaba@sembichinho.com');
    const loginButton = screen.getByRole('button');
    userEvent.click(loginButton);
    // email to LocalStorage
    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');
    const emailText = screen.getByText('goiaba@sembichinho.com');
    expect(emailText).toBeInTheDocument();
  });
  test('Test if have all buttons render', () => {
    renderWithRouter(<Profile />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(TOTAL_BUTTONS);
  });
  test('Verify if all body buttons are correctly render', () => {
    renderWithRouter(<Profile />);
    const doneButton = screen.getByTestId('profile-done-btn');
    expect(doneButton).toBeInTheDocument();
    const favoritesButton = screen.getByTestId('profile-favorite-btn');
    expect(favoritesButton).toBeInTheDocument();
    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();
  });
  test('Test buttons redirection', async () => {
    const { history } = renderWithRouter(<Profile />);
    const doneButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');
    const favoritesButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoritesButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
    const logoutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });
});
