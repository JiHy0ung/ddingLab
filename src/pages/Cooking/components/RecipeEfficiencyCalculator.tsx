import { Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { RECIPES } from "../../../constants/foodRecipeData";
import { calculateEfficiency } from "../../../utils/recipeEfficiency";

// 이미지 import
import TomatoSpaghetti from "../../../assets/food/common/tomato_spaghetti.png";
import OnionRings from "../../../assets/food/common/onion_rings.png";
import GarlicCake from "../../../assets/food/common/garlic_cake.png";
import PorkBellyTomatoStew from "../../../assets/food/normal/pork_belly_tomato_stew.png";
import TripleFlavorIceCream from "../../../assets/food/normal/triple_flavor_ice_cream.png";
import GarlicLambRibHotDog from "../../../assets/food/normal/garlic_lamb_rib_hotdog.png";
import SweetCereals from "../../../assets/food/normal/sweet_cereals.png";
import RoastChickenPie from "../../../assets/food/normal/roast_chicken_pie.png";
import SweetChickenHamburger from "../../../assets/food/rare/sweet_chicken_hamburger.png";
import TomatoPineApplePizza from "../../../assets/food/rare/tomato_pineapple_pizza.png";
import OnionSoup from "../../../assets/food/rare/onion_soup.png";
import PorkBellySteamedWithHerbs from "../../../assets/food/rare/pork_belly_steamed_with_herbs.png";
import TomatoLasagna from "../../../assets/food/epic/tomato_lasagna.png";
import DeepCreamPane from "../../../assets/food/epic/deep_cream_pane.png";
import TripleBeefRibSkewers from "../../../assets/food/epic/triple_beef_rib_skewers.png";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import { RotateCw } from "lucide-react";
import { skillBonuses } from "../../../constants/skillBonuses";
import { calculateSkillPrice } from "../../../utils/skillPrice";
import { useSkillStore } from "../../../stores/skillStore";

const CalculatorContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingBlock: "3rem",
  width: "100%",
});

const CalculatorTitle = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "3rem",
  fontWeight: "900",
  marginBottom: "1rem",
});

const ControlPanel = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const ControlsContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  flexWrap: "wrap",
});

const SortButton = styled(Button)<{ active?: boolean }>(({ active }) => ({
  fontFamily: "Galmuri11",
  fontSize: "0.875rem",
  padding: "0.5rem 1rem",
  backgroundColor: active ? "#222" : "white",
  color: active ? "white" : "#222",
  border: "2px solid #222",
  borderRadius: 0,
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",

  "&:hover": {
    backgroundColor: active ? "#333" : "#f5f5f5",
  },
}));

const SkillsContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
});

const SkillDropDown = styled(FormControl)({
  minWidth: "10rem",
  backgroundColor: "white",

  "& .MuiOutlinedInput-root": {
    height: "2.875rem",
    fontFamily: "Galmuri11, monospace",
    fontSize: "0.8rem",
    "& fieldset": {
      borderColor: "black",
      borderWidth: "2px",
      borderRadius: "0",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
      color: "black",
    },
  },
  "& .MuiInputLabel-root": {
    color: "black",
    fontFamily: "Galmuri11, monospace",
    fontWeight: "bold",
    backgroundColor: "white",
    borderRadius: "0.1rem",
    paddingRight: "4px",
    "&.Mui-focused": {
      color: "black",
    },
  },
});

const TableContainer = styled(Box)({
  width: "90%",
  maxWidth: "80rem",
  backgroundColor: "#f5f5f5",
  border: "3px solid #222",
  boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
  marginTop: "2rem",
  overflowX: "auto",
});

const TableHeader = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1.2fr 1.2fr",
  backgroundColor: "#222",
  color: "white",
  fontFamily: "Galmuri11",
  fontSize: "1rem",
  fontWeight: "700",
  padding: "1rem",
  textAlign: "center",
  borderBottom: "2px solid #000",
});

const TableRow = styled(Box)<{ isEven?: boolean }>(({ isEven }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1.2fr 1.2fr",
  alignItems: "center",
  padding: "0.75rem 1rem",
  backgroundColor: isEven ? "#fff" : "#f5f5f5",
  borderBottom: "1px solid #ddd",

  "&:hover": {
    backgroundColor: "#e8e8e8",
  },
}));

const FoodNameCell = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const FoodImage = styled("img")({
  width: "2.5rem",
  height: "2.5rem",
});

const FoodName = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "1rem",
  fontWeight: "600",
  color: "#222",
  letterSpacing: -1.3,
  wordBreak: "keep-all",
});

const CostText = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "0.875rem",
  fontWeight: "600",
  color: "#666",
  textAlign: "center",
});

