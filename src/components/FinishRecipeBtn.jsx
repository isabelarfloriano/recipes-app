import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
    let tags = '';
    if (recipeDetails.strTags) {
      tags = recipeDetails.strTags.split(',');
    } else {
      tags = [];
    }


    if (recipeType === 'foods') {
      return ({
        id: recipeDetails.idMeal,
        type: 'food',
        nationality: recipeDetails.strArea,
        category: recipeDetails.strCategory,
        alcoholicOrNot: '',
        name: recipeDetails.strMeal,
        image: recipeDetails.strMealThumb,
        tags,
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
      tags,

      doneDate: getDate(),
    });
  };

  const handleDFinishRecipe = () => {
    const data = createObjectAndSaveOnLocalStorage();
    SaveStorage(DONE_RECIPES_TOKEN, data);
    history.push('/done-recipes');
  };

  return (
    <Button
      variant="danger"
      block
      size="lg"
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ handleDFinishRecipe }
      disabled={ disabedBtn }
    >
      Finish Recipe
    </Button>
  );
}

FinishRecipeBtn.propTypes = {
  disabedBtn: PropTypes.bool.isRequired,
};
