import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import DetailsIngredientsInProgress from '../components/DetailsIngredientsInProgress';
import DetailsInstructions from '../components/DetailsInstructions';
import FinishRecipeBtn from '../components/FinishRecipeBtn';
import Loading from '../components/Loading';
import Context from '../context/Context';

const ProgressRecipe = () => {
  const { getDetailsPageInfo, loading } = useContext(Context);
  const [disabedBtn, setdisabedBtn] = useState(true);
  const location = useLocation();

  const endpoints = location.pathname.split('/');

  const matchEndPointKey = () => {
    if (endpoints[1] === 'foods') {
      return 'meals';
    }
    return 'cocktails';
  };

  useEffect(() => {
    getDetailsPageInfo(endpoints[1], endpoints[2]);
  }, []);

  return loading ? <Loading /> : (
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
