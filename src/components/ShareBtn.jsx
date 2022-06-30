import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareBtn({ testId, route }) {
  const [showMessage, setShowMessage] = useState(false);

  if (showMessage) {
    const MESSAGE_TIME = 2000;
    setTimeout(() => {
      setShowMessage(false);
    }, MESSAGE_TIME);
  }

  const handleShareRecipe = () => {
    copy(`${window.location.origin}${route}`);
    setShowMessage(true);
  };

  return (
    <section className="d-flex">
      <button
        type="button"
        onClick={ handleShareRecipe }
        className="icon-button"
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
          data-testid={ testId }
        />
      </button>
      {showMessage && (
        <span style={ { fontSize: '12px' } } className="text-muted">Link copied!</span>
      )}
    </section>
  );
}

ShareBtn.propTypes = {
  testId: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default ShareBtn;
