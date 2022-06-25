import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Recipe } from 'src/app/shared/shared.models';
import { RecipeService } from "../../recipes/recipes.service";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './recipes-form.component.html',
    styleUrls: ['./recipes-form.component.scss']
})

export class RecipeFormComponent implements OnInit {
  recipe!: Recipe;
  isEdit!: boolean;
  imageUrl: string = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  };

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
    file['filename'] = file.name;
    this.recipe['image'] = file;
    if (file instanceof Blob) {
      console.log('its a blob')
    }
    this.http.put(`${this.recipesURl}/${this.recipe.id}/image`, file, { responseType: 'text' }).subscribe((response) => {
      console.log(response)
    });
    //this.recipeService.updateRecipe(file).subscribe(()=>{
    //  //this.router.navigate([`recipe/${this.recipe.id}`]);
    //});
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
