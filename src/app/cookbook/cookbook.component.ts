import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';
import { UserActions, AppFiltering } from '../state/app.actions';
import { selectUser, selectRecipes, selectFilteredUserRecipes } from '../state/app.selector';
import { User, Recipe } from 'src/app/app.models';

import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss']
})

export class CookBookComponent implements OnInit, OnDestroy {
  user$: Observable<User> = this.store.select(selectUser);
  recipes$: Observable<Recipe[]> = this.store.select(selectRecipes);
  filteredRecipes$: Observable<Recipe[]> = this.store.select(selectFilteredUserRecipes);
  userId: number = this.route.snapshot.params['userId'];
  image!: File;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUser({userId: this.userId}));
    this.store.dispatch(UserActions.getUserRecipes({userId: this.userId}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(AppFiltering.resetFilters());
  }

  goCreateRecipe(): void {
    this.router.navigate([`/cookbook/${this.userId}/recipe/new`]);
  }

  goRecipe(recipe: Recipe): void {
    this.router.navigate([`/cookbook/${this.userId}/recipe/${recipe.id}`]);
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
    this.saveRecipe();
  }

  saveRecipe() {
    const formData = new FormData();
    formData.append('user[image]', this.image);
    this.http.put(`${environment.API_URL}/users/${this.userId}`, formData).subscribe(response => {
      this.store.dispatch(UserActions.getUser({userId: this.userId}));
    })
  }

  get isOwner(): boolean { return !!(this.auth.getCurrentUser()?.id == this.userId) }
}
