import React, { useContext } from 'react';
import Context from '../context/Context';

function DetailsInstructions() {
  const { recipeDetails } = useContext(Context);
  const { strInstructions } = recipeDetails;
  return (
    <section>
      <h2>Instructions</h2>
      <p data-testid="instructions">
        {strInstructions}
      </p>
    </section>
  );
}

export default DetailsInstructions;
