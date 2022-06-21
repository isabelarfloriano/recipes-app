const MEAL_DETAILS_BASE = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_DETAILS_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const requestMealDetails = async (id) => {
  try {
    const response = await fetch(`${MEAL_DETAILS_BASE}${id}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const requestDrinkDetails = async (id) => {
  try {
    const response = await fetch(`${DRINK_DETAILS_BASE}${id}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};
