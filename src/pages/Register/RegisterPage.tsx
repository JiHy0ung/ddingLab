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
import CommonSnackbar from "../../common/components/CommonSnackBar";
import { useNavigate } from "react-router";

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

const MinecraftIdInputBox = styled(TextField)({
  ...commonInputStyles,
  "& .MuiInputBase-input": {
    ...commonInputStyles["& .MuiInputBase-input"],
    width: "14.25rem",
  },
});

const UserNameInputBox = styled(TextField)({
  ...commonInputStyles,
  "& .MuiInputBase-input": {
    ...commonInputStyles["& .MuiInputBase-input"],
    width: "16.5rem",
  },
});

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

const PassWordConfirmInputBox = styled(TextField)({
  ...commonInputStyles,
  "& .MuiInputBase-input": {
    ...commonInputStyles["& .MuiInputBase-input"],
    width: "14rem",
  },
});

const ZodiacSelect = styled(TextField)({
  ...commonInputStyles,
  "& .MuiInputBase-input": {
    ...commonInputStyles["& .MuiInputBase-input"],
    width: "13rem",
  },
  "& .MuiInputBase-root": {
    ...commonInputStyles["& .MuiInputBase-root"],
    height: "2.875rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "2px solid black",
    borderRadius: 0,
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

  const navigate = useNavigate();

  const [minecraftId, setMinecraftId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      openSnackbar("비밀번호가 일치하지 않습니다", "warning");
      return;
    }

    try {
      await signUp(email, password, name, minecraftId, zodiac);
      openSnackbar("회원가입 완료!", "success");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (e: any) {
      openSnackbar(e.message, "error");
    }
  };

  return (
    <>
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
                      filter: "drop-shadow(0 0 1px rgba(0, 0, 0, 0.4))",
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
            type={showPassword ? "text" : "password"}
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
          <PassWordConfirmInputBox
            type={showPassword ? "text" : "password"}
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
                return zodiacSigns.find((sign) => sign.name === selected)
                  ?.label;
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
      <CommonSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default RegisterPage;
