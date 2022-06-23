const MEAL_BASE = 'https://www.themealdb.com/api/json/v1/1/';
const DRINK_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchFood = async () => {
  try {
    const response = await fetch(`${MEAL_BASE}random.php`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDrink = async () => {
  try {
    const response = await fetch(`${DRINK_BASE}random.php`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFoodIngredient = async () => {
  try {
    const response = await fetch(`${MEAL_BASE}list.php?i=list`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDrinkIngredient = async () => {
  try {
    const response = await fetch(`${DRINK_BASE}list.php?i=list`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFoodRecipe = async () => {
  try {
    const response = await fetch(`${MEAL_BASE}search.php?s=`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFoodByArea = async (name) => {
  try {
    const response = await fetch(`${MEAL_BASE}filter.php?a=${name}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDrinkRecipe = async () => {
  try {
    const response = await fetch(`${DRINK_BASE}search.php?s=`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFoodCategory = async () => {
  try {
    const response = await fetch(`${MEAL_BASE}list.php?c=list`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDrinkCategory = async () => {
  try {
    const response = await fetch(`${DRINK_BASE}list.php?c=list`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFoodByCategory = async (category) => {
  try {
    const response = await fetch(`${MEAL_BASE}filter.php?c=${category}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDrinkByCategory = async (category) => {
  try {
    const response = await fetch(`${DRINK_BASE}filter.php?c=${category}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFoodNationality = async () => {
  try {
    const response = await fetch(`${MEAL_BASE}list.php?a=list`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

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
