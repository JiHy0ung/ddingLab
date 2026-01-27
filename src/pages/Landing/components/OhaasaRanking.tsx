import { Box, Typography } from "@mui/material";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { useOhaasa } from "../../../hooks/useOhaasa";
import { zodiacMap } from "../../../constants/zodiacMap";
import { styled } from "@mui/material/styles";

const OhaasaContainer = styled(Box)({
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25rem",
  padding: "1.625rem 3rem",
  backgroundColor: "#f5f5f5ff",
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
});

const TitleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const DateText = styled(Typography)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontFamily: "Galmuri11",
  fontSize: "0.875rem",
  fontWeight: "900",
  letterSpacing: -1,
  color: "black",
});

const OhaasaTitle = styled(Typography)({
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
});

const OhaasaRankingBox = styled(Box)({
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  gap: "0.5rem",
});

const OhaasaRankingText = styled(Typography)({
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
});

const OhaasaText = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "1rem",
  letterSpacing: -0.5,
});

const OhaasaRanking = () => {
  const { data, loading } = useOhaasa();

  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const year = kst.getFullYear();
  const month = String(kst.getMonth() + 2).padStart(2, "0");
  const day = String(kst.getDate()).padStart(2, "0");

  const finalDate = `${year}년 ${month}월 ${day}일`;

  if (loading) return <LoadingSpinner />;

  return (
    <OhaasaContainer>
      <TitleBox>
        <DateText>{finalDate}</DateText>
        <OhaasaTitle>오하아사</OhaasaTitle>
      </TitleBox>

      <OhaasaRankingBox>
        {data.map((item) => {
          let color = "";
          if (item.rank === 1) color = "#ffd000ff";
          else if (item.rank === 2) color = "#C0C0C0";
          else if (item.rank === 3) color = "#cf7a24ff";

          return (
            <Box
              key={item.rank}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <OhaasaRankingText sx={{ color }}>
                {item.rank}위
              </OhaasaRankingText>
              <OhaasaText>{zodiacMap[item.signId] ?? "알 수 없음"}</OhaasaText>
            </Box>
          );
        })}
      </OhaasaRankingBox>
    </OhaasaContainer>
  );
};

export default OhaasaRanking;
