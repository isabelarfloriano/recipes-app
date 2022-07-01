import React, { useContext, useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import Context from '../context/Context';

import listIcon from '../images/listIcon.svg';

function DetailsIngredients() {
  const { recipeDetails } = useContext(Context);
  const [ingredients, setIngredients] = useState({
    usedIngredients: [],
    ingredientQuantity: [],
  });

  const { usedIngredients, ingredientQuantity } = ingredients;

  const setIngredientsInfo = (searchedStr) => {
    const info = [];
    Object.keys(recipeDetails).forEach((key) => {
      if (key.includes(searchedStr) && recipeDetails[key]) {
        info.push(recipeDetails[key]);
      }
    });
    return info;
  };

  useEffect(() => {
    const usedIngredientsInfo = setIngredientsInfo('strIngredient');
    const ingredientQuantityInfo = setIngredientsInfo('strMeasure');

    setIngredients({
      usedIngredients: usedIngredientsInfo,
      ingredientQuantity: ingredientQuantityInfo,
    });
  }, [recipeDetails]);

  return (
    <Container className="mt-2">
      <h2 className="name-title">Ingredients</h2>
      <ListGroup variant="flush">
        {usedIngredients.map((ingredient, index) => (
          <ListGroup.Item
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <span>
              <img src={ listIcon } alt="List icon" />
            </span>
            {ingredient}
            {' '}
            -
            {' '}
            {ingredientQuantity[index]}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default DetailsIngredients;
