import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { RecipeService } from "../recipes/recipes.service";

@Injectable({
  providedIn: "root"
})
export class LandingResolver implements Resolve<any> {
  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.recipeService.getRecipes();
  }
}
