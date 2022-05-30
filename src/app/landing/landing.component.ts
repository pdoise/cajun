import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Recipe } from 'src/app/shared/shared.models';

//import { SessionService } from 'src/app/core/services/session.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  recipes!: Recipe[];
  //isLoggedIn: boolean = false;
  //username!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recipes = this.route.snapshot.data['recipes'];
    //console.log(this.session)
    //this.isLoggedIn = !!this.session.valid;
//
    //if (this.isLoggedIn) {
    //  const user = this.session.user();
//
    //  this.username = user.username;
    //}
  }

  goRecipe(recipe: Recipe): void {
    this.router.navigate(['/recipe', recipe.id]);
  }

  logout(): void {
    //this.session.signOut();
    //window.location.reload();
  }

}
