import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';
import { UserActions, RecipeActions } from '../state/app.actions';
import { selectUser, selectRecipes, selectFilteredUserRecipes } from '../state/app.selector';

import { User, Recipe } from 'src/app/app.models';

@Component({
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss']
})

export class CookBookComponent implements OnInit {
  user$: Observable<User> = this.store.select(selectUser);
  recipes$: Observable<Recipe[]> = this.store.select(selectRecipes);
  filteredRecipes$: Observable<Recipe[]> = this.store.select(selectFilteredUserRecipes);
  userId: number = this.route.snapshot.params['userId'];

  constructor(
    private auth: AuthService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUser({userId: this.userId}));
    this.store.dispatch(UserActions.getUserRecipes({userId: this.userId}));
  }

  goCreateRecipe(): void {
    this.router.navigate([`/cookbook/${this.userId}/recipe/new`]);
  }

  goRecipe(recipe: Recipe): void {
    this.router.navigate([`/cookbook/${this.userId}/recipe/${recipe.id}`]);
  }

  get canEdit(): boolean { return !!(this.auth.getCurrentUser().id == this.userId) }
}
