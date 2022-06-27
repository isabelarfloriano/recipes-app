import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import { fetchDrink, fetchFood } from '../services/API';
import Header from '../components/Header';
import ExploreButton from '../components/ExploreButton';

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
    <div>
      <Header />
      <ExploreButton
        testId="by-ingredient"
        route={ `/explore/${pathname.includes('foods')
          ? 'foods' : 'drinks'}/ingredients` }
      >
        By Ingredient
      </ExploreButton>

      {pathname.includes('foods') && (
        <ExploreButton testId="by-nationality" route="/explore/foods/nationalities">
          By Nationality
        </ExploreButton>
      )}

      <button
        type="button"
        onClick={ () => randomRoute() }
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
};

export default ExploreRecipes;
