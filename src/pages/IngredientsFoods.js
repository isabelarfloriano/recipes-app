import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchFoodIngredient } from '../services/API';
import Context from '../context/Context';

const IngredientsFoods = () => {
  const { ingredientsFoods, setIngredientsFoods } = useContext(Context);

  const getIngredientsFoods = async () => {
    const MAX_N_INGREDIENTS = 12;
    const data = await fetchFoodIngredient();
    setIngredientsFoods(data.slice(0, MAX_N_INGREDIENTS));
    return data.slice(0, MAX_N_INGREDIENTS);
  };

  useEffect(() => {
    getIngredientsFoods();
  }, []);

  return (
    <div>
      <Header />
      {ingredientsFoods.map((ingredientFood, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.themealdb.com/images/ingredients/${ingredientFood.strIngredient}-Small.png` }
            alt={ ingredientFood.strIngredient }
            data-testid={ `${index}-card-img` }
          />

          <p data-testid={ `${index}-card-name` }>
            {ingredientFood.strIngredient}
          </p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default IngredientsFoods;

// SOURCE
// 1281 https://stackoverflow.com/questions/34883068/how-to-get-first-n-number-of-elements-from-an-array get N first items
