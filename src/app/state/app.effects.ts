import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe, User } from '../app.models';
import { AppAuth, UserActions, RecipeActions } from './app.actions';

import { environment } from 'src/environments/environment';

@Injectable()
export class AppEffects {
  private recipesURl = environment.API_URL + '/recipes';
  private usersURl = environment.API_URL + '/users';

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

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getUser),
    mergeMap((action) => {
      return this.http.get<User>(`${this.usersURl}/${action.userId}`).pipe(
        map((user: User) => {
          return UserActions.getUserSuccess({user})
        })
      )
    })
  ));

  forgotPassword$ = createEffect(() => this.actions$.pipe(
    ofType(AppAuth.forgotPassword),
    switchMap((action) => {
      return this.http.post<any>(`${environment.API_URL}/password_resets`, { email: action.email }).pipe(
        map((response: any) => {
          this.router.navigate([`/password_reset`]);
          return AppAuth.forgotPasswordSuccess({response});
        })
      )
    })
  ));

  resetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(AppAuth.resetPassword),
    switchMap((action) => {
      return this.http.put<any>(`${environment.API_URL}/password_resets/${action.resetToken}`, { password: action.password, password_confirmation: action.confirmPassword}).pipe(
        map((response: any) => {
          return AppAuth.resetPasswordSuccess({response});
        })
      )
    })
  ));

  getUserRecipes$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getUserRecipes),
    mergeMap((action) => {
      return this.http.get<Recipe[]>(`${this.usersURl}/${action.userId}/recipes`).pipe(
        map((recipes: Recipe[]) => {
          return UserActions.getUserRecipesSuccess({recipes})
        })
      )
    })
  ));

  getRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.getRecipe),
    switchMap((action) => {
      return this.http.get<Recipe>(`${this.usersURl}/${action.userId}/recipes/${action.recipeId}`).pipe(
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
      return this.http.post<Recipe>(`${this.usersURl}/${action.userId}/recipes`, { recipe: action.recipe }).pipe(
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
      return this.http.put<Recipe>(`${this.usersURl}/${action.userId}/recipes/${action.recipeId}`, { recipe: action.recipe }).pipe(
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
      return this.http.delete<Recipe>(`${this.usersURl}/${action.userId}/recipes/${action.recipeId}`).pipe(
        map(() => {
          this.store.dispatch(RecipeActions.getRecipes());
          return RecipeActions.deleteRecipeSuccess();
        })
      )
    })
  ));

  addComment$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.addComment),
    switchMap((action) => {
      return this.http.post<any>(`${this.usersURl}/${action.userId}/recipes/${action.recipeId}/comments`, {userId: action.userId, recipeId: action.recipeId, content: action.content}).pipe(
        map((response: any) => {
          this.store.dispatch(RecipeActions.getRecipe({userId: action.userId, recipeId: action.recipeId}));
          return RecipeActions.addCommentSuccess();
        })
      )
    })
  ));

  deleteComment$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.deleteComment),
    switchMap((action) => {
      return this.http.delete<any>(`${this.usersURl}/${action.userId}/recipes/${action.recipeId}/comments/${action.commentId}`,).pipe(
        map((response: any) => {
          this.store.dispatch(RecipeActions.getRecipe({userId: action.userId, recipeId: action.recipeId}));
          return RecipeActions.deleteCommentSuccess();
        })
      )
    })
  ));

  likeRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.likeRecipe),
    switchMap((action) => {
      return this.http.post<any>(`${this.usersURl}/${action.userId}/recipes/${action.recipeId}/like`, {recipeId: action.recipeId}).pipe(
        map((response: any) => {
          this.store.dispatch(RecipeActions.getRecipe({userId: action.userId, recipeId: action.recipeId}));
          return RecipeActions.likeRecipeSuccess();
        })
      )
    })
  ));

  unlikeRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.unlikeRecipe),
    switchMap((action) => {
      return this.http.delete<any>(`${this.usersURl}/${action.userId}/recipes/${action.recipeId}/unlike`).pipe(
        map((response: any) => {
          this.store.dispatch(RecipeActions.getRecipe({userId: action.userId, recipeId: action.recipeId}));
          return RecipeActions.unlikeRecipeSuccess();
        })
      )
    })
  ));

}
