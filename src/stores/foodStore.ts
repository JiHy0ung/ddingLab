import { create } from "zustand";

interface FoodStoreProps {
  selectedFood: string;
  setSelectedFood: (food: string) => void;
}

export const useFoodStore = create<FoodStoreProps>((set) => ({
  selectedFood: "토마토 스파게티",
  setSelectedFood: (food) => set({ selectedFood: food }),
}));
