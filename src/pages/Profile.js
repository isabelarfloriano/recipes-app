import React from 'react';
import { useHistory } from 'react-router-dom';
import { getUser } from '../services/login';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Profile = () => {
  const history = useHistory();
  const getEmail = getUser('user').email;
  console.log(getEmail);

  // Requisitos 82 ao 87
  const handleClick = () => {
    console.log('works');
    localStorage.clear();
    history.push('/');
  };

  return (
    <>

      <Header />

      <p data-testid="profile-email">{getEmail}</p>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => { history.push('/done-recipes'); } }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => { history.push('/favorite-recipes'); } }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Logout
      </button>

      <Footer />

    </>
  );
};

export default Profile;
