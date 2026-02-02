import { styled } from "@mui/material/styles";
import { Box, BoxProps, Tooltip, Typography } from "@mui/material";

import TomatoSpaghetti from "../../assets/food/common/tomato_spaghetti.png";
import OnionRings from "../../assets/food/common/onion_rings.png";
import GarlicCake from "../../assets/food/common/garlic_cake.png";

import PorkBellyTomatoStew from "../../assets/food/normal/pork_belly_tomato_stew.png";
import TripleFlavorIceCream from "../../assets/food/normal/triple_flavor_ice_cream.png";
import GarlicLambRibHotDog from "../../assets/food/normal/garlic_lamb_rib_hotdog.png";
import SweetCereals from "../../assets/food/normal/sweet_cereals.png";
import RoastChickenPie from "../../assets/food/normal/roast_chicken_pie.png";

import SweetChickenHamburger from "../../assets/food/rare/sweet_chicken_hamburger.png";
import TomatoPineApplePizza from "../../assets/food/rare/tomato_pineapple_pizza.png";
import OnionSoup from "../../assets/food/rare/onion_soup.png";
import PorkBellySteamedWithHerbs from "../../assets/food/rare/pork_belly_steamed_with_herbs.png";

import TomatoLasagna from "../../assets/food/epic/tomato_lasagna.png";
import DeepCreamPane from "../../assets/food/epic/deep_cream_pane.png";
import TripleBeefRibSkewers from "../../assets/food/epic/triple_beef_rib_skewers.png";
import FoodRecipe from "./components/FoodRecipe";
import { useFoodStore } from "../../stores/foodStore";
import { RECIPES } from "../../constants/foodRecipeData";
import { FoodFixedRange, FoodPriceData } from "../../constants/foodPriceData";
import FoodPriceChart from "./components/FoodPriceChart";

interface FoodItemProps {
  title: string;
  children: React.ReactNode;
}

const CookingContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingBlock: "3rem",
});

const CookingTitle = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "4rem",
  fontWeight: "900",
  marginBottom: "1rem",
});

const CookingSubtitle = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "1.2rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
});

const CookingDescription = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "0.95rem",
  color: "#888",
  textAlign: "center",
  maxWidth: "600px",
});

const FoodContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const FoodRow = styled(Box)({
  maxWidth: "50rem",
  display: "flex",
  gap: "1.5rem",
  flexWrap: "wrap",
  justifyContent: "center",
});

const FoodSelectTabs = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const BaseFoodBadge = styled(Box)({
  width: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 0.25rem",
  fontFamily: "galmuri11",
  fontSize: "0.875rem",
  fontWeight: "600",
  color: "white",
});

const CommonFoodBadge = styled(BaseFoodBadge)({
  backgroundColor: "#e9a640",
  border: "0.15rem solid #f8d660",
  textShadow: "3px 0 0 #e6712f",
});

const NormalFoodBadge = styled(BaseFoodBadge)({
  backgroundColor: "#5bc064",
  border: "0.2rem solid #a8dc55",
  textShadow: "3px 0 0 #4e885c",
});

const RareFoodBadge = styled(BaseFoodBadge)({
  backgroundColor: "#4195d5",
  border: "0.2rem solid #5fc8e8",
  textShadow: "3px 0 0 #3165c3",
});

const EpicFoodBadge = styled(BaseFoodBadge)({
  backgroundColor: "#d72513",
  border: "0.2rem solid #f2532a",
  textShadow: "3px 0 0 #a01931",
});

const FoodBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  gap: "0.625rem",
  padding: "0.5rem 0.875rem",
  backgroundColor: "#f5f5f5ff",
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
});

const FoodItem = ({ title, children }: FoodItemProps) => {
  const selectedFood = useFoodStore((state) => state.selectedFood);
  const setSelectedFood = useFoodStore((state) => state.setSelectedFood);

  const handleClick = () => {
    setSelectedFood(title);
  };

  return (
    <Tooltip
      title={title}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: "#222",
            color: "#fff",
            fontFamily: "Galmuri11",
            fontSize: {
              sm: "0.625rem",
              md: "0.625rem",
              lg: "0.75rem",
              xl: "0.75rem",
            },
            border: "2px solid black",
          },
        },
        arrow: {
          sx: {
            color: "#222",
          },
        },
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -8],
              },
            },
          ],
        },
      }}
    >
      <FoodItemRoot onClick={handleClick} selected={selectedFood === title}>
        {children}
      </FoodItemRoot>
    </Tooltip>
  );
};

const FoodItemRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ theme, selected }) => ({
  position: "relative",
  padding: "0.625rem",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "filter 0.2s ease",
  filter: selected ? "saturate(1)" : "saturate(0.2)",

  "&:hover": {
    filter: "saturate(1)",
  },

  [theme.breakpoints.down("md")]: {
    padding: "0.4rem",
  },
}));
const FoodImage = styled(Box)<BoxProps<"img">>(({ theme }) => ({
  width: "2.625rem",
}));

const FoodInfoContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "90%",
  maxWidth: "80rem",
  minWidth: "35rem",
  backgroundColor: "#f5f5f5",
  border: "3px solid #222",
  boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
  marginTop: "3rem",
  padding: "1.625rem 2rem",
  position: "relative",
});

const RecipeHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1rem",
  padding: "0 1rem 1.625rem 1rem",
  borderBottom: "2px dashed #999",

  [theme.breakpoints.down("lg")]: {
    alignItems: "start",
    flexDirection: "column",
  },
}));

const FoodTitle = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "1.875rem",
  fontWeight: "700",
  color: "#222",
  wordBreak: "keep-all",
  letterSpacing: -1.5,
});

const RarityBadge = styled(Box)<{ rarity: string }>(({ rarity }) => {
  const colors = {
    common: { bg: "#e9a640", border: "#f8d660", shadow: "#e6712f" },
    normal: { bg: "#5bc064", border: "#a8dc55", shadow: "#4e885c" },
    rare: { bg: "#4195d5", border: "#5fc8e8", shadow: "#3165c3" },
    epic: { bg: "#d72513", border: "#f2532a", shadow: "#a01931" },
  };

  const color = colors[rarity as keyof typeof colors] || colors.common;

  return {
    padding: "0.325rem 0.875rem",
    backgroundColor: color.bg,
    border: `3px solid ${color.border}`,
    color: "white",
    fontFamily: "Galmuri11",
    fontSize: "0.875rem",
    fontWeight: "700",
    textShadow: `2px 0 0 ${color.shadow}`,
    textTransform: "uppercase",
  };
});

const FoodPrice = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "1.15rem",
  fontWeight: "700",
  color: "#4c4c4cff",
});

const PriceChange = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  fontFamily: "Galmuri11",
});

type PriceDirection = "up" | "down" | "same";

const getPriceDirection = (
  data: { date: string; price: number }[],
): PriceDirection => {
  const last = data[data.length - 1].price;
  const prev = data[data.length - 2].price;

  if (last > prev) return "up";
  if (last < prev) return "down";
  return "same";
};

const getPriceChangeColor = (direction: PriceDirection): string => {
  if (direction === "up") return "#d32f2f";
  if (direction === "down") return "#1976d2";
  return "#3c3c3cff";
};

