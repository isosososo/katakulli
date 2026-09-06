import { Pause, Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import fes from "@/assets/fes.png";

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
    <div className="fixed top-[4.75rem] right-4 z-40 sm:right-6 md:top-24">
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
        className="group flex h-14 items-center gap-3 rounded-full border border-gold/60 bg-background/90 px-3 pr-4 text-gold shadow-[0_12px_35px_rgba(0,0,0,0.35),0_0_24px_rgba(216,170,80,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-gold hover:bg-burgundy hover:text-cream"
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
        <span className="pr-1 text-[0.65rem] font-bold tracking-[0.12em] uppercase sm:text-xs sm:tracking-[0.16em]">
          {isPlaying ? "Şarkıyı durdur" : "Şarkıyı başlat"}
        </span>
        {isPlaying ? <Pause className="h-4 w-4 opacity-70" /> : <Play className="h-4 w-4 opacity-70" fill="currentColor" />}
        <Volume2 className="hidden h-4 w-4 opacity-70 sm:block" />
      </button>
    </div>
  );
}
