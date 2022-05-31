import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LandingResolver } from './landing/landing.resolver';

import { RecipeShowComponent } from './recipes/show/recipes-show.component';
import { RecipeFormComponent } from './recipes/form/recipes-form.component';
import { RecipeShowResolver } from './recipes/show/recipes-show.resolver';

const routes: Routes = [{
  path: 'landing',
  component: LandingComponent,
  resolve: { recipes: LandingResolver }
},{
  path: 'recipe/new',
  component: RecipeFormComponent
},{
  path: 'recipe/:id',
  component: RecipeShowComponent,
  resolve: { recipe: RecipeShowResolver }
},{
  path: 'recipe/:id/edit',
  component: RecipeFormComponent,
  resolve: { recipe: RecipeShowResolver }
},{
  path: '',
  redirectTo: 'landing',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
