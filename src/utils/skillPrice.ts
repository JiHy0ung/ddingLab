import { skillBonuses } from "../constants/skillBonuses";

export const calculateSkillPrice = (
  basePrice: number,
  moneyMakingLv: number,
  fullPotLv: number,
) => {
  const moneyBonus = skillBonuses.moneyMaking[moneyMakingLv] || 0;
  const potBonus = skillBonuses.fullPot[fullPotLv] || 0;
  return Math.round(basePrice * (1 + moneyBonus + potBonus));
};
