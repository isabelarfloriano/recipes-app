import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import Header from '../components/Header';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import {
  FAVORITE_RECIPES_TOKEN, readStorage,
  removeFromStorage,
} from '../services/recipesStorage';
import ShareBtn from '../components/ShareBtn';

const FavoritesRecipes = () => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipes = readStorage(FAVORITE_RECIPES_TOKEN);
    setFilteredRecipes(favoriteRecipes);
    setAllRecipes(favoriteRecipes);
  }, []);

  const removeFavoriteRecipe = (recipe) => {
    removeFromStorage(FAVORITE_RECIPES_TOKEN, recipe.id);

    const favoriteRecipes = readStorage(FAVORITE_RECIPES_TOKEN);

    setFilteredRecipes(favoriteRecipes);
    setAllRecipes(favoriteRecipes);

    setFavorite((prevFavorite) => (!prevFavorite));
  };

  const filterByAll = async () => {
    setFilteredRecipes(allRecipes);
  };

  const filterFoods = async () => {
    const foods = allRecipes.filter((recipe) => recipe.type === 'food');
    setFilteredRecipes(foods);
  };

  const filterDrinks = async () => {
    const drinks = allRecipes.filter((recipe) => recipe.type === 'drink');
    setFilteredRecipes(drinks);
  };

  return (
    <section className="bg-light">
      <Header />
      <ButtonGroup size="lg" className="d-flex mx-2 mb-3 bg-white">
        <Button
          variant="outline-danger"
          type="button"
          onClick={ filterByAll }
          data-testid="filter-by-all-btn"
        >
          All
        </Button>
        <Button
          variant="outline-danger"
          type="button"
          onClick={ filterFoods }
          data-testid="filter-by-food-btn"
        >
          Foods
        </Button>
        <Button
          variant="outline-danger"
          type="button"
          onClick={ filterDrinks }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </Button>
      </ButtonGroup>

      <Container>
        {
          filteredRecipes.length > 0
        && filteredRecipes.map((recipe, index) => (
          <Card
            className="d-flex flex-row mb-3 shadow"
            key={ `${recipe.name}${index}` }
          >
            <Link
              to={ recipe.type === 'drink'
                ? `/drinks/${recipe.id}` : `/foods/${recipe.id}` }
            >
              <Card.Img
                style={ { width: '8rem' } }
                variant="top"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <Card.Body>
              <Card.Subtitle
                className="text-muted subtitle-text"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.type === 'food'
                  ? (` ${recipe.nationality} - ${recipe.category}`)
                  : recipe.alcoholicOrNot}
              </Card.Subtitle>
              <Link
                to={ recipe.type === 'drink'
                  ? `/drinks/${recipe.id}` : `/foods/${recipe.id}` }
              >
                <Card.Title
                  className="text-danger mt-2"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </Card.Title>
              </Link>

              <section className="mt-3 d-flex justify-content-around">
                <button
                  type="button"
                  onClick={ () => removeFavoriteRecipe(recipe) }
                  className="icon-button"
                >
                  <img
                    src={ BlackHeartIcon }
                    alt="Favorite Icon"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
                <ShareBtn
                  testId={ `${index}-horizontal-share-btn` }
                  route={ `/${recipe.type}s/${recipe.id}` }
                />
              </section>

            </Card.Body>
          </Card>
        ))
        }
      </Container>
    </section>
  );
};

export default FavoritesRecipes;
