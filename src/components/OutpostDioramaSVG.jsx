import React from 'react';
import { Shield, Sparkles, MoveDown } from 'lucide-react';
import AstronautAvatar from './AstronautAvatar';
import { spaceAudio } from '../utils/audio';

export default function OutpostDioramaSVG({
  outpostType = 'moon',
  blocks,
  avatar,
  hasSpaceWeather = false,
  isCommDelayActive = false,
  onDropDecision,
  isDraggingOver,
  setIsDraggingOver,
  t
}) {
  const isMoon = outpostType === 'moon';
  const power = blocks.power;
  const lifeSupport = blocks.lifeSupport;
  const shielding = blocks.shielding;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isDraggingOver) setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const decisionId = e.dataTransfer.getData('text/plain');
    if (decisionId && onDropDecision) {
      spaceAudio.playActivate();
      onDropDecision(decisionId);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Slim Status Bar ABOVE the SVG Frame (Never covers the sky or Earth) */}
      <div className="w-full flex items-center justify-between px-2 py-1 mb-1.5 text-xs font-heading font-extrabold text-game-ink">
        <div className="flex items-center gap-2">
          <div className="bg-game-cream border-2 border-game-ink px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-game-mint animate-ping" />
            <span>{isMoon ? (t?.moonBase || 'Moon Base') : (t?.marsBase || 'Mars Base')}</span>
          </div>

          {shielding >= 2 && (
            <div className="bg-game-blue border-2 border-game-ink px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 text-game-ink">
              <Shield className="w-3.5 h-3.5 fill-game-blue text-game-ink" />
              <span>{t?.shieldBubbleUp || 'Shield Bubble Up!'}</span>
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 bg-game-yellow border-2 border-game-ink px-3 py-0.5 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t?.dragOrTap || 'Drag card onto base or tap below!'}</span>
        </div>
      </div>

      {/* Hero Outpost Diorama Frame */}
      <div
        id="outpost-drop-zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-game-ink shadow-chunky transition-all duration-200 bg-game-sky ${
          isDraggingOver ? 'ring-6 ring-game-yellow scale-[1.01]' : ''
        }`}
        style={{ aspectRatio: '800 / 320', maxHeight: '100%' }}
      >
        {/* Drop Zone Visual Prompt */}
        {isDraggingOver && (
          <div className="absolute inset-0 z-30 bg-game-sky/70 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none animate-fade-in border-4 border-dashed border-game-yellow">
            <div className="bg-game-cream border-4 border-game-ink px-6 py-2.5 rounded-2xl shadow-chunky flex items-center gap-3 text-game-ink animate-bounce">
              <MoveDown className="w-7 h-7 text-game-yellowDark" />
              <div className="font-heading font-extrabold text-lg">{t?.dropPrompt || 'Drop card on base!'}</div>
            </div>
          </div>
        )}

        {/* Crisp Cartoon SVG Scene with 800x320 ViewBox */}
        <svg
          viewBox="0 0 800 320"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full select-none"
        >
          <defs>
            {/* Sky Gradients */}
            <linearGradient id="skyGradMoon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="60%" stopColor="#2E286E" />
              <stop offset="100%" stopColor="#3E3498" />
            </linearGradient>

            <linearGradient id="skyGradMars" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2E1218" />
              <stop offset="60%" stopColor="#5E1E1E" />
              <stop offset="100%" stopColor="#8A2C21" />
            </linearGradient>

            {/* Solar Panel Cells */}
            <linearGradient id="solarCells" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>

            {/* Glowing Shield Filter */}
            <filter id="shieldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. SKY (0 to 240) */}
          <rect
            x="0"
            y="0"
            width="800"
            height="320"
            fill={`url(#${isMoon ? 'skyGradMoon' : 'skyGradMars'})`}
          />

          {/* Twinkling Stars */}
          <g>
            <circle cx="90" cy="50" r="2.5" fill="#FDE047" className="animate-twinkle" />
            <polygon points="210,35 213,42 220,43 214,48 216,55 210,51 204,55 206,48 200,43 207,42" fill="#FFFFFF" className="animate-twinkle" />
            <circle cx="340" cy="70" r="3" fill="#BAE6FD" />
            <polygon points="490,40 493,47 500,48 494,53 496,60 490,56 484,60 486,53 480,48 487,47" fill="#FDE047" className="animate-twinkle" />
            <circle cx="610" cy="85" r="2.5" fill="#FFFFFF" />
            <circle cx="760" cy="120" r="3" fill="#FDE047" />
          </g>

          {/* Visible Earth in Upper-Right Sky (x=720, y=65) */}
          <g transform="translate(720, 65)">
            {/* Outer soft glow ring */}
            <circle cx="0" cy="0" r="36" fill="#38BDF8" opacity="0.25" />
            {/* Earth Blue Marble */}
            <circle cx="0" cy="0" r="30" fill="#38BDF8" stroke="#0F172A" strokeWidth="4" />
            {/* Green Continents */}
            <path
              d="M -15 -10 Q -5 -22 10 -12 Q 20 -2 14 12 Q 5 22 -10 18 Z"
              fill="#34D399"
            />
            {/* Cute Cartoon Eyes and Smile */}
            <circle cx="-6" cy="-4" r="3" fill="#0F172A" />
            <circle cx="8" cy="-4" r="3" fill="#0F172A" />
            <path d="M -3 4 Q 1 9 5 4" stroke="#0F172A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Swirling Cloud */}
            <path d="M -22 8 Q -8 15 10 3" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
          </g>

          {/* Space Weather Alert Wave */}
          {hasSpaceWeather && (
            <g className="animate-pulse">
              <line x1="120" y1="0" x2="360" y2="240" stroke="#FBBF24" strokeWidth="6" strokeDasharray="14,14" strokeLinecap="round" opacity="0.8" />
              <line x1="280" y1="0" x2="520" y2="240" stroke="#FB7185" strokeWidth="7" strokeDasharray="18,12" strokeLinecap="round" opacity="0.8" />
            </g>
          )}

          {/* Radio Transmission Waves toward Earth */}
          {isCommDelayActive && (
            <g>
              <path
                d="M 645 155 Q 685 110 720 65"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="4"
                strokeDasharray="8,8"
                strokeLinecap="round"
                className="animate-beam"
              />
              <circle cx="675" cy="115" r="14" fill="none" stroke="#FBBF24" strokeWidth="2.5" opacity="0.8" />
            </g>
          )}

          {/* 2. GROUND HORIZON (Clear Ground Line at y=240) */}
          {isMoon ? (
            <g>
              {/* Distant moon hills */}
              <path d="M 0 220 Q 200 185 450 215 T 800 205 L 800 240 L 0 240 Z" fill="#475569" />
              {/* Foreground Moon Surface */}
              <rect x="0" y="240" width="800" height="80" fill="#64748B" />
              <line x1="0" y1="240" x2="800" y2="240" stroke="#0F172A" strokeWidth="4" />
              {/* Cute Craters */}
              <ellipse cx="230" cy="275" rx="35" ry="12" fill="#475569" stroke="#0F172A" strokeWidth="2.5" />
              <ellipse cx="690" cy="280" rx="45" ry="14" fill="#475569" stroke="#0F172A" strokeWidth="2.5" />
            </g>
          ) : (
            <g>
              {/* Distant Mars cliffs */}
              <path d="M 0 215 Q 240 180 500 215 T 800 200 L 800 240 L 0 240 Z" fill="#991B1B" />
              {/* Foreground Mars Surface */}
              <rect x="0" y="240" width="800" height="80" fill="#C2410C" />
              <line x1="0" y1="240" x2="800" y2="240" stroke="#0F172A" strokeWidth="4" />
              {/* Cartoon Martian Rocks */}
              <polygon points="210,275 225,255 245,278" fill="#7C2D12" stroke="#0F172A" strokeWidth="2.5" />
              <polygon points="690,285 710,260 735,288" fill="#7C2D12" stroke="#0F172A" strokeWidth="2.5" />
            </g>
          )}

          {/* 3. BASE ARCHITECTURE (SITTING CLEANLY ABOVE GROUND LINE y=240) */}

          {/* LEFT (x=140): Clear Angled Solar Panels */}
          <g id="solarPanels" transform="translate(140, 0)">
            {/* Sturdy Pole from ground line up */}
            <rect x="-4" y="145" width="8" height="95" fill="#334155" stroke="#0F172A" strokeWidth="3" />
            
            {/* Panel Pivot Joint */}
            <circle cx="0" cy="145" r="7" fill="#64748B" stroke="#0F172A" strokeWidth="3" />
            
            {/* Angled Dual Solar Wings */}
            <g transform="rotate(-15, 0, 145)">
              <rect
                x="-65"
                y="115"
                width="130"
                height="50"
                rx="8"
                fill={power <= 1 ? '#64748B' : 'url(#solarCells)'}
                stroke="#0F172A"
                strokeWidth="4"
              />
              <line x1="0" y1="115" x2="0" y2="165" stroke="#0F172A" strokeWidth="3" />
              <line x1="-65" y1="140" x2="65" y2="140" stroke="#0F172A" strokeWidth="2.5" />
              
              {/* Dust Layer Overlay if power is low */}
              {power <= 1 && (
                <rect x="-63" y="117" width="126" height="46" rx="6" fill={isMoon ? '#94A3B8' : '#D97706'} opacity="0.65" />
              )}
            </g>

            {/* Cheerful Sun Rays when power is full */}
            {power >= 4 && (
              <g className="animate-pulse">
                <line x1="-30" y1="80" x2="-20" y2="95" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="0" y1="70" x2="0" y2="90" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="30" y1="80" x2="20" y2="95" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            )}

            {/* Little Beacon Light on Top */}
            <circle
              cx="0"
              cy="100"
              r="6"
              fill={hasSpaceWeather ? '#FB7185' : '#34D399'}
              stroke="#0F172A"
              strokeWidth="2.5"
              className="animate-bounce"
            />
          </g>

          {/* CENTER (x=400): Complete Habitat Dome Sitting Cleanly Above y=240 */}
          <g id="habitatDome">
            {/* Main Habitat Dome (Base at y=240, Top at y=150) */}
            <path
              d="M 310 240 A 90 90 0 0 1 490 240 Z"
              fill="#FFFDF7"
              stroke="#0F172A"
              strokeWidth="5"
            />

            {/* Dome Rim Base Stripe */}
            <rect x="308" y="232" width="184" height="8" rx="2" fill="#38BDF8" stroke="#0F172A" strokeWidth="2.5" />

            {/* Airlock Door on the Left (x=325, y=190) */}
            <rect x="325" y="190" width="34" height="50" rx="8" fill="#E2E8F0" stroke="#0F172A" strokeWidth="3.5" />
            <circle cx="342" cy="215" r="5" fill="#0F172A" />

            {/* Custom Astronaut Standing Outside Base on Planetary Surface */}
            <foreignObject x="248" y="176" width="56" height="66">
              <div className="w-full h-full flex items-center justify-center transform hover:scale-110 transition-transform">
                <AstronautAvatar avatar={avatar} size={54} isWaving={true} />
              </div>
            </foreignObject>

            {/* Lit Circular Viewport Window (cx=405, cy=195, r=26) */}
            <circle cx="405" cy="195" r="26" fill={lifeSupport <= 1 ? '#78350F' : '#38BDF8'} stroke="#0F172A" strokeWidth="4" />
            
            {/* Cadet Smiling inside the window */}
            <circle cx="399" cy="191" r="3.5" fill="#0F172A" />
            <circle cx="411" cy="191" r="3.5" fill="#0F172A" />
            <path d="M 401 200 Q 405 206 409 200" stroke="#0F172A" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Warm Orange Heater Glow if Life Support >= 3 */}
            {lifeSupport >= 3 && (
              <circle cx="405" cy="195" r="24" fill="#F59E0B" opacity="0.3" className="animate-pulse" />
            )}

            {/* O2 Oxygen Tank on the Right (x=455, y=185) */}
            <rect x="455" y="185" width="32" height="55" rx="8" fill="#34D399" stroke="#0F172A" strokeWidth="3.5" />
            <text x="461" y="218" fill="#0F172A" fontSize="13" fontFamily="Fredoka" fontWeight="extrabold">O₂</text>
            
            {/* Little O2 Bubbles puffing out */}
            {lifeSupport >= 2 && (
              <g>
                <circle cx="471" cy="172" r="4.5" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2" className="animate-bounce" />
                <circle cx="478" cy="158" r="3" fill="#BAE6FD" stroke="#0F172A" strokeWidth="1.5" className="animate-ping" />
              </g>
            )}

            {/* Antenna Flag atop Dome */}
            <line x1="400" y1="150" x2="400" y2="128" stroke="#0F172A" strokeWidth="3.5" />
            <polygon points="400,128 418,135 400,142" fill={isMoon ? '#38BDF8' : '#F97316'} stroke="#0F172A" strokeWidth="2" />
          </g>

          {/* CRISP THIN GLOWING DASHED SHIELD ARC (Hugging the Habitat Dome) */}
          {shielding >= 2 && (
            <path
              d="M 292 240 A 108 108 0 0 1 508 240"
              fill="rgba(56, 189, 248, 0.12)"
              stroke="#38BDF8"
              strokeWidth={shielding >= 4 ? "4.5" : "3.5"}
              strokeDasharray={shielding >= 4 ? "none" : "10,8"}
              strokeLinecap="round"
              filter="url(#shieldGlow)"
              className="animate-pulse"
            />
          )}

          {/* RIGHT (x=630): Radio Dish Pointing toward Earth */}
          <g id="radioDish" transform="translate(630, 0)">
            {/* Tripod Stand from y=240 to y=175 */}
            <line x1="-15" y1="240" x2="0" y2="175" stroke="#0F172A" strokeWidth="4" />
            <line x1="15" y1="240" x2="0" y2="175" stroke="#0F172A" strokeWidth="4" />
            <line x1="0" y1="240" x2="0" y2="175" stroke="#0F172A" strokeWidth="3" />

            {/* Parabolic Dish Arc Angled toward Earth (x=720, y=65) */}
            <g transform="rotate(-32, 0, 175)">
              <path
                d="M -30 160 Q 0 190 30 160"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <line x1="0" y1="175" x2="0" y2="145" stroke="#0F172A" strokeWidth="3.5" />
              {/* Transmitter Feed Horn */}
              <circle cx="0" cy="145" r="5.5" fill={isCommDelayActive ? '#38BDF8' : '#34D399'} stroke="#0F172A" strokeWidth="2.5" className="animate-ping" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
