import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';

import { AppState } from './app.state';
import { Recipe } from '../app.models';
import { AppFiltering, RecipeActions } from './app.actions';

export const initialState: AppState = {
  recipes: [],
  recipe: {} as Recipe,
  sort: { key: '', dir: '' },
  search: ''
};

export const appReducer = createReducer(
  initialState,
  on(AppFiltering.search, (state, { text }) => {
    let search = state.search;
    search = text;
    return { ...state, search: search };
  }),
  on(AppFiltering.resetFilters, (state) => {
    return { ...state, search: '' };
  }),
  // Recipes
  on(RecipeActions.getRecipe, (state, { recipeId }) => {
    let recipe: Recipe = state.recipes.filter((r: any) => { return r.id == recipeId })[0] || {} as Recipe;
    return { ...state, recipe: {...recipe} };
  }),
  on(RecipeActions.getRecipeSuccess, (state, { recipe }) => {
    return { ...state, recipe: recipe };
  }),
  on(RecipeActions.getUpdatedRecipe, (state, { recipe }) => {
    return { ...state, recipe: {...recipe} };
  }),
  on(RecipeActions.getRecipesSuccess, (state, { recipes }) => {
    return { ...state, recipes: recipes };
  }),
  on(RecipeActions.createRecipe, (state, { recipe }) => {
    return {...state, recipes: [...state.recipes, recipe]};
  }),
  on(RecipeActions.updateRecipe, (state, { recipe, recipeId }) => {
    return {
      ...state,
      pnps: state.recipes.map((r: any) => r.id == recipeId ? recipe : r),
      recipe: recipe
    };
  }),
  on(RecipeActions.deleteRecipe, (state, { recipeId }) => {
    return {...state, recipes: state.recipes.map((r: any) => { return r.id === recipeId ? { ...r, id: 0 } : r })};
  }),
);
