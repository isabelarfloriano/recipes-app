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

export const requestDrink = async (name) => {
  try {
    const response = await fetch(`${MEAL_BASE}search.php?s=${name}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const requestMeal = async (name) => {
  try {
    const response = await fetch(`${DRINK_BASE}search.php?s=${name}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};
