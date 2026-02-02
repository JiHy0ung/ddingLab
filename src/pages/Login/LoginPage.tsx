import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import CommonSnackbar from "../../common/components/CommonSnackBar";

const LoginContainer = styled(Box)({
  width: "100%",
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LoginTitle = styled(Typography)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Galmuri11",
  fontWeight: "900",
  fontSize: "2.5rem",
  marginBottom: "1rem",
  letterSpacing: -1,
});

const LoginBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

// 공통 스타일 객체
const commonInputStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "18rem",
  marginBottom: "0.75rem",

  "& .MuiInputBase-input": {
    height: "2rem",
    fontSize: "0.75rem",
    padding: 0,
    color: "#000",

    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
      WebkitTextFillColor: "#000",
    },
    "&:-webkit-autofill:hover": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
    },
    "&:-webkit-autofill:focus": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
    },
    "&:-webkit-autofill:active": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
    },
  },
  "& .MuiInputBase-root": {
    padding: "0.5rem 0.5rem 0.5rem 1rem",
    fontFamily: "Galmuri11",
    borderRadius: 0,
    backgroundColor: "#ffffffff",
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
    "&.Mui-focused": {
      backgroundColor: "#ffffffff",
      borderColor: "#000",
    },
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "2px solid black",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },

  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
    borderWidth: "2px",
  },
};

const EmailInputBox = styled(TextField)({
  ...commonInputStyles,
  "& .MuiInputBase-input": {
    ...commonInputStyles["& .MuiInputBase-input"],
    width: "16.5rem",
  },
});

const PassWordInputBox = styled(TextField)({
  ...commonInputStyles,
  "& .MuiInputBase-input": {
    ...commonInputStyles["& .MuiInputBase-input"],
    width: "14rem",
  },
});

const ForgotPassWordText = styled(Button)({
  fontFamily: "Galmuri11",
  fontSize: "0.75rem",
  color: "#555",
  textTransform: "none",
  alignSelf: "flex-end",

  "&:hover": {
    background: "transparent",
    textDecoration: "underline",
  },
});

const LoginButton = styled(Button)({
  width: "18rem",
  marginTop: "0.5rem",
  fontFamily: "Galmuri11",
  fontWeight: "900",
  borderRadius: 0,
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0,0,0,1)",
  backgroundColor: "#fff",
  color: "#000",

  "&:hover": {
    backgroundColor: "#ffe066",
  },
});

const RegisterButton = styled(Button)({
  width: "18rem",
  marginTop: "0.5rem",
  fontFamily: "Galmuri11",
  fontWeight: "900",
  borderRadius: 0,
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0,0,0,1)",
  backgroundColor: "#fff",
  color: "#000",

  "&:hover": {
    backgroundColor: "#bdff66ff",
  },
});

const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "22rem",
  backgroundColor: "#fff",
  border: "2px solid black",
  boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ModalTitle = styled(Typography)({
  fontFamily: "Galmuri11",
  fontWeight: "900",
  fontSize: "1.5rem",
  marginBottom: "1rem",
  letterSpacing: -1,
});

const ModalDescription = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "0.75rem",
  color: "#555",
  marginBottom: "1.5rem",
  textAlign: "center",
});

const ModalEmailInput = styled(TextField)({
  ...commonInputStyles,
  marginBottom: "1.5rem",
});

const ModalButton = styled(Button)({
  width: "100%",
  fontFamily: "Galmuri11",
  fontWeight: "900",
  borderRadius: 0,
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0,0,0,1)",
  backgroundColor: "#fff",
  color: "#000",
  marginBottom: "0.5rem",

  "&:hover": {
    backgroundColor: "#ffd52bff",
  },
});

const ModalCancelButton = styled(Button)({
  width: "100%",
  fontFamily: "Galmuri11",
  fontWeight: "900",
  borderRadius: 0,
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0,0,0,1)",
  backgroundColor: "#fff",
  color: "#000",

  "&:hover": {
    backgroundColor: "#ff4a4aff",
  },
});

const LoginPage = () => {
  const { signIn, resetPassword } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const openSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info" = "info",
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      openSnackbar("이메일과 비밀번호를 입력해주세요", "warning");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      openSnackbar("로그인 성공!", "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (e: any) {
      openSnackbar(e.message || "로그인에 실패했습니다", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      openSnackbar("이메일을 입력해주세요", "warning");
      return;
    }

    try {
      await resetPassword(resetEmail);
      openSnackbar("비밀번호 재설정 이메일을 발송했습니다.", "info");
      setOpenModal(false);
      setResetEmail("");
    } catch (e: any) {
      openSnackbar(e.message || "비밀번호 재설정에 실패했습니다", "error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleResetPassword();
    }
  };

  return (
    <>
      <LoginContainer>
        <LoginBox>
          <LoginTitle>로그인</LoginTitle>
          <EmailInputBox
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <PassWordInputBox
            placeholder="비밀번호"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ marginRight: "0" }}
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    <Box
                      component="img"
                      src={`https://unpkg.com/pixelarticons@1.8.0/svg/${
                        showPassword ? "eye" : "eye-closed"
                      }.svg`}
                      sx={{ height: "1rem" }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ForgotPassWordText disableRipple onClick={() => setOpenModal(true)}>
            비밀번호 찾기
          </ForgotPassWordText>
          <LoginButton onClick={handleLogin} disabled={loading}>
            로그인
          </LoginButton>
          <RegisterButton onClick={() => navigate("/register")}>
            회원가입
          </RegisterButton>
        </LoginBox>
      </LoginContainer>

      <CommonSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />

      {/* 비밀번호 찾기 모달 */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="reset-password-modal"
      >
        <ModalBox>
          <ModalTitle>비밀번호 찾기</ModalTitle>
          <ModalDescription>
            가입하신 이메일 주소를 입력하시면
            <br />
            비밀번호 재설정 링크를 보내드립니다.
          </ModalDescription>
          <ModalEmailInput
            placeholder="이메일"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            onKeyDown={handleModalKeyDown}
            fullWidth
          />
          <ModalButton onClick={handleResetPassword}>
            재설정 메일 발송
          </ModalButton>
          <ModalCancelButton onClick={() => setOpenModal(false)}>
            취소
          </ModalCancelButton>
        </ModalBox>
      </Modal>
    </>
  );
};

export default LoginPage;
