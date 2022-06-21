import React from 'react';
import DetailsImage from '../components/DetailsImage';
import DetailsIngredients from '../components/DetailsIngredients';
import DetailsInstructions from '../components/DetailsInstructions';
import DetailsRecommended from '../components/DetailsRecommended';
import DetailsVideo from '../components/DetailsVideo';
import InitRecipeBtn from '../components/InitRecipeBtn';

const DetailsFoods = () => (
  <>
    <DetailsImage />
    <DetailsIngredients />
    <DetailsInstructions />
    <DetailsVideo />
    <DetailsRecommended />
    <InitRecipeBtn />
  </>
);

export default DetailsFoods;
