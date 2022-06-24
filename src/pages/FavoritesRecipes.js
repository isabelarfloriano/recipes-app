import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import {
  FAVORITE_RECIPES_TOKEN, readStorage,
  removeFromStorage, SaveStorage,
} from '../services/recipesStorage';

const copy = require('clipboard-copy');

const FavoritesRecipes = () => {
  const history = useHistory();

  const favoriteRecipes = readStorage(FAVORITE_RECIPES_TOKEN);

  const [favorite, setFavorite] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setFilteredRecipes(favoriteRecipes);
    setFavorite(true);
  }, []);

  console.log(filteredRecipes);

  const handleFavoriteRecipe = (recipe) => {
    if (favorite) {
      removeFromStorage(FAVORITE_RECIPES_TOKEN, recipe.id);
    } else {
      SaveStorage(FAVORITE_RECIPES_TOKEN, recipe);
    }

    setFavorite((prevFavorite) => (!prevFavorite));
  };

  const handleShareRecipe = ({ target }) => {
    copy(`${window.location.origin}${target.name}`);
    setShowMessage(true);
  };

  if (showMessage) {
    const MESSAGE_TIME = 2000;
    setTimeout(() => {
      setShowMessage(false);
    }, MESSAGE_TIME);
  }

  const redirectClick = (recipe) => {
    if (recipe.type === 'drinks') {
      history.push(`/drinks/${recipe.id}`);
    } else {
      history.push(`/foods/${recipe.id}`);
    }
  };

  const filterByAll = async () => {
    setFilteredRecipes(favoriteRecipes);
  };

  const filterFoods = async () => {
    const foods = filteredRecipes.filter((recipe) => recipe.type === /food/i);
    setFilteredRecipes(foods);
  };

  const filterDrinks = async () => {
    const drinks = filteredRecipes.filter((recipe) => recipe.type === /drink/i);
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
              <Card.Title data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </Card.Title>
            </button>
            <Card.Body>
              <Card.Subtitle
                className="mb-2 text-muted"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.type === 'food'
                  ? (` ${recipe.nationality} - ${recipe.category}`)
                  : recipe.alcoholicOrNot}
              </Card.Subtitle>
              <button
                type="button"
                onClick={ handleShareRecipe }
              >
                <img
                  src={ shareIcon }
                  alt="Share Icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                  name={ `/${recipe.type}s/${recipe.id}` }
                />
              </button>
              <button
                type="button"
                onClick={ () => handleFavoriteRecipe(recipe) }
              >
                <img
                  src={ favorite ? BlackHeartIcon : whiteHeartIcon }
                  alt="Favorite Icon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
              {showMessage ? 'Link copied!' : ''}
            </Card.Body>
          </Card>
        ))
      }
    </>
  );
};

export default FavoritesRecipes;
