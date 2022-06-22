import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function InitRecipeBtn() {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    history.push(`${location.pathname}/in-progress`);
  };

  return (
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
