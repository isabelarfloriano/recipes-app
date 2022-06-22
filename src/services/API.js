const fetchFood = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    //  console.log(data.meals);
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const fetchDrink = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    // console.log(data.drinks);
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

const fetchFoodIngredient = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    // console.log(data.meals);
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const fetchDrinkIngredient = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    // console.log(data.drinks);
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

const fetchFoodRecipe = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    // console.log(data.meals);
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const fetchDrinkRecipe = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    // console.log(data.drinks);
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

const fetchFoodCategory = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    // console.log(data.meals);
    return data.meals;
  } catch (error) {
    console.error(error);
  }
};

const fetchDrinkCategory = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    // console.log(data.drinks);
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
    // console.log(data.meals);
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
    console.log(data.drinks);
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

export { fetchFood, fetchDrink, fetchFoodIngredient,
  fetchDrinkIngredient, fetchFoodRecipe,
  fetchDrinkRecipe, fetchFoodCategory, fetchDrinkCategory,
  fetchFoodByCategory, fetchDrinkByCategory };
