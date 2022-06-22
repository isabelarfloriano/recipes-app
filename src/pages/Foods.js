import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchFoodRecipe, fetchFoodCategory, fetchFoodByCategory } from '../services/API';

const Foods = () => {
  const history = useHistory();

  const { recipesFoods, setRecipesFoods,
    categoriesFoods, setCategoriesFoods,
    isdisabledFilter, setIsdisabledFilter,
    filterFoods, setFilterFoods,
    filterErase, setFilterErase } = useContext(Context);
  console.log(recipesFoods);

  const getRecipesFoods = async () => {
    const MAX_N_RECIPES = 12;
    const data = await fetchFoodRecipe();
    // console.log(data);
    // console.log(data.slice(0, MAX_N_RECIPES));
    setRecipesFoods(data.slice(0, MAX_N_RECIPES));
    return data.slice(0, MAX_N_RECIPES);
  };

  useEffect(() => {
    getRecipesFoods();
  }, []);

  const getCategory = async () => {
    const MAX_N_CATEGORIES = 5;
    const data = await fetchFoodCategory();
    // console.log(data);
    // console.log(data.slice(0, MAX_N_CATEGORIES));
    setCategoriesFoods(data.slice(0, MAX_N_CATEGORIES));
    return data.slice(0, MAX_N_CATEGORIES);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const filterByCategory = async ({ target }) => {
    const MAX_N_CATEGORIES = 12;
    // console.log('works');
    // console.log(target.innerHTML);
    const getCategoryName = target.innerHTML;
    const data = await fetchFoodByCategory(getCategoryName);
    const dataSlice = data.slice(0, MAX_N_CATEGORIES);
    // console.log(dataSlice);
    setFilterFoods(dataSlice);
    setIsdisabledFilter(true);
    setFilterErase(getCategoryName);

    if (getCategoryName === filterErase) {
      setIsdisabledFilter(false);
    }
    return data;
  };

  const filterByAll = async () => {
    console.log('works');
    setIsdisabledFilter(false);
  };

  return (
    <div>
      <Header />
      {isdisabledFilter === false && recipesFoods !== null
       && recipesFoods.map((recipeFood, index) => (
         <div key={ index } data-testid={ `${index}-recipe-card` }>
           <button
             type="button"
             onClick={ () => { history.push(`/foods/${recipeFood.idMeal}`); } }
           >

             <img
               src={ recipeFood.strMealThumb }
               alt={ recipeFood.strMeal }
               data-testid={ `${index}-card-img` }
             />

             <p data-testid={ `${index}-card-name` }>
               {recipeFood.strMeal}
             </p>
           </button>
         </div>
       ))}

      {isdisabledFilter && filterFoods.length > 0
      && filterFoods.map((filterFood, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ filterFood.strMealThumb }
            alt={ filterFood.strMeal }
            data-testid={ `${index}-card-img` }
          />

          <p data-testid={ `${index}-card-name` }>
            {filterFood.strMeal}
          </p>
        </div>
      ))}

      {/* Repetir de cima */}

      {categoriesFoods !== null && categoriesFoods.map((categoryFood, index) => (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${categoryFood.strCategory}-category-filter` }
            onClick={ filterByCategory }
          >
            {categoryFood.strCategory}
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

export default Foods;
