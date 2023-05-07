import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeActions } from '../../state/app.actions';
import { selectRecipe } from '../../state/app.selector';
import { Recipe } from 'src/app/models/app.models';

import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.scss']
})

export class RecipeFormComponent implements OnInit {
  recipe$: Observable<Recipe> = this.store.select(selectRecipe);
  id: number = this.route.snapshot.params['id'];
  recipe = {} as Recipe;
  isEdit!: boolean;
  form!: FormGroup;
  image!: File;
  private recipesURl = environment.API_URL + '/recipes';

  constructor(
    private store: Store,
    private formBuilder: FormBuilder, private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.getRecipe({recipeId: this.route.snapshot.params['id']}));

    this.recipe$.subscribe((recipe) => {
      if (recipe.id) {
        this.isEdit = true;
        this.recipe = recipe;
      }
    })

    this.form = this.formBuilder.group({
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
    const formData = new FormData();
    formData.append('recipe[name]', this.form.get('name')?.value);
    formData.append('recipe[description]', this.form.get('description')?.value);
    formData.append('recipe[ingredients]', this.form.get('ingredients')?.value);
    formData.append('recipe[directions]', this.form.get('directions')?.value);
    formData.append('recipe[user_id]', this.form.get('user_id')?.value);
    if (this.image) { formData.append('recipe[image]', this.image);}
    if (this.isEdit) {
      this.http.put(this.recipesURl + `/${this.recipe.id}`, formData).subscribe(response => {
        this.router.navigate([`recipe/${this.recipe.id}`]);
      })
    } else {
      this.http.post(this.recipesURl, formData).subscribe(response => {
        this.router.navigate([`landing`]);
      })
    }
    //TODO: formData and recipe types dont jive in reducer
    //if (this.isEdit) {
    //  this.store.dispatch(RecipeActions.updateRecipe({ recipe: formData, recipeId: this.recipe.id }));
    //} else {
    //  this.store.dispatch(RecipeActions.createRecipe({ recipe: formData }));
    //}
  }

}
