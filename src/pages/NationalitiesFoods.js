import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchFoodNationality, fetchFoodRecipe,
  fetchFoodCategory } from '../services/API';

const NationalitiesFoods = () => {
  const history = useHistory();

  const { nationatilyFoods, setNationatilyFoods,
    recipesFoods, setRecipesFoods,
    nationalityFilter, setNationalityFilter,
    nationatilyCategoriesFoods, setNationatilyCategoriesFoods,
    isdisabledFilter, setIsdisabledFilter,
    filterFoods, setFilterFoods } = useContext(Context);
  console.log(nationalityFilter.name);
  console.log(filterFoods.length);

  const getNacionalities = async () => {
    const data = await fetchFoodNationality();
    // console.log(data);
    setNationatilyFoods(data);
  };

  useEffect(() => {
    getNacionalities();
  }, []);

  const handleChange = async ({ target: { value } }) => {
    const MAX_N_RECIPES = 12;

    setNationalityFilter({
      name: value,
    });

    // const MAX_N_RECIPES = 12;
    console.log('value', value);
    // console.log(dataSlice);

    const data = await fetchFoodRecipe();
    // const dataSlice = data.slice(0, MAX_N_RECIPES);
    console.log(data);

    const filter = data.filter((recipe) => recipe.strArea === value);

    setFilterFoods(filter);

    if (filterFoods.length === 0) {
      setIsdisabledFilter(false);
      setRecipesFoods(data.slice(0, MAX_N_RECIPES));
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
        { nationatilyCategoriesFoods.map((categories, index) => (
          <option
            key={ index }
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
      <Footer />
    </div>
  );
};

export default NationalitiesFoods;
