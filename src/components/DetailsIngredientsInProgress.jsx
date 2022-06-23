import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

function DetailsIngredientsInProgress() {
  const { recipeDetails } = useContext(Context);
  const [ingredients, setIngredients] = useState({
    usedIngredients: [],
    ingredientQuantity: [],
  });

  const [checkIngredients, setCheckIngredients] = useState({});

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

  const handleChange = ({ target: { name, checked } }) => {
    setCheckIngredients((prevCheckIngredients) => ({
      ...prevCheckIngredients,
      [name]: checked,
    }));
  };

  console.log(ingredientQuantity);

  useEffect(() => {
    const usedIngredientsInfo = setIngredientsInfo('strIngredient');
    const ingredientQuantityInfo = setIngredientsInfo('strMeasure');

    setIngredients({
      usedIngredients: usedIngredientsInfo,
      ingredientQuantity: ingredientQuantityInfo,
    });
  }, [recipeDetails]);

  console.log(checkIngredients);

  return (
    <section>
      <h2>Ingredients</h2>
      <ul>
        {usedIngredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              name={ `${index}` }
              onChange={ handleChange }
              checked={ checkIngredients[`${index}`] }
            />
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

export default DetailsIngredientsInProgress;
