import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Context from '../context/Context';

const ExploreFoods = () => {
  const history = useHistory();

  const { isdisabledExplore } = useContext(Context);
  console.log(isdisabledExplore);

  return (
    <div>
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
        onClick={ () => { history.push('/explore/foods/nationalities'); } }
      >
        Surprise me!
      </button>

      <Footer />
    </div>
  );
};

export default ExploreFoods;
