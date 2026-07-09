"use client";

import { useEffect, useMemo, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

function getTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

export default function Countdown() {
  const weddingDate = useMemo(() => "2026-07-23T11:00:00+05:30", []);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(weddingDate));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(weddingDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  if (!isMounted) return <div className="h-[150px]" />;

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  if (timeLeft.isExpired) {
    return (
      <div className="section-card p-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#FFDF73]/60">The Day Has Arrived</p>
        <h3 className="mt-3 font-[family-name:var(--font-heading)] text-4xl rg-text">
          Welcome to our wedding celebration
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item, index) => (
        <div key={item.label} className="section-card p-8 text-center pulse-glow group relative overflow-hidden">
          {/* Circular progress ring on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="50"
                fill="none"
                stroke="rgba(212,175,55,0.1)"
                strokeWidth="4"
              />
              <circle
                cx="56"
                cy="56"
                r="50"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset={314 - (item.value / (item.label === 'Days' ? 365 : item.label === 'Hours' ? 24 : 60)) * 314}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#FFDF73" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="font-[family-name:var(--font-heading)] text-6xl md:text-7xl rg-text tabular-nums relative z-10 cursor-pointer transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="mt-3 text-[10px] uppercase tracking-[0.5em] text-[#FFDF73]/60 relative z-10">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