const PriceInput = styled(TextField)({
  maxWidth: "8rem",
  "& .MuiOutlinedInput-root": {
    fontFamily: "Galmuri11",
    backgroundColor: "white",
    border: "2px solid #222",
    borderRadius: 0,
    fontSize: "0.875rem",

    "& fieldset": {
      border: "none",
    },

    "&:hover": {
      borderColor: "#444",
    },

    "&.Mui-focused": {
      borderColor: "#000",
      boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.3)",
    },
  },

  "& input": {
    fontSize: "0.875rem",
    padding: "0.3rem",
    textAlign: "center",
    fontFamily: "Galmuri11",
  },

  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
});

const ProfitText = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "0.875rem",
  fontWeight: "700",
  textAlign: "center",
});

const ProfitRateText = styled(Typography)<{ isNegative?: boolean }>(
  ({ isNegative }) => ({
    fontFamily: "Galmuri11",
    fontSize: "0.95rem",
    fontWeight: "700",
    color: isNegative ? "#1976d2" : "#d32f2f",
    textAlign: "center",
  }),
);

const foodImages: Record<string, string> = {
  "토마토 스파게티": TomatoSpaghetti,
  "어니언 링": OnionRings,
  "갈릭 케이크": GarlicCake,
  "삼겹살 토마토 찌개": PorkBellyTomatoStew,
  "삼색 아이스크림": TripleFlavorIceCream,
  "마늘 양갈비 핫도그": GarlicLambRibHotDog,
  "달콤 시리얼": SweetCereals,
  "로스트 치킨 파이": RoastChickenPie,
  "스윗 치킨 햄버거": SweetChickenHamburger,
  "토마토 파인애플 피자": TomatoPineApplePizza,
  "양파 수프": OnionSoup,
  "허브 삼겹살 찜": PorkBellySteamedWithHerbs,
  "토마토 라자냐": TomatoLasagna,
  "딥 크림 빠네": DeepCreamPane,
  "트리플 소갈비 꼬치": TripleBeefRibSkewers,
};

type SortType = "default" | "profitRate" | "profit";

