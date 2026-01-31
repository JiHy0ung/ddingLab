import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const NoticeBoardContainer = styled(Box)({
  maxWidth: "60rem",

  width: "100%",
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

const NoticeBoardTitle = styled(Typography)({
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

const NoticeBoard = () => {
  return (
    <NoticeBoardContainer>
      <TitleBox>
        <NoticeBoardTitle>게시판</NoticeBoardTitle>
      </TitleBox>
    </NoticeBoardContainer>
  );
};

export default NoticeBoard;
