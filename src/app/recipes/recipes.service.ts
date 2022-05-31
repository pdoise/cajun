import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Recipe } from 'src/app/shared/shared.models';


@Injectable({ providedIn: 'root' })

export class RecipeService {

  private recipesURl = environment.API_URL + '/recipes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.recipesURl}`)
      .pipe(
        tap(_ => this.log('fetched recipes')),
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  /** GET Recipe by id. Return `undefined` when id not found */
  getRecipeNo404<Data>(id: number): Observable<Recipe> {
    const url = `${this.recipesURl}/?id=${id}`;
    return this.http.get<Recipe[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
      );
  }

  /** GET Recipe by id. Will 404 if id not found */
  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesURl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap(_ => this.log(`fetched recipe id=${id}`)),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  /* GET Recipes whose name contains search term */
  searchRecipes(term: string): Observable<Recipe[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Recipe[]>(`${this.recipesURl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Recipes matching "${term}"`) :
         this.log(`no Recipes matching "${term}"`)),
      catchError(this.handleError<Recipe[]>('searchRecipes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Recipe to the server */
  addRecipe(recipe: Recipe): Observable<Recipe> {
    console.log(recipe)
    return this.http.post<Recipe>(this.recipesURl, recipe, this.httpOptions).pipe(
      tap((newRecipe: Recipe) => this.log(`added Recipe w/ id=${newRecipe.id}`)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  /** DELETE: delete the Recipe from the server */
  deleteRecipe(id: number): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.recipesURl}/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Recipe id=${id}`)),
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  /** PUT: update the Recipe on the server */
  updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put(`${this.recipesURl}/${recipe.id}`, recipe, this.httpOptions).pipe(
      tap(_ => this.log(`updated Recipe id=${recipe.id}`)),
      catchError(this.handleError<any>('updateRecipe'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RecipeService message with the MessageService */
  private log(message: string) {
    console.log(`RecipeService: ${message}`);
  }
}
