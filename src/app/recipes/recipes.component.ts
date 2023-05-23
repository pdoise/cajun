import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';
import { RecipeActions } from '../state/app.actions';
import { selectRecipes, selectFilteredRecipes } from '../state/app.selector';
import { User, Recipe } from 'src/app/app.models';

@Component({
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes$: Observable<Recipe[]> = this.store.select(selectRecipes);
  filteredRecipes$: Observable<Recipe[]> = this.store.select(selectFilteredRecipes);
  page: number = 1;
  pageSize: number = 20;

  constructor(
    public auth: AuthService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.store.dispatch(RecipeActions.getRecipes());
  }

  goUser(recipe: Recipe): void {
    this.router.navigate([`/cookbook/${recipe.user_id}`]);
  }

  goRecipe(recipe: Recipe): void {
    this.router.navigate([`/cookbook/${recipe.user_id}/recipe/${recipe.id}`]);
  }

}
