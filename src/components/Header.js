import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchTopBTN from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => console.log('teste profile') }
      >
        <img src={ profileIcon } alt="Profile Icon" />
      </button>
      <h2 data-testid="page-title">Title</h2>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => console.log('teste search') }
      >
        <img src={ searchTopBTN } alt="Search Icon" />
      </button>
    </header>
  );
}
