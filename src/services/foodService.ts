import { supabase } from "../lib/supabase";

export const getAllFood = async () => {
  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
};

export const getFoodPriceRecords = async (foodName: string) => {
  const { data: food, error: foodError } = await supabase
    .from("foods")
    .select("id, name, min_price, max_price")
    .eq("name", foodName)
    .single();

  if (foodError) throw foodError;

  const { data: prices, error: pricesError } = await supabase
    .from("price_records")
    .select("price, record_date")
    .eq("food_id", food.id)
    .order("record_date", { ascending: true });

  if (pricesError) throw pricesError;

  return {
    food,
    prices: prices.map((p) => ({
      date: p.record_date,
      price: p.price,
    })),
  };
};

export const getFoodPriceRange = async (foodName: string) => {
  const { data, error } = await supabase
    .from("foods")
    .select("min_price, max_price")
    .eq("name", foodName)
    .single();

  if (error) throw error;
  return { min: data.min_price, max: data.max_price };
};

export async function addPriceRecords(
  pricesData: [string, number][],
  date: string,
) {
  console.log("Adding price records:", pricesData.length, "items");

  try {
    const foodNames = pricesData.map(([name]) => name);
    const { data: foods, error: foodsError } = await supabase
      .from("foods")
      .select("id, name")
      .in("name", foodNames);

    if (foodsError) throw foodsError;

    const foodMap = new Map(foods?.map((f) => [f.name, f.id]) || []);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const createdBy = user?.id ?? "unknown";

    const records = pricesData.map(([name, price]) => ({
      food_id: foodMap.get(name),
      price,
      record_date: date,
      created_by: createdBy,
    }));

    const { error } = await supabase.from("price_records").insert(records);

    if (error) {
      if (error.code === "23505") {
        throw new Error("이미 오늘 날짜로 등록된 가격이 있습니다");
      }
      throw error;
    }

    console.log("Price records added successfully");
  } catch (error) {
    console.error("Error adding price records:", error);
    throw error;
  }
}
