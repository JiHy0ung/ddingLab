import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { zodiacSigns } from "../../constants/zodiacMap";

import SteveFace from "../../assets/common/steve_face.png";

const RegisterContainer = styled(Box)({
  width: "100%",
  height: "80vh",
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

const RegisterTitle = styled(Typography)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Galmuri11",
  fontWeight: "900",
  fontSize: "2.5rem",
  marginBottom: "1rem",
  letterSpacing: -1,
});

const MinecraftIdInputBox = styled(TextField)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "18rem",
  marginBottom: "0.75rem",

  "& .MuiInputBase-input": {
    height: "2rem",
    width: "14rem",
    fontSize: "0.75rem",
    padding: 0,
  },
  "& .MuiInputBase-root": {
    padding: "0.5rem 0.875rem 0.5rem 1rem",
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

const UserNameInputBox = styled(TextField)({
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

const PassWordConfirmInputBox = styled(TextField)({
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

const ZodiacSelect = styled(TextField)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "18rem",
  marginBottom: "0.75rem",

  "& .MuiInputBase-input": {
    width: "13rem",
    height: "2rem",
    fontSize: "0.75rem",
    padding: 0,
  },
  "& .MuiInputBase-root": {
    height: "2.875rem",
    padding: "0.5rem 0.5rem 0.5rem 1rem",
    fontFamily: "Galmuri11",
    borderRadius: 0,
    backgroundColor: "#ffffffff",
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "2px solid black",
    borderRadius: 0,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },

  // Menu 스타일
  "& .MuiMenu-paper": {
    borderRadius: 0,
    border: "2px solid black",
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
    marginTop: "0.25rem",
  },

  // MenuItem 스타일
  "& .MuiMenuItem-root": {
    fontFamily: "Galmuri11",
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#bdff66ff",
    },
    "&.Mui-selected": {
      backgroundColor: "#bdff66ff",
      "&:hover": {
        backgroundColor: "#bdff66ff",
      },
    },
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

const RegisterPage = () => {
  const { signUp } = useAuth();

  const [minecraftId, setMinecraftId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        <RegisterTitle>회원가입</RegisterTitle>
        <MinecraftIdInputBox
          placeholder="마인크래프트 아이디"
          value={minecraftId}
          onChange={(e) => setMinecraftId(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  component="img"
                  src={
                    minecraftId
                      ? `https://visage.surgeplay.com/face/${minecraftId}`
                      : SteveFace
                  }
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = SteveFace;
                  }}
                  alt="Minecraft Avatar"
                  sx={{
                    width: "1.625rem",
                    height: "1.625rem",
                  }}
                />
              </InputAdornment>
            ),
          }}
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
        <PassWordConfirmInputBox
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
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
        <ZodiacSelect
          select
          value={zodiac}
          onChange={(e) => setZodiac(e.target.value)}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              if (!selected) {
                return <span style={{ color: "#999" }}>별자리</span>;
              }
              return zodiacSigns.find((sign) => sign.name === selected)?.label;
            },
            IconComponent: () => (
              <Box
                component="img"
                src="https://unpkg.com/pixelarticons@1.8.0/svg/chevron-down.svg"
                sx={{
                  height: "1rem",
                  width: "1rem",
                  marginRight: "0.5rem",
                  pointerEvents: "none",
                }}
              />
            ),
            MenuProps: {
              PaperProps: {
                sx: {
                  borderRadius: 0,
                  border: "2px solid black",
                  marginTop: "0.25rem",
                  "& .MuiMenuItem-root": {
                    fontFamily: "Galmuri11",
                    fontSize: "0.8rem",
                    "&:hover": {
                      backgroundColor: "#cca3ffff",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#cca3ffff",
                      "&:hover": {
                        backgroundColor: "#cca3ffff",
                      },
                    },
                  },
                },
              },
            },
          }}
        >
          {zodiacSigns.map((sign) => (
            <MenuItem key={sign.name} value={sign.name}>
              {sign.label}
            </MenuItem>
          ))}
        </ZodiacSelect>
        <RegisterButton onClick={handleRegister}>회원가입</RegisterButton>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default RegisterPage;
