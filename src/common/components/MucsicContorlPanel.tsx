import { Box, Slider, IconButton, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { useState, useRef, useEffect } from "react";

const ControlPanel = styled(Box)({
  position: "fixed",
  bottom: 90,
  right: 90,
  width: 280,
  backgroundColor: "black",
  border: "1.5px solid #333",
  borderRadius: 0,
  padding: 16,
  boxShadow: "2px 2px 8px #0000005b",
  zIndex: 999,
  transition: "all 0.3s ease",
});

const marquee = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const MarqueeContainer = styled(Box)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
});

const MarqueeText = styled(Typography)<{ shouldAnimate: boolean }>(
  ({ shouldAnimate }) => ({
    fontFamily: "Galmuri11",
    fontSize: "0.875rem",
    color: "white",
    textAlign: "center",
    whiteSpace: "nowrap",
    display: "inline-block",
    paddingRight: shouldAnimate ? "2rem" : "0",
    animation: shouldAnimate ? `${marquee} 10s linear infinite` : "none",
  }),
);

interface Track {
  id: string;
  title: string;
  artist: string;
}

interface MusicControlPanelProps {
  isVisible: boolean;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  currentTrack: Track;
  totalTracks: number;
  currentTrackIndex: number;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

const MusicControlPanel = ({
  isVisible,
  isPlaying,
  volume,
  currentTime,
  duration,
  currentTrack,
  totalTracks,
  currentTrackIndex,
  onPlayPause,
  onVolumeChange,
  onSeek,
  onNextTrack,
  onPrevTrack,
}: MusicControlPanelProps) => {
  const [previousVolume, setPreviousVolume] = useState(2);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const trackText = `${currentTrack.title} - ${currentTrack.artist}`;

  // 텍스트가 컨테이너보다 길면 애니메이션 활성화
  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      setShouldAnimate(textWidth > containerWidth);
    }
  }, [trackText]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMuteToggle = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      onVolumeChange(0);
    } else {
      onVolumeChange(previousVolume || 15);
    }
  };

  if (!isVisible) return null;

  return (
    <ControlPanel
      sx={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* 현재 곡 정보 */}
      <Box mb={2} pb={2} borderBottom="1px solid #333">
        <MarqueeContainer ref={containerRef}>
          <MarqueeText ref={textRef} shouldAnimate={shouldAnimate}>
            {trackText}
            {shouldAnimate && `  ${trackText}`}
          </MarqueeText>
        </MarqueeContainer>
        <Typography
          sx={{
            fontFamily: "Galmuri11",
            fontSize: "0.625rem",
            color: "#999",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          {currentTrackIndex + 1} / {totalTracks}
        </Typography>
      </Box>

      {/* 재생 컨트롤 버튼 */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        mb={2}
      >
        <IconButton onClick={onPrevTrack} sx={{ color: "white" }}>
          <Box
            component="img"
            src="https://unpkg.com/pixelarticons@1.8.0/svg/prev.svg"
            sx={{
              filter: "brightness(0) invert(1)",
              height: "1.25rem",
            }}
          />
        </IconButton>

        <IconButton onClick={onPlayPause} sx={{ color: "white" }}>
          <Box
            component="img"
            src={`https://unpkg.com/pixelarticons@1.8.0/svg/${
              isPlaying ? "pause" : "play"
            }.svg`}
            sx={{
              filter: "brightness(0) invert(1)",
              height: "1.5rem",
            }}
          />
        </IconButton>

        <IconButton onClick={onNextTrack} sx={{ color: "white" }}>
          <Box
            component="img"
            src="https://unpkg.com/pixelarticons@1.8.0/svg/next.svg"
            sx={{
              filter: "brightness(0) invert(1)",
              height: "1.25rem",
            }}
          />
        </IconButton>
      </Box>

      {/* 시간 슬라이더 */}
      <Box mb={2}>
        <Slider
          value={currentTime}
          max={duration}
          onChange={(_, value) => onSeek(value as number)}
          sx={{
            borderRadius: 0,
            color: "white",
            "& .MuiSlider-thumb": {
              borderRadius: "2px",
              width: 12,
              height: 12,
            },
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="caption"
            color="white"
            sx={{ fontFamily: "Galmuri11", fontSize: "0.625rem" }}
          >
            {formatTime(currentTime)}
          </Typography>
          <Typography
            variant="caption"
            color="white"
            sx={{ fontFamily: "Galmuri11", fontSize: "0.625rem" }}
          >
            {formatTime(duration)}
          </Typography>
        </Box>
      </Box>

      {/* 볼륨 조절 */}
      <Box>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Box
            component="img"
            src={`https://unpkg.com/pixelarticons@1.8.0/svg/${
              volume === 0 ? "volume-mute" : "volume-3"
            }.svg`}
            onClick={handleMuteToggle}
            sx={{
              filter: "brightness(0) invert(1)",
              height: "1rem",
              cursor: "pointer",
              "&:hover": {
                opacity: 0.7,
              },
            }}
          />
          <Typography
            variant="caption"
            color="white"
            sx={{ fontFamily: "Galmuri11", fontSize: "0.625rem" }}
          >
            {volume}%
          </Typography>
        </Box>
        <Slider
          value={volume}
          onChange={(_, value) => onVolumeChange(value as number)}
          sx={{
            borderRadius: 0,
            color: "white",
            "& .MuiSlider-thumb": {
              borderRadius: "2px",
              width: 12,
              height: 12,
            },
          }}
        />
      </Box>
    </ControlPanel>
  );
};

export default MusicControlPanel;
