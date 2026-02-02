import { styled } from "@mui/material/styles";
import { Box, Modal, Tooltip, Typography, IconButton } from "@mui/material";
import { useState } from "react";

const UpdateNoteContainer = styled(Box)(({ theme }) => ({
  height: "5rem",
  minWidth: "68rem",
  maxWidth: "76rem",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.4rem",
  padding: "1.625rem 3rem",
  backgroundColor: "#f5f5f5ff",
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",

  [theme.breakpoints.down("xl")]: {
    minWidth: "30rem",
    maxWidth: "76rem",
    width: "100%",
    padding: "0 3rem",
  },
  [theme.breakpoints.down("lg")]: {
    minWidth: "30rem",
    maxWidth: "50rem",
    width: "100%",
    padding: "0 3rem",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "30rem",
    maxWidth: "40rem",
    padding: "0 3rem",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "15rem",
    maxWidth: "30rem",
    padding: "0 1.5rem",
  },
}));

const UpdateTitle = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "1.25rem",
  fontWeight: "900",
  wordBreak: "keep-all",
  whiteSpace: "nowrap",
});

const UpdateText = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "1rem",
  fontWeight: "400",
  wordBreak: "keep-all",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",

  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
});

const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  backgroundColor: "#f5f5f5ff",
  border: "2px solid black",
  boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
  padding: "1rem 1.625rem",
  fontFamily: "Galmuri11",

  [theme.breakpoints.down("sm")]: {
    width: "85%",
    padding: "1.5rem",
  },
}));

const ModalHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.5rem",
  paddingBottom: "1rem",
  borderBottom: "2px dashed #999",
});

const ModalTitleBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.625rem",
});

const ModalTitle = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "1.5rem",
  fontWeight: "900",
});

const CloseButton = styled(IconButton)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "1.625rem",
  height: "1.625rem",
  backgroundColor: "#ffffffff",
  color: "#000000",
  fontFamily: "Galmuri11",
  fontWeight: "bold",
  fontSize: "1.2rem",
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  borderRadius: "0rem",

  "&:hover": {
    backgroundColor: "#ff2f2fff",
  },
});

const ModalBody = styled(Box)({
  fontFamily: "Galmuri11",
  fontSize: "1rem",
  lineHeight: "1.8",
  color: "#333",
});

const UpdateNote = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <UpdateNoteContainer>
      <Box
        component="img"
        src="https://unpkg.com/pixelarticons@1.8.0/svg/radio-signal.svg"
        sx={{
          marginBottom: "0.2rem",
          height: "1.5rem",
        }}
      />
      <UpdateTitle>업데이트 공지: </UpdateTitle>
      <Tooltip
        arrow
        title="클릭 시 더보기"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: "#222",
              color: "#fff",
              fontFamily: "Galmuri11",
              fontSize: {
                sm: "0.625rem",
                md: "0.625rem",
                lg: "0.75rem",
                xl: "0.75rem",
              },
              border: "2px solid black",
            },
          },
          arrow: {
            sx: {
              color: "#222",
            },
          },
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -8],
                },
              },
            ],
          },
        }}
      >
        <UpdateText onClick={handleOpen}>
          로그인/회원가입 기능 구현, 해양 연금술 페이지 추가 예정
        </UpdateText>
      </Tooltip>

      <Modal
        disableScrollLock
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: 1300,
        }}
      >
        <ModalContent>
          <ModalHeader>
            <ModalTitleBox>
              <Box
                component="img"
                src="https://unpkg.com/pixelarticons@1.8.0/svg/radio-signal.svg"
                sx={{
                  height: "1.5rem",
                }}
              />
              <ModalTitle>업데이트 공지</ModalTitle>
              <Typography
                sx={{
                  alignSelf: "end",
                  fontFamily: "Galmuri11",
                  fontSize: "0.625rem",
                  color: "#818181ff",
                  marginBottom: "0.4rem",
                }}
              >
                (ver 0.1.0-Beta)
              </Typography>
            </ModalTitleBox>
            <CloseButton onClick={handleClose}>
              <Box
                component="img"
                src="https://unpkg.com/pixelarticons@1.8.0/svg/close.svg"
                sx={{
                  height: "1.25rem",
                }}
              />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <Typography
              sx={{
                fontFamily: "Galmuri11",
                fontSize: "0.95rem",
                marginBottom: "0.8rem",
              }}
            >
              • 로그인/회원가입 기능 구현
            </Typography>

            <Typography
              sx={{
                fontFamily: "Galmuri11",
                fontSize: "0.95rem",
                marginBottom: "0.8rem",
              }}
            >
              • 비밀번호 재설정 기능 추가
            </Typography>

            <Typography
              sx={{
                fontFamily: "Galmuri11",
                fontSize: "0.95rem",
                marginBottom: "0.8rem",
              }}
            >
              • 요리 가격 차트 개선
            </Typography>

            <Typography
              sx={{
                fontFamily: "Galmuri11",
                fontSize: "0.95rem",
                marginBottom: "0.8rem",
              }}
            >
              • 해양 연금술 페이지 추가 예정
            </Typography>

            <Typography
              sx={{
                fontFamily: "Galmuri11",
                fontSize: "0.85rem",
                color: "#666",
                marginTop: "1rem",
              }}
            >
              ( 추가 기능 요청은 디스코드 DM으로 )
            </Typography>
          </ModalBody>
        </ModalContent>
      </Modal>
    </UpdateNoteContainer>
  );
};

export default UpdateNote;
