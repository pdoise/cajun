import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeActions } from '../../state/app.actions';
import { selectRecipe } from '../../state/app.selector';
import { Recipe } from 'src/app/app.models';

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
  private recipeSub!: Subscription;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.store.dispatch(RecipeActions.getRecipe({recipeId: this.route.snapshot.params['id']}));

    this.recipeSub = this.recipe$.subscribe((recipe) => {
      if (recipe.id) {
        this.isEdit = true;
        this.recipe = recipe;
      }
      this.form = this.formBuilder.group({
        id: [this.recipe.id || null],
        name: [this.recipe.name || ''],
        description: [this.recipe.description || ''],
        ingredients: [this.recipe.ingredients || ''],
        directions: [this.recipe.directions || ''],
        user_id: 1
      });
    })
  }

  ngOnDestroy() {
    if (this.recipeSub) { this.recipeSub.unsubscribe(); }
  }

  saveRecipe(): void {
    if (this.isEdit) {
      this.store.dispatch(RecipeActions.updateRecipe({ recipe: this.form.getRawValue(), recipeId: this.recipe.id }));
    } else {
      this.store.dispatch(RecipeActions.createRecipe({ recipe: this.form.getRawValue() }));
    }
  }

  cancel() {
    this.router.navigate([`recipe/${this.recipe.id}`]);
  }

}
