import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeActions } from '../state/app.actions';
import { selectRecipes, selectFilteredRecipes } from '../state/app.selector';

import { Recipe } from 'src/app/app.models';

@Component({
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss']
})

export class CookBookComponent implements OnInit {
  recipes$: Observable<Recipe[]> = this.store.select(selectRecipes);
  filteredRecipes$: Observable<Recipe[]> = this.store.select(selectFilteredRecipes);
  id: number = this.route.snapshot.params['id'];

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.getRecipes());
  }

  goRecipe(recipe: Recipe): void {
    this.router.navigate([`/recipe/${recipe.id}`]);
  }

  saveRecipe(): void {

  }

  goCreateRecipe(): void {
    this.router.navigate([`recipe/new`]);
  }

  goEditRecipe(): void {
    this.router.navigate([`recipe/${this.id}/edit`]);
  }

}
