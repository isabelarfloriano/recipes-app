const TAMIYA_IMG = 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg';

export const inProgressRecipeMock = {
  cocktails: {
    15997: [],
    17222: ['Gin'],
  },
  meals: {
    52978: [
      'Potatoes',
      'Butter',
      'Cheese',
      'Onion',
      'Red Pepper',
      'Red Chile Flakes',
    ],
  },
};

export const doneRecipes = [
  {
    id: '53026',
    type: 'food',
    nationality: 'Egyptian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Tamiya',
    image: TAMIYA_IMG,
    tags: [null],
    doneDate: '30/6/2022',
  },
  {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image:
      'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    tags: [],
    doneDate: '2/7/2022',
  },
];

export const detailsHeader = {
  withFavoriteRecipe: [
    {
      id: '53026',
      type: 'food',
      nationality: 'Egyptian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Tamiya',
      image: TAMIYA_IMG,
    },
    {
      id: '52977',
      type: 'food',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
  ],
  withoutFavoriteRecipe: [
    {
      id: '53026',
      type: 'food',
      nationality: 'Egyptian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Tamiya',
      image: TAMIYA_IMG,
    },
  ],
};

export const testeMock = {};
