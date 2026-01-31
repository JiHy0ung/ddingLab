import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const Title = styled(Typography)({
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
  marginBottom: "1rem",
});

const frames = [
  "ଘ(´•3•)⊃━ ☆",
  "ଘ(´•3•)⊃━ - ☆",
  "ଘ(´•3•)⊃━ - - ☆",
  "ଘ(´•3•)⊃━ - - - ☆",
];

const OhaasaSpinner = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % frames.length);
    }, 125);

    return () => clearInterval(interval);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title>오하아사 순위 불러오는 중</Title>
      <Title>{frames[step]}</Title>
    </Box>
  );
};

export default OhaasaSpinner;
