import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import {
  DONE_RECIPES_TOKEN, IN_PROGRESS_RECIPES_TOKEN,
  readStorage,
} from '../services/recipesStorage';

function InitRecipeBtn() {
  const history = useHistory();
  const location = useLocation();
  const [startButton, setStartButton] = useState({
    enableButton: true,
    buttonText: 'Start Recipe',
  });

  useEffect(() => {
    const recipeId = location.pathname.split('/')[2];
    const recipeType = location.pathname.split('/')[1];

    const doneRecipes = readStorage(DONE_RECIPES_TOKEN);
    const inProgressRecipe = readStorage(IN_PROGRESS_RECIPES_TOKEN);

    let isInProgress;

    if (recipeType === 'foods') {
      isInProgress = Object.keys(inProgressRecipe.meals)
        .some((key) => key === recipeId);
    } else {
      isInProgress = Object.keys(inProgressRecipe.cocktails)
        .some((key) => key === recipeId);
    }

    const isDoneRecipe = doneRecipes
      .some(({ id, type }) => (id === recipeId && recipeType.includes(type)));

    setStartButton({
      enableButton: !isDoneRecipe,
      buttonText: isInProgress ? 'Continue Recipe' : 'Start Recipe',
    });
  }, []);

  const handleClick = () => {
    history.push(`${location.pathname}/in-progress`);
  };

  return startButton.enableButton && (
    <button
      type="button"
      className="fixed-bottom"
      onClick={ handleClick }
      data-testid="start-recipe-btn"
    >
      {startButton.buttonText}
    </button>
  );
}

export default InitRecipeBtn;
