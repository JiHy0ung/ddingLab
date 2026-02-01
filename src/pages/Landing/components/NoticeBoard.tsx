import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SpeechBubble from "./SpeechBubble";

const NoticeBoardContainer = styled(Box)({
  maxWidth: "60rem",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25rem",
  padding: "1.25rem 2rem",
  backgroundColor: "#f5f5f5ff",
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
});

const TitleBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
});

const NoticeBoardTitle = styled(Typography)({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignContent: "center",
  fontFamily: "Galmuri11",
  fontSize: "2rem",
  fontWeight: "900",
  letterSpacing: -1,
  color: "black",
  borderBottom: "2px solid black",
});

const NoticeBoard = () => {
  const writer = "종해";
  const notice = "오늘 삼토찌 3상자 목표 예상 수익 2천";

  return (
    <NoticeBoardContainer>
      <TitleBox>
        <NoticeBoardTitle>게시판</NoticeBoardTitle>
      </TitleBox>
      <SpeechBubble writer={writer} text={notice} />
    </NoticeBoardContainer>
  );
};

export default NoticeBoard;
