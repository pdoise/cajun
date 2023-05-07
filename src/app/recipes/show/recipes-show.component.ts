import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeActions } from '../../state/app.actions';
import { selectRecipe } from '../../state/app.selector';
import { Recipe } from 'src/app/models/app.models';

@Component({
    templateUrl: './recipes-show.component.html',
    styleUrls: ['./recipes-show.component.scss']
})

export class RecipeShowComponent implements OnInit {
  recipe$: Observable<Recipe> = this.store.select(selectRecipe);
  id: number = this.route.snapshot.params['id']

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.getRecipe({recipeId: this.route.snapshot.params['id']}));
  }

  goEditRecipe(): void {
    this.router.navigate([`recipe/${this.id}/edit`]);
  }

}
