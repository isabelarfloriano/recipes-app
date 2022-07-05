import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ShareBtn from './ShareBtn';

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
    type,
    id,
  } = props;

  return (
    <Card
      className="d-flex flex-row mb-3 shadow"
    >
      <Link
        className="w-50"
        to={ `/${type}s/${id}` }
      >
        <Card.Img
          variant="top"
          src={ image }
          alt="done-recipes-thumb"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Card.Body className="d-flex flex-column w-50">
        <Card.Subtitle
          className="text-muted d-flex justify-content-between subtitle-text"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {
            nationality ? `${nationality} - ${categoryText}` : alcoholic
          }
          <ShareBtn
            testId={ `${index}-horizontal-share-btn` }
            route={ `/${type}s/${id}` }
          />
        </Card.Subtitle>
        <Link to={ `/${type}s/${id}` }>
          <Card.Title
            className="text-danger"
            data-testid={ `${index}-horizontal-name` }
          >
            {recipeName}
          </Card.Title>
        </Link>
        <Card.Text
          data-testid={ `${index}-horizontal-done-date` }
          className="date-text"
        >
          Done in:
          {' '}
          {dateText}
        </Card.Text>
        <section className="d-flex flex-wrap">
          {tags.map((tagName) => (
            <p
              className="subtitle-text border border-danger
              rounded-pill p-1 mx-1 mb-1 tags-text bg-danger text-white"
              key={ `${index}-${tagName}` }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              {tagName}
            </p>
          ))}
        </section>
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
