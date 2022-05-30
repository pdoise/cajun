import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { RecipeService } from "../../recipes/recipes.service";

@Injectable({
  providedIn: "root"
})
export class RecipeResolver implements Resolve<any> {
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.recipeService.getRecipe(route.params['id']);
  }
}