const CookingPage = () => {
  const selectedFood = useFoodStore((state) => state.selectedFood);
  const recipe = RECIPES[selectedFood as keyof typeof RECIPES];
  const min = FoodFixedRange[selectedFood].min;
  const max = FoodFixedRange[selectedFood].max;

  const allData = FoodPriceData[selectedFood as keyof typeof FoodPriceData];

  const currentPrice = allData[allData.length - 1].price;
  const priceGap =
    allData[allData.length - 1].price - allData[allData.length - 2].price;

  const direction = getPriceDirection(allData);
  const priceChangeColor = getPriceChangeColor(direction);

  return (
    <CookingContainer>
      <CookingTitle>요리 리딩방</CookingTitle>
      <CookingSubtitle>요리 재료 가격 분석 및 미래 가격 예측</CookingSubtitle>
      <CookingDescription>
        요리별 재료 조합을 확인하고, 요리 가격 흐름을 예측해보세요
      </CookingDescription>
      <CookingDescription
        sx={{ fontSize: "0.75rem", marginBlock: "0.5rem 3rem" }}
      >
        ( 요리 가격은 1, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30일 오전 3시에
        변동돼요.)
      </CookingDescription>
      <FoodContainer>
        <FoodRow>
          <FoodSelectTabs>
            <CommonFoodBadge>COMMON</CommonFoodBadge>
            <FoodBox>
              <FoodItem title="토마토 스파게티">
                <FoodImage component={"img"} src={TomatoSpaghetti} />
              </FoodItem>
              <FoodItem title="어니언 링">
                <FoodImage component={"img"} src={OnionRings} />
              </FoodItem>
              <FoodItem title="갈릭 케이크">
                <FoodImage component={"img"} src={GarlicCake} />
              </FoodItem>
            </FoodBox>
          </FoodSelectTabs>

          <FoodSelectTabs>
            <NormalFoodBadge>NORMAL</NormalFoodBadge>
            <FoodBox>
              <FoodItem title="삼겹살 토마토 찌개">
                <FoodImage component={"img"} src={PorkBellyTomatoStew} />
              </FoodItem>

              <FoodItem title="삼색 아이스크림">
                <FoodImage component={"img"} src={TripleFlavorIceCream} />
              </FoodItem>

              <FoodItem title="마늘 양갈비 핫도그">
                <FoodImage component={"img"} src={GarlicLambRibHotDog} />
              </FoodItem>

              <FoodItem title="달콤 시리얼">
                <FoodImage component={"img"} src={SweetCereals} />
              </FoodItem>

              <FoodItem title="로스트 치킨 파이">
                <FoodImage component={"img"} src={RoastChickenPie} />
              </FoodItem>
            </FoodBox>
          </FoodSelectTabs>

          <FoodSelectTabs>
            <RareFoodBadge>RARE</RareFoodBadge>
            <FoodBox>
              <FoodItem title="스윗 치킨 햄버거">
                <FoodImage component={"img"} src={SweetChickenHamburger} />
              </FoodItem>

              <FoodItem title="토마토 파인애플 피자">
                <FoodImage component={"img"} src={TomatoPineApplePizza} />
              </FoodItem>

              <FoodItem title="양파 수프">
                <FoodImage component={"img"} src={OnionSoup} />
              </FoodItem>

              <FoodItem title="허브 삼겹살 찜">
                <FoodImage component={"img"} src={PorkBellySteamedWithHerbs} />
              </FoodItem>
            </FoodBox>
          </FoodSelectTabs>

          <FoodSelectTabs>
            <EpicFoodBadge>EPIC</EpicFoodBadge>
            <FoodBox>
              <FoodItem title="토마토 라자냐">
                <FoodImage component={"img"} src={TomatoLasagna} />
              </FoodItem>
              <FoodItem title="딥 크림 빠네">
                <FoodImage component={"img"} src={DeepCreamPane} />
              </FoodItem>
              <FoodItem title="트리플 소갈비 꼬치">
                <FoodImage component={"img"} src={TripleBeefRibSkewers} />
              </FoodItem>
            </FoodBox>
          </FoodSelectTabs>
        </FoodRow>
      </FoodContainer>
      <FoodInfoContainer>
        <RecipeHeader>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: { sm: "1rem", md: "1rem", lg: 0 },
              width: "fit-content",
            }}
          >
            <RarityBadge rarity={recipe.rarity}>{recipe.rarity}</RarityBadge>
            <FoodTitle>{selectedFood}</FoodTitle>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "0.5rem",
              }}
            >
              <FoodPrice>{currentPrice.toLocaleString()}G</FoodPrice>
              <PriceChange
                sx={{
                  color: priceChangeColor,
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: "0.7rem",
                    color: "#666",
                    fontFamily: "Galmuri11",
                    wordBreak: "keep-all",
                  }}
                >
                  직전 대비
                </Typography>

                <Typography
                  sx={{
                    color: priceChangeColor,
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.7rem",
                    fontFamily: "Galmuri11",
                  }}
                >
                  {direction === "up" && "▲"}
                  {direction === "down" && "▼"}
                  {direction === "same" && "―"}
                  {direction !== "same" && (priceGap > 0 ? "+" : "")}
                  {Math.abs(priceGap).toLocaleString()}G
                </Typography>
              </PriceChange>
            </Box>
          </Box>
          <FoodRecipe />
        </RecipeHeader>
        <FoodPriceChart />
      </FoodInfoContainer>
    </CookingContainer>
  );
};

export default CookingPage;
