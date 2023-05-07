import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeActions } from '../state/app.actions';
import { selectRecipes } from '../state/app.selector';
import { Recipe } from 'src/app/app.models';
import { SearchFilterPipe } from 'src/app/shared/pipes/search-filter.pipe';

//import { SessionService } from 'src/app/core/services/session.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  recipes$: Observable<Recipe[]> = this.store.select(selectRecipes);
  textSearch: string = '';
  //isLoggedIn: boolean = false;
  //username!: string;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.getRecipes());

    //this.isLoggedIn = !!this.session.valid;
//
    //if (this.isLoggedIn) {
    //  const user = this.session.user();
//
    //  this.username = user.username;
    //}
  }

  search(text: string): void {
    this.textSearch = text;
    this.applyFilters();
  }

  applyFilters(): void {
   //let filtered = this.allRecipes || [];
   //filtered = new SearchFilterPipe().transform(this.textSearch, filtered);
   //this.recipes = filtered;
  }

  goAddRecipe(): void {
    this.router.navigate([`recipe/new`]);
  }

  goRecipe(recipe: Recipe): void {
    this.router.navigate([`/recipe/${recipe.id}`]);
  }

  logout(): void {
    //this.session.signOut();
    //window.location.reload();
  }

}
