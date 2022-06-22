import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchDrinkRecipe, fetchDrinkCategory,
  fetchDrinkByCategory } from '../services/API';

const Drinks = () => {
  const history = useHistory();

  const { recipesDrinks, setRecipesDrinks,
    categoriesDrinks, setCategoriesDrinks,
    isdisabledFilterDrinks, setIsdisabledFilterDrinks,
    filterDrinks, setFilterDrinks,
    filterErase, setFilterErase } = useContext(Context);

  const getRecipesDrinks = async () => {
    const MAX_N_RECIPES = 12;
    const data = await fetchDrinkRecipe();
    setRecipesDrinks(data.slice(0, MAX_N_RECIPES));
    return data.slice(0, MAX_N_RECIPES);
  };

  useEffect(() => {
    getRecipesDrinks();
  }, []);

  const getCategory = async () => {
    const MAX_N_CATEGORIES = 5;
    const data = await fetchDrinkCategory();
    setCategoriesDrinks(data.slice(0, MAX_N_CATEGORIES));
    return data.slice(0, MAX_N_CATEGORIES);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const filterByCategory = async ({ target }) => {
    const MAX_N_CATEGORIES = 12;
    const getCategoryName = target.innerHTML;
    const data = await fetchDrinkByCategory(getCategoryName);
    const dataSlice = data.slice(0, MAX_N_CATEGORIES);
    setFilterDrinks(dataSlice);
    setIsdisabledFilterDrinks(true);
    setFilterErase(getCategoryName);
    if (getCategoryName === filterErase) {
      setIsdisabledFilterDrinks(false);
    }
    return data;
  };

  const filterByAll = async () => {
    setIsdisabledFilterDrinks(false);
  };

  return (
    <div>
      <Header />
      {isdisabledFilterDrinks === false
      && recipesDrinks !== null
      && recipesDrinks.map((recipeDrink, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <button
            type="button"
            onClick={ () => { history.push(`/drinks/${recipeDrink.idDrink}`); } }
          >
            <img
              src={ recipeDrink.strDrinkThumb }
              alt={ recipeDrink.strDrink }
              data-testid={ `${index}-card-img` }
            />

            <p data-testid={ `${index}-card-name` }>
              {recipeDrink.strDrink}
            </p>
          </button>
        </div>
      ))}

      {isdisabledFilterDrinks && filterDrinks.length > 0
      && filterDrinks.map((filterDrink, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>

          <img
            src={ filterDrink.strDrinkThumb }
            alt={ filterDrink.strDrink }
            data-testid={ `${index}-card-img` }
          />

          <p data-testid={ `${index}-card-name` }>
            {filterDrink.strDrink}
          </p>

        </div>
      ))}

      {categoriesDrinks.map((categoryDrink, index) => (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${categoryDrink.strCategory}-category-filter` }
            onClick={ filterByCategory }
          >
            {categoryDrink.strCategory}
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ filterByAll }
      >
        All
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Drinks;
