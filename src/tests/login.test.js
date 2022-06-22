import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Tests Login', () => {
  test('Verify if login is correctly render', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(1);
    const idEmail = screen.getByTestId(EMAIL_INPUT);
    expect(idEmail).toBeInTheDocument();
    const idPassword = screen.getByTestId(PASSWORD_INPUT);
    expect(idPassword).toBeInTheDocument();
  });
  test('Simulates the inputs operation', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    const idEmail = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(idEmail, 'banana@amarela.com');
    expect(idEmail).toHaveValue('banana@amarela.com');
    const idPassword = screen.getByTestId(PASSWORD_INPUT);
    expect(idPassword).toHaveValue('');
    userEvent.type(idPassword, 'Banana');
    expect(idPassword).toHaveValue('Banana');
  });
  test('Verify if button is correctly render', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    const loginButton = screen.getByRole('button', {
      name: /Enter/i,
    });
    expect(loginButton).toBeInTheDocument();
  });
  test('Test wheter the Enter button is enabled or disabled with correct inputs', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    const loginButton = screen.getByRole('button', {
      name: /Enter/i,
    });
    expect(loginButton).toHaveProperty('disabled', true);
    const idPassword = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(idPassword, 'Goiabada');
    const idEmail = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(idEmail, 'goiaba@sembichinho.com');
    expect(loginButton).toHaveProperty('disabled', false);
    userEvent.click(loginButton);
  });
  test('Test wheter the Enter button is enabled or disabled with incorrect input', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    const loginButton = screen.getByRole('button', {
      name: /Enter/i,
    });
    expect(loginButton).toHaveProperty('disabled', true);
    const idPassword = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(idPassword, 'Ban');
    const idEmail = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(idEmail, 'bananaestragada.com');
    expect(loginButton).toHaveProperty('disabled', true);
  });
  test('Test button redirection', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    const idPassword = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(idPassword, 'Goiabada');
    const idEmail = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(idEmail, 'goiaba@sembichinho.com');
    const loginButton = screen.getByRole('button');
    await userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/foods');
  });
});
