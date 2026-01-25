import { styled } from "@mui/material/styles";
import { Box, BoxProps, Tooltip, Typography } from "@mui/material";
import lowEnrichments from "../../../assets/enrichments/low_enrichments.png";
import middleEnrichments from "../../../assets/enrichments/middle_enrichments.png";
import highEnrichments from "../../../assets/enrichments/high_enrichments.png";
import AmethystBlock from "../../../assets/enrichments/ingredients/AmethystBlock.png";
import CobbleStoneBundle from "../../../assets/enrichments/ingredients/CobbleStoneBundle.png";
import DeepslateStoneBundle from "../../../assets/enrichments/ingredients/DeepslateStoneBundle.png";
import CooperBlock from "../../../assets/enrichments/ingredients/CooperBlock.png";
import IronBlock from "../../../assets/enrichments/ingredients/IronBlock.png";
import GoldBlock from "../../../assets/enrichments/ingredients/GoldBlock.png";
import LapisLazuliBlock from "../../../assets/enrichments/ingredients/LapisLazuliBlock.png";
import RedStoneBlock from "../../../assets/enrichments/ingredients/RedStoneBlock.png";
import DiamondBlock from "../../../assets/enrichments/ingredients/DiamondBlock.png";
import Corum from "../../../assets/enrichments/ingredients/Corum.png";
import Lifton from "../../../assets/enrichments/ingredients/Lifton.png";
import Serent from "../../../assets/enrichments/ingredients/Serent.png";

interface EnrichmentsItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const EnrichmentsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2.5rem",
});

const EnrichmentsBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "2rem",
  [theme.breakpoints.down("md")]: {
    gap: "1.5rem",
  },
}));

const EnrichmentsItemBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  [theme.breakpoints.down("md")]: {
    gap: "0.825rem",
  },
}));

const EnrichmentsImg = styled(Box)<BoxProps<"img">>(({ theme }) => ({
  display: "flex",
  width: "48px",
  height: "48px",
  [theme.breakpoints.down("lg")]: {
    width: "36px",
    height: "36px",
  },
  [theme.breakpoints.down("md")]: {
    width: "24px",
    height: "24px",
  },
}));

const EnrichmentsText = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Galmuri11",
  fontWeight: "700",
  fontSize: "1.1rem",
  color: "white",
  WebkitTextStroke: "1px black",
  textShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  [theme.breakpoints.down("lg")]: {
    fontSize: "1rem",
    textShadow: "1.5px 1.5px 0px rgba(0, 0, 0, 1)",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.825rem",
    textShadow: "1.3px 1.3px 0px rgba(0, 0, 0, 1)",
  },
}));

const EnrichmentsOperator = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Galmuri11",
  fontWeight: "700",
  fontSize: "1.625rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
}));

const EnrichmentsItemRoot = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "0.625rem",
  backgroundColor: "#f5f5f5ff",
  borderRadius: "0.5rem",
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    padding: "0.4rem",
  },
}));

const EnrichmentsItem = ({ title, children }: EnrichmentsItemProps) => {
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
      <EnrichmentsItemRoot>{children}</EnrichmentsItemRoot>
    </Tooltip>
  );
};

const EnrichmentsCount = styled(EnrichmentsText)(({ theme }) => ({
  position: "absolute",
  right: "5px",
  bottom: "5px",
  pointerEvents: "none",
  [theme.breakpoints.down("lg")]: {
    right: "4px",
    bottom: "4px",
  },
  [theme.breakpoints.down("md")]: {
    right: "3px",
    bottom: "3px",
  },
}));

const EmptyBox = styled(Box)(({ theme }) => ({
  width: "36px",
  height: "36px",
  margin: "0.625rem",
  [theme.breakpoints.down("md")]: {
    width: "24px",
    height: "24px",
  },
}));

const EmptyText = styled(Box)(({ theme }) => ({
  width: "25px",
  height: "1.1rem",
  [theme.breakpoints.down("md")]: {
    width: "12px",
    height: "1.1rem",
  },
}));

