import { Recipe } from '../models/app.models';

export interface RecipeState {
  recipes: Recipe[];
  recipe: Recipe;
}
