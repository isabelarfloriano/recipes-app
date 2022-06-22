import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchDrinkRecipe } from '../services/API';

const Drinks = () => {
  const { recipesDrinks, setRecipesDrinks } = useContext(Context);
  console.log(recipesDrinks);

  const getRecipesDrinks = async () => {
    const MAX_N_RECIPES = 12;
    const data = await fetchDrinkRecipe();
    console.log(data);
    console.log(data.slice(0, MAX_N_RECIPES));
    setRecipesDrinks(data.slice(0, MAX_N_RECIPES));
    return data.slice(0, MAX_N_RECIPES);
  };

  useEffect(() => {
    getRecipesDrinks();
  }, []);

  return (
    <div>
      <Header />
      {recipesDrinks.map((recipeDrink, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipeDrink.strDrinkThumb }
            alt={ recipeDrink.strMeal }
            data-testid={ `${index}-card-img` }
          />

          <p data-testid={ `${index}-card-name` }>
            {recipeDrink.strDrink}
          </p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Drinks;
