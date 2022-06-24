import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import shareIcon from '../images/shareIcon.svg';

function RecipesCard(props) {
  const {
    index,
    image,
    categoryText,
    recipeName,
    dateText,
    tags,
    nationality,
    alcoholic,
  } = props;

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
            onClick={ () => console.log('clicou share Button') }
          >
            <img
              src={ shareIcon }
              alt="Share Icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
        </Card.Subtitle>
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
};

export default RecipesCard;
