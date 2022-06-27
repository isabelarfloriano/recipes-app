import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function Recipes() {
  const { recipes, recipesByIngredient } = useContext(Context);
  const [usedRecipes, setUsedRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (recipesByIngredient.length) {
      setUsedRecipes(recipesByIngredient);
      console.log('teste');
    } else {
      setUsedRecipes(recipes);
      console.log('teste2');
      console.log(recipes);
    }
  }, [recipesByIngredient, recipes]);

  return (
    <section>
      {usedRecipes
        && usedRecipes.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <button
              type="button"
              onClick={ () => {
                history.push(
                  `/${recipe.idMeal
                    ? 'foods' : 'drinks'}/${recipe.idMeal
                    ? recipe.idMeal : recipe.idDrink}`,
                );
              } }
            >
              <img
                src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
                alt="recipe thumb"
                data-testid={ `${index}-card-img` }
              />

              <p data-testid={ `${index}-card-name` }>
                {recipe.strMeal ? recipe.strMeal : recipe.strDrink}
              </p>
            </button>
          </div>
        ))}
    </section>
  );
}

export default Recipes;
