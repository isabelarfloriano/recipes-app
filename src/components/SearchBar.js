import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FormInput from './FormInput';
import fetchAPI from '../services/API';

export default function SearchBar() {
  const [searchData, setSearchData] = useState({
    searchValue: '',
    searchRadio: '',
  });
  const { pathname } = useLocation();

  const switchSearchAPIUrl = (radioType, inputSearch, baseUrl) => {
    switch (radioType) {
    case 'Ingredient':
      fetchAPI(`https://www.${baseUrl}.com/api/json/v1/1/filter.php?i=${inputSearch}`);
      break;
    case 'Name':
      fetchAPI(`https://www.${baseUrl}.com/api/json/v1/1/search.php?s=${inputSearch}`);
      break;
    case 'First Letter':
      if (inputSearch.length <= 1) {
        fetchAPI(`https://www.${baseUrl}.com/api/json/v1/1/search.php?f=${inputSearch}`);
        break;
      } else {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
    default:
      return undefined;
    }
  };

  const handleChange = ({ target: { value, name } }) => (setSearchData(
    (prevSearchData) => ({
      ...prevSearchData,
      [name]: value,
    }
    ),
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    const { searchValue, searchRadio } = searchData;
    if (pathname === '/foods') {
      switchSearchAPIUrl(searchRadio, searchValue, 'themealdb');
    } else {
      switchSearchAPIUrl(searchRadio, searchValue, 'thecocktaildb');
    }
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
