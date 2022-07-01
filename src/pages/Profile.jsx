import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { getUser } from '../services/login';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Profile = () => {
  const history = useHistory();
  const getEmail = getUser('user');

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <section className="bg-light min-vh-100">
      <Header />
      <section
        className="d-flex justify-content-center mt-5"
      >
        <Container className="d-flex flex-column align-items-center">
          <section>
            <h5 data-testid="profile-email">{getEmail?.email}</h5>
          </section>
          <Button
            variant="danger"
            size="lg"
            type="button"
            className="mb-3 w-100 mt-5"
            data-testid="profile-done-btn"
            onClick={ () => { history.push('/done-recipes'); } }
          >
            Done Recipes
          </Button>

          <Button
            variant="danger"
            size="lg"
            type="button"
            className="mb-3 w-100"
            data-testid="profile-favorite-btn"
            onClick={ () => { history.push('/favorite-recipes'); } }
          >
            Favorite Recipes
          </Button>

          <Button
            variant="danger"
            size="lg"
            type="button"
            className="mb-3 w-100"
            data-testid="profile-logout-btn"
            onClick={ handleClick }
          >
            Logout
          </Button>

        </Container>
      </section>
      <Footer />
    </section>
  );
};

export default Profile;
