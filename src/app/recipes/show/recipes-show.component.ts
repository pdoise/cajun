import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { Recipe } from 'src/app/shared/shared.models';

import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './recipes-show.component.html',
    styleUrls: ['./recipes-show.component.scss']
})

export class RecipeShowComponent implements OnInit {
  recipep: any;
  recipe!: Recipe;
  imageSrc!: string;
  private recipesURl = environment.API_URL + '/recipes';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recipe = this.route.snapshot.data['recipe'];
    this.imageSrc = `data:${this.recipe.image?.content_type};base64,${this.recipe.image.data}`;

  }

  goEditRecipe(): void {
    this.router.navigate([`recipe/${this.recipe.id}/edit`]);
  }

}
