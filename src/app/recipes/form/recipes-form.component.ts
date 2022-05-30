import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Recipe } from 'src/app/shared/shared.models';
import { RecipeService } from "../../recipes/recipes.service";

@Component({
    templateUrl: './recipes-form.component.html',
    styleUrls: ['./recipes-form.component.scss']
})

export class RecipeFormComponent implements OnInit {
  recipe!: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.recipe = this.route.snapshot.data['recipe'];
  }

  saveRecipe(): void {
    this.recipeService.updateRecipe(this.recipe).subscribe(()=>{
      console.log('hi')
      this.router.navigate([`recipe/${this.recipe.id}`]);
    });
  }

}
