import {
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { styled } from "@mui/material/styles";

const DesktopHeaderMenu = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.625rem",

  [theme.breakpoints.down("sm")]: {
    display: "none",
    gap: "1rem",
  },
}));

const MobileHeaderMenu = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.625rem",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
    gap: "1rem",
  },
}));

const DrawerBox = styled(Box)({
  width: "20rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "end",
  gap: "1.5rem",
  padding: "1.625rem 1.625rem 1.625rem 2rem",
});

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
  border: "2px solid black",
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  borderRadius: "0rem",

  "&:hover": {
    backgroundColor: "#ff2f2fff",
  },
});

const MobileAuthBox = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  padding: "1rem 0",

  borderBottom: "2px dashed grey",
});

const MobileLoginButton = styled(Button)({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "0.5rem",
  transition: "all 0.3s ease",

  "&:hover": { backgroundColor: "transparent", transform: "scale(1.02)" },
});

const MobileMenuButton = styled(Button)({
  position: "relative",
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "0.5rem",
  color: "black",
  cursor: "pointer !important",
  transition: "all 0.3s ease",
  marginLeft: "0.75rem",

  "&::before": {
    content: '""',
    position: "absolute",
    left: -5,
    top: 0,
    width: "4px",
    height: "100%",
    background: "linear-gradient(to bottom, #000, #000)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },

  "&:hover::before": {
    opacity: 1,
  },

  "&:hover": {
    transform: "scale(1.02)",
    backgroundColor: "transparent",
    color: "#14161f",
    "& img": {
      transition: "all 0.3s ease",
      filter: "invert(0%)",
    },
  },
});

const Header = () => {
  const navigate = useNavigate();
  const { user, userinfo, loading, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const DrawerList = (
    <DrawerBox>
      <CloseButton onClick={handleClose}>
        <Box
          component="img"
          src="https://unpkg.com/pixelarticons@1.8.0/svg/close.svg"
          sx={{
            height: "1.25rem",
          }}
        />
      </CloseButton>
      <MobileAuthBox>
        {user ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                color: "black",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0 0.5rem",
                }}
              >
                <Box
                  component="img"
                  src={`https://cravatar.eu/helmavatar/${userinfo?.minecraft_id}`}
                  sx={{
                    width: "2.625rem",
                    height: "2.625rem",
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
            <MobileLoginButton
              onClick={async () => {
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
                  color: "black",
                  fontSize: "0.75rem",
                  fontFamily: "Galmuri11",
                }}
              >
                로그아웃
              </Typography>
            </MobileLoginButton>
          </Box>
        ) : (
          <MobileLoginButton onClick={() => navigate("/login")}>
            <Box
              component="img"
              src="https://unpkg.com/pixelarticons@1.8.0/svg/login.svg"
              sx={{
                height: "1.25rem",
              }}
            />
            <Typography
              sx={{
                color: "black",
                fontSize: "0.875rem",
                fontFamily: "Galmuri11",
              }}
            >
              로그인 하러가기
            </Typography>
          </MobileLoginButton>
        )}
      </MobileAuthBox>
      <MobileMenuButton onClick={() => navigate("/enhance")} disableRipple>
        <Box
          component="img"
          src="https://unpkg.com/pixelarticons@1.8.0/svg/home.svg"
          sx={{
            height: "18px",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Galmuri11",
            fontSize: "0.8125rem",
          }}
        >
          홈
        </Typography>
      </MobileMenuButton>
      <MobileMenuButton onClick={() => navigate("/cooking")} disableRipple>
        <Box
          component="img"
          src="https://unpkg.com/pixelarticons@1.8.0/svg/chart.svg"
          sx={{
            height: "18px",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Galmuri11",
            fontSize: "0.8125rem",
            letterSpacing: -1,
          }}
        >
          요리 리딩방
        </Typography>
      </MobileMenuButton>
      <MobileMenuButton onClick={() => navigate("/enhance")} disableRipple>
        <Box
          component="img"
          src="https://unpkg.com/pixelarticons@1.8.0/svg/script-text.svg"
          sx={{
            height: "18px",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Galmuri11",
            fontSize: "0.8125rem",
            letterSpacing: -1,
          }}
        >
          강화 분석실
        </Typography>
      </MobileMenuButton>
      <MobileMenuButton
        disableRipple
        sx={{
          opacity: 0.4,
          cursor: "not-allowed !important",
          filter: "invert(0%)",
          "& img": {
            transition: "all 0.3s ease",
            filter: "invert(0%)",
          },
          "&:hover": {
            transform: "scale(1)",
            backgroundColor: "transparent",
            color: "#14161f",
            "& img": {
              transition: "all 0.3s ease",
              filter: "invert(0%)",
            },
          },
        }}
      >
        <Box
          component="img"
          src="https://unpkg.com/pixelarticons@1.8.0/svg/anchor.svg"
          sx={{
            height: "18px",
            filter:
              "invert(95%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Galmuri11",
            fontSize: "0.8125rem",
            letterSpacing: -1,
          }}
        >
          해양 연금실
        </Typography>
      </MobileMenuButton>
    </DrawerBox>
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { md: 3, sm: 2, xs: 2 },
        py: 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { md: "3rem", sm: "1.25rem" },
        }}
      >
        <Typography
          onClick={() => navigate("/")}
          sx={{
            fontSize: {
              lg: "1.875rem",
              md: "1.625rem",
              sm: "1.5rem",
              xs: "1.25rem",
            },
            fontFamily: "Galmuri11",
            fontWeight: 900,
            letterSpacing: -2.5,
            cursor: "pointer",
            display: "inline",
            background: "linear-gradient(transparent 60%, #ffe066 60%)",
          }}
        >
          제빵 연구소
        </Typography>
        <DesktopHeaderMenu>
          <Button
            onClick={() => navigate("/enhance")}
            disableRipple
            sx={{
              minWidth: "1rem",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { md: "0.4rem", sm: "0.3rem", xs: "0.2rem" },
              color: "grey",
              cursor: "pointer !important",
              px: 0,
              py: 1,
              borderRadius: 0,
              transition: "all 0.3s ease",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: "linear-gradient(transparent 90%, black 90%)",
                opacity: 0,
                zIndex: -1,
                transition: "all 0.3s ease",
              },
              "&:hover::before": {
                opacity: 1,
              },
              "&:hover": {
                transform: "scale(1.02)",
                backgroundColor: "transparent",
                color: "#14161f",
                "& img": {
                  transition: "all 0.3s ease",
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
              sx={{
                fontFamily: "Galmuri11",
                fontSize: "0.8125rem",
              }}
            >
              홈
            </Typography>
          </Button>
          <Button
            onClick={() => navigate("/cooking")}
            disableRipple
            sx={{
              position: "relative",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.4rem",
              color: "grey",
              cursor: "pointer !important",
              px: 0,
              py: 1,
              borderRadius: 0,
              transition: "all 0.3s ease",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: "linear-gradient(transparent 90%, black 90%)",
                opacity: 0,
                zIndex: -1,
                transition: "all 0.3s ease",
              },
              "&:hover::before": {
                opacity: 1,
              },
              "&:hover": {
                transform: "scale(1.02)",
                backgroundColor: "transparent",
                color: "#14161f",
                "& img": {
                  transition: "all 0.3s ease",
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
            <Typography
              sx={{
                fontFamily: "Galmuri11",
                fontSize: "0.8125rem",
                letterSpacing: -1,
              }}
            >
              요리 리딩방
            </Typography>
          </Button>
          <Button
            onClick={() => navigate("/enhance")}
            disableRipple
            sx={{
              position: "relative",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { md: "0.4rem", sm: "0.3rem", xs: "0.2rem" },
              color: "grey",
              cursor: "pointer !important",
              px: 0,
              py: 1,
              borderRadius: 0,
              transition: "all 0.3s ease",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: "linear-gradient(transparent 90%, black 90%)",
                opacity: 0,
                zIndex: -1,
                transition: "all 0.3s ease",
              },
              "&:hover::before": {
                opacity: 1,
              },
              "&:hover": {
                transform: "scale(1.02)",
                backgroundColor: "transparent",
                color: "#14161f",
                "& img": {
                  transition: "all 0.3s ease",
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
            <Typography
              sx={{
                fontFamily: "Galmuri11",
                fontSize: "0.8125rem",
                letterSpacing: -1,
              }}
            >
              강화 분석실
            </Typography>
          </Button>
          <Button
            disableRipple
            sx={{
              opacity: 0.4,
              cursor: "not-allowed",

              position: "relative",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { md: "0.4rem", sm: "0.3rem", xs: "0.2rem" },
              color: "grey",
              px: 0,
              py: 1,
              borderRadius: 0,
            }}
          >
            <Box
              component="img"
              src="https://unpkg.com/pixelarticons@1.8.0/svg/anchor.svg"
              sx={{
                height: "18px",
                filter:
                  "invert(95%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
              }}
            />
            <Typography
              sx={{
                fontFamily: "Galmuri11",
                fontSize: "0.8125rem",
                letterSpacing: -1,
              }}
            >
              해양 연금실
            </Typography>
          </Button>
        </DesktopHeaderMenu>
        {/* <Button
          onClick={() => navigate("/")}
          disableRipple
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.8,
            color: "grey",
            cursor: "pointer !important",
            px: 0,
            py: 1,
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
          <Typography sx={{ fontFamily: "Galmuri11", fontSize: "0.8125rem" }}>
            마을원 현황
          </Typography>
        </Button> */}
      </Box>
      <MobileHeaderMenu>
        <Button
          onClick={handleOpen}
          disableRipple
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "1rem",
            padding: "0 0.25rem",
            minWidth: 0,
            width: "fit-content",
            "&:hover": { background: "transparent" },
          }}
        >
          <Box
            component="img"
            src="https://unpkg.com/pixelarticons@1.8.0/svg/menu.svg"
            sx={{
              height: "1.75rem",
            }}
          />
        </Button>
      </MobileHeaderMenu>
      <Drawer open={open} anchor="right">
        {DrawerList}
      </Drawer>
      <Box
        sx={{
          display: { sm: "flex", xs: "none" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user ? (
          <>
            <IconButton
              sx={{
                width: { md: "2.25rem", sm: "2rem", xs: "2rem" },
                height: { md: "2.25rem", sm: "2rem", xs: "2rem" },
                padding: 0,
                background: "#cacacaff",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1.5px solid black",
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
              disableScrollLock
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 0,
                  transition: "all 0.3s ease",
                  minWidth: "120px",
                  backgroundColor: "#f5f5f5ff",
                  border: "2px solid black",
                  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
                },
              }}
            >
              <Box
                sx={{
                  padding: "0.5rem 1rem 1rem 1rem",
                  borderBottom: "1px solid #bebebeff",
                }}
              >
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
