import React, { useEffect, useState } from 'react';
import Button from '../components/GenericButton';
import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';
import { readStorage, DONE_RECIPES_TOKEN } from '../services/recipesStorage';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    setDoneRecipes(readStorage(DONE_RECIPES_TOKEN));
  }, []);
  return (

    <>
      <Header />
      <Button
        dataTestId="filter-by-all-btn"
        buttonText="All"
        onClick={ () => console.log('clicou em all') }
      />
      <Button
        dataTestId="filter-by-food-btn"
        buttonText="Food"
        onClick={ () => console.log('clicou em food') }
      />
      <Button
        dataTestId="filter-by-drink-btn"
        buttonText="Drinks"
        onClick={ () => console.log('clicou em drinks') }
      />
      <section>
        { doneRecipes.map((recipe, index) => (
          <RecipesCard
            key={ `${recipe.id}` }
            index={ index }
            image={ recipe.image }
            categoryText={ recipe.category }
            recipeName={ recipe.name }
            dateText={ recipe.doneDate }
            tags={ recipe.tags }
          />
        )) }
      </section>
    </>
  );
}

export default DoneRecipes;

/* {
  id: '52882',
  type: 'comida-ou-bebida',
  nationality: 'British',
  category: 'Seafood',
  alcoholicOrNot: '',
  name: 'nome-da-receita',
  image: 'https://www.themealdb.com/images/media/meals/spswqs1511558697.jpg',
  doneDate: '22/10/2022',
  tags: ['Fish', 'Seafood', 'Dairy', 'Pie'],
}, */
