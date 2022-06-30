import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { fetchByFirstLetter, fetchByIngredient, fetchByName } from '../services/API';

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
      setSearchData((prevData) => ({
        ...prevData,
        baseUrl: 'themealdb',
      }));
      if (recipes.length === 1) {
        history.push(`/foods/${recipes[0].idMeal}`);
      }
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
    <Container>
      <Form onSubmit={ handleSubmit }>
        <Form.Group className="mb-3" controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Search"
            name="searchValue"
            value={ searchData.searchValue }
            onChange={ handleChange }
            data-testid="search-input"
          />
        </Form.Group>
        <section>
          <Form.Check
            inline
            type="radio"
            label="Ingredient"
            value="Ingredient"
            name="searchRadio"
            onChange={ handleChange }
            data-testid="ingredient-search-radio"
          />
          <Form.Check
            inline
            type="radio"
            label="First Letter"
            value="First Letter"
            name="searchRadio"
            onChange={ handleChange }
            data-testid="first-letter-search-radio"
          />
          <Form.Check
            inline
            type="radio"
            label="Name"
            value="Name"
            name="searchRadio"
            onChange={ handleChange }
            data-testid="name-search-radio"
          />
        </section>
        <section className="d-flex justify-content-center mt-3 mb-2">
          <Button
            variant="outline-danger"
            type="submit"
            className="w-75"
            data-testid="exec-search-btn"
          >
            Search
          </Button>
        </section>
      </Form>
    </Container>

  );
}
