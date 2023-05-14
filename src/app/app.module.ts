import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { appReducer } from './state/app.reducer';
import { RecipeEffects } from './state/app.effects';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RecipeShowComponent } from './recipes/show/recipes-show.component';
import { RecipeFormComponent } from './recipes/form/recipes-form.component';

import { CustomHttpInterceptor } from './core/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RecipeShowComponent,
    RecipeFormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({app: appReducer}),
    EffectsModule.forRoot([RecipeEffects])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
