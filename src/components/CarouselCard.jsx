import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';

function CarouselCard({ index }) {
  const { recomendation } = useContext(Context);
  const [cardInfo, setCardInfo] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (recomendation.length) {
      if (location.pathname.includes('drinks')) {
        setCardInfo({
          thumb: recomendation[Number(index)].strMealThumb,
          title: recomendation[Number(index)].strMeal,
          subtitle: recomendation[Number(index)].strCategory,
        });
      } else {
        setCardInfo({
          thumb: recomendation[Number(index)].strDrinkThumb,
          title: recomendation[Number(index)].strDrink,
          subtitle: recomendation[Number(index)].strAlcoholic,
        });
      }
    }
  }, [recomendation]);

  return (
    <Card data-testid={ `${index}-recomendation-card` }>
      <Card.Img variant="top" src={ cardInfo.thumb } />
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{ cardInfo.subtitle }</Card.Subtitle>
        <Card.Title
          data-testid={ `${index}-recomendation-title` }
        >
          {cardInfo.title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

CarouselCard.propTypes = {
  index: PropTypes.string.isRequired,
};

export default CarouselCard;
