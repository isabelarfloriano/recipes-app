import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';

function DetailsImage() {
  const { recipeDetails } = useContext(Context);
  const [favorite, setFavorite] = useState(whiteHeartIcon);

  const handleFavoriteIcon = () => {
    setFavorite((prevFavorite) => (
      prevFavorite === whiteHeartIcon ? BlackHeartIcon : whiteHeartIcon
    ));
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
          onClick={ handleFavoriteIcon }
          data-testid="favorite-btn"
        >
          <img src={ favorite } alt="Favorite Icon" />
        </button>
      </Card.Body>
    </Card>
  );
}

export default DetailsImage;
