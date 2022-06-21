import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Context from '../context/Context';
import { fetchDrink } from '../services/API';
import Header from '../components/Header';

const ExploreDrinks = () => {
  const history = useHistory();
  const { setIsdisabledExplore } = useContext(Context);

  const handleClick = () => {
    console.log('works');
    history.push('/explore/drinks/ingredients');
    setIsdisabledExplore(true);
  };

  const handleRandomDrink = async () => {
    const data = await fetchDrink();
    console.log(data.length);
    console.log(data);
    history.push(`/drinks/${data[0].idDrink}`);
  };

  return (
    <div>
    <Header />
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
