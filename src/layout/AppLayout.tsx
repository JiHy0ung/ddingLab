import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Header from "./components/Header";
import CommonFloatingButton from "./components/CommonFloatingButton";
import BackgroundMusic, {
  BackgroundMusicRef,
} from "../common/components/BackgroundMusic";
import { useState, useRef, useEffect } from "react";
import MusicControlPanel from "../common/components/MucsicContorlPanel";
import CommonSnackbar from "../common/components/CommonSnackBar";

const AppLayout = () => {
  // localStorage에서 음악 설정 불러오기 (기본값 true)
  const [isMusicPlaying, setIsMusicPlaying] = useState(() => {
    const saved = localStorage.getItem("isMusicPlaying");
    return saved !== null ? saved === "true" : true; // 기본값 true
  });

  const [isMusicInitialized, setIsMusicInitialized] = useState(false);
  const [showMusicControl, setShowMusicControl] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("musicVolume");
    return savedVolume ? parseInt(savedVolume) : 20;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const musicRef = useRef<BackgroundMusicRef>(null);
  const YOUTUBE_VIDEO_ID = "ZO0brUR1L4Q";

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

  // 초기 안내 메시지
  useEffect(() => {
    const hasSeenMusicGuide = localStorage.getItem("hasSeenMusicGuide");

    if (!hasSeenMusicGuide) {
      const timer = setTimeout(() => {
        openSnackbar(
          "🎵 배경음악이 재생중입니다. 우측 하단 버튼으로 조절할 수 있어요!",
          "info",
        );
        localStorage.setItem("hasSeenMusicGuide", "true");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  // 음악이 처음 켜질 때 초기화
  useEffect(() => {
    if (isMusicPlaying && !isMusicInitialized) {
      setIsMusicInitialized(true);
    }
  }, [isMusicPlaying, isMusicInitialized]);

  // 음악 재생 상태 저장
  useEffect(() => {
    localStorage.setItem("isMusicPlaying", String(isMusicPlaying));
  }, [isMusicPlaying]);

  // 볼륨 상태 저장
  useEffect(() => {
    localStorage.setItem("musicVolume", String(volume));
  }, [volume]);

  // 현재 재생 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      if (musicRef.current && isMusicPlaying) {
        setCurrentTime(musicRef.current.getCurrentTime());
        setDuration(musicRef.current.getDuration());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMusicPlaying]);

  const handleMusicToggle = () => {
    const newState = !isMusicPlaying;
    setIsMusicPlaying(newState);
  };

  const handleMusicControlOpen = () => {
    setShowMusicControl((prev) => !prev);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    musicRef.current?.setVolume(newVolume);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    musicRef.current?.seekTo(time);
  };

  return (
    <Box>
      <Header />
      <Box>
        <Outlet />
      </Box>

      {/* 기본적으로 음악 컴포넌트 렌더링 */}
      {(isMusicPlaying || isMusicInitialized) && (
        <BackgroundMusic
          ref={musicRef}
          videoId={YOUTUBE_VIDEO_ID}
          isPlaying={isMusicPlaying}
        />
      )}

      <MusicControlPanel
        isVisible={showMusicControl}
        isPlaying={isMusicPlaying}
        volume={volume}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handleMusicToggle}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
      />

      <CommonFloatingButton
        isMusicPlaying={isMusicPlaying}
        onMusicToggle={handleMusicToggle}
        onMusicControlOpen={handleMusicControlOpen}
      />

      <CommonSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default AppLayout;
