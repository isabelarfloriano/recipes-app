import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Context from '../context/Context';

const ExploreDrinks = () => {
  const history = useHistory();

  const { setIsdisabledExplore } = useContext(Context);

  const handleClick = () => {
    console.log('works');
    history.push('/explore/drinks/ingredients');

    setIsdisabledExplore(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleClick }
      >
        By Ingredient
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
export default ExploreDrinks;
