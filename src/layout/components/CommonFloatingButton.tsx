import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Fab } from "@mui/material";

const FloatingButton = styled(Fab)({
  position: "fixed",
  bottom: 30,
  right: 30,
  backgroundColor: "black",
  border: "1.5px solid black",
  boxShadow: "2px 2px 4px #0000005b",
  zIndex: 1000,

  "&:hover": {
    backgroundColor: "black",
    boxShadow: "2px 2px 4px #0000005b",
  },
  "&:active": {
    backgroundColor: "black",
    boxShadow: "2px 2px 4px #0000005b",
    transform: "translate(1px, 1px)",
  },
  "&.Mui-focusVisible": {
    boxShadow: "2px 2px 4px #0000005b",
  },
});

const SubButton = styled(Fab)({
  position: "fixed",
  right: 30,
  backgroundColor: "black",
  border: "1.5px solid black",
  boxShadow: "2px 2px 4px #0000005b",
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: "#333",
    boxShadow: "2px 2px 4px #0000005b",
  },
  "&:active": {
    transform: "translate(1px, 1px)",
  },
});

interface CommonFloatingButtonProps {
  isMusicPlaying: boolean;
  showMusicControl: boolean;
  setShowMusicControl: React.Dispatch<React.SetStateAction<boolean>>;
  onMusicToggle: () => void;
  onMusicControlOpen: () => void;
}

const CommonFloatingButton = ({
  isMusicPlaying,
  onMusicToggle,
  onMusicControlOpen,
  showMusicControl,
  setShowMusicControl,
}: CommonFloatingButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTopZone, setIsTopZone] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0;

      setIsTopZone(ratio <= 0.3);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (showMusicControl) {
      setShowMusicControl(false);
    }
  };

  const handleScrollAction = () => {
    if (isTopZone) {
      // 상단 30% → 아래로
      window.scrollTo({
        top: 1350,
        behavior: "smooth",
      });
    } else {
      // 그 외 → 위로
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    setIsOpen(false);
    if (showMusicControl) {
      setShowMusicControl(false);
    }
  };

  const handleMusicControlOpen = () => {
    onMusicControlOpen();
    if (showMusicControl) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <SubButton
        size="medium"
        disableRipple
        onClick={handleMusicControlOpen}
        sx={{
          bottom: isOpen ? 150 : 30,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <Box
          component="img"
          src={`https://unpkg.com/pixelarticons@1.8.0/svg/${
            isMusicPlaying ? "music" : "volume-x"
          }.svg`}
          sx={{
            filter: "brightness(0) invert(1)",
            height: "1.25rem",
          }}
        />
      </SubButton>

      <SubButton
        size="medium"
        disableRipple
        onClick={handleScrollAction}
        sx={{
          bottom: isOpen ? 90 : 30,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <Box
          component="img"
          src={`https://unpkg.com/pixelarticons@1.8.0/svg/${
            isTopZone ? "arrow-down" : "arrow-up"
          }.svg`}
          sx={{
            filter: "brightness(0) invert(1)",
            height: "1.25rem",
          }}
        />
      </SubButton>

      <FloatingButton size="medium" disableRipple onClick={handleToggle}>
        <Box
          component="img"
          src="https://unpkg.com/pixelarticons@1.8.0/svg/close.svg"
          sx={{
            filter: "brightness(0) invert(1)",
            height: "1.25rem",
            transform: isOpen ? "rotate(180deg)" : "rotate(45deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </FloatingButton>
    </>
  );
};

export default CommonFloatingButton;
