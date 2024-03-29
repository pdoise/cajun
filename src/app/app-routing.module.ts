import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookBookComponent } from './cookbook/cookbook.component';
import { ErrorPageComponent } from './shared/layout/error-page/error-page.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeShowComponent } from './cookbook/recipes/show/recipes-show.component';
import { RecipeFormComponent } from './cookbook/recipes/form/recipes-form.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{
  path: 'cookbook/:userId',
  component: CookBookComponent
},{
  path: 'landing',
  component: LandingComponent,
},{
  path: 'login',
  component: LoginComponent,
},{
  path: 'password_reset',
  component: PasswordResetComponent,
},{
  path: 'cookbook/:userId/recipe/new',
  component: RecipeFormComponent,
  canActivate: [AuthGuard]
},{
  path: 'recipes',
  component: RecipesComponent
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
  path: 'error/:error',
  component: ErrorPageComponent,
},{
  path: '',
  redirectTo: 'landing',
  pathMatch: 'full'
},{
  path: '**',
  pathMatch: 'full',
  redirectTo: 'error/404'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
