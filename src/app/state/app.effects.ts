import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../app.models';
import { RecipeActions } from './app.actions';

import { environment } from 'src/environments/environment';

@Injectable()
export class RecipeEffects {
  private recipesURl = environment.API_URL + '/recipes';

  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {}

  getRecipes$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.getRecipes),
    mergeMap((action) => {
      return this.http.get<Recipe[]>(this.recipesURl).pipe(
        map((recipes: Recipe[]) => {
          return RecipeActions.getRecipesSuccess({recipes})
        })
      )
    })
  ));

  getRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.getRecipe),
    switchMap((action) => {
      return this.http.get<Recipe>(`${this.recipesURl}/${action.recipeId}`).pipe(
        map((recipe: Recipe) => {
          return RecipeActions.getRecipeSuccess({recipe})
        })
      )
    })
  ));

  createRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.createRecipe),
    switchMap((action) => {
      this.router.navigate(['/landing']);
      return this.http.post<Recipe>(this.recipesURl, { recipe: action.recipe }).pipe(
        map((recipe: Recipe) => {
          this.store.dispatch(RecipeActions.getRecipes());
          return RecipeActions.createRecipeSuccess({recipe});
        })
      )
    })
  ));

  updateRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.updateRecipe),
    switchMap((action) => {
      this.router.navigate([`/recipe/${action.recipeId}`]);
      return this.http.put<Recipe>(`${this.recipesURl}/${action.recipeId}`, { recipe: action.recipe }).pipe(
        map((recipe: Recipe) => {
          this.store.dispatch(RecipeActions.getUpdatedRecipe({recipe}));
          this.store.dispatch(RecipeActions.getRecipes());
          return RecipeActions.getUpdatedRecipeSuccess({recipe});
        })
      )
    })
  ));

  deleteRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.deleteRecipe),
    switchMap((action) => {
      this.router.navigate(['/landing']);
      return this.http.delete<Recipe>(`${this.recipesURl}/${action.recipeId}`).pipe(
        map(() => {
          this.store.dispatch(RecipeActions.getRecipes());
          return RecipeActions.deleteRecipeSuccess();
        })
      )
    })
  ));
}
