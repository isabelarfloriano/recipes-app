import React from 'react';
import FormInput from './FormInput';

export default function SearchBar() {
  const handleChange = () => console.log('teste');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <FormInput
        dataTestId="search-input"
        placeholder="Search"
        name="search-input"
        value=""
        onChange={ handleChange }
      />
      <FormInput
        labelText="Ingredient"
        dataTestId="ingredient-search-radio"
        type="radio"
        name="search-radio"
        value=""
        onChange={ handleChange }
      />
      <FormInput
        labelText="Name"
        dataTestId="name-search-radio"
        type="radio"
        name="search-radio"
        value=""
        onChange={ handleChange }
      />
      <FormInput
        labelText="First Letter"
        dataTestId="first-letter-search-radio"
        type="radio"
        name="search-radio"
        value=""
        onChange={ handleChange }
      />
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>

    </form>

  );
}
