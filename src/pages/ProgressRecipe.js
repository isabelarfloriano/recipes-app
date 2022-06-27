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

  const endpoints = location.pathname.split('/');

  const matchEndPointKey = () => {
    switch (endpoints[1]) {
    case 'foods':
      return 'meals';
    case 'drinks':
      return 'cocktails';
    default:
      return undefined;
    }
  };

  useEffect(() => {
    getDetailsPageInfo(endpoints[1], endpoints[2]);
  }, []);

  return loading ? (
    <h2>Carregando...</h2>
  ) : (
    <>
      <DetailsHeader />
      <DetailsIngredientsInProgress
        setdisabedBtn={ setdisabedBtn }
        type={ matchEndPointKey() }
        id={ endpoints[2] }
      />
      <DetailsInstructions />
      <FinishRecipeBtn disabedBtn={ disabedBtn } />
    </>
  );
};

export default ProgressRecipe;
