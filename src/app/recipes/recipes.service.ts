import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'api/recipes/';
  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createRecipe(recipes: Recipe): Observable<Recipe> {
    recipes.id = null;
    return this.http.post<Recipe>(this.recipesUrl, recipes).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editRecipe(recipes: Recipe): Observable<any> {
    return this.http.put(this.recipesUrl + recipes.id, recipes);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(this.recipesUrl + id);
  }
}
