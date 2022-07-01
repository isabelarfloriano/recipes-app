import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Context from '../context/Context';

function DetailsInstructions() {
  const { recipeDetails } = useContext(Context);
  const { strInstructions } = recipeDetails;
  return (
    <Container className="mt-2">
      <h2 className="name-title">Instructions</h2>
      <p data-testid="instructions">
        {strInstructions}
      </p>
    </Container>
  );
}

export default DetailsInstructions;
