import React, { useEffect, useState } from 'react';
import Button from '../components/GenericButton';
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

    <>
      <Header />
      <Button
        dataTestId="filter-by-all-btn"
        buttonText="All"
        onClick={
          () => setRecipeFilters({ all: true, foods: false, drinks: false })
        }
      />
      <Button
        dataTestId="filter-by-food-btn"
        buttonText="Food"
        onClick={
          () => setRecipeFilters({ all: false, foods: true, drinks: false })
        }
      />
      <Button
        dataTestId="filter-by-drink-btn"
        buttonText="Drinks"
        onClick={
          () => setRecipeFilters({ all: false, foods: false, drinks: true })
        }
      />
      <section>
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
      </section>
    </>
  );
}

export default DoneRecipes;
