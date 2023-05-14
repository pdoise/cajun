import { createSelector, createFeatureSelector } from '@ngrx/store';

import { SearchFilterPipe } from 'src/app/shared/pipes/search-filter.pipe';
import { AppState } from './app.state';

export const appSelector = createFeatureSelector<AppState>('app');

export const selectUser = createSelector(
  appSelector,
  (state) => { return state.user }
);

export const selectUserRecipes = createSelector(
  appSelector,
  (state) => { return state.userRecipes }
);

export const selectFilteredUserRecipes = createSelector(
  appSelector,
  (state) => {
    let filtered = [...state.userRecipes];
    // search
    filtered = new SearchFilterPipe().transform(state.search, filtered);
    return filtered;
  }
);

export const selectRecipe = createSelector(
  appSelector,
  (state) => { return state.recipe }
);

export const selectRecipes = createSelector(
  appSelector,
  (state) => { return state.recipes }
);

export const selectFilteredRecipes = createSelector(
  appSelector,
  (state) => {
    let filtered = [...state.recipes];
    // search
    filtered = new SearchFilterPipe().transform(state.search, filtered);
    return filtered;
  }
);
