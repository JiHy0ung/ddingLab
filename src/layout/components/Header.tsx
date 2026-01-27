import { Box, Button, Typography } from "@mui/material";
import { ChefHat, Gavel, House } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2.5,
        py: 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        onClick={() => navigate("/")}
        sx={{ display: "block", alignItems: "center", gap: 0.5 }}
      >
        <Typography
          sx={{
            fontSize: { md: "2rem", sm: "1.875rem", xs: "1.625rem" },
            fontFamily: "Galmuri11",
            fontWeight: 900,
            letterSpacing: "-1.5px",
            cursor: "pointer",
            display: "inline",
            background: "linear-gradient(transparent 60%, #ffe066 60%)",
          }}
        >
          제빵 연구소
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <Button
          disableRipple
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.8,
            color: "grey",
            cursor: "pointer !important",
            px: 1.5,
            py: 1,
            borderRadius: "14px",
            "&:hover": {
              color: "#14161f",
              "& img": {
                filter: "invert(0%)",
              },
            },
          }}
        >
          <Box
            component="img"
            src="https://unpkg.com/pixelarticons@1.8.0/svg/home.svg"
            sx={{
              height: "18px",
              filter:
                "invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
            }}
          />
          <Typography
            onClick={() => navigate("/")}
            sx={{ fontFamily: "Galmuri11", fontSize: "14px" }}
          >
            홈
          </Typography>
        </Button>
        <Button
          onClick={() => navigate("/cooking")}
          disableRipple
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.8,
            color: "grey",
            cursor: "pointer !important",
            px: 1.5,
            py: 1,
            borderRadius: "14px",
            "&:hover": {
              color: "#14161f",
              "& img": {
                filter: "invert(0%)",
              },
            },
          }}
        >
          <Box
            component="img"
            src="https://unpkg.com/pixelarticons@1.8.0/svg/chart.svg"
            sx={{
              height: "18px",
              filter:
                "invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
            }}
          />
          <Typography sx={{ fontFamily: "Galmuri11", fontSize: "14px" }}>
            요리 리딩방
          </Typography>
        </Button>
        <Button
          onClick={() => navigate("/enhance")}
          disableRipple
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.8,
            color: "grey",
            cursor: "pointer !important",
            px: 1.5,
            py: 1,
            borderRadius: "14px",
            "&:hover": {
              color: "#14161f",
              "& img": {
                filter: "invert(0%)",
              },
            },
          }}
        >
          <Box
            component="img"
            src="https://unpkg.com/pixelarticons@1.8.0/svg/script-text.svg"
            sx={{
              height: "18px",
              filter:
                "invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
            }}
          />
          <Typography sx={{ fontFamily: "Galmuri11", fontSize: "14px" }}>
            강화 분석실
          </Typography>
        </Button>
        <Button
          onClick={() => navigate("/")}
          disableRipple
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.8,
            color: "grey",
            cursor: "pointer !important",
            px: 1.5,
            py: 1,
            borderRadius: "14px",
            "&:hover": {
              color: "#14161f",
              "& img": {
                filter: "invert(0%)",
              },
            },
          }}
        >
          <Box
            component="img"
            src="https://unpkg.com/pixelarticons@1.8.0/svg/users.svg"
            sx={{
              height: "18px",
              filter:
                "invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
            }}
          />
          <Typography sx={{ fontFamily: "Galmuri11", fontSize: "14px" }}>
            마을원 현황
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
