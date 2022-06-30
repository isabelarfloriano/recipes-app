import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import Context from '../context/Context';

const RecipesPage = () => {
  const location = useLocation();

  const { getRecipesInfo, loading } = useContext(Context);

  useEffect(() => {
    const endpoints = location.pathname.split('/');
    getRecipesInfo(endpoints[1]);
  }, []);

  return loading ? <Loading /> : (
    <>
      <Header />
      <Categories />
      <Recipes />
      <Footer />
    </>
  );
};

export default RecipesPage;
