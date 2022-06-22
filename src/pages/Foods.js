import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchFoodRecipe, fetchFoodCategory } from '../services/API';

const Foods = () => {
  const { recipesFoods, setRecipesFoods,
    categoriesFoods, setCategoriesFoods } = useContext(Context);
  // console.log(recipesFoods);

  const getRecipesFoods = async () => {
    const MAX_N_RECIPES = 12;
    const data = await fetchFoodRecipe();
    // console.log(data);
    // console.log(data.slice(0, MAX_N_RECIPES));
    setRecipesFoods(data.slice(0, MAX_N_RECIPES));
    return data.slice(0, MAX_N_RECIPES);
  };

  useEffect(() => {
    getRecipesFoods();
  }, []);

  const getCategory = async () => {
    const MAX_N_CATEGORIES = 5;
    const data = await fetchFoodCategory();
    console.log(data);
    console.log(data.slice(0, MAX_N_CATEGORIES));
    setCategoriesFoods(data.slice(0, MAX_N_CATEGORIES));
    return data.slice(0, MAX_N_CATEGORIES);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <Header />
      {recipesFoods.map((recipeFood, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipeFood.strMealThumb }
            alt={ recipeFood.strMeal }
            data-testid={ `${index}-card-img` }
          />

          <p data-testid={ `${index}-card-name` }>
            {recipeFood.strMeal}
          </p>
        </div>
      ))}

      {categoriesFoods.map((categoryFood, index) => (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${categoryFood.strCategory}-category-filter` }
          >
            {categoryFood.strCategory}
          </button>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Foods;
