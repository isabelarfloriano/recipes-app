const fetchFood = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    // console.log(data.meals);
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

export { fetchFood, fetchDrink };
