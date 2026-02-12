import { useQuery } from "@tanstack/react-query";
import { getFoodPriceRecords } from "../services/foodService";

export const useFoodData = (foodName: string) => {
  return useQuery({
    queryKey: ["foodPriceRecords", foodName],
    queryFn: () => getFoodPriceRecords(foodName),
    enabled: !!foodName,
    staleTime: 1000 * 60 * 60 * 12,
  });
};