const Enrichments = () => {
  return (
    <EnrichmentsContainer>
      <EnrichmentsBox>
        <EnrichmentsItemBox>
          <EnrichmentsItem title="조약돌 뭉치 2개">
            <EnrichmentsImg component="img" src={CobbleStoneBundle} />
            <EnrichmentsCount>2</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="구리 블록 8개">
            <EnrichmentsImg component="img" src={CooperBlock} />
            <EnrichmentsCount>8</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="레드스톤 블록 3개">
            <EnrichmentsImg component="img" src={RedStoneBlock} />
            <EnrichmentsCount>3</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="코룸 1개">
            <EnrichmentsImg component="img" src={Corum} />
            <EnrichmentsCount>1</EnrichmentsCount>
          </EnrichmentsItem>
        </EnrichmentsItemBox>
        <EnrichmentsItemBox>
          <EnrichmentsOperator>→</EnrichmentsOperator>
          <EnrichmentsItem title="하급 강화석">
            <EnrichmentsImg component="img" src={lowEnrichments} />
          </EnrichmentsItem>
        </EnrichmentsItemBox>
      </EnrichmentsBox>

      <EnrichmentsBox>
        <EnrichmentsItemBox>
          <EnrichmentsItem title="심층암 조약돌 뭉치 2개">
            <EnrichmentsImg component="img" src={DeepslateStoneBundle} />
            <EnrichmentsCount>2</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="청금석 블록 5개">
            <EnrichmentsImg component="img" src={LapisLazuliBlock} />
            <EnrichmentsCount>5</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="철 블록 5개">
            <EnrichmentsImg component="img" src={IronBlock} />
            <EnrichmentsCount>5</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="다이아몬드 블록 3개">
            <EnrichmentsImg component="img" src={DiamondBlock} />
            <EnrichmentsCount>3</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="리프톤 주괴 2개">
            <EnrichmentsImg component="img" src={Lifton} />
            <EnrichmentsCount>2</EnrichmentsCount>
          </EnrichmentsItem>
        </EnrichmentsItemBox>
        <EnrichmentsItemBox>
          <EnrichmentsOperator>→</EnrichmentsOperator>
          <EnrichmentsItem title="중급 강화석">
            <EnrichmentsImg component="img" src={middleEnrichments} />
          </EnrichmentsItem>
        </EnrichmentsItemBox>
      </EnrichmentsBox>

      <EnrichmentsBox>
        <EnrichmentsItemBox>
          <EnrichmentsItem title="구리 블록 30개">
            <EnrichmentsImg component="img" src={CooperBlock} />
            <EnrichmentsCount>30</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="자수정 블록 20개">
            <EnrichmentsImg component="img" src={AmethystBlock} />
            <EnrichmentsCount>20</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="철 블록 7개">
            <EnrichmentsImg component="img" src={IronBlock} />
            <EnrichmentsCount>7</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="금 블록 7개">
            <EnrichmentsImg component="img" src={GoldBlock} />
            <EnrichmentsCount>7</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="다이아몬드 블록 5개">
            <EnrichmentsImg component="img" src={DiamondBlock} />
            <EnrichmentsCount>5</EnrichmentsCount>
          </EnrichmentsItem>
          <EnrichmentsOperator>+</EnrichmentsOperator>
          <EnrichmentsItem title="세렌트 주괴 3개">
            <EnrichmentsImg component="img" src={Serent} />
            <EnrichmentsCount>3</EnrichmentsCount>
          </EnrichmentsItem>
        </EnrichmentsItemBox>
        <EnrichmentsItemBox>
          <EnrichmentsOperator>→</EnrichmentsOperator>
          <EnrichmentsItem title="상급 강화석">
            <EnrichmentsImg component="img" src={highEnrichments} />
          </EnrichmentsItem>
        </EnrichmentsItemBox>
      </EnrichmentsBox>
    </EnrichmentsContainer>
  );
};

export default Enrichments;
