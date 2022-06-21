import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';

describe('Tests Login', () => {
  test('Verify if login is correctly render', () => {
    renderWithRouter(<Login />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(2);
    const labelEmail = screen.getByLabelText('email', { selector: 'input' });
    expect(labelEmail).toBeInTheDocument();
    const labelPassword = screen.getByLabelText('password', { selector: 'input' });
    expect(labelPassword).toBeInTheDocument();
  });
  test('Simulates the inputs operation', () => {
    renderWithRouter(<Login />);
    const labelEmail = screen.getByLabelText('email', { selector: 'input' });
    expect(labelEmail).toHaveValue('');
    userEvent.type(labelEmail, 'banana@amarela.com');
    expect(labelEmail).toHaveValue('banana@amarela.com');
    const labelPassword = screen.getByLabelText('password', { selector: 'input' });
    expect(labelPassword).toHaveValue('');
    userEvent.type(labelPassword, 'Banana');
    expect(labelPassword).toHaveValue('Banana');
  });
  test('Verify if button is correctly render', () => {
    renderWithRouter(<Login />);
    const loginButton = screen.getByRole('button', {
      name: /Enter/i,
    });
    expect(loginButton).toBeInTheDocument();
  });
  test('Test wheter the Enter button is enabled or disabled with correct inputs', () => {
    const { history } = renderWithRouter(<Login />);
    expect(history.location.pathname).toBe('/');
    const loginButton = screen.getByRole('button', {
      name: /Enter/i,
    });
    expect(loginButton).toHaveProperty('disabled', true);
    const labelPassword = screen.getByLabelText('password', { selector: 'input' });
    userEvent.type(labelPassword, 'Goiaba');
    const labelEmail = screen.getByLabelText('email', { selector: 'input' });
    userEvent.type(labelEmail, 'goiaba@sembichinho.com');
    expect(loginButton).toHaveProperty('disabled', false);
    userEvent.click(loginButton);
  });
  test('Test wheter the Enter button is enabled or disabled with incorrect input', () => {
    const { history } = renderWithRouter(<Login />);
    expect(history.location.pathname).toBe('/');
    const loginButton = screen.getByRole('button', {
      name: /Enter/i,
    });
    expect(loginButton).toHaveProperty('disabled', true);
    const labelPassword = screen.getByLabelText('password', { selector: 'input' });
    userEvent.type(labelPassword, 'Ban');
    const labelEmail = screen.getByLabelText('email', { selector: 'input' });
    userEvent.type(labelEmail, 'bananaestragada.com');
    expect(loginButton).toHaveProperty('disabled', true);
  });
  test('Test button redirection', () => {
    const { history } = renderWithRouter(<Login />);
    const loginButton = screen.getByRole('button', {
      name: /Enter/i,
    });
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/foods');
  });
});
