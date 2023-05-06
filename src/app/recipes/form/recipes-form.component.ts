import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Recipe } from 'src/app/shared/shared.models';
import { RecipeService } from "../../recipes/recipes.service";

import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './recipes-form.component.html',
    styleUrls: ['./recipes-form.component.scss']
})

export class RecipeFormComponent implements OnInit {
  recipe!: Recipe;
  isEdit!: boolean;
  recipeForm!: FormGroup;
  image!: File;
  private recipesURl = environment.API_URL + '/recipes';

  constructor(
    private formBuilder: FormBuilder, private http: HttpClient,
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
    this.recipeForm = this.formBuilder.group({
      id: [this.recipe.id || null],
      name: [this.recipe.name || ''],
      description: [this.recipe.description || ''],
      ingredients: [this.recipe.ingredients || ''],
      directions: [this.recipe.directions || ''],
      user_id: 1
    });
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  saveRecipe(): void {
    console.log(this.image)
    if (this.image) {
      const formData = new FormData();
      formData.append('recipe[name]', this.recipeForm.get('name')?.value);
      formData.append('recipe[description]', this.recipeForm.get('description')?.value);
      formData.append('recipe[ingredients]', this.recipeForm.get('ingredients')?.value);
      formData.append('recipe[directions]', this.recipeForm.get('directions')?.value);
      formData.append('recipe[user_id]', this.recipeForm.get('user_id')?.value);
      formData.append('recipe[image]', this.image);
      if (this.isEdit) {
        this.http.put(this.recipesURl + `/${this.recipe.id}`, formData).subscribe(response => {
          this.router.navigate([`recipe/${this.recipe.id}`]);
        });
      } else {
        this.http.post(this.recipesURl, formData).subscribe(response => {
          this.router.navigate([`landing`]);
        });
      }
    } else {
      if (this.isEdit) {
        this.updateRecipe();
      } else {
        this.addRecipe();
      }
    }
  }

  addRecipe(): void {
    this.recipeService.addRecipe(this.recipeForm.getRawValue()).subscribe(()=>{
      this.router.navigate([`landing`]);
    });
  }

  updateRecipe(): void {
    this.recipeService.updateRecipe(this.recipeForm.getRawValue()).subscribe(()=>{
      this.router.navigate([`recipe/${this.recipe.id}`]);
    });
  }

}
