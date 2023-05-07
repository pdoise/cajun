import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { Recipe } from '../models/app.models';

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

export const RecipeActions = createActionGroup({
  source: '[Recipes API]',
  events: {
    'Get Recipes': emptyProps(),
    'Get Recipes Success': props<{ recipes: Recipe[] }>(),

    'Get Recipe': props<{ recipeId: number }>(),
    'Get Recipe Success': props<{ recipe: Recipe }>(),

    'Update Recipe': props<{ recipe: FormData, recipeId: number | null }>(),
    'Update Pnp Success': props<{ recipe: Recipe }>(),

    'Get Updated Recipe': props<{ recipe: Recipe }>(),
    'Get Updated Recipe Success': props<{ recipe: Recipe }>(),

    'Create Recipe': props<{ recipe: FormData }>(),
    'Create Recipe Success': props<{ recipe: Recipe }>(),

    'Delete Recipe': props<{ recipeId: number }>(),
    'Delete Recipe Success': emptyProps(),
  },
});
