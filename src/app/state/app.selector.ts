import { createSelector, createFeatureSelector } from '@ngrx/store';

import { RecipeState } from './app.state';

export const recipeSelector = createFeatureSelector<RecipeState>('app');

export const selectRecipe = createSelector(
  recipeSelector,
  (state) => { return state.recipe }
);

export const selectRecipes = createSelector(
  recipeSelector,
  (state) => { return state.recipes }
);
