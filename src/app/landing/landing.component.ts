import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Recipe } from 'src/app/shared/shared.models';
import { SearchFilterPipe } from 'src/app/shared/pipes/search-filter.pipe';

//import { SessionService } from 'src/app/core/services/session.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  recipes!: Recipe[];
  allRecipes!: Recipe[];
  textSearch: string = '';
  //isLoggedIn: boolean = false;
  //username!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recipes = this.route.snapshot.data['recipes'];
    this.allRecipes = this.recipes;
    this.allRecipes.forEach((recipe) => {
      if (recipe.image) {
        recipe.img_src = `data:${recipe.image?.content_type};base64,${recipe.image?.data}`;
      }
    })
    //console.log(this.session)
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
    let filtered = this.allRecipes || [];
    filtered = new SearchFilterPipe().transform(this.textSearch, filtered);
    this.recipes = filtered;
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
