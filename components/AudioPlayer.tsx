"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Disc3, Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer({ triggerPlay }: { triggerPlay?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Trigger play when external signal received
  useEffect(() => {
    if (triggerPlay && audioRef.current && !isPlaying) {
      setHasInteracted(true);
      setIsPlaying(true);
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [triggerPlay]);

  // Auto-play attempt on mount (usually blocked, but we try!)
  useEffect(() => {
    if (audioRef.current && hasInteracted) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, hasInteracted]);

  const togglePlay = () => {
    setHasInteracted(true);
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* 
        HOW TO ADD CUSTOM SOUND:
        1. Place your audio file in the "public" folder of this project.
        2. Name it "bg-music.mp3" (or change the src="/bg-music.mp3" below to match).
        3. Make sure the file format is supported (mp3, wav, ogg).
      */}
      <audio 
        ref={audioRef} 
        src="/bg-music.mp3" 
        loop 
        preload="auto"
      />

      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(212,175,55,0.4)] bg-[#000000] text-[#FFDF73] shadow-[0_0_25px_rgba(212,175,55,0.3)] backdrop-blur-xl transition-all hover:scale-110 hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] active:scale-95 sm:bottom-10 sm:right-10"
        aria-label="Toggle music"
      >
        <div className={`absolute inset-0 rounded-full border border-[#D4AF37]/40 ${isPlaying ? 'animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]' : ''}`} />
        {isPlaying ? (
          <Disc3 className="h-6 w-6 animate-[spin_4s_linear_infinite] text-[#FFDF73]" />
        ) : (
          <Music className="h-6 w-6 text-[#D4AF37]" />
        )}
      </button>
    </>
  );
}
