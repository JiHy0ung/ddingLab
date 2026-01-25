import { Recipe } from "../models/Food";

// 요리
import TomatoSpaghetti from "../assets/food/common/tomato_spaghetti.png";
import OnionRings from "../assets/food/common/onion_rings.png";
import GarlicCake from "../assets/food/common/garlic_cake.png";

import ForkBellyTomatoStew from "../assets/food/normal/pork_belly_tomato_stew.png";
import TripleFlavorIceCream from "../assets/food/normal/triple_flavor_ice_cream.png";
import GarlicLambRibHotdog from "../assets/food/normal/garlic_lamb_rib_hotdog.png";
import SweetCereals from "../assets/food/normal/sweet_cereals.png";
import RoastChickenPie from "../assets/food/normal/roast_chicken_pie.png";

import SweetChickenHamburger from "../assets/food/rare/sweet_chicken_hamburger.png";
import TomatoPineapplePizza from "../assets/food/rare/tomato_pineapple_pizza.png";
import OnionSoup from "../assets/food/rare/onion_soup.png";
import PorkBellySteamedWithHerbs from "../assets/food/rare/pork_belly_steamed_with_herbs.png";

import TomatoLasagna from "../assets/food/epic/tomato_lasagna.png";
import DeepCreamPane from "../assets/food/epic/deep_cream_pane.png";
import TripleBeefRibSkewers from "../assets/food/epic/triple_beef_rib_skewers.png";

// 재료
import TomatoBase from "../assets/food/ingredients/base/tomato_base.png";
import OnionBase from "../assets/food/ingredients/base/onion_base.png";
import GarlicBase from "../assets/food/ingredients/base/garlic_base.png";

import ButterPiece from "../assets/food/ingredients/basics/butter_piece.png";
import CheesePiece from "../assets/food/ingredients/basics/cheese_piece.png";
import CookingMilk from "../assets/food/ingredients/basics/cooking_milk.png";
import CookingSalt from "../assets/food/ingredients/basics/cooking_salt.png";
import Oil from "../assets/food/ingredients/basics/oil.png";
import WheatDough from "../assets/food/ingredients/basics/wheat_dough.png";

import BeetBundle from "../assets/food/ingredients/crops/beet_bundle.png";
import CarrotBundle from "../assets/food/ingredients/crops/carrot_bundle.png";
import PotatoBundle from "../assets/food/ingredients/crops/potato_bundle.png";
import PumpkinBundle from "../assets/food/ingredients/crops/pumpkin_bundle.png";
import SweetBerriesBundle from "../assets/food/ingredients/crops/sweet_berries_bundle.png";
import WaterMelonCube from "../assets/food/ingredients/crops/watermelon_bundle.png";
import SugarCube from "../assets/food/ingredients/crops/sugar_cube.png";

import Coconut from "../assets/food/ingredients/fruits/coconut.png";
import Pineapple from "../assets/food/ingredients/fruits/pineapple.png";

import Steak from "../assets/food/ingredients/meats/steak.png";
import BeefRibs from "../assets/food/ingredients/meats/beef_ribs.png";
import BeefSirloin from "../assets/food/ingredients/meats/beef_sirloin.png";
import Chicken from "../assets/food/ingredients/meats/chicken.png";
import ChickenBreast from "../assets/food/ingredients/meats/chicken_breast.png";
import ChickenDrumstick from "../assets/food/ingredients/meats/chicken_drumstick.png";
import Mutton from "../assets/food/ingredients/meats/mutton.png";
import LambRibs from "../assets/food/ingredients/meats/lamb_ribs.png";
import LambShoulder from "../assets/food/ingredients/meats/lamb_shoulder.png";
import Pork from "../assets/food/ingredients/meats/pork.png";
import PorkBelly from "../assets/food/ingredients/meats/pork_belly.png";
import PorkShoulder from "../assets/food/ingredients/meats/pork_shoulder.png";

