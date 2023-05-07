import { Recipe } from '../app.models';

export interface RecipeState {
  recipes: Recipe[];
  recipe: Recipe;
}
