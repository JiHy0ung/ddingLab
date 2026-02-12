import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
import {
  FoodFixedRange,
  FoodPriceData,
} from "../../../constants/foodPriceData";
import { useFoodStore } from "../../../stores/foodStore";
import { styled } from "@mui/material/styles";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Skeleton,
} from "@mui/material";
import { RotateCw } from "lucide-react";
import { skillBonuses } from "../../../constants/skillBonuses";
import { calculateSkillPrice } from "../../../utils/skillPrice";
import { useSkillStore } from "../../../stores/skillStore";
import { getFoodPriceRecords } from "../../../services/foodService";
import { useFoodData } from "../../../hooks/useFoodData";

// 주간/월간 데이터 필터링
const filterDataByPeriod = (data, period, selectedYear?, selectedMonth?) => {
  if (period === "all") return data;

  if (period === "month" && selectedYear && selectedMonth) {
    // 특정 년월의 데이터만 필터링
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === selectedYear &&
        itemDate.getMonth() + 1 === selectedMonth
      );
    });
  }

  return data;
};

// 사용 가능한 년도/월 추출
const getAvailableYearsAndMonths = (data) => {
  const yearsSet = new Set<number>();
  const monthsMap = new Map<number, Set<number>>();

  data.forEach((item) => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    yearsSet.add(year);

    if (!monthsMap.has(year)) {
      monthsMap.set(year, new Set());
    }
    monthsMap.get(year)!.add(month);
  });

  return {
    years: Array.from(yearsSet).sort((a, b) => b - a), // 최신 년도부터
    monthsMap,
  };
};

// 최고가/최저가 계산 함수
const getPriceStats = (data) => {
  if (data.length === 0)
    return { maxPrice: 0, minPrice: 0, maxDate: "", minDate: "" };

  const prices = data.map((d) => d.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const maxDate = data.find((d) => d.price === maxPrice)?.date;
  const minDate = data.find((d) => d.price === minPrice)?.date;

  return { maxPrice, minPrice, maxDate, minDate };
};

// 상승/하향 계산 함수
const isUp = (data: { date: string; price: number }[]): string => {
  const lastPrice = data[data.length - 1].price;
  const prevPrice = data[data.length - 2].price;

  if (lastPrice > prevPrice) {
    return "#d32f2f";
  } else if (lastPrice < prevPrice) {
    return "#1976d2";
  } else return "#3c3c3cff";
};

// 날짜 포맷 함수
const formatDate = (dateStr) => {
  const [, month, day] = dateStr.split("-");
  return `${parseInt(month)}/${parseInt(day)}`;
};

const PriceChartContainer = styled(Box)({
  width: "100%",
  padding: "20px",
  fontFamily: "Galmuri11, monospace",
});

const ControlPanelContainer = styled(Box)(({ theme }) => ({
  marginBottom: "20px",
  display: "flex",
  gap: "5rem",
  alignItems: "end",
  flexWrap: "wrap",

  [theme.breakpoints.down("lg")]: {
    gap: "1rem",
  },
}));

const SkillsContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
});

const SkillsBox = styled(Box)({});

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

