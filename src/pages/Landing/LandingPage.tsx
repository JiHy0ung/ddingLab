import { styled } from "@mui/material/styles";
import OhaasaRanking from "./components/OhaasaRanking";
import { Box } from "@mui/material";
import Hero from "./components/Hero";

const LandingContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const LandingPage = () => {
  return (
    <LandingContainer>
      <Hero />
      <OhaasaRanking />
    </LandingContainer>
  );
};

export default LandingPage;