export const RECIPES: Record<string, Recipe> = {
  "토마토 스파게티": {
    ingredients: [
      { name: "토마토 베이스", amount: 1, image: TomatoBase },
      { name: "호박 묶음", amount: 1, image: PumpkinBundle },
    ],
    result: "토마토 스파게티",
    resultImage: TomatoSpaghetti,
    rarity: "common",
  },
  "어니언 링": {
    ingredients: [
      { name: "양파 베이스", amount: 1, image: OnionBase },
      { name: "감자 묶음", amount: 1, image: PotatoBundle },
    ],
    result: "어니언 링",
    resultImage: OnionRings,
    rarity: "common",
  },
  "갈릭 케이크": {
    ingredients: [
      { name: "마늘 베이스", amount: 1, image: GarlicBase },
      { name: "당근 묶음", amount: 1, image: CarrotBundle },
    ],
    result: "갈릭 케이크",
    resultImage: GarlicCake,
    rarity: "common",
  },
  "삼겹살 토마토 찌개": {
    ingredients: [
      { name: "토마토 베이스", amount: 2, image: TomatoBase },
      { name: "비트 묶음", amount: 1, image: BeetBundle },
      { name: "요리용 소금", amount: 1, image: CookingSalt },
      { name: "익힌 돼지고기", amount: 1, image: Pork },
      { name: "익힌 돼지 삼겹살", amount: 1, image: PorkBelly },
    ],
    result: "삼겹살 토마토 찌개",
    resultImage: ForkBellyTomatoStew,
    rarity: "normal",
  },
  "삼색 아이스크림": {
    ingredients: [
      { name: "양파 베이스", amount: 2, image: OnionBase },
      { name: "수박 묶음", amount: 1, image: WaterMelonCube },
      { name: "코코넛", amount: 1, image: Coconut },
      { name: "설탕 큐브", amount: 1, image: SugarCube },
      { name: "요리용 우유", amount: 1, image: CookingMilk },
    ],
    result: "삼색 아이스크림",
    resultImage: TripleFlavorIceCream,
    rarity: "normal",
  },
  "마늘 양갈비 핫도그": {
    ingredients: [
      { name: "마늘 베이스", amount: 2, image: GarlicBase },
      { name: "감자 묶음", amount: 1, image: PotatoBundle },
      { name: "오일", amount: 1, image: Oil },
      { name: "익힌 양고기", amount: 1, image: Mutton },
      { name: "익힌 양 갈비살", amount: 1, image: LambRibs },
    ],
    result: "마늘 양갈비 핫도그",
    resultImage: GarlicLambRibHotdog,
    rarity: "normal",
  },
  "달콤 시리얼": {
    ingredients: [
      { name: "토마토 베이스", amount: 2, image: TomatoBase },
      { name: "달콤한 열매 묶음", amount: 1, image: SweetBerriesBundle },
      { name: "파인애플", amount: 1, image: Pineapple },
      { name: "밀가루 반죽", amount: 1, image: WheatDough },
      { name: "오일", amount: 1, image: Oil },
    ],
    result: "달콤 시리얼",
    resultImage: SweetCereals,
    rarity: "normal",
  },
  "로스트 치킨 파이": {
    ingredients: [
      { name: "마늘 베이스", amount: 2, image: GarlicBase },
      { name: "당근 묶음", amount: 1, image: CarrotBundle },
      { name: "버터 조각", amount: 1, image: ButterPiece },
      { name: "익힌 닭고기", amount: 1, image: Chicken },
      { name: "익힌 닭 다리살", amount: 1, image: ChickenDrumstick },
    ],
    result: "로스트 치킨 파이",
    resultImage: RoastChickenPie,
    rarity: "normal",
  },
  "스윗 치킨 햄버거": {
    ingredients: [
      { name: "토마토 베이스", amount: 1, image: TomatoBase },
      { name: "양파 베이스", amount: 1, image: OnionBase },
      { name: "비트 묶음", amount: 1, image: BeetBundle },
      { name: "달콤한 열매 묶음", amount: 1, image: SweetBerriesBundle },
      { name: "익힌 닭 가슴살", amount: 1, image: ChickenBreast },
      { name: "익힌 닭 다리살", amount: 1, image: ChickenDrumstick },
    ],
    result: "스윗 치킨 햄버거",
    resultImage: SweetChickenHamburger,
    rarity: "rare",
  },
  "토마토 파인애플 피자": {
    ingredients: [
      { name: "토마토 베이스", amount: 2, image: TomatoBase },
      { name: "마늘 베이스", amount: 2, image: GarlicBase },
      { name: "파인애플", amount: 1, image: Pineapple },
      { name: "치즈 조각", amount: 1, image: CheesePiece },
      { name: "스테이크", amount: 1, image: Steak },
      { name: "익힌 소 등심", amount: 1, image: BeefSirloin },
    ],
    result: "토마토 파인애플 피자",
    resultImage: TomatoPineapplePizza,
    rarity: "rare",
  },
  "양파 수프": {
    ingredients: [
      { name: "양파 베이스", amount: 2, image: OnionBase },
      { name: "마늘 베이스", amount: 1, image: GarlicBase },
      { name: "감자 묶음", amount: 1, image: PotatoBundle },
      { name: "코코넛", amount: 1, image: Coconut },
      { name: "버터 조각", amount: 1, image: ButterPiece },
      { name: "익힌 돼지 앞다리살", amount: 1, image: PorkShoulder },
    ],
    result: "양파 수프",
    resultImage: OnionSoup,
    rarity: "rare",
  },
  "허브 삼겹살 찜": {
    ingredients: [
      { name: "마늘 베이스", amount: 2, image: GarlicBase },
      { name: "양파 베이스", amount: 1, image: OnionBase },
      { name: "호박 묶음", amount: 1, image: PumpkinBundle },
      { name: "감자 묶음", amount: 1, image: PotatoBundle },
      { name: "익힌 돼지고기", amount: 1, image: Pork },
      { name: "익힌 돼지 삼겹살", amount: 1, image: PorkBelly },
    ],
    result: "허브 삼겹살 찜",
    resultImage: PorkBellySteamedWithHerbs,
    rarity: "rare",
  },
  "토마토 라자냐": {
    ingredients: [
      { name: "토마토 베이스", amount: 1, image: TomatoBase },
      { name: "양파 베이스", amount: 1, image: OnionBase },
      { name: "마늘 베이스", amount: 1, image: GarlicBase },
      { name: "당근 묶음", amount: 1, image: CarrotBundle },
      { name: "호박 묶음", amount: 1, image: PumpkinBundle },
      { name: "밀가루 반죽", amount: 1, image: WheatDough },
      { name: "익힌 양 다리살", amount: 1, image: LambShoulder },
    ],
    result: "토마토 라자냐",
    resultImage: TomatoLasagna,
    rarity: "epic",
  },
  "딥 크림 빠네": {
    ingredients: [
      { name: "토마토 베이스", amount: 1, image: TomatoBase },
      { name: "양파 베이스", amount: 1, image: OnionBase },
      { name: "마늘 베이스", amount: 1, image: GarlicBase },
      { name: "수박 묶음", amount: 1, image: WaterMelonCube },
      { name: "감자 묶음", amount: 1, image: PotatoBundle },
      { name: "치즈 조각", amount: 1, image: CheesePiece },
      { name: "요리용 우유", amount: 1, image: CookingMilk },
    ],
    result: "딥 크림 빠네",
    resultImage: DeepCreamPane,
    rarity: "epic",
  },
  "트리플 소갈비 꼬치": {
    ingredients: [
      { name: "토마토 베이스", amount: 1, image: TomatoBase },
      { name: "양파 베이스", amount: 1, image: OnionBase },
      { name: "마늘 베이스", amount: 1, image: GarlicBase },
      { name: "당근 묶음", amount: 1, image: CarrotBundle },
      { name: "비트 묶음", amount: 1, image: BeetBundle },
      { name: "설탕 큐브", amount: 1, image: SugarCube },
      { name: "익힌 소 갈비살", amount: 1, image: BeefRibs },
    ],
    result: "트리플 소갈비 꼬치",
    resultImage: TripleBeefRibSkewers,
    rarity: "epic",
  },
};
