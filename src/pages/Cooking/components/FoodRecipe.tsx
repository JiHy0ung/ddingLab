import { styled } from "@mui/material/styles";
import { Box, BoxProps, Tooltip, Typography } from "@mui/material";
import { useFoodStore } from "../../../stores/foodStore";
import { RECIPES } from "../../../constants/foodRecipeData";
import React from "react";

interface RecipeItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const RecipeContainer = styled(Box)({
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const RecipeBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "60rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "2rem",
  [theme.breakpoints.down("md")]: {
    gap: "1rem",
  },
}));

const RecipeItemBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  flexWrap: "wrap",
});

const RecipeImg = styled(Box)<BoxProps<"img">>({
  display: "flex",
  width: "1.625rem",
  height: "1.625rem",
});

const RecipeCount = styled(Typography)({
  position: "absolute",
  pointerEvents: "none",
  fontFamily: "Galmuri11",
  fontWeight: "700",
  color: "white",
  WebkitTextStroke: "1px black",
  fontSize: "0.825rem",
  textShadow: "1.3px 1.3px 0px rgba(0, 0, 0, 1)",
  right: "3px",
  bottom: "3px",
});

const RecipeOperator = styled(Typography)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Galmuri11",
  fontWeight: "700",
  fontSize: "1rem",
});

const RecipeItemRoot = styled(Box)({
  position: "relative",
  padding: "0.4rem",
  backgroundColor: "#ffffff",
  borderRadius: "0.5rem",
  border: "1.5px solid black",
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const RecipeItem = ({ title, children }: RecipeItemProps) => {
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
            fontSize: "0.625rem",
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
      <RecipeItemRoot>{children}</RecipeItemRoot>
    </Tooltip>
  );
};

const EmptyState = styled(Box)({
  padding: "3rem",
  textAlign: "center",
});

const EmptyText = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "1.2rem",
  color: "#999",
});

const FoodRecipe = () => {
  const selectedFood = useFoodStore((state) => state.selectedFood);

  if (!selectedFood) {
    return (
      <RecipeContainer>
        <EmptyState>
          <EmptyText>🍳 음식을 선택하면 레시피가 표시됩니다</EmptyText>
        </EmptyState>
      </RecipeContainer>
    );
  }

  const recipe = RECIPES[selectedFood];

  if (!recipe) {
    return (
      <RecipeContainer>
        <EmptyState>
          <EmptyText>레시피 정보를 찾을 수 없습니다</EmptyText>
        </EmptyState>
      </RecipeContainer>
    );
  }

  return (
    <RecipeContainer>
      <RecipeBox>
        <RecipeItemBox>
          {recipe.ingredients.map((ingredient, index) => (
            <React.Fragment key={ingredient.name}>
              <RecipeItem title={`${ingredient.name} ${ingredient.amount}개`}>
                <RecipeImg component="img" src={ingredient.image} />
                <RecipeCount>{ingredient.amount}</RecipeCount>
              </RecipeItem>

              {index < recipe.ingredients.length - 1 && (
                <RecipeOperator>+</RecipeOperator>
              )}
            </React.Fragment>
          ))}
        </RecipeItemBox>
      </RecipeBox>
    </RecipeContainer>
  );
};

export default FoodRecipe;
