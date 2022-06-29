import React, { useContext } from 'react';
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
    <section>
      {categories !== null && categories.map((category, index) => (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ setCategoryFilters }
          >
            {category.strCategory}
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ setCategoryFilters }
      >
        All
      </button>
    </section>
  );
}

export default Categories;
