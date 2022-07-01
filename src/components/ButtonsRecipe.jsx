import React from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function ButtonsRecipe({ handleClick, favorite, recipeInfo }) {
  return (
    <section className="d-flex">
      <button
        className="icon-button"
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ favorite ? BlackHeartIcon : whiteHeartIcon }
          alt="Favorite Icon"
          data-testid="favorite-btn"
        />
      </button>
      <ShareBtn
        testId="share-btn"
        route={ `/${recipeInfo.type}s/${recipeInfo.id}` }
      />
    </section>
  );
}

ButtonsRecipe.propTypes = {
  favorite: PropTypes.bool.isRequired,
  recipeInfo: PropTypes.objectOf(PropTypes.shape).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ButtonsRecipe;
