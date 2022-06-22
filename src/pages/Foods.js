import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchFoodRecipe } from '../services/API';

const Foods = () => {
  const { recipesFoods, setRecipesFoods } = useContext(Context);
  console.log(recipesFoods);

  const getRecipesFoods = async () => {
    const MAX_N_RECIPES = 12;
    const data = await fetchFoodRecipe();
    console.log(data);
    console.log(data.slice(0, MAX_N_RECIPES));
    setRecipesFoods(data.slice(0, MAX_N_RECIPES));
    return data.slice(0, MAX_N_RECIPES);
  };

  useEffect(() => {
    getRecipesFoods();
  }, []);

  return (
    <div>
      <Header />
      {/* {recipesFoods.map((recipeFood, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.themealdb.com/images/ingredients/${recipeFood.strIngredient}-Small.png` }
            alt={ recipeFood.strIngredient }
            data-testid={ `${index}-card-img` }
          />

          <p data-testid={ `${index}-card-name` }>
            {ingredientFood.strIngredient}
          </p>
        </div> */}
      {/* ))} */}
      <Footer />
    </div>
  );
};

export default Foods;
