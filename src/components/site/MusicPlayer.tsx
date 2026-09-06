import { Pause, Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}katakulli-sarkisi.mpeg`}
        loop
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Şarkıyı durdur" : "Katakulli şarkısını başlat"}
        className="group flex h-14 items-center gap-3 rounded-full border border-gold/60 bg-burgundy-deep/95 px-4 text-gold shadow-[0_12px_35px_rgba(0,0,0,0.35),0_0_24px_rgba(216,170,80,0.18)] backdrop-blur transition-all duration-300 hover:border-gold hover:bg-burgundy hover:text-cream"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-background transition-transform duration-300 group-hover:scale-105">
          {isPlaying ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" />}
        </span>
        <span className="hidden pr-1 text-xs font-bold tracking-[0.16em] uppercase sm:inline">
          {isPlaying ? "Şarkıyı durdur" : "Şarkıyı başlat"}
        </span>
        <Volume2 className="h-4 w-4 opacity-70" />
      </button>
    </div>
  );
}
