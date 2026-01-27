import { Box } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        component="img"
        src="https://unpkg.com/pixelarticons@1.8.0/svg/moon-stars.svg"
        alt="loading"
        sx={{
          width: 48,
          height: 48,
          animation: "twinkle 1s infinite ease-in-out",
          "@keyframes twinkle": {
            "0%": {
              opacity: 1,
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 0.2rem #f1d236ff)",
            },
            "50%": {
              opacity: 1,
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 0.2rem #ff8ef4ff)",
            },
            "100%": {
              opacity: 1,
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 0.2rem #8db7ffff)",
            },
          },
        }}
      />
    </Box>
  );
};

export default LoadingSpinner;
