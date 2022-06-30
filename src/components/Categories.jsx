import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';

function Categories() {
  const { categories, handleCategoryFilters } = useContext(Context);
  const location = useLocation();

  const setCategoryFilters = ({ target }) => {
    const endpoints = location.pathname.split('/');
    const getCategoryName = target.innerHTML;

    handleCategoryFilters(endpoints[1], getCategoryName);
  };

  return (
    <Container className="my-4 d-flex flex-wrap">
      {categories !== null && categories.map((category, index) => (
        <Button
          type="button"
          variant="danger"
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ setCategoryFilters }
          className="mx-1 my-1"
          key={ index }
        >
          {category.strCategory}
        </Button>
      ))}
      <Button
        type="button"
        variant="danger"
        data-testid="All-category-filter"
        className="mx-1 my-1"
        onClick={ setCategoryFilters }
      >
        All
      </Button>
    </Container>
  );
}

export default Categories;
