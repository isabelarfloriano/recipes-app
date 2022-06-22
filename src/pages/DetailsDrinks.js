import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsImage from '../components/DetailsImage';
import DetailsIngredients from '../components/DetailsIngredients';
import DetailsInstructions from '../components/DetailsInstructions';
import DetailsRecommended from '../components/DetailsRecommended';
import InitRecipeBtn from '../components/InitRecipeBtn';
import Context from '../context/Context';

const DetailsDrinks = () => {
  const { getDetailsPageInfo, loading } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    const endpoints = location.pathname.split('/');
    getDetailsPageInfo(endpoints[1], endpoints[2]);
  }, []);

  return loading ? (
    <h2>Carregando...</h2>
  ) : (
    <>
      <DetailsImage />
      <DetailsIngredients />
      <DetailsInstructions />
      <DetailsRecommended />
      <InitRecipeBtn />
    </>
  );
};

export default DetailsDrinks;
