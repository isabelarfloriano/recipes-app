import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import { setMealsToken, setCocktailsToken, setUserLogin } from '../services/login';

const Provider = ({ children }) => {
  const history = useHistory();

  const [user, setUser] = useState({ email: '', password: '' });
  console.log(user.email, user.password);
  const [isdisabled, setIsdisabled] = useState(true);
  const [isdisabledExplore, setIsdisabledExplore] = useState(false);

  // Requisitos 2 a 8
  const validate = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_EMAIL_LENGTH = 6;
    const validation = user.password.length > MIN_EMAIL_LENGTH && regex.test(user.email);
    if (validation === true) {
      setIsdisabled(false);
    } else {
      setIsdisabled(true);
    }
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
    console.log('works');
    setUserLogin({ email: user.email });
    setMealsToken(1);
    setCocktailsToken(1);
    history.push('/foods');
  };

  const context = {
    handleChange,
    isdisabled,
    handleClick,
    setIsdisabledExplore,
    isdisabledExplore,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
