import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import { fetchDrink, fetchFood } from '../services/API';
import Header from '../components/Header';

import exploreByRecipe from '../images/exploreByRecipe.png';
import exploreByNationalities from '../images/exploreByNationalities.png';
import surpriseMe from '../images/surpriseMe.png';

const ExploreRecipes = () => {
  const history = useHistory();
  const { location: { pathname } } = history;

  const randomRoute = async () => {
    let data = [];

    if (pathname.includes('foods')) {
      data = await fetchFood();
      history.push(`/foods/${data[0].idMeal}`);
    } else {
      data = await fetchDrink();

      history.push(`/drinks/${data[0].idDrink}`);
    }
  };

  return (
    <div className="bg-light">
      <Header />
      <Container>
        <Card className="mb-3">
          <button
            type="button"
            onClick={ () => history.push(`/explore/${pathname.includes('foods')
              ? 'foods' : 'drinks'}/ingredients`) }
            data-testid="explore-by-ingredient"
            className="icon-button"
          >
            <Card.Img variant="top" src={ exploreByRecipe } />
            <Card.Title
              className="text-danger text-center my-3"
            >
              By Ingredient
            </Card.Title>
          </button>
        </Card>
        {pathname.includes('foods') && (
          <Card className="mb-3">
            <button
              type="button"
              onClick={ () => history.push('/explore/foods/nationalities') }
              data-testid="explore-by-nationality"
              className="icon-button"
            >
              <Card.Img variant="top" src={ exploreByNationalities } />
              <Card.Title
                className="text-danger text-center my-3"
              >
                By Nationality
              </Card.Title>
            </button>
          </Card>)}
        <Card className="mb-3">
          <button
            type="button"
            onClick={ () => randomRoute() }
            data-testid="explore-surprise"
            className="icon-button"
          >
            <Card.Img variant="top" src={ surpriseMe } />
            <Card.Title
              className="text-danger text-center my-3"
            >
              Surprise me!
            </Card.Title>
          </button>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default ExploreRecipes;
