"use client";

import { useEffect, useState, useCallback } from "react";

type Phase = "intro" | "idle" | "open" | "transition" | "done";

export default function OpeningAnimation({ onComplete, onEnvelopeOpen, guestName }: { onComplete: () => void; onEnvelopeOpen?: () => void; guestName?: string }) {
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    const t = setTimeout(() => setPhase("idle"), 800);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("open");
    
    // Trigger music when envelope opens
    if (onEnvelopeOpen) {
      onEnvelopeOpen();
    }
    
    // Transition out
    setTimeout(() => setPhase("transition"), 3500);
    
    // Final completion
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 5000);
  }, [phase, onComplete, onEnvelopeOpen]);

  if (phase === "done") return null;

  const isOpen = phase === "open" || phase === "transition";
  const isTransitioning = phase === "transition";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
      style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 1.5s ease" }}
    >
      {/* Simple subtle background glow */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Elegant Card Envelope */}
      <div
        className="relative flex flex-col items-center"
        style={{
          opacity: phase === "intro" ? 0 : 1,
          transform: isTransitioning 
            ? "scale(2) translateY(-50px)" 
            : (phase === "intro" ? "translateY(30px) scale(0.95)" : "translateY(0) scale(1)"),
          transition: isTransitioning 
            ? "transform 1.5s ease-out, opacity 1s ease" 
            : "opacity 0.8s ease, transform 0.8s ease-out",
        }}
      >
        {/* Envelope Container */}
        <div
          className="relative cursor-pointer select-none"
          onClick={handleOpen}
          style={{
            width: "320px",
            height: "240px",
            perspective: "1000px",
          }}
        >
          {/* Envelope Back */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: "linear-gradient(145deg, #0f0f0f 0%, #080808 50%, #000000 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.08)",
            }}
          />

          {/* Inner Card */}
          <div
            className="absolute inset-3 mx-auto rounded flex flex-col items-center justify-center text-center overflow-hidden"
            style={{
              width: "calc(100% - 24px)",
              height: "calc(100% - 24px)",
              background: "linear-gradient(160deg, #121212 0%, #0a0a0a 50%, #000000 100%)",
              transform: isOpen ? "translateY(-30px) scale(1)" : "translateY(0) scale(1)",
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
              boxShadow: "inset 0 0 20px rgba(212,175,55,0.03), 0 0 0 1px rgba(212,175,55,0.2)",
              zIndex: isOpen ? 15 : 5,
            }}
          >
            <div className="relative z-10 px-4">
              <p style={{ color: "#D4AF37", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "10px" }}>
                Wedding Invitation
              </p>
              <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", margin: "0 auto 10px" }} />
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "28px", color: "#FFF8DC", lineHeight: 1.2, fontWeight: 300 }}>
                Shehara
              </p>
              <p style={{ fontFamily: "var(--font-script)", fontSize: "32px", color: "#D4AF37", padding: "4px 0", margin: "0", lineHeight: 1.2 }}>
                &
              </p>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "28px", color: "#FFF8DC", lineHeight: 1.2, fontWeight: 300 }}>
                Oshadi
              </p>
              <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", margin: "10px auto" }} />
              <p style={{ color: "#FFDF73", fontSize: "10px", letterSpacing: "0.3em" }}>
                23 · 07 · 2026
              </p>
            </div>
          </div>

          {/* Envelope Front - Simple Triangle Flaps */}
          <div className="absolute inset-0 pointer-events-none rounded-b-lg overflow-hidden" style={{ zIndex: 10 }}>
            <svg width="100%" height="100%" viewBox="0 0 320 240" preserveAspectRatio="none">
              {/* Left Triangle */}
              <polygon points="0,0 160,120 0,240" fill="#050505" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />
              {/* Right Triangle */}
              <polygon points="320,0 160,120 320,240" fill="#050505" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />
              {/* Bottom Triangle */}
              <polygon points="0,240 160,120 320,240" fill="#080808" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
            </svg>
          </div>

          {/* Top Flap */}
          <div
            className="absolute top-0 left-0 w-full h-[140px] origin-top"
            style={{
              transformStyle: "preserve-3d",
              transform: isOpen ? "rotateX(180deg)" : "rotateX(0)",
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: isOpen ? 2 : 12,
            }}
          >
            {/* Front of Flap */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              <svg width="100%" height="100%" viewBox="0 0 320 140" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f0f0f" />
                    <stop offset="100%" stopColor="#050505" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 320,0 160,120" fill="url(#flapGrad)" stroke="rgba(212,175,55,0.4)" strokeWidth="1" />
              </svg>
              {/* Simple Seal */}
              <div 
                className="absolute flex items-center justify-center"
                style={{ left: "160px", top: "120px", transform: "translate(-50%, -50%)", opacity: isOpen ? 0 : 1, transition: "opacity 0.3s" }}
              >
                <div 
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
                    boxShadow: "0 0 20px rgba(212,175,55,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "18px", color: "#000", fontWeight: "bold" }}>💍</span>
                </div>
              </div>
            </div>
            
            {/* Back of Flap */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              <svg width="100%" height="100%" viewBox="0 0 320 140" preserveAspectRatio="none">
                <polygon points="0,0 320,0 160,120" fill="#080808" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Touch hint */}
        {phase === "idle" && (
          <div
            className="mt-10 flex flex-col items-center pointer-events-none"
            style={{ animation: "hint_float 2s ease-in-out infinite" }}
          >
            <p style={{ color: "rgba(212,175,55,0.8)", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase" }}>
              Tap to Open
            </p>
          </div>
        )}

        {/* Reveal text */}
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            opacity: isOpen && !isTransitioning ? 1 : 0,
            transform: isOpen && !isTransitioning ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s ease 0.5s",
          }}
        >
          {guestName && (
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "20px", color: "#FFF8DC", marginBottom: "8px", filter: "drop-shadow(0 0 10px rgba(212,175,55,0.2))", fontWeight: 300 }}>
              Dear {guestName},
            </p>
          )}
          <p style={{ fontFamily: "var(--font-script)", fontSize: "42px", color: "#D4AF37", filter: "drop-shadow(0 0 10px rgba(212,175,55,0.3))" }}>
            You're Invited
          </p>
        </div>
      </div>

      {/* Simple hint animation */}
      <style>{`
        @keyframes hint_float {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
