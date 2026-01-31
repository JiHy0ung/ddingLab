import { styled } from "@mui/material/styles";
import OhaasaRanking from "./components/OhaasaRanking";
import { Box } from "@mui/material";
import Hero from "./components/Hero";
import NoticeBoard from "./components/NoticeBoard";

const LandingContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

const LandingPage = () => {
  return (
    <LandingContainer>
      <Hero />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        <OhaasaRanking />
        <NoticeBoard />
      </Box>
    </LandingContainer>
  );
};

export default LandingPage;
