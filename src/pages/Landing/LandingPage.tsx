import { styled } from "@mui/material/styles";
import OhaasaRanking from "./components/OhaasaRanking";
import { Box } from "@mui/material";
import Hero from "./components/Hero";
import NoticeBoard from "./components/NoticeBoard";
import UpdateNote from "./components/UpdateNote";

const LandingContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "3rem",
  paddingBottom: "5rem",
}));

const LandingPage = () => {
  return (
    <LandingContainer>
      <Hero />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: { xs: "1rem", sm: "4.5rem", md: "12rem", lg: "3rem" },
        }}
      >
        <UpdateNote />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: { xs: "1rem", sm: "4.5rem", md: "12rem", lg: "3rem" },
          flexDirection: {
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          },
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
