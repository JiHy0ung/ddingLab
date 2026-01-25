export interface Ingredient {
  name: string;
  amount: number;
  image: string;
}

export interface Recipe {
  ingredients: Ingredient[];
  result: string;
  resultImage: string;
  rarity: string;
}

export type FoodPriceRange = Record<string, { min: number; max: number }>;

export type FoodName =
  | "토마토 스파게티"
  | "어니언 링"
  | "갈릭 케이크"
  | "삼겹살 토마토 찌개"
  | "삼색 아이스크림"
  | "마늘 양갈비 핫도그"
  | "달콤 시리얼"
  | "로스트 치킨 파이"
  | "스윗 치킨 햄버거"
  | "토마토 파인애플 피자"
  | "양파 수프"
  | "허브 삼겹살 찜"
  | "토마토 라자냐"
  | "딥 크림 빠네"
  | "트리플 소갈비 꼬치";
