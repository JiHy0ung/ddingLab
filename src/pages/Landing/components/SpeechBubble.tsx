import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const BubbleBox = styled(Box)({
  maxWidth: "17rem",
  position: "relative",
  padding: "1rem 1.25rem",
  backgroundColor: "#fff",
  border: "1.5px solid #000",
  fontFamily: "Galmuri11",
  fontSize: "0.875rem",
  fontWeight: 900,
  textAlign: "center",
});

const BubbleTail = styled(Box)({
  position: "absolute",
  bottom: "-9px",
  left: "24px",
  width: "1rem",
  height: "1rem",
  backgroundColor: "#fff",
  borderLeft: "1.5px solid #000",
  borderBottom: "1.5px solid #000",
  transform: "rotate(-45deg)",
});

const BubbleText = styled(Typography)({
  display: "flex",
  justifyContent: "start",
  alignContent: "center",
  fontFamily: "Galmuri11",
  fontSize: "1rem",
  fontWeight: "500",
  letterSpacing: -1,
  color: "black",
  wordBreak: "keep-all",
});

interface SpeechBubble {
  writer: string;
  text: string;
}

const SpeechBubble = ({ writer, text }: SpeechBubble) => {
  return (
    <BubbleBox>
      <BubbleText>
        {writer}: {text}
      </BubbleText>
      <BubbleTail />
    </BubbleBox>
  );
};

export default SpeechBubble;
