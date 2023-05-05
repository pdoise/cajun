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
    this.recipeForm = this.formBuilder.group({
      name: '',
      user_id: 1
    });
    if (this.route.snapshot.data['recipe']) {
      this.recipe = this.route.snapshot.data['recipe'];
      this.isEdit = true;
    } else {
      this.recipe = {} as Recipe;
    }
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('recipe[name]', this.recipeForm.get('name')?.value);
    formData.append('recipe[user_id]', this.recipeForm.get('user_id')?.value);
    formData.append('recipe[image]', this.image);
    this.http.post(this.recipesURl, formData).subscribe(response => {
      console.log(response);
    });
  }

  saveRecipe(): void {
    this.recipe.user_id = 1;
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
