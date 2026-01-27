import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FoodStoreProps {
  selectedFood: string;
  setSelectedFood: (food: string) => void;
}

export const useFoodStore = create<FoodStoreProps>()(
  persist(
    (set) => ({
      selectedFood: "토마토 스파게티",
      setSelectedFood: (food) => set({ selectedFood: food }),
    }),
    {
      name: "food-storage", // localStorage 키 이름
    },
  ),
);