const RecipeEfficiencyCalculator = () => {
  const {
    moneyMakingLv,
    fullPotLv,
    setMoneyMakingLv,
    setFullPotLv,
    resetSkills,
  } = useSkillStore();

  // localStorage에서 가격 불러오기
  const [prices, setPrices] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("foodPrices");
    return saved ? JSON.parse(saved) : {};
  });

  const [sortType, setSortType] = useState<SortType>("default");

  // 가격 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("foodPrices", JSON.stringify(prices));
  }, [prices]);

  const handlePriceChange = (foodName: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setPrices((prev) => ({
      ...prev,
      [foodName]: numValue,
    }));
  };

  const foodList = Object.keys(RECIPES);

  const sortedFoodList = [...foodList].sort((a, b) => {
    const priceA = calculateSkillPrice(
      prices[a] || 0,
      moneyMakingLv,
      fullPotLv,
    );
    const priceB = calculateSkillPrice(
      prices[b] || 0,
      moneyMakingLv,
      fullPotLv,
    );

    const efficiencyA = calculateEfficiency(
      RECIPES[a as keyof typeof RECIPES],
      priceA,
    );
    const efficiencyB = calculateEfficiency(
      RECIPES[b as keyof typeof RECIPES],
      priceB,
    );

    if (sortType === "profitRate") {
      // 가격이 입력되지 않은 항목은 맨 뒤로
      if (!prices[a] && prices[b]) return 1;
      if (prices[a] && !prices[b]) return -1;
      if (!prices[a] && !prices[b]) return 0;

      return efficiencyB.efficiency - efficiencyA.efficiency;
    }

    if (sortType === "profit") {
      // 가격이 입력되지 않은 항목은 맨 뒤로
      if (!prices[a] && prices[b]) return 1;
      if (prices[a] && !prices[b]) return -1;
      if (!prices[a] && !prices[b]) return 0;

      return efficiencyB.profit - efficiencyA.profit;
    }

    return 0; // 기본 순
  });

  const hasSkill = moneyMakingLv > 0 || fullPotLv > 0;

  return (
    <CalculatorContainer>
      <CalculatorTitle>요리 효율 계산기</CalculatorTitle>
      <Typography
        sx={{
          fontFamily: "Galmuri11",
          fontSize: "1rem",
          color: "#666",
          marginBottom: "2rem",
        }}
      >
        현재 판매 가격을 입력하여 각 요리의 순이익을 계산해보세요
      </Typography>

      <ControlPanel>
        <SkillsContainer>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <SkillDropDown size="small">
              <InputLabel id="money-making-label">돈 좀 벌어볼까?</InputLabel>
              <Select
                labelId="money-making-label"
                value={moneyMakingLv}
                label="돈 좀 벌어볼까?"
                onChange={(e) => setMoneyMakingLv(Number(e.target.value))}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root.Mui-selected": {
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                        },
                      },
                    },
                  },
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lv) => (
                  <MenuItem
                    key={lv}
                    value={lv}
                    sx={{
                      fontFamily: "Galmuri11, monospace",
                      fontSize: "0.8rem",
                    }}
                  >
                    LV {lv}{" "}
                    {lv > 0
                      ? `(+${(skillBonuses.moneyMaking[lv] * 100).toFixed(0)}%)`
                      : ""}
                  </MenuItem>
                ))}
              </Select>
            </SkillDropDown>

            <SkillDropDown size="small">
              <InputLabel id="full-pot-label">한 솥 가득</InputLabel>
              <Select
                labelId="full-pot-label"
                value={fullPotLv}
                label="한 솥 가득"
                onChange={(e) => setFullPotLv(Number(e.target.value))}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root.Mui-selected": {
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                        },
                      },
                    },
                  },
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((lv) => (
                  <MenuItem
                    key={lv}
                    value={lv}
                    sx={{
                      fontFamily: "Galmuri11, monospace",
                      fontSize: "0.8rem",
                    }}
                  >
                    LV {lv}{" "}
                    {lv > 0
                      ? `(+${(skillBonuses.fullPot[lv] * 100).toFixed(0)}%)`
                      : ""}
                  </MenuItem>
                ))}
              </Select>
            </SkillDropDown>

            <IconButton
              onClick={resetSkills}
              sx={{
                width: "3rem",
                height: "3rem",
                color: "black",
                transition: "all 0.4s ease",
                "&:hover": {
                  color: "#5781ffff",
                  transform: "rotate(135deg)",
                },
              }}
            >
              <RotateCw strokeWidth={2.5} />
            </IconButton>
          </Box>
        </SkillsContainer>

        <ControlsContainer>
          <Typography
            sx={{
              fontFamily: "Galmuri11",
              fontSize: "0.875rem",
              color: "#666",
            }}
          >
            정렬:
          </Typography>
          <SortButton
            active={sortType === "default"}
            onClick={() => setSortType("default")}
          >
            기본 순
          </SortButton>
          <SortButton
            active={sortType === "profit"}
            onClick={() => setSortType("profit")}
          >
            순이익 높은 순
          </SortButton>
          <SortButton
            active={sortType === "profitRate"}
            onClick={() => setSortType("profitRate")}
          >
            순이익률 높은 순
          </SortButton>
        </ControlsContainer>
      </ControlPanel>

      <TableContainer>
        <TableHeader>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            요리
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            원재료비
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            현재 판매
            <IconButton
              onClick={() => {
                setPrices({});
                localStorage.removeItem("foodPrices");
              }}
              sx={{
                width: "2rem",
                height: "2rem",
                color: "white",
                transition: "all 0.4s ease",
                "&:hover": {
                  color: "rgb(207, 207, 207)",
                  transform: "rotate(135deg)",
                },
              }}
            >
              <RotateCw strokeWidth={3} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            순이익
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            순이익률
          </Box>
        </TableHeader>

        {sortedFoodList.map((foodName, index) => {
          const recipe = RECIPES[foodName as keyof typeof RECIPES];
          const basePrice = prices[foodName] || 0;
          const currentPrice = calculateSkillPrice(
            basePrice,
            moneyMakingLv,
            fullPotLv,
          );
          const efficiency = calculateEfficiency(recipe, currentPrice);

          return (
            <TableRow key={foodName} isEven={index % 2 === 0}>
              <FoodNameCell>
                <FoodImage src={foodImages[foodName]} alt={foodName} />
                <FoodName>{foodName}</FoodName>
              </FoodNameCell>

              <CostText>
                {Math.round(efficiency.cost).toLocaleString()}G
              </CostText>

              <Box sx={{ textAlign: "center" }}>
                <PriceInput
                  type="number"
                  value={basePrice || ""}
                  onChange={(e) => handlePriceChange(foodName, e.target.value)}
                  placeholder="가격 입력"
                  size="small"
                />
                {hasSkill && basePrice > 0 && (
                  <Typography
                    sx={{
                      display: "felx",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: "Galmuri11",
                      fontSize: "0.75rem",
                      color: "#4d0095",
                      marginTop: "0.25rem",
                      fontWeight: "700",
                      letterSpacing: -0.5,
                    }}
                  >
                    <span style={{ fontSize: "0.75rem" }}>스킬 적용가:</span>{" "}
                    {currentPrice.toLocaleString()}G
                  </Typography>
                )}
              </Box>

              <ProfitText>
                {basePrice > 0
                  ? `${efficiency.profit >= 0 ? "+" : ""}${Math.round(efficiency.profit).toLocaleString()}G`
                  : "-"}
              </ProfitText>

              <ProfitRateText isNegative={efficiency.efficiency < 87}>
                {basePrice > 0
                  ? `${efficiency.efficiency >= 0 ? "+" : ""}${efficiency.efficiency}%`
                  : "-"}
              </ProfitRateText>
            </TableRow>
          );
        })}
      </TableContainer>
    </CalculatorContainer>
  );
};

export default RecipeEfficiencyCalculator;
