import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Recipe } from 'src/app/shared/shared.models';
import { RecipeService } from "../../recipes/recipes.service";

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './recipes-form.component.html',
    styleUrls: ['./recipes-form.component.scss']
})

export class RecipeFormComponent implements OnInit {
  recipe!: Recipe;
  isEdit!: boolean;
  imageUrl: string = '';

  private recipesURl = environment.API_URL + '/recipes';

  constructor(
    private http: HttpClient,
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
    this.imageUrl = `${this.recipesURl}/image`;
    //this.http.get(`${this.recipesURl}/${this.recipe.id}/image`, {responseType: 'blob'}).subscribe((response) => {
    //  console.log(response)
    //});
  }

  setImage(file: any): void {
    console.log(file)
    this.recipe['image'] = file;
    this.http.put(`${this.recipesURl}/${this.recipe.id}`, this.recipe).subscribe((response) => {
      console.log(response)
    });
   // this.recipeService.updateRecipe(file).subscribe(()=>{
   //   //this.router.navigate([`recipe/${this.recipe.id}`]);
   // });
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
