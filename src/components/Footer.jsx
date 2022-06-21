import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <Navbar data-testid="footer" fixed="bottom">
      <button type="button" onClick={ () => history.push('/drinks') }>
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button" onClick={ () => history.push('/explore') }>
        <img src={ exploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
      </button>
      <button type="button" onClick={ () => history.push('/foods') }>
        <img src={ mealIcon } alt="Food Icon" data-testid="food-bottom-btn" />
      </button>
    </Navbar>
  );
}

export default Footer;
