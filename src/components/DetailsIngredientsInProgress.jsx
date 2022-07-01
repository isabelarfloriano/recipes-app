import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
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
        const startState = { target: { name: ingredient, checked: true } };
        return (handleChange(startState));
      });
    }
  }, [loading]);

  useEffect(() => {
    if (dataFromLocalStorage) {
      const filteredStateIngredients = usedIngredients
        .filter((ingredient) => !dataFromLocalStorage.includes(ingredient));
      filteredStateIngredients.map((ingredient) => {
        const startState = { target: { name: ingredient, checked: false } };
        return (handleChange(startState));
      });
    } else {
      usedIngredients.map((ingredient) => {
        const startState = { target: { name: ingredient, checked: false } };
        return (handleChange(startState));
      });
    }
  }, [ingredients]);

  useEffect(() => {
    const arrayOfCheckeds = Object.values(checkIngredients);
    const isSaveButtonDisabled = !(
      arrayOfCheckeds.every((checked) => checked === true));
    setdisabedBtn(isSaveButtonDisabled);
  }, [checkIngredients]);

  return (
    <Container>
      <h2 className="name-title">Ingredients</h2>
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
    </Container>
  );
}

export default DetailsIngredientsInProgress;
DetailsIngredientsInProgress.propTypes = {
  setdisabedBtn: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
