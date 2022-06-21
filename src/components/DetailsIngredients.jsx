import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

function DetailsIngredients() {
  const { recipeDetails } = useContext(Context);
  const [ingredients, setIngredients] = useState({
    usedIngredients: [],
    ingredientQuantity: [],
  });

  const { usedIngredients, ingredientQuantity } = ingredients;

  const setIngredientsInfo = (searchedStr) => {
    const info = [];
    Object.keys(recipeDetails).forEach((key) => {
      if (key.includes(searchedStr) && recipeDetails[key]) {
        info.push(recipeDetails[key]);
      }
    });
    return info;
  };

  useEffect(() => {
    const usedIngredientsInfo = setIngredientsInfo('strIngredient');
    const ingredientQuantityInfo = setIngredientsInfo('strMeasure');

    setIngredients({
      usedIngredients: usedIngredientsInfo,
      ingredientQuantity: ingredientQuantityInfo,
    });
  }, [recipeDetails]);

  return (
    <section>
      <h2>Ingredients</h2>
      <ul>
        {usedIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid="ingredient-name-and-measure"
          >
            {ingredient}
            {' '}
            -
            {' '}
            {ingredientQuantity[index]}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DetailsIngredients;
