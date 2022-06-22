import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import { setMealsToken, setCocktailsToken, setUserLogin } from '../services/login';
import {
  requestMealDetails, requestDrinkDetails,
  requestDrink, requestMeal,
} from '../services/api';

const Provider = ({ children }) => {
  const history = useHistory();

  const [user, setUser] = useState({ email: '', password: '' });
  const [isdisabled, setIsdisabled] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setUserLogin({ email: user.email });
    setMealsToken(1);
    setCocktailsToken(1);
    history.push('/foods');
  };

  const getDetailsPageInfo = async (recipeType, cardId) => {
    const NUMBER_OF_RECIPES = 6;
    let recipeDetail = [];
    let recipesRecommendation = [];

    if (recipeType === 'foods') {
      setLoading(true);
      recipeDetail = await requestMealDetails(cardId);
      recipesRecommendation = await requestDrink();
    } else {
      setLoading(true);
      recipeDetail = await requestDrinkDetails(cardId);
      recipesRecommendation = await requestMeal();
    }

    setRecipeDetails(recipeDetail[0]);
    setRecomendation(recipesRecommendation.slice(0, NUMBER_OF_RECIPES));
    setLoading(false);
  };

  const context = {
    handleChange,
    isdisabled,
    handleClick,
    recipeDetails,
    getDetailsPageInfo,
    loading,
    setIsdisabledExplore,
    isdisabledExplore,
    recomendation,
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
