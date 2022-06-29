import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchFoodNationality, fetchFoodByArea } from '../services/API';

const NationalitiesFoods = () => {
  const history = useHistory();

  const { recipes, getRecipesInfo, categories } = useContext(Context);
  const [nationatilyFoods, setNationatilyFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  const getNacionalities = async () => {
    const data = await fetchFoodNationality();
    setNationatilyFoods(data);
  };

  useEffect(() => {
    getNacionalities();
    getRecipesInfo('foods');
  }, []);

  useEffect(() => { setFilteredFoods(recipes); }, [recipes]);

  const handleChange = async ({ target: { value } }) => {
    const MAX_N_RECIPES = 12;

    const data = await fetchFoodByArea(value) || [];

    setFilteredFoods(data.slice(0, MAX_N_RECIPES));

    if (data.length === 0 || value === 'All') {
      setFilteredFoods(recipes);
    }
  };

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
        { categories.map(({ strCategory }, index) => (
          <option
            key={ index }
            data-testid={ `${strCategory}-option` }
            value={ `${strCategory}` }
          >
            { strCategory }
          </option>
        ))}
      </select>

      {filteredFoods.map((filterFood, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <button
            type="button"
            onClick={ () => { history.push(`/foods/${filterFood.idMeal}`); } }
          >
            <img
              src={ filterFood.strMealThumb }
              alt={ filterFood.strMeal }
              data-testid={ `${index}-card-img` }
            />

            <p data-testid={ `${index}-card-name` }>
              {filterFood.strMeal}
            </p>
          </button>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default NationalitiesFoods;
