import React from 'react';

function DetailsIngredients() {
  const index = 0;
  return (
    <section>
      <h2>Ingredients</h2>
      <ul>
        <li data-testid={ `${index}-ingredient-name-and-measure` }>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
    </section>
  );
}

export default DetailsIngredients;
