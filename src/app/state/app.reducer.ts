import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';

import { Recipe } from '../models/app.models';
import { RecipeActions } from './app.actions';

export interface AppState {
  recipes: Recipe[];
}

export const initialState: AppState = {
  recipes: []
};

export const appReducer = createReducer(
  initialState,
  // Recipes
  on(RecipeActions.getRecipe, (state, { recipeId }) => {
    let recipe: Recipe = state.recipes.filter((r: any) => { return r.id == recipeId })[0] || {} as Recipe;
    return { ...state, recipe: {...recipe} };
  }),
  on(RecipeActions.getRecipeSuccess, (state, { recipe }) => {
    let updatedRecipe = {...recipe}
    if (recipe.image) {
      updatedRecipe = { ...recipe, img_src: `data:${recipe.image?.content_type};base64,${recipe.image?.data}` };
    }
    return { ...state, recipe: updatedRecipe };
  }),
  on(RecipeActions.getUpdatedRecipe, (state, { recipe }) => {
    return { ...state, recipe: {...recipe} };
  }),
  on(RecipeActions.getRecipesSuccess, (state, { recipes }) => {
    const updatedRecipes = recipes.map((recipe: Recipe) => {
      if (recipe.image) {
        return {
          ...recipe,
          img_src: `data:${recipe.image?.content_type};base64,${recipe.image?.data}`
        };
      } else {
        return recipe;
      }
    });
    return { ...state, recipes: updatedRecipes };
  }),
  // @ts-ignore
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
