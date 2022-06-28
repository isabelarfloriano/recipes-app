import React, { useContext } from 'react';
import Context from '../context/Context';

const Login = () => {
  const { handleChange, isdisabled, handleClick } = useContext(Context);

  return (
    <div>
      <form>
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            data-testid="email-input"
            onChange={ handleChange }
            name="email"
          />
        </label>

        <label htmlFor="password">
          <input
            id="password"
            type="password"
            data-testid="password-input"
            onChange={ handleChange }
            name="password"
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isdisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
