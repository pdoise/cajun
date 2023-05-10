import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { appReducer } from './state/app.reducer';
import { RecipeEffects } from './state/app.effects';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RecipeShowComponent } from './recipes/show/recipes-show.component';
import { RecipeFormComponent } from './recipes/form/recipes-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
