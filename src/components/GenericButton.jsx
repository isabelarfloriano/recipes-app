import React from 'react';
import PropTypes from 'prop-types';

function GenericButton(props) {
  const {
    typeButton,
    dataTestId,
    onClick,
    buttonText,
  } = props;
  return (
    <button
      type={ typeButton === 'submit' ? 'submit' : 'button' }
      data-testid={ dataTestId }
      onClick={ onClick }
    >
      {buttonText}
    </button>
  );
}

GenericButton.defaultProps = {
  typeButton: 'button',
  dataTestId: '',
};

GenericButton.propTypes = {
  typeButton: PropTypes.string,
  dataTestId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default GenericButton;
