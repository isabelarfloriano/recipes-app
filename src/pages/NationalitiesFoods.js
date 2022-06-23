import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchFoodNationality, fetchFoodRecipe,
  fetchFoodCategory, fetchFoodByArea } from '../services/API';

const NationalitiesFoods = () => {
  const history = useHistory();

  const { nationatilyFoods, setNationatilyFoods,
    recipesFoods, setRecipesFoods,
    nationalityFilter, setNationalityFilter,
    nationatilyCategoriesFoods, setNationatilyCategoriesFoods,
    isdisabledFilter, setIsdisabledFilter,
    filterFoods, setFilterFoods } = useContext(Context);
  console.log(nationalityFilter.name);
  console.log(filterFoods);

  const getNacionalities = async () => {
    const data = await fetchFoodNationality();
    // console.log(data);
    setNationatilyFoods(data);
  };

  useEffect(() => {
    getNacionalities();
  }, []);

  const handleChange = async ({ target: { value } }) => {
    setNationalityFilter({
      name: value,
    });

    const MAX_N_RECIPES = 12;
    console.log('value', value);

    const data = await fetchFoodByArea(value) || [];
    console.log(data);

    setFilterFoods(data.slice(0, MAX_N_RECIPES));

    if (data.length === 0) {
      setIsdisabledFilter(false);
      setFilterFoods(recipesFoods);
    }
    setIsdisabledFilter(true);

    if (value === 'All') {
      setIsdisabledFilter(false);
    }
  };

  const getRecipesFoods = async () => {
    const MAX_N_RECIPES = 12;
    const data = await fetchFoodRecipe();
    setRecipesFoods(data.slice(0, MAX_N_RECIPES));
  };

  useEffect(() => {
    getRecipesFoods();
  }, []);

  const getCategory = async () => {
    const MAX_N_CATEGORIES = 5;
    const data = await fetchFoodCategory();
    setNationatilyCategoriesFoods(data.slice(0, MAX_N_CATEGORIES));
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <Header />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleChange }
      >

        <option>Selecione uma nacionalidade</option>
        <option data-testid="All-option">All</option>
        { nationatilyFoods.map((nationality, index) => (
          <option
            key={ index }
            data-testid={ `${nationality.strArea}-option` }
            value={ `${nationality.strArea}` }
          >
            { nationality.strArea }
          </option>
        ))}
      </select>

      <select
        onChange={ handleChange }
      >
        <option>Selecione uma categoria</option>
        { nationatilyCategoriesFoods.map((categories, index3) => (
          <option
            key={ index3 }
            data-testid={ `${categories.strCategory}-option` }
            value={ `${categories.strCategory}` }
          >
            { categories.strCategory }
          </option>
        ))}
      </select>

      { isdisabledFilter === false && recipesFoods !== undefined
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

      {nationalityFilter.name !== undefined
      && isdisabledFilter && filterFoods.length > 0
      && filterFoods.map((filterFood, index2) => (
        <div key={ index2 } data-testid={ `${index2}-recipe-card` }>
          <img
            src={ filterFood.strMealThumb }
            alt={ filterFood.strMeal }
            data-testid={ `${index2}-card-img` }
          />

          <p data-testid={ `${index2}-card-name` }>
            {filterFood.strMeal}
          </p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default NationalitiesFoods;
