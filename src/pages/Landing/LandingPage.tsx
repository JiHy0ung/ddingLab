import { styled } from "@mui/material/styles";
import OhaasaRanking from "./components/OhaasaRanking";
import { Box } from "@mui/material";
import Hero from "./components/Hero";
import NoticeBoard from "./components/NoticeBoard";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

const LandingContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "5rem",
  [theme.breakpoints.down("md")]: {
    padding: "0.4rem",
  },
}));

const LandingPage = () => {
  // const { user, userinfo, loading } = useAuth();

  // useEffect(() => {
  //   if (loading) return;

  //   if (user) {
  //     console.log("✅ 로그인 상태");
  //     console.log("auth user:", user);
  //     console.log("userinfo:", userinfo);
  //   } else {
  //     console.log("❌ 로그인 안 됨");
  //   }
  // }, [user, userinfo, loading]);

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
