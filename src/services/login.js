const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const USER = 'user';

export function getMealsToken() {
  if (localStorage.length > 0) {
    return JSON.parse(localStorage.getItem(MEALS_TOKEN));
  }
  return '';
}

export function setMealsToken(token) {
  localStorage.setItem(MEALS_TOKEN, JSON.stringify(token));
}

export function getCocktailsToken() {
  if (localStorage.length > 0) {
    return JSON.parse(localStorage.getItem(COCKTAILS_TOKEN));
  }
  return '';
}

export function setCocktailsToken(token) {
  localStorage.setItem(COCKTAILS_TOKEN, JSON.stringify(token));
}

export function getUser() {
  if (localStorage.length > 0) {
    return JSON.parse(localStorage.getItem(USER));
  }
  return '';
}

export function setUserLogin(user) {
  localStorage.setItem(USER, JSON.stringify(user));
}
