import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';
import {
  FAVORITE_RECIPES_TOKEN,
  readStorage, removeFromStorage, SaveStorage,
} from '../services/recipesStorage';

const copy = require('clipboard-copy');

function DetailsImage() {
  const location = useLocation();
  const { recipeDetails } = useContext(Context);
  const [favorite, setFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
  });

  const handleFavoriteRecipe = () => {
    if (!favorite) {
      SaveStorage(FAVORITE_RECIPES_TOKEN, recipeInfo);
    } else {
      removeFromStorage(FAVORITE_RECIPES_TOKEN, recipeInfo.id);
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

  useEffect(() => {
    const recipeId = location.pathname.split('/')[2];
    const recipeType = location.pathname.split('/')[1];

    const favoriteRecipes = readStorage(FAVORITE_RECIPES_TOKEN);

    const isFavorite = favoriteRecipes
      .some(({ id, type }) => (id === recipeId && recipeType.includes(type)));

    if (recipeType === 'foods') {
      setRecipeInfo({
        id: recipeDetails.idMeal,
        type: 'food',
        nationality: recipeDetails.strArea,
        category: recipeDetails.strCategory,
        alcoholicOrNot: '',
        name: recipeDetails.strMeal,
        image: recipeDetails.strMealThumb,
      });
    } else {
      setRecipeInfo({
        id: recipeDetails.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeDetails.strCategory,
        alcoholicOrNot: recipeDetails.strAlcoholic,
        name: recipeDetails.strDrink,
        image: recipeDetails.strDrinkThumb,
      });
    }

    setFavorite(isFavorite);
  }, []);

  return (
    <Card>
      <Card.Img
        variant="top"
        src={ recipeInfo.image }
        data-testid="recipe-photo"
      />
      <Card.Body>
        <Card.Title data-testid="recipe-title">
          { recipeInfo.name }
        </Card.Title>
        <Card.Subtitle
          className="mb-2 text-muted"
          data-testid="recipe-category"
        >
          { recipeInfo.type === 'food' ? recipeInfo.category : recipeInfo.alcoholicOrNot}
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
    </Card>
  );
}

export default DetailsImage;
