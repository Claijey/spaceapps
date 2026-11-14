import React from 'react';
import { SUIT_COLORS, SKIN_TONES, DEFAULT_AVATAR } from '../data/avatarConfig';

export default function AstronautAvatar({
  avatar = DEFAULT_AVATAR,
  size = 64,
  className = '',
  isWaving = false,
  showFullBody = false
}) {
  const config = { ...DEFAULT_AVATAR, ...avatar };

  // Resolve suit color config
  const suit = SUIT_COLORS.find((s) => s.id === config.suitColor) || SUIT_COLORS[0];
  const skin = SKIN_TONES.find((s) => s.id === config.skinTone) || SKIN_TONES[1];

  const suitHex = suit.hex;
  const suitAccent = suit.accent;
  const skinHex = skin.hex;

  return (
    <div
      className={`inline-block select-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full overflow-visible drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glass Visor Gradient */}
          <linearGradient id={`visorGlass_${config.suitColor}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#0284C7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.25" />
          </linearGradient>

          {/* Golden Crown Gradient */}
          <linearGradient id="crownGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* 1. SUIT / TORSO & SHOULDERS */}
        <g id="suit">
          {/* Torso main */}
          <path
            d="M 34 76 Q 60 68 86 76 L 94 118 Q 60 122 26 118 Z"
            fill={suitHex}
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Shoulder pads / Arms */}
          <path
            d="M 28 80 Q 14 88 18 108 Q 24 114 32 108 L 34 86 Z"
            fill={suitAccent}
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Right Arm: Normal or Waving */}
          {isWaving ? (
            <g transform="rotate(-30 92 84)">
              <path
                d="M 86 80 Q 106 68 114 50 Q 120 54 114 62 L 98 86 Z"
                fill={suitAccent}
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Glove Waving */}
              <circle cx="114" cy="50" r="7" fill={suitHex} stroke="#0F172A" strokeWidth="3" />
              <path d="M 116 46 Q 120 44 118 48" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : (
            <path
              d="M 92 80 Q 106 88 102 108 Q 96 114 88 108 L 86 86 Z"
              fill={suitAccent}
              stroke="#0F172A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          )}

          {/* Suit Collar / Neck Ring */}
          <ellipse
            cx="60"
            cy="76"
            rx="26"
            ry="9"
            fill="#E2E8F0"
            stroke="#0F172A"
            strokeWidth="3.5"
          />

          {/* Chest Center Panel */}
          <rect
            x="48"
            y="87"
            width="24"
            height="20"
            rx="6"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2.5"
          />

          {/* CHEST PATCH ICON */}
          <g id="patch">
            {config.patchIcon === 'rocket' && (
              <path
                d="M 60 90 Q 64 94 64 99 L 56 99 Q 56 94 60 90 Z M 56 98 L 53 103 L 57 101 Z M 64 98 L 67 103 L 63 101 Z"
                fill="#EF4444"
                stroke="#0F172A"
                strokeWidth="1.2"
              />
            )}
            {config.patchIcon === 'moon' && (
              <path
                d="M 62 90 A 7 7 0 1 1 56 103 A 8 8 0 0 0 62 90 Z"
                fill="#FBBF24"
                stroke="#0F172A"
                strokeWidth="1.2"
              />
            )}
            {config.patchIcon === 'planet' && (
              <g>
                <circle cx="60" cy="97" r="4.5" fill="#F97316" stroke="#0F172A" strokeWidth="1" />
                <ellipse cx="60" cy="97" rx="8" ry="2.2" fill="none" stroke="#FDE047" strokeWidth="1.5" />
              </g>
            )}
            {config.patchIcon === 'zap' && (
              <polygon
                points="61,90 56,97 59.5,97 58,104 64,96 60.5,96"
                fill="#FACC15"
                stroke="#0F172A"
                strokeWidth="1.2"
              />
            )}
          </g>
        </g>

        {/* 2. HELMET BASE */}
        <g id="helmetBase">
          {/* Outer Helmet Sphere */}
          <circle
            cx="60"
            cy="46"
            r="35"
            fill={suitHex}
            stroke="#0F172A"
            strokeWidth="4"
          />

          {/* Side Earpads / Comms */}
          <rect
            x="22"
            y="38"
            width="6"
            height="16"
            rx="3"
            fill={suitAccent}
            stroke="#0F172A"
            strokeWidth="3"
          />
          <rect
            x="92"
            y="38"
            width="6"
            height="16"
            rx="3"
            fill={suitAccent}
            stroke="#0F172A"
            strokeWidth="3"
          />

          {/* Visor Frame Ring */}
          <circle
            cx="60"
            cy="46"
            r="26"
            fill="#1E293B"
            stroke="#0F172A"
            strokeWidth="3.5"
          />

          {/* Face Base (Skin inside Visor) */}
          <circle
            cx="60"
            cy="46"
            r="23"
            fill={skinHex}
          />

          {/* Soft Cheek Blush */}
          <circle cx="46" cy="51" r="3" fill="#FB7185" opacity="0.45" />
          <circle cx="74" cy="51" r="3" fill="#FB7185" opacity="0.45" />
        </g>

        {/* 3. FACE EXPRESSION */}
        <g id="faceExpression">
          {config.faceStyle === 'smile' && (
            <g>
              {/* Happy Arched Eyes */}
              <path d="M 47 43 Q 51 38 55 43" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 65 43 Q 69 38 73 43" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Cheerful Open Mouth */}
              <path d="M 53 50 Q 60 59 67 50 Z" fill="#E11D48" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
            </g>
          )}

          {config.faceStyle === 'shades' && (
            <g>
              {/* Cool Dark Sunglasses */}
              <polygon points="42,39 56,39 54,49 44,49" fill="#0F172A" stroke="#0F172A" strokeWidth="2" />
              <polygon points="64,39 78,39 76,49 66,49" fill="#0F172A" stroke="#0F172A" strokeWidth="2" />
              <line x1="56" y1="41" x2="64" y2="41" stroke="#0F172A" strokeWidth="3" />
              {/* Glare Reflection on Shades */}
              <line x1="45" y1="41" x2="52" y2="47" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="67" y1="41" x2="74" y2="47" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
              {/* Smirking mouth */}
              <path d="M 54 53 Q 62 57 68 51" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.faceStyle === 'stars' && (
            <g>
              {/* Star Eyes */}
              <path
                d="M 51 38 L 52.5 42 L 56 43 L 52.5 44 L 51 48 L 49.5 44 L 46 43 L 49.5 42 Z"
                fill="#FACC15"
                stroke="#0F172A"
                strokeWidth="1.2"
              />
              <path
                d="M 69 38 L 70.5 42 L 74 43 L 70.5 44 L 69 48 L 67.5 44 L 64 43 L 67.5 42 Z"
                fill="#FACC15"
                stroke="#0F172A"
                strokeWidth="1.2"
              />
              {/* Big Joyful Mouth */}
              <path d="M 52 49 Q 60 60 68 49 Z" fill="#E11D48" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="60" cy="56" r="3" fill="#FB7185" />
            </g>
          )}

          {config.faceStyle === 'wink' && (
            <g>
              {/* Left Eye: Cheeky Wink */}
              <path d="M 46 44 Q 51 47 55 43" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Right Eye: Big Sparkly Eye */}
              <circle cx="70" cy="42" r="4" fill="#0F172A" />
              <circle cx="68.5" cy="40.5" r="1.5" fill="#FFFFFF" />
              {/* Cheeky Grin */}
              <path d="M 53 50 Q 61 58 68 51" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.faceStyle === 'brave' && (
            <g>
              {/* Determined Eyebrows */}
              <line x1="45" y1="38" x2="55" y2="41" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="75" y1="38" x2="65" y2="41" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
              {/* Focused Eyes */}
              <circle cx="50" cy="43" r="3.5" fill="#0F172A" />
              <circle cx="49" cy="42" r="1.2" fill="#FFFFFF" />
              <circle cx="70" cy="43" r="3.5" fill="#0F172A" />
              <circle cx="69" cy="42" r="1.2" fill="#FFFFFF" />
              {/* Hero Smile */}
              <path d="M 54 52 Q 60 56 66 52" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          )}
        </g>

        {/* 4. VISOR GLASS REFLECTION OVERLAY */}
        <path
          d="M 37 46 A 23 23 0 0 1 83 46 Q 60 32 37 46 Z"
          fill="url(#visorGlass_white)"
          opacity="0.75"
        />
        {/* Curved White Catchlight */}
        <path
          d="M 44 32 Q 60 26 76 32"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        {/* 5. HELMET ACCESSORIES / HATS */}
        <g id="helmetAccessories">
          {/* CAT EARS */}
          {config.helmetStyle === 'cat' && (
            <g>
              {/* Left Ear */}
              <polygon
                points="34,22 24,4 46,16"
                fill={suitHex}
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <polygon points="33,20 27,8 41,16" fill="#F472B6" />

              {/* Right Ear */}
              <polygon
                points="86,22 96,4 74,16"
                fill={suitHex}
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <polygon points="87,20 93,8 79,16" fill="#F472B6" />
            </g>
          )}

          {/* ANTENNA BOT */}
          {config.helmetStyle === 'antenna' && (
            <g>
              <line
                x1="60"
                y1="11"
                x2="60"
                y2="2"
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Glowing Antenna Orb */}
              <circle
                cx="60"
                cy="2"
                r="6"
                fill="#FACC15"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
              <circle cx="58" cy="0.5" r="2" fill="#FEF08A" />
            </g>
          )}

          {/* EXPLORER CAP */}
          {config.helmetStyle === 'cap' && (
            <g>
              <path
                d="M 32 28 Q 60 12 88 28 L 98 22 Q 60 6 22 22 Z"
                fill="#EF4444"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <circle cx="60" cy="12" r="3" fill="#FDE047" stroke="#0F172A" strokeWidth="1.5" />
            </g>
          )}

          {/* STAR CROWN */}
          {config.helmetStyle === 'crown' && (
            <g>
              <polygon
                points="38,24 43,6 51,18 60,2 69,18 77,6 82,24"
                fill="url(#crownGold)"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <circle cx="43" cy="6" r="2" fill="#E11D48" />
              <circle cx="60" cy="2" r="2.5" fill="#38BDF8" />
              <circle cx="77" cy="6" r="2" fill="#E11D48" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
