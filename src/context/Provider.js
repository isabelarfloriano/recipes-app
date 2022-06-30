import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import {
  requestMealDetails, requestDrinkDetails,
  fetchDrinkRecipe, fetchFoodRecipe, fetchDrinkCategory,
  fetchFoodCategory, fetchFoodByCategory, fetchDrinkByCategory,
  fetchFoodIngredient, fetchDrinkIngredient,
  fetchFoodsByIngredient, fetchDrinksByIngredient,
} from '../services/API';

const Provider = ({ children }) => {
  const history = useHistory();

  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipesByIngredient, setRecipesByIngredient] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState({
    categories: [],
    currentCategory: '',
  });

  const getDetailsPageInfo = async (recipeType, cardId) => {
    const NUMBER_OF_RECIPES = 6;
    let recipeDetail = [];
    let recipesRecommendation = [];

    if (recipeType === 'foods') {
      setLoading(true);
      recipeDetail = await requestMealDetails(cardId);
      recipesRecommendation = await fetchDrinkRecipe();
    } else {
      setLoading(true);
      recipeDetail = await requestDrinkDetails(cardId);
      recipesRecommendation = await fetchFoodRecipe();
    }

    setRecipeDetails(recipeDetail[0]);
    setRecomendation(recipesRecommendation.slice(0, NUMBER_OF_RECIPES));
    setLoading(false);
  };

  const getRecipesInfo = async (recipeType) => {
    const MAX_N_CATEGORIES = 5;
    const MAX_N_RECIPES = 12;

    let categoriesList = [];
    let recipesList = [];

    setLoading(true);

    if (recipeType === 'foods') {
      categoriesList = await fetchFoodCategory();
      recipesList = await fetchFoodRecipe();
    } else {
      categoriesList = await fetchDrinkCategory();
      recipesList = await fetchDrinkRecipe();
    }
    setCategoriesFilter((prevCategories) => ({
      ...prevCategories,
      categories: categoriesList.slice(0, MAX_N_CATEGORIES),
    }));
    setRecipes(recipesList.slice(0, MAX_N_RECIPES));
    setLoading(false);
  };

  const handleCategoryFilters = async (recipeType, category) => {
    const MAX_N_CATEGORIES = 12;
    let data = [];
    setLoading(true);
    setCategoriesFilter((prevCategories) => ({
      ...prevCategories,
      currentCategory: category,
    }));

    if (recipeType === 'foods') {
      data = await fetchFoodByCategory(category);
    } else {
      data = await fetchDrinkByCategory(category);
    }

    if (category === 'All' || category === categoriesFilter.currentCategory) {
      if (recipeType === 'foods') {
        data = await fetchFoodRecipe();
      } else {
        data = await fetchDrinkRecipe();
      }
    }

    const dataSlice = data.slice(0, MAX_N_CATEGORIES);

    setRecipes(dataSlice);
    setLoading(false);
  };

  const getIngredients = async (recipeType) => {
    const MAX_N_INGREDIENTS = 12;

    let ingredientsList = [];

    setLoading(true);
    if (recipeType === 'foods') {
      ingredientsList = await fetchFoodIngredient();
    } else {
      ingredientsList = await fetchDrinkIngredient();
    }

    setIngredients(ingredientsList.slice(0, MAX_N_INGREDIENTS));
    setLoading(false);
  };

  const handleIngredientFilter = async (recipeType, ingredientName) => {
    const MAX_N_INGREDIENTS = 12;
    let data = [];

    setLoading(true);
    if (recipeType === 'foods') {
      data = await fetchFoodsByIngredient(ingredientName);
    } else {
      data = await fetchDrinksByIngredient(ingredientName);
    }

    setRecipesByIngredient(data.slice(0, MAX_N_INGREDIENTS));

    if (recipeType === 'foods') {
      history.push('/foods');
    } else {
      history.push('/drinks');
    }

    setLoading(false);
  };

  const { categories } = categoriesFilter;

  const context = {
    recipeDetails,
    getDetailsPageInfo,
    loading,
    recomendation,
    recipes,
    categories,
    getRecipesInfo,
    handleCategoryFilters,
    getIngredients,
    ingredients,
    recipesByIngredient,
    handleIngredientFilter,
    setRecipes,
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
