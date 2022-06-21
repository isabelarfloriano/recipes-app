import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Context from '../context/Context';
import { fetchDrink } from '../services/API';

const ExploreDrinks = () => {
  const history = useHistory();

  const { setIsdisabledExplore } = useContext(Context);

  const handleClick = () => {
    console.log('works');
    history.push('/explore/drinks/ingredients');
    setIsdisabledExplore(true);
  };

  const handleRandomDrink = async () => {
    const response = await fetchDrink();
    console.log(response.length);
    console.log(response);
    history.push(`/drinks/${response[0].idDrink}`);
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
        onClick={ handleRandomDrink }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
};
export default ExploreDrinks;
