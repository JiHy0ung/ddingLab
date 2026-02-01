import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const LoginContainer = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LoginBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const EmailInputBox = styled(TextField)({});

const PassWordInputBox = styled(TextField)({});

const LoginButton = styled(Button)({});

const ForgotPassWordText = styled(Button)({});

const LoginPage = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      // 성공 시 → AuthContext에서 session 감지 후 자동 처리됨
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
        <EmailInputBox
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <PassWordInputBox
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ForgotPassWordText>비밀번호 찾기</ForgotPassWordText>
        <LoginButton onClick={handleLogin} disabled={loading}>
          로그인하기
        </LoginButton>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;
