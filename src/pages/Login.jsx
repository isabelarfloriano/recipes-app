import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setMealsToken, setCocktailsToken, setUserLogin } from '../services/login';

const Login = () => {
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(true);
  const [user, setUser] = useState({ email: '', password: '' });

  const validate = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_PASSWORD_LENGTH = 6;
    const validation = user.password.length > MIN_PASSWORD_LENGTH
      && regex.test(user.email);

    setIsDisabled(!validation);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    validate();
  }, [user]);

  const handleClick = () => {
    setUserLogin({ email: user.email });
    setMealsToken(1);
    setCocktailsToken(1);
    history.push('/foods');
  };

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
          disabled={ isDisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