const DateDropDown = styled(FormControl)({
  minWidth: "7rem",
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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  "& .MuiToggleButtonGroup-grouped": {
    border: "2px solid black",
    borderRadius: 0,
    fontFamily: "Galmuri11, monospace",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "8px 16px",
    backgroundColor: "white",
    "&.Mui-selected": {
      backgroundColor: "black",
      color: "white",
      "&:hover": {
        backgroundColor: "black",
      },
    },
    "&:not(:first-of-type)": {
      borderLeft: "none",
    },
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
});

const ChartWrapper = styled("div")({
  "& .recharts-layer.recharts-brush-texts text": {
    fontWeight: "600",
    fontSize: "10px !important",
    fontFamily: "Galmuri11, monospace !important",
  },
  "& *:focus": {
    outline: "none",
  },
  "& svg": {
    outline: "none",
  },
});

const ChartContainer = styled("div")<{ isScrollable: boolean }>(
  ({ isScrollable }) => ({
    backgroundColor: "white",
    padding: "1rem",
    border: "0.1rem solid black",
    overflowX: isScrollable ? "auto" : "hidden",
    transition: "all 0.3s ease",
    "&::-webkit-scrollbar": {
      height: "1.875rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#ffffffff",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#e9e9e9ff",
      border: "0.5rem solid #ffffff",
      "&:hover": {
        backgroundColor: "#aaaaaaff",
        cursor: "pointer",
      },
    },
  }),
);

const FoodChartSkeleton = styled(Skeleton)({
  width: "100%",
  height: "435px",
});
const CookingPriceChart = () => {
  const selectedFood = useFoodStore((state) => state.selectedFood);

  const { data: foodData, isLoading, error } = useFoodData(selectedFood);

  const allData = foodData?.prices || [];

  console.log("selectedFood:", selectedFood);
  console.log("foodData:", foodData);
  console.log("isLoading:", isLoading);
  console.log("error:", error);

  const {
    moneyMakingLv,
    fullPotLv,
    setMoneyMakingLv,
    setFullPotLv,
    resetSkills,
  } = useSkillStore();

  const [period, setPeriod] = useState("month");

  // 사용 가능한 년도/월 계산
  const { years, monthsMap } = getAvailableYearsAndMonths(allData);

  // 현재 날짜 기준 초기값 설정
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

  // 선택된 년도에 해당하는 월 목록
  const availableMonths = monthsMap.get(selectedYear) || new Set();

  const filteredData = filterDataByPeriod(
    allData,
    period,
    selectedYear,
    selectedMonth,
  );

  // 스킬 적용 데이터
  const hasSkill = moneyMakingLv > 0 || fullPotLv > 0;

  const data = filteredData.map((item) => ({
    ...item,
    basePrice: item.price,
    price: calculateSkillPrice(item.price, moneyMakingLv, fullPotLv),
  }));

  const stats = getPriceStats(data);
  const allStats = getPriceStats(
    allData.map((item) => ({
      ...item,
      price: calculateSkillPrice(item.price, moneyMakingLv, fullPotLv),
    })),
  );

  const skillShopRange = {
    min: calculateSkillPrice(allStats.minPrice, moneyMakingLv, fullPotLv),
    max: calculateSkillPrice(allStats.maxPrice, moneyMakingLv, fullPotLv),
  };

  const yAxisDomain =
    data.length > 0
      ? [
          skillShopRange.min,
          Math.ceil(Math.max(stats.maxPrice, skillShopRange.max) * 1.05),
        ]
      : [0, 100];

  const lineColor = data.length > 1 ? isUp(data) : "#3c3c3cff";

  // 년도 변경 시 해당 년도의 첫 번째 월로 자동 설정
  useEffect(() => {
    const months = Array.from(availableMonths).sort((a, b) => b - a);
    if (months.length > 0 && !availableMonths.has(selectedMonth)) {
      setSelectedMonth(months[0]);
    }
  }, [selectedYear]);

  if (error) {
    return <Box>에러 발생</Box>;
  }

  return (
    <PriceChartContainer>
      <ControlPanelContainer>
        <SkillsContainer>
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              fontFamily: "Galmuri11, monospace",
              letterSpacing: -1.5,
              wordBreak: "keep-all",
            }}
          >
            전문가 스킬:
          </Typography>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <SkillsBox>
              <SkillDropDown>
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
                  sx={{
                    fontFamily: "Galmuri11, monospace",
                    fontSize: "14px",
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
            </SkillsBox>

            <SkillsBox>
              <SkillDropDown>
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
                  sx={{
                    fontFamily: "Galmuri11, monospace",
                    fontSize: "14px",
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
            </SkillsBox>
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

        {/* 기간 선택 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              fontFamily: "Galmuri11, monospace",
              letterSpacing: -1.5,
            }}
          >
            기간:
          </Typography>
          <StyledToggleButtonGroup
            value={period}
            exclusive
            onChange={(e, newPeriod) => {
              if (newPeriod !== null) setPeriod(newPeriod);
            }}
          >
            <ToggleButton value="all">전체</ToggleButton>
            <ToggleButton value="month">월간</ToggleButton>
          </StyledToggleButtonGroup>

          {/* 월간 선택 시 년도/월 선택 */}
          {period === "month" && (
            <>
              <DateDropDown>
                <InputLabel id="year-label">년도</InputLabel>
                <Select
                  labelId="year-label"
                  value={selectedYear}
                  label="년도"
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
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
                  sx={{
                    fontFamily: "Galmuri11, monospace",
                    fontSize: "14px",
                  }}
                >
                  {years.map((year) => (
                    <MenuItem
                      key={year}
                      value={year}
                      sx={{
                        fontFamily: "Galmuri11, monospace",
                        fontSize: "0.8rem",
                      }}
                    >
                      {year}년
                    </MenuItem>
                  ))}
                </Select>
              </DateDropDown>

              <DateDropDown>
                <InputLabel id="month-label">월</InputLabel>
                <Select
                  labelId="month-label"
                  value={selectedMonth}
                  label="월"
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
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
                  sx={{
                    fontFamily: "Galmuri11, monospace",
                    fontSize: "14px",
                  }}
                >
                  {Array.from(availableMonths)
                    .sort((a, b) => b - a)
                    .map((month) => (
                      <MenuItem
                        key={month}
                        value={month}
                        sx={{
                          fontFamily: "Galmuri11, monospace",
                          fontSize: "0.8rem",
                        }}
                      >
                        {month}월
                      </MenuItem>
                    ))}
                </Select>
              </DateDropDown>
            </>
          )}
        </Box>
      </ControlPanelContainer>

      {/* 차트 */}
      {isLoading ? (
        <FoodChartSkeleton variant="rectangular" />
      ) : (
        <ChartContainer isScrollable={period === "all"}>
          <ChartWrapper>
            {data.length > 0 ? (
              <ResponsiveContainer
                width={
                  period === "all" ? Math.max(data.length * 60, 1200) : "100%"
                }
                height={400}
              >
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="1 2" stroke="#e4e4e4ff" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    style={{ fontSize: "12px" }}
                    tickMargin={10}
                  />
                  <YAxis
                    domain={yAxisDomain}
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => `${value.toLocaleString()}G`}
                    tickMargin={5}
                  />
                  <Tooltip
                    formatter={(value, name, props) => {
                      const { payload } = props;
                      const basePrice = payload.basePrice;
                      const skillPrice = payload.price;

                      if (hasSkill) {
                        return [
                          <Box key="tooltip">
                            <Typography
                              sx={{
                                fontFamily: "Galmuri11, monospace",
                                fontSize: "0.75rem",
                              }}
                            >
                              기본가: {basePrice.toLocaleString()}G
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Galmuri11, monospace",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                              }}
                            >
                              스킬 적용가: {skillPrice.toLocaleString()}G
                            </Typography>
                          </Box>,
                        ];
                      }

                      return [`${skillPrice.toLocaleString()}G`, "가격"];
                    }}
                    labelFormatter={(label) => formatDate(label)}
                    labelStyle={{
                      fontSize: "0.875rem",
                      color: "#2f2f2fff",
                      fontWeight: "600",
                    }}
                    contentStyle={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "0.25rem",
                      padding: "0.5rem 0.625rem",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1.5px solid #000000",
                      borderRadius: "0.1rem",
                      fontSize: "0.75rem",
                      fontFamily: "Galmuri11, monospace",
                    }}
                  />

                  <ReferenceLine
                    y={skillShopRange.max}
                    stroke="#3b3b3bff"
                    strokeDasharray="5 3"
                    strokeWidth={1.5}
                  >
                    <Label
                      value={`역대 최고가 ${skillShopRange.max.toLocaleString()}G`}
                      position="insideTopRight"
                      fill="#3b3b3bff"
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    />
                  </ReferenceLine>

                  <ReferenceLine
                    y={skillShopRange.min}
                    stroke="#3b3b3bff"
                    strokeDasharray="5 3"
                    strokeWidth={1.5}
                  >
                    <Label
                      value={`역대 최저가 ${skillShopRange.min.toLocaleString()}G`}
                      position="insideBottomRight"
                      fill="#3b3b3bff"
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    />
                  </ReferenceLine>

                  <Line
                    type="linear"
                    stroke={lineColor}
                    dataKey="price"
                    fill={lineColor}
                    dot={{ fill: lineColor, r: 0 }}
                    strokeWidth={2}
                    activeDot={{
                      r: 6,
                      style: { cursor: "pointer" },
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div
                style={{
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontSize: "16px",
                }}
              >
                선택한 기간에 데이터가 없습니다
              </div>
            )}
          </ChartWrapper>
        </ChartContainer>
      )}
    </PriceChartContainer>
  );
};

export default CookingPriceChart;
