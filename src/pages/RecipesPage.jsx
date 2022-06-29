import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Context from '../context/Context';

const RecipesPage = () => {
  const location = useLocation();

  const { getRecipesInfo } = useContext(Context);

  useEffect(() => {
    const endpoints = location.pathname.split('/');
    getRecipesInfo(endpoints[1]);
  }, []);

  return (
    <div>
      <Header />
      <Categories />
      <Recipes />
      <Footer />
    </div>
  );
};

export default RecipesPage;
