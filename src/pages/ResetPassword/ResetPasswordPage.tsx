import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import CommonSnackbar from "../../common/components/CommonSnackBar";

const ERROR_MESSAGE_MAP: Record<string, string> = {
  "New password should be different from the old password.":
    "새 비밀번호는 기존 비밀번호와 달라야 합니다.",
};

const ResetPasswordContainer = styled(Box)({
  width: "100%",
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ResetPasswordBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ResetPasswordTitle = styled(Typography)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Galmuri11",
  fontWeight: "900",
  fontSize: "2.5rem",
  marginBottom: "1rem",
  letterSpacing: -1,
});

const Description = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "0.875rem",
  color: "#555",
  marginBottom: "2rem",
  textAlign: "center",
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
    borderColor: "#000",

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

const PasswordInputBox = styled(TextField)({
  ...commonInputStyles,
  "& .MuiInputBase-input": {
    ...commonInputStyles["& .MuiInputBase-input"],
    width: "14rem",
  },
});

const ConfirmButton = styled(Button)({
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
    backgroundColor: "#ffd52bff",
  },
});

const CancelButton = styled(Button)({
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
    backgroundColor: "#ff4a4aff",
  },
});

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

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

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsValidToken(true);
      } else {
        openSnackbar("유효하지 않은 링크입니다.", "error");
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      openSnackbar("모든 필드를 입력해주세요", "warning");
      return;
    }

    if (newPassword !== confirmPassword) {
      openSnackbar("비밀번호가 일치하지 않습니다.", "warning");
      return;
    }

    if (newPassword.length < 6) {
      openSnackbar("비밀번호는 최소 6자 이상이어야 합니다.", "warning");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      openSnackbar("비밀번호가 성공적으로 변경되었습니다.", "success");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      await supabase.auth.signOut();
    } catch (error: any) {
      const serverMessage = error?.message;

      openSnackbar(
        ERROR_MESSAGE_MAP[serverMessage] ?? "비밀번호 변경에 실패했습니다.",
        "warning",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleResetPassword();
    }
  };

  if (!isValidToken) {
    return null;
  }

  return (
    <>
      <ResetPasswordContainer>
        <ResetPasswordBox>
          <ResetPasswordTitle>비밀번호 재설정</ResetPasswordTitle>
          <Description>
            새로운 비밀번호를 입력해주세요
            <br />
            (로그인된 상태지만 비밀번호를 재설정해 주셔야합니다!)
          </Description>
          <PasswordInputBox
            type={showPassword ? "text" : "password"}
            placeholder="새 비밀번호 (최소 6자)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
          <PasswordInputBox
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <ConfirmButton onClick={handleResetPassword} disabled={loading}>
            {loading ? "변경 중..." : "비밀번호 변경"}
          </ConfirmButton>
          <CancelButton onClick={() => navigate("/login")}>취소</CancelButton>
        </ResetPasswordBox>
      </ResetPasswordContainer>
      <CommonSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default ResetPasswordPage;
