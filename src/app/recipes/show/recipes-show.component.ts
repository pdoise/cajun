import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Recipe } from 'src/app/shared/shared.models';

@Component({
    templateUrl: './recipes-show.component.html',
    styleUrls: ['./recipes-show.component.scss']
})

export class RecipeShowComponent implements OnInit {
  recipe!: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recipe = this.route.snapshot.data['recipe'];
  }

  goEditRecipe(): void {
    this.router.navigate([`recipe/${this.recipe.id}/edit`]);
  }

}
