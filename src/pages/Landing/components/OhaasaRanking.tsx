import { Box, Typography, useMediaQuery } from "@mui/material";
import OhaasaSpinner from "../../../common/components/OhaasaSpinner";
import { useOhaasa } from "../../../hooks/useOhaasa";
import { zodiacMap } from "../../../constants/zodiacMap";
import { styled, useTheme } from "@mui/material/styles";
import { useAuth } from "../../../contexts/AuthContext";

const OhaasaContainer = styled(Box)(({ theme }) => ({
  minHeight: "36rem",
  minWidth: "15rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25rem",
  padding: "1.625rem 3rem",
  backgroundColor: "#f5f5f5ff",
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  [theme.breakpoints.down("lg")]: {
    minHeight: "21rem",
    // minWidth: "40rem",
    maxWidth: "60rem",
    width: "100%",
    padding: "2rem 3rem",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "21rem",
    // minWidth: "15rem",
    maxWidth: "40rem",
    padding: "2rem 3rem",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "21rem",
    maxWidth: "30rem",
    // minWidth: "22rem",
    padding: "2rem 1.5rem",
  },
}));

const TitleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const DateText = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontFamily: "Galmuri11",
  fontSize: "0.875rem",
  fontWeight: "900",
  letterSpacing: -0.75,
  color: "black",
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.15rem",
  },
}));

const OhaasaTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontFamily: "Galmuri11",
  fontSize: "2rem",
  fontWeight: "900",
  letterSpacing: -1,
  color: "black",
  marginBottom: "1rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "2.625rem",
  },
}));

const OhaasaRankingBox = styled(Box)({
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  gap: "0.5rem",
});

const OhaasaRankingText = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Galmuri11",
  fontSize: "1rem",
  fontWeight: "900",
  letterSpacing: -0.5,
  WebkitTextStroke: "0.3px black",
  textShadow: "1px 1px 0 black",
  color: "white",
  backgroundColor: "black",
  padding: "2px 4px",
  width: "2.875rem",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

const OhaasaText = styled(Typography)(({ theme }) => ({
  fontFamily: "Galmuri11",
  fontSize: "1rem",
  letterSpacing: -0.5,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

const OhaasaRanking = () => {
  const theme = useTheme();

  const { data, loading } = useOhaasa();
  const { userinfo } = useAuth();

  const firstGroup = data.slice(0, 6);
  const secondGroup = data.slice(6);

  const isMdDown = useMediaQuery(theme.breakpoints.down("lg"));

  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const year = kst.getFullYear();
  const month = String(kst.getMonth() + 1).padStart(2, "0");
  const day = String(kst.getDate()).padStart(2, "0");

  const finalDate = `${year}년 ${month}월 ${day}일`;

  console.log("data", data);

  if (loading)
    return (
      <OhaasaContainer sx={{ padding: "1.625rem 2rem" }}>
        <OhaasaSpinner />
      </OhaasaContainer>
    );

  const renderRanking = (list) =>
    list.map((item) => {
      let color = "";
      if (item.rank === 1) color = "#ffd000ff";
      else if (item.rank === 2) color = "#C0C0C0";
      else if (item.rank === 3) color = "#cf7a24ff";

      const isUserZodiac = userinfo?.zodiac === zodiacMap[item.signId];

      return (
        <Box
          key={item.rank}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <OhaasaRankingText sx={{ color }}>{item.rank}위</OhaasaRankingText>
          <OhaasaText sx={{ color: isUserZodiac ? "#ed0707ff" : "black" }}>
            {zodiacMap[item.signId] ?? "알 수 없음"}
          </OhaasaText>
        </Box>
      );
    });

  return (
    <OhaasaContainer>
      <TitleBox>
        <DateText>{finalDate}</DateText>
        <OhaasaTitle>오하아사</OhaasaTitle>
      </TitleBox>

      <OhaasaRankingBox
        sx={{
          flexDirection: isMdDown ? "row" : "column",
          gap: isMdDown ? "2rem" : "0.5rem",
        }}
      >
        {isMdDown ? (
          <Box
            sx={{
              display: "flex",
              gap: { xs: "1rem", sm: "5rem", md: "7rem" },
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              {renderRanking(firstGroup)}
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              {renderRanking(secondGroup)}
            </Box>
          </Box>
        ) : (
          renderRanking(data)
        )}
      </OhaasaRankingBox>
    </OhaasaContainer>
  );
};

export default OhaasaRanking;
