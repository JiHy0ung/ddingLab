import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";

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

const EmailInputBox = styled(TextField)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "18rem",
  marginBottom: "0.75rem",

  "& .MuiInputBase-input": {
    height: "2rem",
    width: "16.5rem",
    fontSize: "0.75rem",
    padding: 0,
  },
  "& .MuiInputBase-root": {
    padding: "0.5rem 0.5rem 0.5rem 1rem",
    fontFamily: "Galmuri11",
    borderRadius: 0,
    backgroundColor: "#ffffffff",
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "2px solid black",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
});

const PassWordInputBox = styled(TextField)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "18rem",
  marginBottom: "0.75rem",

  "& .MuiInputBase-input": {
    width: "14rem",
    fontSize: "0.75rem",
    padding: 0,
  },
  "& .MuiInputBase-root": {
    padding: "0.5rem 0.5rem 0.5rem 1rem",
    fontFamily: "Galmuri11",
    borderRadius: 0,
    backgroundColor: "#ffffffff",
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "2px solid black",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
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

const LoginPage = () => {
  // TODO:
  // 비밀번호 찾기 기능 구현
  // 모달 띄워서 이메일로 임시 비밀번호 발송 or 비밀번호 재설정 페이지 이동

  const { signIn } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      // 성공 시 → AuthContext에서 session 감지 후 자동 처리됨

      navigate("/");
    } catch (e: any) {
      alert(e.message || "로그인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
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
                  {showPassword ? (
                    <Box
                      component="img"
                      src="https://unpkg.com/pixelarticons@1.8.0/svg/eye.svg"
                      sx={{
                        height: "1rem",
                      }}
                    />
                  ) : (
                    <Box
                      component="img"
                      src="https://unpkg.com/pixelarticons@1.8.0/svg/eye-closed.svg"
                      sx={{
                        height: "1rem",
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ForgotPassWordText disableRipple>비밀번호 찾기</ForgotPassWordText>
        <LoginButton onClick={handleLogin} disabled={loading}>
          로그인
        </LoginButton>
        <RegisterButton onClick={() => navigate("/register")}>
          회원가입
        </RegisterButton>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;
