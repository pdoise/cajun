import { Recipe } from '../app.models';

export interface AppState {
  recipes: Recipe[];
  recipe: Recipe;
  sort: {
    key: string;
    dir: string;
  }
  search: string;
}
