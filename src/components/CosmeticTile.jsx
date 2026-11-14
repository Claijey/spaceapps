import React from 'react';
import { Lock, Check } from 'lucide-react';
import { SUIT_COLORS } from '../data/avatarConfig';

export default function CosmeticTile({
  category,
  item,
  isSelected,
  isUnlocked,
  currentAvatar,
  onSelect,
  onBuyClick
}) {
  const currentSuit = SUIT_COLORS.find((s) => s.id === currentAvatar.suitColor) || SUIT_COLORS[0];

  const handleClick = () => {
    if (isUnlocked) {
      onSelect();
    } else {
      onBuyClick(item);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-3 sm:border-4 flex items-center justify-center transition-all group ${
        isSelected
          ? 'border-game-ink bg-amber-100 shadow-chunky scale-105 ring-2 ring-yellow-400 z-10'
          : isUnlocked
          ? 'border-slate-300 hover:border-game-ink hover:bg-amber-50/60 bg-white'
          : 'border-slate-300 bg-slate-100/80 hover:border-slate-400'
      }`}
    >
      {/* 1. SUIT COLOR TILE */}
      {category === 'suit' && (
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl border-3 border-slate-900 shadow-sm flex items-center justify-center"
            style={{ backgroundColor: item.hex }}
          >
            {isSelected && <Check className="w-6 h-6 text-slate-900 stroke-[3]" />}
          </div>
        </div>
      )}

      {/* 2. SKIN TONE TILE */}
      {category === 'skin' && (
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border-3 border-slate-900 shadow-sm flex items-center justify-center"
            style={{ backgroundColor: item.hex }}
          >
            {isSelected && <Check className="w-6 h-6 text-slate-900 stroke-[3]" />}
          </div>
        </div>
      )}

      {/* 3. FACE EXPRESSION TILE (Pure SVG face preview) */}
      {category === 'face' && (
        <svg viewBox="0 0 60 60" className="w-14 h-14 sm:w-16 sm:h-16">
          <circle cx="30" cy="30" r="24" fill="#FDE047" stroke="#0F172A" strokeWidth="3" />
          <circle cx="21" cy="35" r="2.5" fill="#FB7185" opacity="0.6" />
          <circle cx="39" cy="35" r="2.5" fill="#FB7185" opacity="0.6" />

          {item.id === 'smile' && (
            <g>
              <path d="M 20 25 Q 24 20 28 25" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M 32 25 Q 36 20 40 25" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M 24 33 Q 30 42 36 33 Z" fill="#E11D48" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
            </g>
          )}

          {item.id === 'shades' && (
            <g>
              <polygon points="16,22 27,22 25,30 18,30" fill="#0F172A" stroke="#0F172A" strokeWidth="1.5" />
              <polygon points="33,22 44,22 42,30 35,30" fill="#0F172A" stroke="#0F172A" strokeWidth="1.5" />
              <line x1="27" y1="24" x2="33" y2="24" stroke="#0F172A" strokeWidth="2.5" />
              <line x1="18" y1="24" x2="24" y2="28" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="35" y1="24" x2="41" y2="28" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 25 36 Q 31 40 36 35" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {item.id === 'stars' && (
            <g>
              <polygon points="23,20 24.5,23.5 28,24.5 24.5,25.5 23,29 21.5,25.5 18,24.5 21.5,23.5" fill="#F59E0B" stroke="#0F172A" strokeWidth="1" />
              <polygon points="37,20 38.5,23.5 42,24.5 38.5,25.5 37,29 35.5,25.5 32,24.5 35.5,23.5" fill="#F59E0B" stroke="#0F172A" strokeWidth="1" />
              <path d="M 24 33 Q 30 42 36 33 Z" fill="#E11D48" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
            </g>
          )}

          {item.id === 'wink' && (
            <g>
              <path d="M 19 26 Q 24 29 28 25" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <circle cx="37" cy="25" r="3.5" fill="#0F172A" />
              <circle cx="36" cy="23.5" r="1.2" fill="#FFFFFF" />
              <path d="M 25 34 Q 31 41 37 34" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {item.id === 'brave' && (
            <g>
              <line x1="18" y1="21" x2="27" y2="24" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="42" y1="21" x2="33" y2="24" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="22" cy="26" r="3" fill="#0F172A" />
              <circle cx="38" cy="26" r="3" fill="#0F172A" />
              <path d="M 26 35 Q 30 38 34 35" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          )}
        </svg>
      )}

      {/* 4. HELMET / HAT TILE (Pure SVG graphic) */}
      {category === 'helmet' && (
        <svg viewBox="0 0 60 60" className="w-14 h-14 sm:w-16 sm:h-16">
          {/* Base helmet dome outline */}
          <circle cx="30" cy="33" r="18" fill={currentSuit.hex} stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="30" cy="33" r="12" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <path d="M 20 33 A 10 10 0 0 1 40 33 Q 30 26 20 33 Z" fill="#38BDF8" opacity="0.6" />

          {/* BUBBLE VISOR */}
          {item.id === 'bubble' && (
            <g>
              <rect x="8" y="28" width="4" height="10" rx="2" fill={currentSuit.accent} stroke="#0F172A" strokeWidth="2" />
              <rect x="48" y="28" width="4" height="10" rx="2" fill={currentSuit.accent} stroke="#0F172A" strokeWidth="2" />
              <path d="M 23 26 Q 30 22 37 26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* CAT EARS */}
          {item.id === 'cat' && (
            <g>
              <polygon points="17,19 11,6 23,14" fill={currentSuit.hex} stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
              <polygon points="16,17 12,9 20,14" fill="#F472B6" />
              <polygon points="43,19 49,6 37,14" fill={currentSuit.hex} stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
              <polygon points="44,17 48,9 40,14" fill="#F472B6" />
            </g>
          )}

          {/* ANTENNA BOT */}
          {item.id === 'antenna' && (
            <g>
              <line x1="30" y1="15" x2="30" y2="7" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="30" cy="6" r="4.5" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
              <circle cx="28.5" cy="4.5" r="1.5" fill="#FEF08A" />
            </g>
          )}

          {/* EXPLORER CAP */}
          {item.id === 'cap' && (
            <g>
              <path d="M 14 20 Q 30 8 46 20 L 52 16 Q 30 4 8 16 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="30" cy="8" r="2.5" fill="#FDE047" stroke="#0F172A" strokeWidth="1.2" />
            </g>
          )}

          {/* STAR CROWN */}
          {item.id === 'crown' && (
            <g>
              <polygon points="18,19 21,7 26,15 30,5 34,15 39,7 42,19" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="21" cy="7" r="1.5" fill="#E11D48" />
              <circle cx="30" cy="5" r="2" fill="#38BDF8" />
              <circle cx="39" cy="7" r="1.5" fill="#E11D48" />
            </g>
          )}
        </svg>
      )}

      {/* 5. CHEST PATCH TILE (Pure SVG graphic) */}
      {category === 'patch' && (
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-12 h-12 sm:w-14 sm:h-14">
            <rect x="2" y="2" width="36" height="36" rx="10" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2.5" />

            {item.id === 'rocket' && (
              <path
                d="M 20 6 Q 26 12 26 21 L 14 21 Q 14 12 20 6 Z M 14 20 L 10 27 L 15 24 Z M 26 20 L 30 27 L 25 24 Z"
                fill="#EF4444"
                stroke="#0F172A"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            )}

            {item.id === 'moon' && (
              <path
                d="M 23 8 A 12 12 0 1 1 12 29 A 14 14 0 0 0 23 8 Z"
                fill="#FBBF24"
                stroke="#0F172A"
                strokeWidth="1.8"
              />
            )}

            {item.id === 'planet' && (
              <g>
                <circle cx="20" cy="20" r="8" fill="#F97316" stroke="#0F172A" strokeWidth="1.8" />
                <ellipse cx="20" cy="20" rx="15" ry="4" fill="none" stroke="#FDE047" strokeWidth="2.5" />
              </g>
            )}

            {item.id === 'zap' && (
              <polygon
                points="21,7 13,20 19,20 17,33 27,17 21,17"
                fill="#FACC15"
                stroke="#0F172A"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
      )}

      {/* Locked Overlay Badge (Small translucent lock + price pill) */}
      {!isUnlocked && (
        <div className="absolute inset-0 rounded-2xl bg-slate-900/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-1">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/85 text-amber-300 font-heading font-black text-[10px] sm:text-xs border border-amber-400/80 shadow-md">
            <Lock className="w-3 h-3 text-amber-300" />
            <span>{item.price} 🪙</span>
          </div>
        </div>
      )}

      {/* Selected Indicator Checkmark */}
      {isSelected && isUnlocked && category !== 'suit' && category !== 'skin' && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-game-mint border-2 border-game-ink flex items-center justify-center shadow-xs">
          <Check className="w-3 h-3 text-game-ink stroke-[3]" />
        </div>
      )}
    </button>
  );
}
