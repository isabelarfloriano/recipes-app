const fetchFood = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const fetchDrink = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

const fetchFoodIngredient = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const fetchDrinkIngredient = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

const fetchFoodRecipe = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const fetchFoodByArea = async (name) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const fetchDrinkRecipe = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

const fetchFoodCategory = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const fetchDrinkCategory = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

const fetchFoodByCategory = async (category) => {
  try {
    const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const fetchDrinkByCategory = async (category) => {
  try {
    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

const fetchFoodNationality = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    // console.log(data.meals);
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const MEAL_BASE = 'https://www.themealdb.com/api/json/v1/1/';
const DRINK_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const requestMealDetails = async (id) => {
  try {
    const response = await fetch(`${MEAL_BASE}lookup.php?i=${id}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const requestDrinkDetails = async (id) => {
  try {
    const response = await fetch(`${DRINK_BASE}lookup.php?i=${id}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

export const requestDrink = async () => {
  try {
    const response = await fetch(`${DRINK_BASE}search.php?s=`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

export const requestMeal = async () => {
  try {
    const response = await fetch(`${MEAL_BASE}search.php?s=`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export { fetchFood, fetchDrink, fetchFoodIngredient,
  fetchDrinkIngredient, fetchFoodRecipe,
  fetchDrinkRecipe, fetchFoodCategory, fetchDrinkCategory,
  fetchFoodByCategory, fetchDrinkByCategory, fetchFoodNationality, fetchFoodByArea };
