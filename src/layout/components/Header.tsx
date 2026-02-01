import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, userinfo, loading, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (loading) return;

    if (user) {
      console.log("✅ 로그인 상태");
      console.log("auth user:", user);
      console.log("userinfo:", userinfo);
    } else {
      console.log("❌ 로그인 안 됨");
    }
  }, [user, userinfo, loading]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        onClick={() => navigate("/")}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user ? (
          <>
            <IconButton
              sx={{
                height: "2.25rem",
                width: "2.25rem",
                padding: 0,
                background: "#cacacaff",
                borderRadius: "50%",
                overflow: "hidden",
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Box
                component="img"
                src={`https://cravatar.eu/helmavatar/${userinfo?.minecraft_id}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 0,
                  minWidth: "120px",
                  backgroundColor: "#f5f5f5ff",
                  border: "2px solid black",
                  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
                },
              }}
            >
              <Box sx={{ padding: "6px 16px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Box
                    component="img"
                    src={`https://cravatar.eu/helmavatar/${userinfo?.minecraft_id}`}
                    sx={{
                      width: "2.25rem",
                      height: "2.25rem",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontFamily: "Galmuri11",
                        fontWeight: "900",
                      }}
                    >
                      {userinfo?.username}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontFamily: "Galmuri11",
                      }}
                    >
                      {userinfo?.zodiac}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <MenuItem
                sx={{
                  display: "flex",
                  gap: "0.35rem",
                }}
                onClick={async () => {
                  setAnchorEl(null);
                  await signOut();
                  navigate("/");
                }}
              >
                <Box
                  component="img"
                  src="https://unpkg.com/pixelarticons@1.8.0/svg/logout.svg"
                  sx={{
                    height: "1.25rem",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontFamily: "Galmuri11",
                  }}
                >
                  로그아웃
                </Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <IconButton onClick={() => navigate("/login")}>
            <Box
              component="img"
              src="https://unpkg.com/pixelarticons@1.8.0/svg/login.svg"
              sx={{
                height: "18px",
              }}
            />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Header;
