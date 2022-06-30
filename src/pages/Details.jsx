import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import DetailsIngredients from '../components/DetailsIngredients';
import DetailsInstructions from '../components/DetailsInstructions';
import DetailsRecommended from '../components/DetailsRecommended';
import DetailsVideo from '../components/DetailsVideo';
import InitRecipeBtn from '../components/InitRecipeBtn';
import Loading from '../components/Loading';
import Context from '../context/Context';

const Details = () => {
  const { getDetailsPageInfo, loading } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    const endpoints = location.pathname.split('/');
    getDetailsPageInfo(endpoints[1], endpoints[2]);
  }, [location]);

  return loading ? <Loading /> : (
    <>
      <DetailsHeader />
      <DetailsIngredients />
      <DetailsInstructions />
      {location.pathname.includes('foods') && <DetailsVideo />}
      <DetailsRecommended />
      <InitRecipeBtn />
    </>
  );
};

export default Details;
