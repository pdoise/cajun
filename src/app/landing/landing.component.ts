import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeActions } from '../state/app.actions';
import { selectRecipes, selectFilteredRecipes } from '../state/app.selector';
import { Recipe } from 'src/app/app.models';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  recipes$: Observable<Recipe[]> = this.store.select(selectRecipes);
  filteredRecipes$: Observable<Recipe[]> = this.store.select(selectFilteredRecipes);
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.getRecipes());
    this.recipes$.subscribe((recipe) => {
      console.log(recipe)
    })
  }

  goAddRecipe(): void {
    this.router.navigate([`recipe/new`]);
  }

  goRecipe(recipe: Recipe): void {
    this.router.navigate([`/recipe/${recipe.id}`]);
  }

}
