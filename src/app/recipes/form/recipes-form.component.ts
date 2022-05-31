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
  isEdit!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.data['recipe']) {
      this.recipe = this.route.snapshot.data['recipe'];
      this.isEdit = true;
    } else {
      this.recipe = {} as Recipe;
    }
  }

  saveRecipe(): void {
    if (this.isEdit) {
      this.updateRecipe();
    } else {
      this.addRecipe();
    }
  }

  addRecipe(): void {
    this.recipeService.addRecipe(this.recipe).subscribe(()=>{
      this.router.navigate([`landing`]);
    });
  }

  updateRecipe(): void {
    this.recipeService.updateRecipe(this.recipe).subscribe(()=>{
      this.router.navigate([`recipe/${this.recipe.id}`]);
    });
  }

}
