import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <Navbar data-testid="footer" fixed="bottom">
      <button type="button">
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button">
        <img src={ exploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
      </button>
      <button type="button">
        <img src={ mealIcon } alt="Food Icon" data-testid="food-bottom-btn" />
      </button>
    </Navbar>
  );
}

export default Footer;
