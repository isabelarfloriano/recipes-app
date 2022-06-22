export const DONE_RECIPES_TOKEN = 'doneRecipes';
export const FAVORITE_RECIPES_TOKEN = 'favoriteRecipes';
export const IN_PROGRESS_RECIPES_TOKEN = 'inProgressRecipes';

if (!JSON.parse(localStorage.getItem(DONE_RECIPES_TOKEN))) {
  localStorage.setItem(DONE_RECIPES_TOKEN, JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem(FAVORITE_RECIPES_TOKEN))) {
  localStorage.setItem(FAVORITE_RECIPES_TOKEN, JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES_TOKEN))) {
  localStorage.setItem(IN_PROGRESS_RECIPES_TOKEN, JSON.stringify({}));
}

export const readStorage = (token) => (
  JSON.parse(localStorage.getItem(token))
);

const saveStorageData = (token, data) => (
  localStorage.setItem(token, JSON.stringify(data))
);

export const SaveStorage = (token, data) => {
  const storage = readStorage(token);

  const updateStorage = [...storage, data];

  saveStorageData(token, updateStorage);
};
