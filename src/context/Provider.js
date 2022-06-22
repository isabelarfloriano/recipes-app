import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import { setMealsToken, setCocktailsToken, setUserLogin } from '../services/login';

const Provider = ({ children }) => {
  const history = useHistory();

  const [user, setUser] = useState({ email: '', password: '' });
  // console.log(user.email, user.password);
  const [isdisabled, setIsdisabled] = useState(true);
  const [isdisabledExplore, setIsdisabledExplore] = useState(false);
  const [ingredientsFoods, setIngredientsFoods] = useState([]);
  const [ingredientsDrinks, setIngredientsDrinks] = useState([]);
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const [categoriesFoods, setCategoriesFoods] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [isdisabledFilter, setIsdisabledFilter] = useState(false);
  const [filterFoods, setFilterFoods] = useState([]);
  const [isdisabledFilterDrinks, setIsdisabledFilterDrinks] = useState(false);
  const [filterDrinks, setFilterDrinks] = useState([]);
  const [filterErase, setFilterErase] = useState(false);

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
    ingredientsFoods,
    setIngredientsFoods,
    ingredientsDrinks,
    setIngredientsDrinks,
    recipesFoods,
    setRecipesFoods,
    recipesDrinks,
    setRecipesDrinks,
    categoriesFoods,
    setCategoriesFoods,
    categoriesDrinks,
    setCategoriesDrinks,
    isdisabledFilter,
    setIsdisabledFilter,
    filterFoods,
    setFilterFoods,
    isdisabledFilterDrinks,
    setIsdisabledFilterDrinks,
    filterDrinks,
    setFilterDrinks,
    filterErase,
    setFilterErase,
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
