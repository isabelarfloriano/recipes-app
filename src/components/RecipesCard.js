import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipesCard(props) {
  const [showMessage, setShowMessage] = useState(false);

  const {
    index,
    image,
    categoryText,
    recipeName,
    dateText,
    tags,
    nationality,
    alcoholic,
    type,
    id,
  } = props;

  const handleShareRecipe = (typeRecipe, idRecipe) => {
    const BASE_URL = 'http://localhost:3000/';
    copy(`${BASE_URL}${typeRecipe}s/${idRecipe}`);
    setShowMessage(true);
  };

  if (showMessage) {
    const MESSAGE_TIME = 2000;
    setTimeout(() => {
      setShowMessage(false);
    }, MESSAGE_TIME);
  }

  return (
    <Card
      className="d-flex flex-row mw-50"
    >
      <Card.Img
        className="w-25"
        variant="top"
        src={ image }
        data-testid={ `${index}-horizontal-image` }
      />
      <Card.Body>
        <Card.Subtitle
          className="mb-2 text-muted"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {
            nationality ? `${nationality} - ${categoryText}` : alcoholic
          }
          <button
            type="button"
            onClick={ () => handleShareRecipe(type, id) }
          >
            <img
              src={ shareIcon }
              alt="Share Icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
        </Card.Subtitle>
        {showMessage ? 'Link copied!' : ''}
        <Card.Title
          data-testid={ `${index}-horizontal-name` }
        >
          {recipeName}
        </Card.Title>
        <Card.Text
          data-testid={ `${index}-horizontal-done-date` }
        >
          {dateText}
        </Card.Text>
        {tags.map((tagName) => (
          <Badge
            pill
            bg="light"
            key={ `${index}-${tagName}` }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
          >
            {tagName}
          </Badge>
        ))}
      </Card.Body>
    </Card>
  );
}

RecipesCard.defaultProps = {
  tags: [],
};

RecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  categoryText: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  dateText: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  nationality: PropTypes.string.isRequired,
  alcoholic: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipesCard;
