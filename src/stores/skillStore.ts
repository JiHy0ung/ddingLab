import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SkillState {
  moneyMakingLv: number;
  fullPotLv: number;
  setMoneyMakingLv: (lv: number) => void;
  setFullPotLv: (lv: number) => void;
  resetSkills: () => void;
}

export const useSkillStore = create<SkillState>()(
  persist(
    (set) => ({
      moneyMakingLv: 0,
      fullPotLv: 0,

      setMoneyMakingLv: (lv) => set({ moneyMakingLv: lv }),
      setFullPotLv: (lv) => set({ fullPotLv: lv }),

      resetSkills: () =>
        set({
          moneyMakingLv: 0,
          fullPotLv: 0,
        }),
    }),
    {
      name: "cooking-skill-store", // localStorage key
    },
  ),
);
