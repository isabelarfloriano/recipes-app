import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchTopBTN from '../images/searchIcon.svg';

export default function Header() {
  const [title, setTitle] = useState('');
  const [hasSearchBtn, setHasSearchBtn] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    switch (pathname) {
    case '/foods':
      return setTitle('Foods');
    case '/drinks':
      return setTitle('Drinks');
    case '/explore':
      setTitle('Explore');
      setHasSearchBtn(false);
      break;
    case '/explore/foods':
      setTitle('Explore Foods');
      setHasSearchBtn(false);
      break;
    case '/explore/drinks':
      setTitle('Explore Drinks');
      setHasSearchBtn(false);
      break;
    case '/explore/foods/ingredients':
    case '/explore/drinks/ingredients':
      setTitle('Explore Ingredients');
      setHasSearchBtn(false);
      break;
    case '/explore/foods/nationalities':
      return setTitle('Explore Nationalities');
    case '/profile':
      setTitle('Profile');
      setHasSearchBtn(false);
      break;
    case '/done-recipes':
      setTitle('Done Recipes');
      setHasSearchBtn(false);
      break;
    case '/favorite-recipes':
      setTitle('Favorite Recipes');
      setHasSearchBtn(false);
      break;
    default:
      return undefined;
    }
  }, [pathname]);

  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
      </button>
      <h2 data-testid="page-title">{title}</h2>
      { hasSearchBtn
      && (
        <button
          type="button"
          onClick={ () => console.log('teste search') }
        >
          <img src={ searchTopBTN } alt="Search Icon" data-testid="search-top-btn" />
        </button>) }
    </header>
  );
}
