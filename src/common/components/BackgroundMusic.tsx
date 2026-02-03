// common/components/BackgroundMusic.tsx
import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface BackgroundMusicProps {
  videoId: string;
  isPlaying: boolean;
}

export interface BackgroundMusicRef {
  setVolume: (volume: number) => void;
  seekTo: (seconds: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

const BackgroundMusic = forwardRef<BackgroundMusicRef, BackgroundMusicProps>(
  ({ videoId, isPlaying }, ref) => {
    const playerRef = useRef<any>(null);
    const [canAutoplay, setCanAutoplay] = useState(false);

    useImperativeHandle(ref, () => ({
      setVolume: (volume: number) => {
        if (playerRef.current) {
          playerRef.current.setVolume(volume);
        }
      },
      seekTo: (seconds: number) => {
        if (playerRef.current) {
          playerRef.current.seekTo(seconds);
        }
      },
      getCurrentTime: () => {
        if (playerRef.current) {
          return playerRef.current.getCurrentTime();
        }
        return 0;
      },
      getDuration: () => {
        if (playerRef.current) {
          return playerRef.current.getDuration();
        }
        return 0;
      },
    }));

    const onReady: YouTubeProps["onReady"] = (event) => {
      playerRef.current = event.target;

      // 사용자 상호작용이 있었다면 바로 재생
      if (canAutoplay && isPlaying) {
        event.target.setVolume(20);
        event.target.playVideo();
      }
    };

    // 사용자 상호작용 감지
    useEffect(() => {
      const handleUserInteraction = () => {
        setCanAutoplay(true);

        // 이미 플레이어가 준비되어 있다면 바로 재생
        if (playerRef.current && isPlaying) {
          playerRef.current.setVolume(20);
          playerRef.current.playVideo();
        }

        // 이벤트 리스너 제거
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("keydown", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
      };

      if (!canAutoplay) {
        document.addEventListener("click", handleUserInteraction);
        document.addEventListener("keydown", handleUserInteraction);
        document.addEventListener("touchstart", handleUserInteraction);
      }

      return () => {
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("keydown", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
      };
    }, [canAutoplay, isPlaying]);

    const onStateChange: YouTubeProps["onStateChange"] = (event) => {
      // 영상 종료 시 다시 재생 (루프)
      if (event.data === 0) {
        event.target.playVideo();
      }
    };

    useEffect(() => {
      if (playerRef.current && canAutoplay) {
        if (isPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      }
    }, [isPlaying, canAutoplay]);

    const opts: YouTubeProps["opts"] = {
      height: "0",
      width: "0",
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: videoId,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin,
      },
    };

    return (
      <div style={{ position: "fixed", top: -9999, left: -9999 }}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>
    );
  },
);

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;
