import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function FinishRecipeBtn() {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ () => history.push('/done-recipes') }
    >
      Finish Recipe
    </button>
  );
}
