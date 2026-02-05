import { INGREDIENT_PRICES } from "../constants/foodingredientPrices";
import { Recipe } from "../models/Food";

export function calculateRecipeCost(recipe: Recipe): number {
  return recipe.ingredients.reduce((total, ingredient) => {
    const price = INGREDIENT_PRICES[ingredient.name];

    if (!price) {
      console.warn(`가격 정보 없음: ${ingredient.name}`);
      return total;
    }

    return total + price * ingredient.amount;
  }, 0);
}
