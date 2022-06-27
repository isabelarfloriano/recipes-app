import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import DetailsIngredientsInProgress from '../components/DetailsIngredientsInProgress';
import DetailsInstructions from '../components/DetailsInstructions';
import FinishRecipeBtn from '../components/FinishRecipeBtn';
import Context from '../context/Context';

const ProgressRecipe = () => {
  const { getDetailsPageInfo, loading } = useContext(Context);
  const [disabedBtn, setdisabedBtn] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const endpoints = location.pathname.split('/');
    getDetailsPageInfo(endpoints[1], endpoints[2]);
  }, []);

  console.log(setdisabedBtn);

  return loading ? <h2>Carregando...</h2> : (
    <>
      <DetailsHeader />
      <DetailsIngredientsInProgress setdisabedBtn={ setdisabedBtn } />
      <DetailsInstructions />
      <FinishRecipeBtn disabedBtn={ disabedBtn } />
    </>
  );
};

export default ProgressRecipe;
