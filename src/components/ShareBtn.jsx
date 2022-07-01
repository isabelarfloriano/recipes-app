import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import shareIconCard from '../images/shareIconCard.svg';

const copy = require('clipboard-copy');

function ShareBtn({ testId, route }) {
  const location = useLocation();
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
          src={ location.pathname.includes('done-recipes') ? shareIconCard : shareIcon }
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
