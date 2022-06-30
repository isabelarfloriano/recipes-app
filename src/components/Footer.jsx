import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import favoriteIcon from '../images/favoriteIcon.svg';
import doneIcon from '../images/doneIcon.svg';

function Footer() {
  return (
    <Navbar
      fixed="bottom"
      className="border-top bg-white"
      data-testid="footer"
    >
      <Container>
        <Link to="/foods">
          <img src={ mealIcon } alt="Food Icon" data-testid="food-bottom-btn" />
        </Link>
        <Link to="/drinks">
          <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
        </Link>
        <Link to="/explore">
          <img src={ exploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
        </Link>
        <Link to="/favorite-recipes">
          <img src={ favoriteIcon } alt="Favorite Icon" />
        </Link>
        <Link to="/done-recipes">
          <img src={ doneIcon } alt="Done Recipes Icon" />
        </Link>
      </Container>
    </Navbar>
  );
}

export default Footer;
