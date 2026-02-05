import { Recipe } from "../models/Food";
import { calculateRecipeCost } from "./recipeCost";

export function calculateEfficiency(recipe: Recipe, sellPrice: number) {
  const cost = calculateRecipeCost(recipe);

  return {
    cost, // 원 재료 금액
    sellPrice, // 판매 금액
    profit: sellPrice - cost, // 순이익 금액
    efficiency: +(((sellPrice - cost) / sellPrice) * 100).toFixed(2), // 순이익율
  };
}
