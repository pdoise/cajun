import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeActions } from '../../state/app.actions';
import { selectRecipe } from '../../state/app.selector';
import { Recipe } from 'src/app/app.models';

import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './recipes-show.component.html',
    styleUrls: ['./recipes-show.component.scss']
})

export class RecipeShowComponent implements OnInit {
  recipe$: Observable<Recipe> = this.store.select(selectRecipe);
  id: number = this.route.snapshot.params['id'];
  form!: FormGroup;
  image!: File;
  private recipesURl = environment.API_URL + '/recipes';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.getRecipe({recipeId: this.route.snapshot.params['id']}));
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  saveRecipe(): void {
    const formData = new FormData();
    formData.append('recipe[image]', this.image);
    this.http.put(this.recipesURl + `/${this.id}`, formData).subscribe(response => {
      this.store.dispatch(RecipeActions.getRecipe({recipeId: this.route.snapshot.params['id']}));
    })
  }

  goEditRecipe(): void {
    this.router.navigate([`recipe/${this.id}/edit`]);
  }

}
