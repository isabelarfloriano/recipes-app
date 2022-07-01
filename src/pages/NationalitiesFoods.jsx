import React, { useContext, useEffect, useState } from 'react';
import { Card, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Context from '../context/Context';
import { fetchFoodNationality, fetchFoodByArea } from '../services/API';

const NationalitiesFoods = () => {
  const history = useHistory();

  const { recipes, getRecipesInfo, categories, loading } = useContext(Context);
  const [nationatilyFoods, setNationatilyFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  const getNacionalities = async () => {
    const data = await fetchFoodNationality();
    setNationatilyFoods(data);
  };

  useEffect(() => {
    getNacionalities();
    getRecipesInfo('foods');
  }, []);

  useEffect(() => { setFilteredFoods(recipes); }, [recipes]);

  const handleChange = async ({ target: { value } }) => {
    const MAX_N_RECIPES = 12;

    const data = await fetchFoodByArea(value) || [];

    setFilteredFoods(data.slice(0, MAX_N_RECIPES));

    if (data.length === 0 || value === 'All') {
      setFilteredFoods(recipes);
    }
  };

  return loading ? <Loading /> : (
    <div>
      <Header />
      <Container>
        <Form.Control
          as="select"
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleChange }
          className="mb-3"
        >

          <option>Selecione uma nacionalidade</option>
          <option data-testid="All-option">All</option>
          { nationatilyFoods.map((nationality, index) => (
            <option
              key={ index }
              data-testid={ `${nationality.strArea}-option` }
              value={ `${nationality.strArea}` }
            >
              { nationality.strArea }
            </option>
          ))}
        </Form.Control>
        <Form.Control
          as="select"
          onChange={ handleChange }
        >
          <option>Selecione uma categoria</option>
          { categories.map(({ strCategory }, index) => (
            <option
              key={ index }
              data-testid={ `${strCategory}-option` }
              value={ `${strCategory}` }
            >
              { strCategory }
            </option>
          ))}
        </Form.Control>
      </Container>

      <Container className="d-flex flex-wrap mt-3 mb-5">
        {filteredFoods.map((filterFood, index) => (
          <button
            key={ index }
            type="button"
            className="icon-button"
            onClick={ () => { history.push(`/foods/${filterFood.idMeal}`); } }
          >
            <Card
              className="mb-2 mx-1"
              style={ { width: '9rem' } }
              data-testid={ `${index}-recipe-card` }
            >

              <Card.Img
                variant="top"
                src={ filterFood.strMealThumb }
                alt={ filterFood.strMeal }
                data-testid={ `${index}-card-img` }
              />

              <Card.Title
                className="text-center text-danger mt-2"
                data-testid={ `${index}-card-name` }
              >
                {filterFood.strMeal}
              </Card.Title>
            </Card>
          </button>
        ))}
      </Container>
      <Footer />
    </div>
  );
};

export default NationalitiesFoods;
