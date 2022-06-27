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
  localStorage
    .setItem(IN_PROGRESS_RECIPES_TOKEN, JSON.stringify({ cocktails: {}, meals: {} }));
}

export const readStorage = (token) => (
  JSON.parse(localStorage.getItem(token))
);

export const saveStorageData = (token, data) => (
  localStorage.setItem(token, JSON.stringify(data))
);

export const SaveStorage = (token, data) => {
  const storage = readStorage(token);

  const updateStorage = [...storage, data];

  saveStorageData(token, updateStorage);
};

export const SaveStorageRecipeInProgress = (token, type, id, data) => {
  const storage = readStorage(token);

  const updateStorage = { ...storage, [type]: { ...storage[type], [id]: data } };

  saveStorageData(token, updateStorage);
};

export const removeFromStorage = (token, idToRemove) => {
  const storage = readStorage(token);
  const removedRecipe = storage.filter(({ id }) => id !== idToRemove);
  saveStorageData(token, removedRecipe);
};
