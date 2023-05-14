import { User, Recipe } from '../app.models';

export interface AppState {
  user: User;
  userRecipes: Recipe[];
  recipes: Recipe[];
  recipe: Recipe;
  sort: {
    key: string;
    dir: string;
  }
  search: string;
}
