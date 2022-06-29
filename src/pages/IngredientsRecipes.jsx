import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

const IngredientsRecipes = () => {
  const location = useLocation();
  const { ingredients, getIngredients, handleIngredientFilter } = useContext(Context);

  useEffect(() => {
    if (location.pathname.includes('foods')) {
      getIngredients('foods');
    } else {
      getIngredients('drinks');
    }
  }, []);

  return (
    <div>
      <Header />
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
        >
          <div data-testid={ `${index}-ingredient-card` }>
            <img
              src={ location.pathname.includes('foods')
                ? `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`
                : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              alt={ ingredient.strIngredient }
              data-testid={ `${index}-card-img` }
            />

            <p data-testid={ `${index}-card-name` }>
              {location.pathname.includes('foods')
                ? ingredient.strIngredient : ingredient.strIngredient1}
            </p>
          </div>
        </button>
      ))}
      <Footer />
    </div>
  );
};

export default IngredientsRecipes;

// SOURCE
// 1281 https://stackoverflow.com/questions/34883068/how-to-get-first-n-number-of-elements-from-an-array get N first items
