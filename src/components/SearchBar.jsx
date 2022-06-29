import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { fetchByFirstLetter, fetchByIngredient, fetchByName } from '../services/API';
import FormInput from './FormInput';

export default function SearchBar() {
  const [searchData, setSearchData] = useState({
    searchValue: '',
    searchRadio: '',
    baseUrl: '',
  });
  const history = useHistory();
  const { location: { pathname } } = history;

  const { setRecipes, recipes } = useContext(Context);

  useEffect(() => {
    switch (pathname) {
    case '/foods':
      setSearchData((prevData) => ({
        ...prevData,
        baseUrl: 'themealdb',
      }));
      if (recipes.length === 1) {
        history.push(`/foods/${recipes[0].idMeal}`);
      }
      break;
    case '/drinks':
      setSearchData((prevData) => ({
        ...prevData,
        baseUrl: 'thecocktaildb',
      }));
      if (recipes.length === 1) {
        history.push(`/drinks/${recipes[0].idDrink}`);
      }
      break;
    default:
      break;
    }
  }, [recipes, history, pathname]);

  const switchSearchAPIUrl = async (radioType, inputSearch) => {
    const MAX_N_RECIPES = 12;
    let apiData = [];

    switch (radioType) {
    case 'Ingredient':
      apiData = await fetchByIngredient(searchData.baseUrl, inputSearch);
      break;
    case 'Name':
      apiData = await fetchByName(searchData.baseUrl, inputSearch);
      break;
    case 'First Letter':
      apiData = await fetchByFirstLetter(searchData.baseUrl, inputSearch);
      break;
    default:
      return undefined;
    }

    if (!apiData.meals && !apiData.drinks) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (pathname === '/foods') {
      setRecipes(apiData.meals.slice(0, MAX_N_RECIPES));
    } else {
      setRecipes(apiData.drinks.slice(0, MAX_N_RECIPES));
    }
  };

  const handleChange = ({ target: { value, name } }) => (setSearchData(
    (prevSearchData) => ({
      ...prevSearchData,
      [name]: value,
    }
    ),
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { searchValue, searchRadio } = searchData;

    if (searchValue.length > 1 && searchRadio === 'First Letter') {
      return global.alert('Your search must have only 1 (one) character');
    }

    await switchSearchAPIUrl(searchRadio, searchValue);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <FormInput
        dataTestId="search-input"
        placeholder="Search"
        name="searchValue"
        value={ searchData.searchValue }
        onChange={ handleChange }
      />
      <br />
      <FormInput
        labelText="Ingredient"
        dataTestId="ingredient-search-radio"
        type="radio"
        name="searchRadio"
        value="Ingredient"
        onChange={ handleChange }
      />
      <FormInput
        labelText="Name"
        dataTestId="name-search-radio"
        type="radio"
        name="searchRadio"
        value="Name"
        onChange={ handleChange }
      />
      <FormInput
        labelText="First Letter"
        dataTestId="first-letter-search-radio"
        type="radio"
        name="searchRadio"
        value="First Letter"
        onChange={ handleChange }
      />
      <br />
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>

    </form>

  );
}
