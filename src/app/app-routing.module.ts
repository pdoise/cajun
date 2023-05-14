import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookBookComponent } from './cookbook/cookbook.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RecipeShowComponent } from './cookbook/recipes/show/recipes-show.component';
import { RecipeFormComponent } from './cookbook/recipes/form/recipes-form.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{
  path: 'cookbook/:userId',
  component: CookBookComponent,
  canActivate: [AuthGuard]
},{
  path: 'landing',
  component: LandingComponent,
},{
  path: 'login',
  component: LoginComponent,
},{
  path: 'cookbook/:userId/recipe/new',
  component: RecipeFormComponent,
  canActivate: [AuthGuard]
},{
  path: 'cookbook/:userId/recipe/:recipeId',
  component: RecipeShowComponent
},{
  path: 'cookbook/:userId/recipe/:recipeId/edit',
  component: RecipeFormComponent,
  canActivate: [AuthGuard]
},{
  path: 'signup',
  component: SignupComponent,
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
