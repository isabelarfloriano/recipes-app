import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';
import { FAVORITE_RECIPES_TOKEN, SaveStorage } from '../services/recipesStorage';

function DetailsImage() {
  const location = useLocation();
  const { recipeDetails } = useContext(Context);
  const [favorite, setFavorite] = useState(whiteHeartIcon);

  const handleFavoriteRecipe = () => {
    setFavorite((prevFavorite) => (
      prevFavorite === whiteHeartIcon ? BlackHeartIcon : whiteHeartIcon
    ));
    const foodPage = location.pathname.includes('foods');
    let favoriteRecipe = {};
    if (foodPage) {
      favoriteRecipe = {
        id: recipeDetails.idMeal,
        type: 'food',
        nationality: recipeDetails.strArea,
        category: recipeDetails.strCategory,
        alcoholicOrNot: '',
        name: recipeDetails.strMeal,
        image: recipeDetails.strMealThumb,
      };
    } else {
      favoriteRecipe = {
        id: recipeDetails.idDrink,
        type: 'drink',
        nationality: '',
        category: '',
        alcoholicOrNot: recipeDetails.strAlcoholic,
        name: recipeDetails.strDrink,
        image: recipeDetails.strDrinkThumb,
      };
    }

    SaveStorage(FAVORITE_RECIPES_TOKEN, favoriteRecipe);
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={ recipeDetails.strMealThumb
          ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumb }
        data-testid="recipe-photo"
      />
      <Card.Body>
        <Card.Title data-testid="recipe-title">
          {recipeDetails.strMeal
            ? recipeDetails.strMeal : recipeDetails.strDrink}
        </Card.Title>
        <Card.Subtitle
          className="mb-2 text-muted"
          data-testid="recipe-category"
        >
          {recipeDetails.strMeal
            ? recipeDetails.strCategory : recipeDetails.strAlcoholic}
        </Card.Subtitle>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="Share Icon" />
        </button>
        <button
          type="button"
          onClick={ handleFavoriteRecipe }
          data-testid="favorite-btn"
        >
          <img src={ favorite } alt="Favorite Icon" />
        </button>
      </Card.Body>
    </Card>
  );
}

export default DetailsImage;
