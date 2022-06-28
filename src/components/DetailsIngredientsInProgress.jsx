import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import './DetailsIngredientsInProgress.css';
import {
  IN_PROGRESS_RECIPES_TOKEN, readStorage, SaveStorageRecipeInProgress,
} from '../services/recipesStorage';

function DetailsIngredientsInProgress(props) {
  const { recipeDetails, loading } = useContext(Context);
  const { setdisabedBtn, type, id } = props;
  const [ingredients, setIngredients] = useState({
    usedIngredients: [],
    ingredientQuantity: [],
  });

  const [checkIngredients, setCheckIngredients] = useState({});
  const [loadStorage, setStorageLoad] = useState(false);
  const storage = readStorage(IN_PROGRESS_RECIPES_TOKEN);

  const { usedIngredients, ingredientQuantity } = ingredients;
  const { [type]: typeOfRecipe } = storage;
  const dataFromLocalStorage = typeOfRecipe[id];

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
  }, [loading]);

  useEffect(() => {
    // foi
    if (Object.keys(checkIngredients).length) {
      const filteredIngredients = Object.keys(checkIngredients)
        .filter((value) => checkIngredients[value]);
      SaveStorageRecipeInProgress(
        IN_PROGRESS_RECIPES_TOKEN, type, id, filteredIngredients,
      );
    }
  }, [checkIngredients, id, type]);

  useEffect(() => {
    if (dataFromLocalStorage) {
      dataFromLocalStorage.map((ingredient) => {
        const obj = { target: { name: ingredient, checked: true } };
        return (handleChange(obj));
      });
    }
  }, [loadStorage]);

  // state Inicial
  useEffect(() => {
    usedIngredients.map((ingredient) => {
      const startState = { target: { name: ingredient, checked: false } };
      return (handleChange(startState));
    });
    setStorageLoad(true);
  }, [ingredients]);

  useEffect(() => {
    const arrayOfCheckeds = Object.values(checkIngredients);
    // if (dataFromLocalStorage.length < usedIngredients.length) {
    //   setdisabedBtn(false);
    // }
    const isSaveButtonDisabled = !(
      arrayOfCheckeds.every((checked) => checked === true));
    setdisabedBtn(isSaveButtonDisabled);
  }, [checkIngredients]);

  // const handleCheckedValue = (ingredient) => {
  //   if (dataFromLocalStorage.legth > 0) {
  //     const checkValueFromLocalStorage = dataFromLocalStorage
  //       .filter((ingredientStorage) => ingredientStorage === ingredient);
  //     if (checkValueFromLocalStorage) {
  //       console.log(checkValueFromLocalStorage);
  //       console.log('oi');
  //       return true;
  //     }
  //   }
  //   return checkIngredients[ingredient];
  // };

  return (
    <section>
      <h2>Ingredients</h2>
      <ul>
        {usedIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={
              checkIngredients[ingredient] ? 'listIngredientsinProgress' : undefined
            }
          >
            <input
              type="checkbox"
              name={ `${ingredient}` }
              onChange={ handleChange }
              checked={ checkIngredients[ingredient] }
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
