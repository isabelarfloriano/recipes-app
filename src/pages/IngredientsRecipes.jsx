import React, { useContext, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Context from '../context/Context';

const IngredientsRecipes = () => {
  const location = useLocation();
  const { ingredients, getIngredients,
    handleIngredientFilter, loading } = useContext(Context);

  useEffect(() => {
    if (location.pathname.includes('foods')) {
      getIngredients('foods');
    } else {
      getIngredients('drinks');
    }
  }, []);

  return loading ? <Loading /> : (
    <div className="bg-light">
      <Header />
      <Container className="mb-5">
        {ingredients.map((ingredient, index) => (
          <button
            type="button"
            onClick={
              () => (location.pathname.includes('foods')
                ? handleIngredientFilter('foods', ingredient.strIngredient)
                : handleIngredientFilter('drinks', ingredient.strIngredient1))
            }
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="icon-button"
          >
            <Card
              className="mb-2"
              data-testid={ `${index}-ingredient-card` }
              style={ { width: '9rem' } }
            >
              <Card.Img
                src={ location.pathname.includes('foods')
                  ? `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`
                  : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt={ ingredient.strIngredient }
                data-testid={ `${index}-card-img` }
              />

              <Card.Title className="text-danger" data-testid={ `${index}-card-name` }>
                {location.pathname.includes('foods')
                  ? ingredient.strIngredient : ingredient.strIngredient1}
              </Card.Title>
            </Card>
          </button>
        ))}
      </Container>
      <Footer />
    </div>
  );
};

export default IngredientsRecipes;

// SOURCE
// 1281 https://stackoverflow.com/questions/34883068/how-to-get-first-n-number-of-elements-from-an-array get N first items
