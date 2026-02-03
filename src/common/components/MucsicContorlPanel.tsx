import { Box, Slider, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ControlPanel = styled(Box)({
  position: "fixed",
  bottom: 90,
  right: 90,
  width: 280,
  backgroundColor: "black",
  border: "1.5px solid #333",
  borderRadius: 8,
  padding: 16,
  boxShadow: "2px 2px 8px #0000005b",
  zIndex: 999,
  transition: "all 0.3s ease",
});

interface MusicControlPanelProps {
  isVisible: boolean;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
}

const MusicControlPanel = ({
  isVisible,
  isPlaying,
  volume,
  currentTime,
  duration,
  onPlayPause,
  onVolumeChange,
  onSeek,
}: MusicControlPanelProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isVisible) return null;

  return (
    <ControlPanel
      sx={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* 재생/일시정지 버튼 */}
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
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
      </Box>

      {/* 시간 슬라이더 */}
      <Box mb={2}>
        <Slider
          value={currentTime}
          max={duration}
          onChange={(_, value) => onSeek(value as number)}
          sx={{
            color: "white",
            "& .MuiSlider-thumb": {
              width: 12,
              height: 12,
            },
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" color="white">
            {formatTime(currentTime)}
          </Typography>
          <Typography variant="caption" color="white">
            {formatTime(duration)}
          </Typography>
        </Box>
      </Box>

      {/* 볼륨 조절 */}
      <Box>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Box
            component="img"
            src="https://unpkg.com/pixelarticons@1.8.0/svg/volume.svg"
            sx={{
              filter: "brightness(0) invert(1)",
              height: "1rem",
            }}
          />
          <Typography variant="caption" color="white">
            {volume}%
          </Typography>
        </Box>
        <Slider
          value={volume}
          onChange={(_, value) => onVolumeChange(value as number)}
          sx={{
            color: "white",
            "& .MuiSlider-thumb": {
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
