import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SpeechBubble from "./SpeechBubble";

const NoticeBoardContainer = styled(Box)(({ theme }) => ({
  maxWidth: "60rem",
  minHeight: "36rem",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "0.25rem",
  padding: "1.25rem 2rem",
  backgroundColor: "#f5f5f5ff",
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  // [theme.breakpoints.down("lg")]: {
  //   margin: "0 4rem",
  //   maxWidth: "40rem",
  // },
  // [theme.breakpoints.down("md")]: {
  //   maxWidth: "40rem",
  // },
  // [theme.breakpoints.down("sm")]: {
  //   maxWidth: "22rem",
  // },

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
    padding: "1rem 1.5rem",
  },
}));

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

const BubbleBox = styled(Box)({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const NoticeBoard = () => {
  const writer = "유지렁";
  const notice = "공사중 └('ω')」 三 L('ω')┘";

  return (
    <NoticeBoardContainer>
      <TitleBox>
        <NoticeBoardTitle>게시판</NoticeBoardTitle>
      </TitleBox>
      <BubbleBox>
        <SpeechBubble writer={writer} text={notice} />
      </BubbleBox>
    </NoticeBoardContainer>
  );
};

export default NoticeBoard;
