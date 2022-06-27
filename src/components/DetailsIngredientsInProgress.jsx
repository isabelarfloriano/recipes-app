import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import './DetailsIngredientsInProgress.css';

function DetailsIngredientsInProgress(props) {
  const { recipeDetails } = useContext(Context);
  const { setdisabedBtn } = props;
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

  useEffect(() => {
    const usedIngredientsInfo = setIngredientsInfo('strIngredient');
    const ingredientQuantityInfo = setIngredientsInfo('strMeasure');

    setIngredients({
      usedIngredients: usedIngredientsInfo,
      ingredientQuantity: ingredientQuantityInfo,
    });
  }, [recipeDetails]);

  useEffect(() => {
    ingredients.usedIngredients.map((_ingredient, index) => (
      setCheckIngredients((prevCheckIngredients) => ({
        ...prevCheckIngredients,
        [index]: false,
      }))
    ));
  }, [ingredients]);

  useEffect(() => {
    const arrayOfCheckeds = Object.values(checkIngredients);
    const isSaveButtonDisabled = !(arrayOfCheckeds.every((checked) => checked === true));
    console.log(arrayOfCheckeds);
    // console.log(isSaveButtonDisabled);
    setdisabedBtn(isSaveButtonDisabled);
  }, [checkIngredients]);

  return (
    <section>
      <h2>Ingredients</h2>
      <ul>
        {usedIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={ checkIngredients[index] && 'listIngredientsinProgress' }
          >
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
DetailsIngredientsInProgress.propTypes = {
  setdisabedBtn: PropTypes.func.isRequired,
};
