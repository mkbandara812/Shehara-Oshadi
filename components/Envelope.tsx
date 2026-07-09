"use client";

import { useState } from "react";

interface EnvelopeProps {
  groomName: string;
  brideName: string;
  onOpen?: () => void;
}

export default function Envelope({ groomName, brideName, onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setIsFlipped(true), 600);
    if (onOpen) onOpen();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto perspective-1000">
      {/* Envelope Container */}
      <div 
        className={`relative transition-all duration-1000 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back of Envelope */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0a0a0a] to-[#1a0a2e] rounded-lg border-2 border-[rgba(212,175,55,0.3)] shadow-2xl">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 border border-[#D4AF37] rotate-45" />
            <div className="absolute top-4 right-4 w-8 h-8 border border-[#D4AF37] rotate-45" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border border-[#D4AF37] rotate-45" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border border-[#D4AF37] rotate-45" />
          </div>
          
          {/* Seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] shadow-lg flex items-center justify-center">
            <span className="text-4xl">💍</span>
          </div>
        </div>

        {/* Front of Envelope */}
        <div 
          className={`relative bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] rounded-lg border-2 border-[rgba(212,175,55,0.4)] shadow-2xl overflow-hidden transition-all duration-700 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        >
          {/* Decorative Border */}
          <div className="absolute inset-2 border border-[rgba(212,175,55,0.2)] rounded" />
          
          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#D4AF37] rounded-br-lg" />

          {/* Names */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#FFDF73]/60 mb-2">Wedding Invitation</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl rg-text">
              {groomName} <span className="font-[family-name:var(--font-script)] text-[#D4AF37]">&</span> {brideName}
            </h2>
          </div>

          {/* Envelope Flap */}
          <div 
            className={`absolute top-0 left-0 w-full h-1/2 origin-top transition-transform duration-700 ease-in-out ${isOpen ? '-rotate-x-180' : 'rotate-x-0'}`}
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(26,10,46,0.3) 50%, rgba(212,175,55,0.15) 100%)',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              transformOrigin: 'top',
            }}
          >
            {/* Flap Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] shadow-lg flex items-center justify-center border-4 border-[#0a0a0a]">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>

          {/* Envelope Body */}
          <div className="absolute top-1/2 left-0 right-0 bottom-0 bg-gradient-to-br from-[#0a0a0a] to-[#1a0a2e]">
            {/* Inner Lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-[rgba(212,175,55,0.3)] to-transparent" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.3)] to-transparent" />
          </div>

          {/* Open Button */}
          {!isOpen && (
            <button
              onClick={handleOpen}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 group flex items-center gap-2 px-8 py-3 rounded-full border border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.1)] text-xs font-medium uppercase tracking-[0.3em] text-[#FFDF73] transition-all hover:bg-[rgba(212,175,55,0.2)] hover:border-[#D4AF37] hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <span className="text-lg">📬</span>
              <span>Open Invitation</span>
            </button>
          )}
        </div>

        {/* Invitation Card (Inside) */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] rounded-lg border-2 border-[rgba(212,175,55,0.4)] shadow-2xl p-8 transition-all duration-700 ${isFlipped ? 'opacity-100 translate-z-20' : 'opacity-0 translate-z-0'}`}
          style={{ transform: 'translateZ(20px)', backfaceVisibility: 'hidden' }}
        >
          {/* Card Content */}
          <div className="h-full flex flex-col items-center justify-center text-center">
            {/* Decorative Header */}
            <div className="mb-6">
              <span className="text-4xl">💒</span>
            </div>

            {/* Names */}
            <h3 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl rg-text mb-4">
              {groomName}
            </h3>
            <p className="font-[family-name:var(--font-script)] text-3xl text-[#D4AF37] mb-4">&</p>
            <h3 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl rg-text mb-8">
              {brideName}
            </h3>

            {/* Divider */}
            <div className="rg-divider w-32 mx-auto mb-8" />

            {/* Message */}
            <p className="text-sm text-[#FFDF73]/80 leading-relaxed mb-6">
              Together with their families,<br />
              they invite you to celebrate<br />
              their union
            </p>

            {/* Date */}
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              Thursday, 23 July 2026
            </p>
          </div>
        </div>
      </div>

      {/* 3D Transform Styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-x-0 {
          transform: rotateX(0deg);
        }
        .-rotate-x-180 {
          transform: rotateX(-180deg);
        }
        .translate-z-20 {
          transform: translateZ(20px);
        }
        .translate-z-0 {
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
}
