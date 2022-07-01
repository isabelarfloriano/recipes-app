import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import foodsImage from '../images/foodsImage.jpg';
import drinksImage from '../images/drinksImage.jpg';

const Explore = () => (
  <div className="bg-light">
    <Header />
    <Container className="mb-5">
      <Card className="mb-3">
        <Link to="/explore/foods" data-testid="explore-foods">
          <Card.Img variant="top" src={ foodsImage } />
          <Card.Title className="text-danger text-center my-3">Explore Foods</Card.Title>
        </Link>
      </Card>
      <Card>
        <Link to="/explore/drinks" data-testid="explore-drinks">
          <Card.Img variant="top" src={ drinksImage } />
          <Card.Title className="text-danger text-center my-3">Explore Drinks</Card.Title>
        </Link>
      </Card>
    </Container>
    <Footer />
  </div>
);
export default Explore;
