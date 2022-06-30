import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Context from '../context/Context';
import { DONE_RECIPES_TOKEN, SaveStorage } from '../services/recipesStorage';

export default function FinishRecipeBtn(props) {
  const location = useLocation();
  const history = useHistory();
  const { disabedBtn } = props;
  const { recipeDetails } = useContext(Context);

  const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const createObjectAndSaveOnLocalStorage = () => {
    const recipeType = location.pathname.split('/')[1];
    if (recipeType === 'foods') {
      return ({
        id: recipeDetails.idMeal,
        type: 'food',
        nationality: recipeDetails.strArea,
        category: recipeDetails.strCategory,
        alcoholicOrNot: '',
        name: recipeDetails.strMeal,
        image: recipeDetails.strMealThumb,
        tags: [recipeDetails.strTags],
        doneDate: getDate(),
      });
    }
    return ({
      id: recipeDetails.idDrink,
      type: 'drink',
      nationality: '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic,
      name: recipeDetails.strDrink,
      image: recipeDetails.strDrinkThumb,
      tags: [recipeDetails.strTags],
      doneDate: getDate(),
    });
  };

  const handleDFinishRecipe = () => {
    const data = createObjectAndSaveOnLocalStorage();
    SaveStorage(DONE_RECIPES_TOKEN, data);
    history.push('/done-recipes');
  };

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ handleDFinishRecipe }
      disabled={ disabedBtn }
    >
      Finish Recipe
    </button>
  );
}

FinishRecipeBtn.propTypes = {
  disabedBtn: PropTypes.bool.isRequired,
};
