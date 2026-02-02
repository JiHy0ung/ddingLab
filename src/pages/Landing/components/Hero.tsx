import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import DDING_HERO from "../../../assets/hero/dding_hero.png";

const HeroContainer = styled(Box)({
  height: "20rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  marginBottom: "2rem",
});

const HeroImage = styled(Box)<BoxProps<"img">>({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const Hero = () => {
  return (
    <HeroContainer>
      <HeroImage component={"img"} src={DDING_HERO} />
    </HeroContainer>
  );
};

export default Hero;
