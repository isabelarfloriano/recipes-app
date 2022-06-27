import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ExploreButton(props) {
  const history = useHistory();
  const { children, testId, route } = props;

  return (
    <button
      type="button"
      data-testid={ `explore-${testId}` }
      onClick={ () => history.push(route) }
    >
      {children}
    </button>
  );
}

ExploreButton.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default ExploreButton;
