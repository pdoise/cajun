import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { User, Recipe } from '../app.models';

export const AppAuth = createActionGroup({
  source: '[App Auth]',
  events: {
    'Login': props<{ credentials: any }>(),
    'Login Success': props<{ response: any }>(),
    'Login Error': props<{ error: any }>(),
    'Logout': emptyProps(),
    'Logout Success': props<{ response: any }>(),
    'Create Session': emptyProps(),
    'Create Session Success': props<{ response: any }>(),
    'Destroy Session': emptyProps(),
    'Forgot Password': props<{ email: any }>(),
    'Forgot Password Success': props<{ response: any }>(),
    'Reset Password': props<{ resetToken: string, password: string, confirmPassword: string }>(),
    'Reset Password Success': props<{ response: any }>(),
  },
});

export const AppFiltering = createActionGroup({
  source: '[App Filter]',
  events: {
    'Sort': props<{ key: string, dir: string }>(),
    'Search': props<{ text: string }>(),
    'Reset Filters': emptyProps(),
  },
});

export const UserActions = createActionGroup({
  source: '[Users API]',
  events: {
    'Get User': props<{ userId: number }>(),
    'Get User Success': props<{ user: User }>(),

    'Get User Recipes':  props<{ userId: number }>(),
    'Get User Recipes Success': props<{ recipes: Recipe[] }>(),
  },
});

export const RecipeActions = createActionGroup({
  source: '[Recipes API]',
  events: {

    'Get Recipes': emptyProps(),
    'Get Recipes Success': props<{ recipes: Recipe[] }>(),

    'Get Recipe': props<{ userId: number, recipeId: number }>(),
    'Get Recipe Success': props<{ recipe: Recipe }>(),

    'Update Recipe': props<{ userId: number, recipe: Recipe, recipeId: number | null }>(),
    'Update Pnp Success': props<{ recipe: Recipe }>(),

    'Get Updated Recipe': props<{ recipe: Recipe }>(),
    'Get Updated Recipe Success': props<{ recipe: Recipe }>(),

    'Create Recipe': props<{ userId: number, recipe: Recipe }>(),
    'Create Recipe Success': props<{ recipe: Recipe }>(),

    'Delete Recipe': props<{ userId: number, recipeId: number }>(),
    'Delete Recipe Success': emptyProps(),

    'Add Comment': props<{ userId: number, recipeId: number, content: string }>(),
    'Add Comment Success': emptyProps(),

    'Delete Comment': props<{ userId: number, recipeId: number, commentId: number }>(),
    'Delete Comment Success': emptyProps(),

    'Like Recipe': props<{ userId: number, recipeId: number }>(),
    'Like Recipe Success': emptyProps(),

    'Unlike Recipe': props<{ userId: number, recipeId: number }>(),
    'Unlike Recipe Success': emptyProps(),
  },
});
