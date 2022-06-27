import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import './DetailsIngredientsInProgress.css';
import {
  IN_PROGRESS_RECIPES_TOKEN, readStorage, SaveStorageRecipeInProgress,
} from '../services/recipesStorage';

function DetailsIngredientsInProgress(props) {
  const { recipeDetails } = useContext(Context);
  const { setdisabedBtn, type, id } = props;
  const [ingredients, setIngredients] = useState({
    usedIngredients: [],
    ingredientQuantity: [],
  });

  const [checkIngredients, setCheckIngredients] = useState({});
  const [stateStorage, setStateStorage] = useState({ cocktails: {}, meals: {} });

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
    SaveStorageRecipeInProgress(IN_PROGRESS_RECIPES_TOKEN, type, id, [checkIngredients]);
  }, [checkIngredients]);

  useEffect(() => {
    const usedIngredientsInfo = setIngredientsInfo('strIngredient');
    const ingredientQuantityInfo = setIngredientsInfo('strMeasure');

    setIngredients({
      usedIngredients: usedIngredientsInfo,
      ingredientQuantity: ingredientQuantityInfo,
    });
    setStateStorage(readStorage(IN_PROGRESS_RECIPES_TOKEN));
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
    setdisabedBtn(isSaveButtonDisabled);
  }, [checkIngredients]);

  useEffect(() => {
    const dataByPageType = stateStorage[type];
    const arrayOfKeys = Object.keys(dataByPageType);
    const idKey = arrayOfKeys.find((key) => key === id);
    console.log((dataByPageType[idKey]));
    // if (idKey) setCheckIngredients({ ...dataByPageType[idKey] });
  }, [stateStorage, id, type]);

  return (
    <section>
      <h2>Ingredients</h2>
      <ul>
        {usedIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={
              checkIngredients[index] ? 'listIngredientsinProgress' : undefined
            }
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
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
