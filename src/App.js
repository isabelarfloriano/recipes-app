import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Explore from './pages/Explore';
import NationalitiesFoods from './pages/NationalitiesFoods';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoritesRecipes from './pages/FavoritesRecipes';
import Provider from './context/Provider';
import NotFound from './pages/NotFound';
import RecipesPage from './pages/RecipesPage';
import Details from './pages/Details';
import ExploreRecipes from './pages/ExploreRecipes';
import IngredientsRecipes from './pages/IngredientsRecipes';
import ProgressRecipe from './pages/ProgressRecipe';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ RecipesPage } />
        <Route exact path="/drinks" component={ RecipesPage } />
        <Route exact path="/foods/:id" component={ Details } />
        <Route exact path="/drinks/:id" component={ Details } />
        <Route path="/foods/:id/in-progress" component={ ProgressRecipe } />
        <Route path="/drinks/:id/in-progress" component={ ProgressRecipe } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreRecipes } />
        <Route exact path="/explore/drinks" component={ ExploreRecipes } />
        <Route
          path="/explore/foods/ingredients"
          component={ IngredientsRecipes }
        />
        <Route
          path="/explore/drinks/ingredients"
          component={ IngredientsRecipes }
        />
        <Route
          path="/explore/foods/nationalities"
          component={ NationalitiesFoods }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoritesRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
