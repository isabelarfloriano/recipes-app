import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import GoBackBtn from '../components/GoBackBtn';
import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';
import { readStorage, DONE_RECIPES_TOKEN } from '../services/recipesStorage';

function DoneRecipes() {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipeFilters, setRecipeFilters] = useState({
    all: true,
    foods: false,
    drinks: false,
  });
  useEffect(() => {
    if (recipeFilters.foods) {
      const foodsRecipe = readStorage(DONE_RECIPES_TOKEN)
        .filter((recipe) => recipe.type === 'food');
      return setFilteredRecipes(foodsRecipe);
    }
    if (recipeFilters.drinks) {
      const drinksRecipe = readStorage(DONE_RECIPES_TOKEN)
        .filter((recipe) => recipe.type === 'drink');
      return setFilteredRecipes(drinksRecipe);
    }
    return setFilteredRecipes(readStorage(DONE_RECIPES_TOKEN));
  }, [recipeFilters]);
  return (

    <section>
      <Header />
      <GoBackBtn />
      <ButtonGroup size="lg" className="d-flex mx-2 mb-3 bg-white mt-2">
        <Button
          variant="outline-danger"
          type="button"
          onClick={
            () => setRecipeFilters({ all: true, foods: false, drinks: false })
          }
          data-testid="filter-by-all-btn"
        >
          All
        </Button>
        <Button
          variant="outline-danger"
          type="button"
          onClick={
            () => setRecipeFilters({ all: false, foods: true, drinks: false })
          }
          data-testid="filter-by-food-btn"
        >
          Foods
        </Button>
        <Button
          variant="outline-danger"
          type="button"
          onClick={
            () => setRecipeFilters({ all: false, foods: false, drinks: true })
          }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </Button>
      </ButtonGroup>
      <Container>
        { filteredRecipes.map((recipe, index) => (
          <RecipesCard
            key={ `${recipe.id}` }
            index={ index }
            image={ recipe.image }
            categoryText={ recipe.category }
            recipeName={ recipe.name }
            dateText={ recipe.doneDate }
            tags={ recipe.tags || [] }
            nationality={ recipe.nationality || '' }
            alcoholic={ recipe.alcoholicOrNot }
            type={ recipe.type }
            id={ Number(recipe.id) }
          />
        )) }
      </Container>
    </section>
  );
}

export default DoneRecipes;
