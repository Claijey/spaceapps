import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AstroBuddy({ speechText, t }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 max-w-5xl mx-auto px-1 sm:px-2 shrink-0">
      {/* Animated Cartoon Astro-Buddy SVG */}
      <div className="shrink-0 relative">
        <svg
          viewBox="0 0 100 110"
          className="w-11 h-12 sm:w-14 sm:h-15 drop-shadow-md animate-float"
        >
          <defs>
            <radialGradient id="visorGold" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>
            <linearGradient id="suitWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* Backpack Life Support */}
          <rect x="20" y="38" width="60" height="48" rx="14" fill="#38BDF8" stroke="#0F172A" strokeWidth="4" />
          <rect x="25" y="44" width="12" height="24" rx="4" fill="#BAE6FD" />
          
          {/* Antenna */}
          <line x1="50" y1="20" x2="50" y2="8" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="6" r="6" fill="#F43F5E" className="animate-ping" />
          <circle cx="50" cy="6" r="5" fill="#FB7185" stroke="#0F172A" strokeWidth="2" />

          {/* Suit Body */}
          <rect x="26" y="55" width="48" height="42" rx="16" fill="url(#suitWhite)" stroke="#0F172A" strokeWidth="4" />

          {/* NASA Patch */}
          <circle cx="40" cy="72" r="5" fill="#3B82F6" />
          <path d="M 36 72 Q 40 68 44 72" stroke="#EF4444" strokeWidth="1.5" fill="none" />

          {/* Cute Waving Arm */}
          <path
            d="M 26 62 Q 10 52 14 36"
            stroke="#0F172A"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 26 62 Q 10 52 14 36"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="14" cy="35" r="7" fill="#38BDF8" stroke="#0F172A" strokeWidth="3" />

          {/* Helmet */}
          <circle cx="50" cy="34" r="26" fill="url(#suitWhite)" stroke="#0F172A" strokeWidth="4.5" />

          {/* Golden Smiling Visor */}
          <ellipse cx="50" cy="34" rx="19" ry="15" fill="url(#visorGold)" stroke="#0F172A" strokeWidth="3.5" />
          
          {/* Eyes & Smile */}
          <ellipse cx="44" cy="32" rx="3.5" ry="5" fill="#0F172A" />
          <circle cx="45" cy="30" r="1.5" fill="#FFFFFF" />
          <ellipse cx="56" cy="32" rx="3.5" ry="5" fill="#0F172A" />
          <circle cx="57" cy="30" r="1.5" fill="#FFFFFF" />
          <path d="M 46 39 Q 50 44 54 39" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Boots */}
          <rect x="30" y="93" width="16" height="12" rx="5" fill="#38BDF8" stroke="#0F172A" strokeWidth="3" />
          <rect x="54" y="93" width="16" height="12" rx="5" fill="#38BDF8" stroke="#0F172A" strokeWidth="3" />
        </svg>

        <div className="absolute -top-1 -right-1 text-game-yellow">
          <Sparkles className="w-4 h-4 fill-game-yellow text-game-yellow" />
        </div>
      </div>

      {/* Comic Speech Bubble */}
      <div className="relative flex-1 bg-game-cream border-3 border-game-ink rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-chunky">
        {/* Triangle Speech Bubble Pointer */}
        <div
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 
                     border-t-[8px] border-t-transparent 
                     border-r-[12px] border-r-game-ink 
                     border-b-[8px] border-b-transparent"
        />
        <div
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 
                     border-t-[6px] border-t-transparent 
                     border-r-[10px] border-r-game-cream 
                     border-b-[6px] border-b-transparent"
        />

        <div className="text-[10px] sm:text-xs font-heading font-extrabold uppercase tracking-wider text-game-blueDark flex items-center gap-1.5">
          <span>Astro-Buddy</span>
          <span className="text-[9px] px-1.5 py-0.1 rounded-full bg-game-yellow text-game-ink border border-game-ink">
            {t?.helperBadge || 'HELPER'}
          </span>
        </div>

        <p className="font-heading font-extrabold text-xs sm:text-sm md:text-base text-game-ink leading-tight truncate sm:whitespace-normal">
          "{speechText}"
        </p>
      </div>
    </div>
  );
}
