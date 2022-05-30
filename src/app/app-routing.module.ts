import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LandingResolver } from './landing/landing.resolver';

import { RecipeComponent } from './recipes/show/recipes-show.component';
import { RecipeResolver } from './recipes/show/recipes-show.resolver';

const routes: Routes = [{
  path: 'landing',
  component: LandingComponent,
  resolve: { recipes: LandingResolver }
},{
  path: 'recipe/:id',
  component: RecipeComponent,
  resolve: { recipe: RecipeResolver }
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
