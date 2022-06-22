import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { DONE_RECIPES_TOKEN, readStorage } from '../services/recipesStorage';

function InitRecipeBtn() {
  const history = useHistory();
  const location = useLocation();
  const [enableStartBtn, setEnableStartBtn] = useState(true);

  useEffect(() => {
    const recipeId = location.pathname.split('/')[2];
    const recipeType = location.pathname.split('/')[1];
    const doneRecipes = readStorage(DONE_RECIPES_TOKEN);
    const isDoneRecipe = doneRecipes
      .some(({ id, type }) => (id === recipeId && recipeType.includes(type)));

    setEnableStartBtn(!isDoneRecipe);
  }, []);

  const handleClick = () => {
    history.push(`${location.pathname}/in-progress`);
  };

  return enableStartBtn && (
    <button
      type="button"
      className="fixed-bottom"
      onClick={ handleClick }
      data-testid="start-recipe-btn"
    >
      Start Recipe
    </button>
  );
}

export default InitRecipeBtn;
