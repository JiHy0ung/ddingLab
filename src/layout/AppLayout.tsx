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
import { PLAYLIST } from "../constants/playlistData";

const AppLayout = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(() => {
    const saved = localStorage.getItem("isMusicPlaying");
    return saved !== null ? saved === "true" : true;
  });

  const [isMusicInitialized, setIsMusicInitialized] = useState(false);
  const [showMusicControl, setShowMusicControl] = useState(false);

  // 현재 곡 인덱스
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    const saved = localStorage.getItem("currentTrackIndex");
    return saved ? parseInt(saved) : 0;
  });

  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("musicVolume");
    return savedVolume ? parseInt(savedVolume) : 12;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const musicRef = useRef<BackgroundMusicRef>(null);

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

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.setVolume(volume);
    }
  }, [currentTrackIndex, volume]);

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

  // 현재 곡 인덱스 저장
  useEffect(() => {
    localStorage.setItem("currentTrackIndex", String(currentTrackIndex));
  }, [currentTrackIndex]);

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

  // 다음 곡
  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setCurrentTime(0);
  };

  // 이전 곡
  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? PLAYLIST.length - 1 : prev - 1,
    );
    setCurrentTime(0);
  };

  return (
    <Box>
      <Header />
      <Box>
        <Outlet />
      </Box>

      {(isMusicPlaying || isMusicInitialized) && (
        <BackgroundMusic
          ref={musicRef}
          videoId={PLAYLIST[currentTrackIndex].id}
          isPlaying={isMusicPlaying}
          onEnded={handleNextTrack}
          volume={volume}
          key={PLAYLIST[currentTrackIndex].id}
        />
      )}

      <MusicControlPanel
        isVisible={showMusicControl}
        isPlaying={isMusicPlaying}
        volume={volume}
        currentTime={currentTime}
        duration={duration}
        currentTrack={PLAYLIST[currentTrackIndex]}
        totalTracks={PLAYLIST.length}
        currentTrackIndex={currentTrackIndex}
        onPlayPause={handleMusicToggle}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
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
