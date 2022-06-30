import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import {
  FAVORITE_RECIPES_TOKEN, readStorage,
  removeFromStorage,
} from '../services/recipesStorage';
import ShareBtn from '../components/ShareBtn';

const FavoritesRecipes = () => {
  const history = useHistory();

  const favoriteRecipes = readStorage(FAVORITE_RECIPES_TOKEN);

  const [favorite, setFavorite] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    setFilteredRecipes(favoriteRecipes);
  }, []);

  const removeFavoriteRecipe = (recipe) => {
    removeFromStorage(FAVORITE_RECIPES_TOKEN, recipe.id);
    const removeState = filteredRecipes.filter((index) => index.id !== recipe.id);
    setFilteredRecipes(removeState);

    setFavorite((prevFavorite) => (!prevFavorite));
  };

  const redirectClick = (recipe) => {
    if (recipe.type === 'drink') {
      history.push(`/drinks/${recipe.id}`);
    } else {
      history.push(`/foods/${recipe.id}`);
    }
  };

  const filterByAll = async () => {
    setFilteredRecipes(favoriteRecipes);
  };

  const filterFoods = async () => {
    const foods = filteredRecipes.filter((recipe) => recipe.type === 'food');
    setFilteredRecipes(foods);
  };

  const filterDrinks = async () => {
    const drinks = filteredRecipes.filter((recipe) => recipe.type === 'drink');
    setFilteredRecipes(drinks);
  };

  return (
    <>
      <Header />
      <div>Favorites Recipes</div>
      <button
        type="button"
        onClick={ filterFoods }
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>
      <button
        type="button"
        onClick={ filterDrinks }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        type="button"
        onClick={ filterByAll }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      {
        filteredRecipes.length > 0
        && filteredRecipes.map((recipe, index) => (
          <Card key={ `${recipe.name}${index}` }>
            <button
              type="button"
              onClick={ () => redirectClick(recipe) }
            >
              <Card.Img
                variant="top"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
              />
            </button>
            <Card.Body>
              <button
                type="button"
                onClick={ () => redirectClick(recipe) }
              >
                <Card.Title data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </Card.Title>
              </button>
              <Card.Subtitle
                className="mb-2 text-muted"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.type === 'food'
                  ? (` ${recipe.nationality} - ${recipe.category}`)
                  : recipe.alcoholicOrNot}
              </Card.Subtitle>
              <ShareBtn
                testId={ `${index}-horizontal-share-btn` }
                route={ `/${recipe.type}s/${recipe.id}` }
              />
              <button
                type="button"
                onClick={ () => removeFavoriteRecipe(recipe) }
              >
                <img
                  src={ favorite ? BlackHeartIcon : whiteHeartIcon }
                  alt="Favorite Icon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </Card.Body>
          </Card>
        ))
      }
    </>
  );
};

export default FavoritesRecipes;
