import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

const FOOTER_BTN_QTD = 3;

describe('Footer component tests', () => {
  it('Should have 3 buttons', () => {
    render(<Footer />);

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(FOOTER_BTN_QTD);
  });

  it('Should redirect to correct route', () => {
    const { history } = renderWithRouter(<Footer />);
    const buttons = screen.getAllByRole('button');

    userEvent.click(buttons[0]);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(buttons[1]);
    expect(history.location.pathname).toBe('/explore');

    userEvent.click(buttons[2]);
    expect(history.location.pathname).toBe('/foods');
  });
});
