"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import Countdown from "@/components/Countdown";
import RSVPForm from "@/components/RSVPForm";
import OpeningAnimation from "@/components/OpeningAnimation";

const details = {
  groom: "Shehara",
  bride: "Oshadi",
  groomFull: "Sadun",
  brideFull: "Oshadi",
  dateFull: "Thursday, 23 July 2026",
  dateShort: "23 · 07 · 2026",
  time: "11:00 AM — 5:00 PM",
  poruwa: "10:00 AM",
  venue: "Samanala Hotel & Resort",
  city: "Nochchiyagama, Sri Lanka",
  phone: "+94 76 789 4772",
  map: "https://www.google.com/maps/search/?api=1&query=Samanala+Hotel+Resort+Nochchiyagama",
  whatsapp: "https://wa.me/94767894772",
  groomParents: "Mr. Subasingha & Mrs. Anusha",
  brideParents: "Mr. Shantha & Mrs. H Ranjani",
};

/* Reusable ornament SVG between sections */
function FlowerDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <div className="rg-divider flex-1 max-w-[150px]" />
      <span className="text-2xl glow-pulse" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.6))" }}>✨</span>
      <div className="rg-divider flex-1 max-w-[150px]" />
    </div>
  );
}

/* Decorative icon pill with enhanced styling */
function RGPill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.08)] px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-[#FFDF73]/90 backdrop-blur-sm hover:border-[rgba(212,175,55,0.6)] hover:bg-[rgba(212,175,55,0.12)] transition-all duration-300">
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10,
      size: 15 + Math.random() * 25,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ zIndex: 1 }}>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-[-100px] text-[#D4AF37] opacity-0 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animation: `floatUp ${h.duration}s ease-in-out ${h.delay}s infinite`,
          }}
        >
          ❤
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0; }
          20% { opacity: 0.6; }
          50% { transform: translateY(-50vh) scale(1.2) rotate(25deg); opacity: 0.8; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-120vh) scale(0.8) rotate(-25deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function HomeContent() {
  const [done, setDone] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const searchParams = useSearchParams();
  
  const iParam = searchParams.get("i");
  let guestData: { n?: string; p?: string; g?: string } | null = null;
  if (iParam) {
    try {
      guestData = JSON.parse(decodeURIComponent(atob(iParam)));
    } catch (e) {
      console.error("Invalid invite link");
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#000000]">

      {/* ══ OPENING ANIMATION ══ */}
      {!done && <OpeningAnimation onComplete={() => setDone(true)} onEnvelopeOpen={() => setEnvelopeOpened(true)} guestName={guestData?.n} />}

      {/* ══ PAGE CONTENT ══ */}
      <div style={{ opacity: done ? 1 : 0, transition: "opacity 2s ease" }}
           className={!done ? "pointer-events-none h-screen overflow-hidden" : ""}>

        {envelopeOpened && <FloatingHearts />}
        <AudioPlayer triggerPlay={envelopeOpened} />

        {/* ────────────────────────────────────
            SECTION 1  · CINEMATIC HERO
        ──────────────────────────────────── */}
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
          {/* Enhanced orbit rings with glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{ width: "700px", height: "700px", borderRadius: "50%", border: "1px dashed rgba(212,175,55,0.15)", animation: "spin 100s linear infinite", boxShadow: "0 0 30px rgba(212,175,55,0.05)" }} />
            <div style={{ position: "absolute", width: "550px", height: "550px", borderRadius: "50%", border: "1px solid rgba(255,223,115,0.08)", animation: "spin 80s linear infinite reverse", boxShadow: "0 0 20px rgba(255,223,115,0.03)" }} />
            <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", border: "1px dotted rgba(183,110,121,0.12)", animation: "spin 60s linear infinite" }} />
          </div>

          {/* Top overline with enhanced styling */}
          <p className="text-[11px] uppercase tracking-[1em] text-[#D4AF37] font-medium mb-10 fade-up glow-pulse" style={{ animationDelay: "0.1s" }}>
            ✦ &ensp; The Wedding Celebration &ensp; ✦
          </p>

          {/* Names with enhanced typography */}
          <div className="fade-up" style={{ animationDelay: "0.3s", position: "relative", zIndex: 10 }}>
            <h1
              className="font-[family-name:var(--font-heading)] leading-[0.85] tracking-tight"
              style={{ fontSize: "clamp(80px, 20vw, 200px)" }}
            >
              <span className="block rg-text cursor-pointer transition-transform duration-500 hover:scale-110 hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]">{details.groom}</span>
              <span
                className="block font-[family-name:var(--font-script)] rose-text cursor-pointer transition-transform duration-500 hover:scale-110 hover:drop-shadow-[0_0_30px_rgba(183,110,121,0.6)]"
                style={{ fontSize: "clamp(40px, 10vw, 90px)", padding: "12px 0", margin: "0", letterSpacing: "0.05em", lineHeight: "1.2" }}
              >
                &amp;
              </span>
              <span className="block rg-text cursor-pointer transition-transform duration-500 hover:scale-110 hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]">{details.bride}</span>
            </h1>
          </div>

          {/* Date & Venue pill row with enhanced styling */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 fade-up" style={{ animationDelay: "0.5s", zIndex: 10 }}>
            <RGPill icon="📅" label={details.dateShort} />
            <RGPill icon="📍" label={details.venue} />
          </div>

          {/* Enhanced scroll indicator */}
          <div className="mt-20 flex flex-col items-center gap-5 fade-up" style={{ animationDelay: "0.7s", zIndex: 10 }}>
            <div className="h-24 w-[1px]" style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.9), rgba(183,110,121,0.5), transparent)" }} />
            <a href="#rsvp"
               className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37] hover:text-[#FFDF73] transition-colors glow-pulse">
              Scroll to RSVP ↓
            </a>
          </div>
        </section>

        {/* ────────────────────────────────────
            SECTION 2  · THE FAMILIES
        ──────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28 relative z-10">
          <div className="mx-auto max-w-5xl">
            <FlowerDivider />

            <div className="rg-card p-12 md:p-20 scale-in">
              {/* Section label */}
              <p className="text-[11px] uppercase tracking-[0.7em] text-[#D4AF37]/90 mb-4">Together with their families</p>
              <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl rg-text mb-12">
                With Love &amp; Blessings
              </h2>

              <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                {/* Groom's family */}
                <div className="card-tilt fade-up group relative" style={{ animationDelay: "0.2s" }}>
                  {/* Photo frame effect on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] rounded-lg transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="rg-divider w-12" />
                    <p className="text-[11px] uppercase tracking-[0.5em] text-[#FFDF73]/80">Groom</p>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[#FFF8DC] mb-4 relative z-10 group-hover:scale-105 transition-transform duration-500">{details.groomFull}</h3>
                  <p className="text-base text-[#FFDF73]/75 leading-relaxed relative z-10">Beloved Son of<br /><span className="text-[#FFDF73] font-medium">{details.groomParents}</span></p>
                </div>
                {/* Bride's family */}
                <div className="card-tilt fade-up group relative" style={{ animationDelay: "0.4s" }}>
                  {/* Photo frame effect on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#B76E79] rounded-lg transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(183,110,121,0.3)]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(183,110,121,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="rg-divider w-12" />
                    <p className="text-[11px] uppercase tracking-[0.5em] text-[#FFDF73]/80">Bride</p>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[#FFF8DC] mb-4 relative z-10 group-hover:scale-105 transition-transform duration-500">{details.brideFull}</h3>
                  <p className="text-base text-[#FFDF73]/75 leading-relaxed relative z-10">Beloved Daughter of<br /><span className="text-[#FFDF73] font-medium">{details.brideParents}</span></p>
                </div>
              </div>
            </div>

            <FlowerDivider />
          </div>
        </section>

        {/* ────────────────────────────────────
            SECTION 3  · COUNTDOWN
        ──────────────────────────────────── */}
        <section className="px-6 pb-20 md:pb-28 relative z-10">
          <div className="mx-auto max-w-5xl">
            <p className="text-center text-[11px] uppercase tracking-[0.7em] text-[#D4AF37]/90 mb-10 fade-up">Days Until We Say I Do</p>
            <div className="scale-in">
              <Countdown />
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────
            SECTION 4  · EVENT DETAILS (3-column)
        ──────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28 relative z-10">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-[11px] uppercase tracking-[0.7em] text-[#D4AF37]/90 mb-5 fade-up">Mark Your Calendar</p>
              <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl rg-text fade-up" style={{ animationDelay: "0.2s" }}>The Grand Day</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Date */}
              <div className="rg-card p-10 text-center fade-up group relative overflow-hidden" style={{ animationDelay: "0.3s" }}>
                {/* Calendar overlay on hover */}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.98)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center z-10">
                  <div className="transform scale-0 group-hover:scale-110 transition-transform duration-700 delay-100">
                    <div className="border-3 border-[#D4AF37] rounded-xl p-6 bg-[#0a0a0a] shadow-[0_0_60px_rgba(212,175,55,0.3),0_0_100px_rgba(212,175,55,0.1)] relative">
                      {/* Decorative corners */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-lg" />
                      
                      <div className="text-center mb-3 text-[#D4AF37] text-base uppercase tracking-[0.3em] font-semibold">July 2026</div>
                      <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        <div className="text-[#FFDF73]/70 font-semibold">S</div>
                        <div className="text-[#FFDF73]/70 font-semibold">M</div>
                        <div className="text-[#FFDF73]/70 font-semibold">T</div>
                        <div className="text-[#FFDF73]/70 font-semibold">W</div>
                        <div className="text-[#FFDF73]/70 font-semibold">T</div>
                        <div className="text-[#FFDF73]/70 font-semibold">F</div>
                        <div className="text-[#FFDF73]/70 font-semibold">S</div>
                        
                        {/* Blank days for Sun, Mon, Tue */}
                        <div />
                        <div />
                        <div />
                        
                        {/* Days 1 to 31 */}
                        {[...Array(31)].map((_, i) => {
                          const day = i + 1;
                          if (day === 23) {
                            return (
                              <div key={day} className="relative flex items-center justify-center py-1 text-[#FFDF73] font-semibold">
                                {/* Static faint ring */}
                                <div className="absolute w-7 h-7 rounded-full border border-[rgba(212,175,55,0.3)]" />
                                {/* Spinning highlighted ring */}
                                <div className="absolute w-7 h-7 rounded-full border-2 border-transparent border-t-[#D4AF37] border-r-[#D4AF37] animate-[spin_3s_linear_infinite] shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                                <span className="relative z-10">{day}</span>
                              </div>
                            );
                          }
                          return (
                            <div key={day} className="text-[#FFDF73]/40 py-1 flex items-center justify-center">
                              {day}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="float-anim mb-8 mx-auto w-20 h-20 rounded-full border border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.1)] flex items-center justify-center pulse-glow">
                  <span className="text-3xl" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.6))" }}>📅</span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.5em] text-[#D4AF37]/90 mb-4">Date</p>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[#FFF8DC] leading-tight">{details.dateFull}</h3>
              </div>
              {/* Time */}
              <div className="rg-card p-10 text-center md:-translate-y-6 fade-up group relative overflow-hidden" style={{ animationDelay: "0.5s" }}>
                {/* Clock animation on hover */}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.98)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center z-10">
                  <div className="transform scale-0 group-hover:scale-110 transition-transform duration-700 delay-100">
                    <div className="relative w-40 h-40">
                      {/* Outer glow */}
                      <div className="absolute inset-0 rounded-full bg-[rgba(212,175,55,0.1)] blur-xl animate-pulse" />
                      <div className="absolute inset-0 border-3 border-[#D4AF37] rounded-full shadow-[0_0_40px_rgba(212,175,55,0.3),0_0_80px_rgba(212,175,55,0.1)]"></div>
                      <div className="absolute inset-3 border-2 border-[#FFDF73]/60 rounded-full"></div>
                      <div className="absolute inset-5 border border-[#D4AF37]/40 rounded-full"></div>
                      
                      {/* Clock markers */}
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="absolute w-1.5 h-3 bg-gradient-to-b from-[#D4AF37] to-[#B8860B] rounded-full" style={{
                          left: "50%",
                          top: "6px",
                          transform: `translateX(-50%) rotate(${i * 30}deg) translateY(62px)`,
                          transformOrigin: "center 74px"
                        }} />
                      ))}
                      
                      {/* Clock hands */}
                      {/* Hour Hand Container */}
                      <div className="absolute left-1/2 top-1/2 w-0 h-0" style={{ animation: "spin 12s linear infinite" }}>
                        <div className="absolute bottom-0 left-1/2 w-1.5 h-10 bg-gradient-to-b from-[#FFDF73] to-[#D4AF37] rounded-full transform -translate-x-1/2 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                      </div>
                      {/* Minute Hand Container */}
                      <div className="absolute left-1/2 top-1/2 w-0 h-0" style={{ animation: "spin 1s linear infinite" }}>
                        <div className="absolute bottom-0 left-1/2 w-1 h-14 bg-gradient-to-b from-[#D4AF37] to-[#B8860B] rounded-full transform -translate-x-1/2 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                      </div>
                      {/* Center dot */}
                      <div className="absolute left-1/2 top-1/2 w-2.5 h-2.5 bg-[#FFDF73] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(212,175,55,0.8)] border border-[#000]" />
                      
                      {/* Center decorative ring */}
                      <div className="absolute left-1/2 top-1/2 w-6 h-6 border-2 border-[#D4AF37] rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
                <div className="float-anim mb-8 mx-auto w-20 h-20 rounded-full border border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.1)] flex items-center justify-center pulse-glow" style={{ animationDelay: "0.5s" }}>
                  <span className="text-3xl" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.6))" }}>🕙</span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.5em] text-[#D4AF37]/90 mb-4">Reception</p>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[#FFF8DC] leading-tight">{details.time}</h3>
              </div>
              {/* Venue */}
              <div className="rg-card p-10 text-center fade-up group relative overflow-hidden" style={{ animationDelay: "0.7s" }}>
                {/* Map location on hover */}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.98)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center z-10">
                  <div className="transform scale-0 group-hover:scale-110 transition-transform duration-700 delay-100">
                    <div className="relative w-40 h-40">
                      {/* Map background */}
                      <div className="absolute inset-0 bg-[#1a1a1a] rounded-xl border-2 border-[#D4AF37]/40 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                        {/* Grid lines */}
                        <div className="absolute inset-0" style={{
                          backgroundImage: `
                            linear-gradient(rgba(212,175,55,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212,175,55,0.15) 1px, transparent 1px)
                          `,
                          backgroundSize: "24px 24px"
                        }} />
                        
                        {/* Map decorative elements */}
                        <div className="absolute top-4 left-4 w-16 h-0.5 bg-[#D4AF37]/20" />
                        <div className="absolute top-8 right-4 w-12 h-0.5 bg-[#D4AF37]/20" />
                        <div className="absolute bottom-6 left-6 w-20 h-0.5 bg-[#D4AF37]/20" />
                        
                        {/* Location marker */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="relative">
                            {/* Pulsing rings */}
                            <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full animate-ping absolute inset-0 -m-4" />
                            <div className="w-12 h-12 bg-[#D4AF37]/30 rounded-full animate-ping absolute inset-0 -m-3 delay-300" />
                            
                            {/* Main marker */}
                            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(212,175,55,0.5),0_0_60px_rgba(212,175,55,0.3)] border-2 border-[#FFDF73]">
                              <span className="text-black text-lg">📍</span>
                            </div>
                            
                            {/* Pin */}
                            <div className="w-1 h-12 bg-gradient-to-b from-[#D4AF37] to-[#B8860B] mx-auto -mt-2 rounded-full shadow-lg" />
                            <div className="w-3 h-3 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] mx-auto rounded-full shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="float-anim mb-8 mx-auto w-20 h-20 rounded-full border border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.1)] flex items-center justify-center pulse-glow" style={{ animationDelay: "1s" }}>
                  <span className="text-3xl" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.6))" }}>📍</span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.5em] text-[#D4AF37]/90 mb-4">Venue</p>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[#FFF8DC] leading-tight">{details.venue}</h3>
                <p className="mt-3 text-base text-[#FFDF73]/75">{details.city}</p>
              </div>
            </div>

            {/* Enhanced action buttons */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
              <a href={details.map} target="_blank" rel="noreferrer"
                 className="premium-btn magnetic-btn flex items-center gap-3 rounded-full border border-[rgba(212,175,55,0.6)] bg-[rgba(212,175,55,0.1)] px-10 py-5 text-xs font-medium uppercase tracking-[0.3em] text-[#FFDF73] transition-all hover:bg-[rgba(212,175,55,0.2)] hover:border-[rgba(212,175,55,0.9)] hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]">
                🗺 View on Map
              </a>
              <a href={details.whatsapp} target="_blank" rel="noreferrer"
                 className="premium-btn magnetic-btn flex items-center gap-3 rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] text-[#000000] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(212,175,55,0.7)]"
                 style={{ background: "linear-gradient(135deg, #B8860B 0%, #FFDF73 45%, #D4AF37 100%)" }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────
            SECTION 5  · RSVP
        ──────────────────────────────────── */}
        <section id="rsvp" className="px-6 py-20 md:py-28 relative z-10">
          {/* Enhanced radial haze */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{ width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(183,110,121,0.06) 40%, transparent 70%)" }} />
          </div>

          <div className="mx-auto max-w-3xl relative z-10">
            <div className="text-center mb-14">
              <p className="text-[11px] uppercase tracking-[0.7em] text-[#D4AF37]/90 mb-5 fade-up">Kindly Reply</p>
              <h2 className="font-[family-name:var(--font-heading)] text-7xl md:text-9xl rg-text mb-6 fade-up" style={{ animationDelay: "0.2s" }}>RSVP</h2>
              <div className="rg-divider w-32 mx-auto mb-8 fade-up" style={{ animationDelay: "0.3s" }} />
              <p className="text-base text-[#FFDF73]/75 max-w-lg mx-auto leading-relaxed fade-up" style={{ animationDelay: "0.4s" }}>
                Your presence is the greatest gift. Please let us know if you'll be joining our celebration.
              </p>
            </div>
            <div className="rg-card shadow-[0_40px_100px_rgba(0,0,0,0.95)] scale-in" style={{ animationDelay: "0.5s" }}>
              <RSVPForm guestName={guestData?.n} guestPhone={guestData?.p} maxGuests={guestData?.g ? parseInt(guestData.g) : undefined} />
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────
            FOOTER
        ──────────────────────────────────── */}
        <footer className="px-6 py-12 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] uppercase tracking-[1em] text-[#D4AF37]/90 mb-6 fade-up glow-pulse" style={{ animationDelay: "0.2s" }}>
              Forever &amp; Always
            </p>

            {/* Social icons with hover effects */}
            <div className="flex items-center justify-center gap-6 mb-10 fade-up" style={{ animationDelay: "0.3s" }}>
              <a
                href={details.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.05)] flex items-center justify-center text-[#D4AF37] transition-all duration-500 hover:scale-110 hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.15)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
              >
                <span className="text-xl">💬</span>
              </a>
              <a
                href={details.map}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.05)] flex items-center justify-center text-[#D4AF37] transition-all duration-500 hover:scale-110 hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.15)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
              >
                <span className="text-xl">🗺</span>
              </a>
              <a
                href={`tel:${details.phone}`}
                className="w-12 h-12 rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.05)] flex items-center justify-center text-[#D4AF37] transition-all duration-500 hover:scale-110 hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.15)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
              >
                <span className="text-xl">📞</span>
              </a>
            </div>

            <p className="mt-10 text-[12px] text-[#FFDF73]/50 tracking-widest fade-up" style={{ animationDelay: "0.4s" }}>
              Designed &amp; Built with{" "}
              <span className="text-[#D4AF37]">♥</span>
              {" "}by{" "}
              <a
                href="https://wa.me/94740011720"
                target="_blank"
                rel="noreferrer"
                className="rg-text border-b border-[rgba(212,175,55,0.4)] pb-0.5 hover:text-[#FFF8DC] hover:border-[rgba(255,223,115,0.7)] transition-all duration-300 hover:scale-105 inline-block"
              >
                Melan Bandara
              </a>
            </p>
          </div>
        </footer>

        {/* ── Keyframes ── */}
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes drawCircle {
            0% { stroke-dashoffset: 88; }
            50% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 88; }
          }
        `}</style>
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37] text-sm uppercase tracking-widest">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
