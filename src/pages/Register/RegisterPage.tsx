import { Box, Button, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { zodiacSigns } from "../../constants/zodiacMap";

const RegisterContainer = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const RegisterBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const MinecraftIdInputBox = styled(TextField)({});

const UserNameInputBox = styled(TextField)({});

const EmailInputBox = styled(TextField)({});

const PassWordInputBox = styled(TextField)({});

const PassWordConfirmInputBox = styled(TextField)({});

const RegisterButton = styled(Button)({});

const RegisterPage = () => {
  const { signUp } = useAuth();

  const [minecraftId, setMinecraftId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [zodiac, setZodiac] = useState("");

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      await signUp(email, password, name, minecraftId, zodiac);
      alert("회원가입 완료! 이메일 인증 후 로그인해주세요.");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <RegisterContainer>
      <RegisterBox>
        <MinecraftIdInputBox
          placeholder="마인크래프트 아이디"
          value={minecraftId}
          onChange={(e) => setMinecraftId(e.target.value)}
        />
        <UserNameInputBox
          placeholder="닉네임"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <EmailInputBox
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PassWordInputBox
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PassWordConfirmInputBox
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <TextField
          select
          label="별자리"
          value={zodiac}
          onChange={(e) => setZodiac(e.target.value)}
          sx={{ width: "200px" }}
        >
          {zodiacSigns.map((sign) => (
            <MenuItem key={sign.name} value={sign.name}>
              {sign.label}
            </MenuItem>
          ))}
        </TextField>
        <RegisterButton onClick={handleRegister}>회원가입</RegisterButton>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default RegisterPage;
