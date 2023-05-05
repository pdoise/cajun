import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Recipe } from 'src/app/shared/shared.models';

@Component({
    templateUrl: './recipes-show.component.html',
    styleUrls: ['./recipes-show.component.scss']
})

export class RecipeShowComponent implements OnInit {
  recipe!: Recipe;
  image!: any;
  imageSrc!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recipe = this.route.snapshot.data['recipe'].recipe;
    console.log(this.recipe)
    if (this.route.snapshot.data['recipe'].image) {
      this.image = this.route.snapshot.data['recipe'].image;
      this.imageSrc = `data:${this.image?.content_type};base64,${this.image?.data}`;
    }

  }

  goEditRecipe(): void {
    this.router.navigate([`recipe/${this.recipe.id}/edit`]);
  }

}
