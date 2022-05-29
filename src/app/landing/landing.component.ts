import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from "../recipes/recipes.model";
import { RecipeService } from '../recipes/recipes.service';


//import { SessionService } from 'src/app/core/services/session.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  recipes!: any;
  isLoggedIn: boolean = false;
  username!: string;

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //console.log(this.session)
    //this.isLoggedIn = !!this.session.valid;
//
    //if (this.isLoggedIn) {
    //  const user = this.session.user();
//
    //  this.username = user.username;
    //}
    this.getProducts();
  }

  private getProducts() {
    this.recipeService.getRecipes().subscribe((recipes) => this.recipes = recipes);
  }

  logout(): void {
    //this.session.signOut();
    //window.location.reload();
  }

}
