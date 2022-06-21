import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Context from '../context/Context';
import { fetchFood } from '../services/API';
import Header from '../components/Header';

const ExploreFoods = () => {
  const history = useHistory();

  const { isdisabledExplore } = useContext(Context);
  console.log(isdisabledExplore);

  const handleRandomFood = async () => {
    const data = await fetchFood();
    console.log(data.length);
    console.log(data);
    history.push(`/foods/${data[0].idMeal}`);
  };

  return (
    <div>
    <Header />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => { history.push('/explore/foods/ingredients'); } }
      >
        By Ingredient
      </button>

      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => { history.push('/explore/foods/nationalities'); } }
        disabled={ isdisabledExplore }
      >
        By Nationality
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleRandomFood }
      >
        Surprise me!
      </button>

      <Footer />
    </div>
  );
};

export default ExploreFoods;
