import { Pause, Play, Volume2 } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import fes from "@/assets/fes.png";

type MusicContextValue = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  togglePlayback: () => Promise<void>;
  seek: (value: number) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const updatePlaying = () => setIsPlaying(!audio.paused);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("play", updatePlaying);
    audio.addEventListener("pause", updatePlaying);
    audio.addEventListener("ended", updatePlaying);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("play", updatePlaying);
      audio.removeEventListener("pause", updatePlaying);
      audio.removeEventListener("ended", updatePlaying);
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  }

  return (
    <MusicContext.Provider value={{ isPlaying, currentTime, duration, togglePlayback, seek }}>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}katakulli-sarkisi.mpeg`}
        loop
        preload="metadata"
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusicPlayer MusicPlayerProvider içinde kullanılmalı.");
  return context;
}

export function MusicPlayer() {
  const { isPlaying, togglePlayback } = useMusicPlayer();

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6 md:top-24 md:bottom-auto">
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Şarkıyı durdur" : "Katakulli şarkısını başlat"}
        className="group flex h-14 w-14 items-center justify-center gap-3 rounded-full border border-gold/60 bg-background/90 px-2 text-gold shadow-[0_12px_35px_rgba(0,0,0,0.35),0_0_24px_rgba(216,170,80,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-gold hover:bg-burgundy hover:text-cream md:w-auto md:justify-start md:px-3 md:pr-4"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-burgundy/80 transition-transform duration-300 group-hover:scale-105">
          <img
            src={fes}
            alt=""
            width={40}
            height={40}
            className={`h-9 w-9 object-contain drop-shadow ${isPlaying ? "animate-[spin_3s_linear_infinite]" : ""}`}
          />
          <span className="sr-only">{isPlaying ? "Şarkı çalıyor" : "Şarkı duraklatıldı"}</span>
        </span>
        <span className="hidden pr-1 text-xs font-bold tracking-[0.16em] uppercase md:inline">
          {isPlaying ? "Şarkıyı durdur" : "Şarkıyı başlat"}
        </span>
        {isPlaying ? (
          <Pause className="h-4 w-4 opacity-70" />
        ) : (
          <Play className="h-4 w-4 opacity-70" fill="currentColor" />
        )}
        <Volume2 className="hidden h-4 w-4 opacity-70 sm:block" />
      </button>
    </div>
  );
}

export function MusicPlayerControls() {
  const { isPlaying, currentTime, duration, togglePlayback, seek } = useMusicPlayer();

  return (
    <div className="relative mt-6 flex items-center gap-3 md:mt-0 md:w-[min(100%,24rem)]">
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Şarkıyı durdur" : "Katakulli şarkısını başlat"}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-accent-foreground transition-colors hover:bg-gold-soft"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" fill="currentColor" />
        )}
      </button>
      <input
        type="range"
        min="0"
        max={duration || 0}
        step="0.1"
        value={Math.min(currentTime, duration || 0)}
        onChange={(event) => seek(Number(event.target.value))}
        aria-label="Şarkı ilerlemesi"
        className="min-w-0 flex-1 accent-gold"
      />
      <span className="w-10 text-right font-mono text-xs text-muted-foreground">
        {formatTime(currentTime)}
      </span>
    </div>
  );
}

function formatTime(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
