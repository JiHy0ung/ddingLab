import { Snackbar, Alert, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface CommonSnackbarProps {
  open: boolean;
  message: string;
  severity?: SnackbarSeverity;
  onClose: () => void;
  duration?: number;
}

const CloseButton = styled(IconButton)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  justifySelf: "end",
  width: "1.625rem",
  height: "1.625rem",
  backgroundColor: "#ffffffff",
  color: "#000000",
  fontFamily: "Galmuri11",
  fontWeight: "bold",
  fontSize: "1.2rem",
  borderRadius: "0rem",
  marginRight: "0.2rem",
  marginBottom: "0.4rem",
});

const CommonSnackbar = ({
  open,
  message,
  severity = "info",
  onClose,
  duration = 3000,
}: CommonSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        backgroundColor: "#ffffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 7,
        zIndex: 99999,
      }}
    >
      <Alert
        severity={severity}
        variant="outlined"
        onClose={onClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Galmuri11",
          borderRadius: 0,
          border: "1.5px solid black",
          boxShadow: "2px 2px 0px rgba(0,0,0,1)",
        }}
        action={
          <CloseButton onClick={onClose}>
            <Box
              component="img"
              src="https://unpkg.com/pixelarticons@1.8.0/svg/close.svg"
              sx={{
                height: "1.25rem",
              }}
            />
          </CloseButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;
