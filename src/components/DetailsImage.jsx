import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DetailsImage() {
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
        src="https://img.itdg.com.br/tdg/images/blog/uploads/2017/07/shutterstock_413580649-768x512.jpg"
        data-testid="recipe-photo"
      />
      <Card.Body>
        <Card.Title data-testid="recipe-title">
          Título
        </Card.Title>
        <Card.Subtitle
          className="mb-2 text-muted"
          data-testid="recipe-category"
        >
          Subtítulo
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
