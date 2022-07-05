import React from 'react';
import { useHistory } from 'react-router-dom';
import arrowIcon from '../images/arrowIcon.svg';

function GoBackBtn() {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <button
      className={ `icon-button shadow-sm rounded-circle py-1 bg-white ml-2
      ${(pathname.includes('foods')
        || pathname.includes('drinks')) && 'position-absolute mt-2'}` }
      type="button"
      onClick={ history.goBack }
    >
      <img src={ arrowIcon } alt="go back icon" />
    </button>
  );
}

export default GoBackBtn;
