import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';

import { RecipeShowComponent } from './recipes/show/recipes-show.component';
import { RecipeFormComponent } from './recipes/form/recipes-form.component';

const routes: Routes = [{
  path: 'landing',
  component: LandingComponent,
},{
  path: 'recipe/new',
  component: RecipeFormComponent
},{
  path: 'recipe/:id',
  component: RecipeShowComponent,
},{
  path: 'recipe/:id/edit',
  component: RecipeFormComponent,
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
