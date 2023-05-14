import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import { RecipeActions } from '../../../state/app.actions';
import { selectRecipe } from '../../../state/app.selector';
import { Recipe } from 'src/app/app.models';

import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './recipes-show.component.html',
  styleUrls: ['./recipes-show.component.scss']
})

export class RecipeShowComponent implements OnInit, OnDestroy {
  recipe$: Observable<Recipe> = this.store.select(selectRecipe);
  userId: number = this.route.snapshot.params['userId'];
  recipeId: number = this.route.snapshot.params['recipeId'];
  form!: FormGroup;
  image!: File;
  imageUrl!: string;
  recipeSub!: Subscription;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.store.dispatch(RecipeActions.getRecipe({userId: this.userId, recipeId: this.recipeId}));
    this.recipeSub = this.recipe$.subscribe((recipe) => {
      this.imageUrl = recipe.image_url ? recipe.image_url : '/assets/images/no-image.png';
    })
  }

  ngOnDestroy() {
    if (this.recipeSub) { this.recipeSub.unsubscribe() }
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
    this.saveRecipe();
  }

  saveRecipe() {
    const formData = new FormData();
    formData.append('recipe[user_id]', '1');
    formData.append('recipe[image]', this.image);
    this.http.put(`${environment.API_URL}/users/${this.userId}/recipes/${this.recipeId}`, formData).subscribe(response => {
      this.store.dispatch(RecipeActions.getRecipe({userId: this.userId, recipeId: this.recipeId}));
    })
  }

  goEditRecipe() {
    this.router.navigate([`cookbook/${this.userId}/recipe/${this.recipeId}/edit`]);
  }

  get canEdit(): boolean { return !!(this.auth.getCurrentUser().id == this.userId) }

}
