import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchDrinkRecipe, fetchDrinkCategory } from '../services/API';

const Drinks = () => {
  const { recipesDrinks, setRecipesDrinks,
    categoriesDrinks, setCategoriesDrinks } = useContext(Context);
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

  const getCategory = async () => {
    const MAX_N_CATEGORIES = 5;
    const data = await fetchDrinkCategory();
    console.log(data);
    console.log(data.slice(0, MAX_N_CATEGORIES));
    setCategoriesDrinks(data.slice(0, MAX_N_CATEGORIES));
    return data.slice(0, MAX_N_CATEGORIES);
  };

  useEffect(() => {
    getCategory();
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

      {categoriesDrinks.map((categoryDrink, index) => (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${categoryDrink.strCategory}-category-filter` }
          >
            {categoryDrink.strCategory}
          </button>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Drinks;
