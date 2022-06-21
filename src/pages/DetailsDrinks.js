import React from 'react';
import DetailsImage from '../components/DetailsImage';
import DetailsIngredients from '../components/DetailsIngredients';
import DetailsInstructions from '../components/DetailsInstructions';
import DetailsRecommended from '../components/DetailsRecommended';
import InitRecipeBtn from '../components/InitRecipeBtn';

const DetailsDrinks = () => (
  <>
    <DetailsImage />
    <DetailsIngredients />
    <DetailsInstructions />
    <DetailsRecommended />
    <InitRecipeBtn />
  </>
);

export default DetailsDrinks;
