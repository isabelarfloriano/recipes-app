import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header';
import Context from '../context/Context';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import {
  FAVORITE_RECIPES_TOKEN, readStorage,
  removeFromStorage, SaveStorage,
} from '../services/recipesStorage';

const FavoritesRecipes = () => {
  const history = useHistory();

  const favoriteRecipes = readStorage(FAVORITE_RECIPES_TOKEN);

  const { showMessage, favorite } = useContext(Context);
  const [filteredRecipes, setFilteredRecipes] = useState(
    ['there are no favorite recipes'],
  );

  useEffect(() => {
    setFilteredRecipes(favoriteRecipes);
  }, []);

  const handleFavoriteRecipe = () => {
    if (!favorite) {
      SaveStorage(FAVORITE_RECIPES_TOKEN, recipe);
    } else {
      removeFromStorage(FAVORITE_RECIPES_TOKEN, recipe.id);
    }

    setFavorite((prevFavorite) => (!prevFavorite));
  };

  const handleShareRecipe = () => {
    copy(window.location.href);
    setShowMessage(true);
  };

  if (showMessage) {
    const MESSAGE_TIME = 2000;
    setTimeout(() => {
      setShowMessage(false);
    }, MESSAGE_TIME);
  }

  const redirectClick = (recipe) => {
    if (recipe.alcoholicOrNot === 'Alcoholic'
    || recipe.alcoholicOrNot === 'Optional alcohol') {
      history.push(`/drinks/${recipe.id}`);
    } else {
      history.push(`/foods/${recipe.id}`);
    }
  };

  const filterByAll = async () => {
    setFilteredRecipes(favoriteRecipes);
  };

  const filterFoods = async () => {
    favoriteRecipes.filter((food) => !(food.alcoholicOrNot.includes(
      /alcohol/i || /alcoholic/i,
    )
    ));
  };

  const filterDrinks = async () => {
    favoriteRecipes.filter((food) => (food.alcoholicOrNot.includes(
      /alcohol/i || /alcoholic/i,
    )
    ));
  };

  return (
    <>
      <Header />
      <div>FavoritesRecipes</div>
      <button
        type="button"
        onClick={ filterFoods }
      >
        Foods
      </button>
      <button
        type="button"
        onClick={ filterDrinks }
      >
        Drinks
      </button>
      <button
        type="button"
        onClick={ filterByAll }
      >
        All
      </button>
      {
        filteredRecipes.map((recipe, index) => (
          <Card key={ `${recipe.name}${index}` }>
            <button
              type="button"
              onClick={ () => redirectClick(recipe) }
            >
              <Card.Img
                variant="top"
                src={ recipe.image }
                data-testid="recipe-photo"
              />
              <Card.Body>
                <Card.Title data-testid="recipe-title">
                  { recipe.name }
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 text-muted"
                  data-testid="recipe-category"
                >
                  { recipe.type === 'food' ? recipe.category : recipe.alcoholicOrNot}
                </Card.Subtitle>
                <button
                  type="button"
                  onClick={ handleShareRecipe }
                >
                  <img src={ shareIcon } alt="Share Icon" data-testid="share-btn" />
                </button>
                <button
                  type="button"
                  onClick={ handleFavoriteRecipe }
                >
                  <img
                    src={ favorite ? BlackHeartIcon : whiteHeartIcon }
                    alt="Favorite Icon"
                    data-testid="favorite-btn"
                  />
                </button>
                {showMessage ? 'Link copied!' : ''}
              </Card.Body>
            </button>
          </Card>
        ))
      }
    </>
  );
};

export default FavoritesRecipes;
