import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchDrinkIngredient } from '../services/API';

const IngredientsDrinks = () => {
  const { ingredientsDrinks, setIngredientsDrinks } = useContext(Context);
  console.log(ingredientsDrinks);

  const getIngredientsDrinks = async () => {
    const MAX_N_INGREDIENTS = 12;
    const data = await fetchDrinkIngredient();
    console.log(data);
    console.log(data.slice(0, MAX_N_INGREDIENTS));
    setIngredientsDrinks(data.slice(0, MAX_N_INGREDIENTS));
    return data.slice(0, MAX_N_INGREDIENTS);
  };

  useEffect(() => {
    getIngredientsDrinks();
  }, []);

  return (
    <div>
      <Header />
      {ingredientsDrinks.map((ingredientDrink, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredientDrink.strIngredient1}-Small.png` }
            alt={ ingredientDrink.strIngredient1 }
            data-testid={ `${index}-card-img` }
          />

          <p data-testid={ `${index}-card-name` }>
            {ingredientDrink.strIngredient1}
          </p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default IngredientsDrinks;

// SOURCE
// 1281 https://stackoverflow.com/questions/34883068/how-to-get-first-n-number-of-elements-from-an-array get N first items
