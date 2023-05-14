import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookBookComponent } from './cookbook/cookbook.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RecipeShowComponent } from './recipes/show/recipes-show.component';
import { RecipeFormComponent } from './recipes/form/recipes-form.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{
  path: 'my_cookbook/:userId',
  component: CookBookComponent,
  canActivate: [AuthGuard]
},{
  path: 'landing',
  component: LandingComponent,
},{
  path: 'login',
  component: LoginComponent,
},{
  path: 'recipe/new',
  component: RecipeFormComponent,
  canActivate: [AuthGuard]
},{
  path: 'recipe/:id',
  component: RecipeShowComponent
},{
  path: 'recipe/:id/edit',
  component: RecipeFormComponent,
  canActivate: [AuthGuard]
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
