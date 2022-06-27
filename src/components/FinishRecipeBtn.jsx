import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function FinishRecipeBtn(props) {
  const { disabedBtn } = props;
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ () => history.push('/done-recipes') }
      disabled={ disabedBtn }
    >
      Finish Recipe
    </button>
  );
}

FinishRecipeBtn.propTypes = {
  disabedBtn: PropTypes.bool.isRequired,
};
