import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RecipeShowComponent } from './recipes/show/recipes-show.component';
import { RecipeFormComponent } from './recipes/form/recipes-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RecipeShowComponent,
    RecipeFormComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
