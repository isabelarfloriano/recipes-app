import React, { useContext, useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

function Recipes() {
  const { recipes, recipesByIngredient, setRecipesByIngredient } = useContext(Context);
  const [usedRecipes, setUsedRecipes] = useState([]);

  useEffect(() => {
    if (recipesByIngredient.length) {
      setUsedRecipes(recipesByIngredient);
    } else {
      setUsedRecipes(recipes);
    }
    return () => {
      setRecipesByIngredient([]);
    };
  }, [recipesByIngredient, recipes]);

  return (
    <Container className="d-flex flex-wrap mb-5">
      {usedRecipes
        && usedRecipes.map((recipe, index) => (
          <Card
            style={ { width: '11rem' } }
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="mx-2 mb-4 shadow"
          >
            <Link
              to={ `/${recipe.idMeal ? 'foods' : 'drinks'}/${recipe.idMeal
                ? recipe.idMeal : recipe.idDrink}` }
            >
              <Card.Img
                variant="top"
                src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
                alt="recipe thumb"
                data-testid={ `${index}-card-img` }
                className="mb-4"
              />

              <Card.Title
                className="text-center text-danger"
                data-testid={ `${index}-card-name` }
              >
                {recipe.strMeal ? recipe.strMeal : recipe.strDrink}
              </Card.Title>
            </Link>
          </Card>
        ))}
    </Container>
  );
}

export default Recipes;
