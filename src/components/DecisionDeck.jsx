import React, { useRef } from 'react';
import { 
  Flame, 
  Sun, 
  Shield, 
  ShieldAlert, 
  Mountain, 
  Lock, 
  Zap, 
  Sparkles, 
  BatteryCharging, 
  Bed, 
  Radio, 
  Rocket, 
  Wind, 
  Droplets, 
  Compass, 
  Moon, 
  Wrench,
  GripVertical
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

const ICON_MAP = {
  Flame,
  Sun,
  Shield,
  ShieldAlert,
  Mountain,
  Lock,
  Zap,
  Sparkles,
  BatteryCharging,
  Bed,
  Radio,
  Rocket,
  Wind,
  Droplets,
  Compass,
  Moon,
  Wrench
};

export default function DecisionDeck({
  scenario,
  onSelectDecision,
  onDragOverState,
  isProcessing = false
}) {
  const touchRef = useRef({ startX: 0, startY: 0, draggingId: null, isMoved: false });

  if (!scenario) return null;

  const handleDragStart = (e, decisionId) => {
    e.dataTransfer.setData('text/plain', decisionId);
    e.dataTransfer.effectAllowed = 'copy';
    spaceAudio.playClick();
  };

  const handleTouchStart = (e, decisionId) => {
    if (isProcessing) return;
    const touch = e.touches[0];
    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      draggingId: decisionId,
      isMoved: false
    };
  };

  const handleTouchMove = (e) => {
    if (!touchRef.current.draggingId || isProcessing) return;
    const touch = e.touches[0];
    const dist = Math.hypot(touch.clientX - touchRef.current.startX, touch.clientY - touchRef.current.startY);
    if (dist > 8) {
      touchRef.current.isMoved = true;
      const elem = document.elementFromPoint(touch.clientX, touch.clientY);
      const isOver = Boolean(elem?.closest('#outpost-drop-zone'));
      if (onDragOverState) {
        onDragOverState(isOver);
      }
    }
  };

  const handleTouchEnd = (e, decisionId) => {
    if (isProcessing || !touchRef.current.draggingId) return;
    const wasMoved = touchRef.current.isMoved;
    const touch = e.changedTouches[0];

    if (wasMoved) {
      const elem = document.elementFromPoint(touch.clientX, touch.clientY);
      if (elem?.closest('#outpost-drop-zone')) {
        spaceAudio.playActivate();
        onSelectDecision(decisionId);
      }
      if (onDragOverState) {
        onDragOverState(false);
      }
    } else {
      // If user tapped directly on button, let button onClick handle it
      if (!e.target?.closest('button')) {
        spaceAudio.playActivate();
        onSelectDecision(decisionId);
      }
    }

    touchRef.current = { startX: 0, startY: 0, draggingId: null, isMoved: false };
  };

  const handleTouchCancel = () => {
    if (onDragOverState) onDragOverState(false);
    touchRef.current = { startX: 0, startY: 0, draggingId: null, isMoved: false };
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-1 sm:space-y-1.5 shrink-0 px-1 sm:px-2 select-none">
      {/* Event Alert Pill if present */}
      {scenario.eventAlert && (
        <div className="bg-game-yellow border-2 sm:border-3 border-game-ink rounded-xl px-3 py-1 shadow-sm flex items-center gap-2 text-game-ink font-heading font-extrabold text-xs sm:text-sm">
          <span>⚠️</span>
          <span className="truncate">{scenario.eventAlert}</span>
        </div>
      )}

      {/* 3 Compact Chunky Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {scenario.decisions.map((dec, idx) => {
          const IconComponent = ICON_MAP[dec.icon] || Sparkles;

          let btnBg = 'bg-game-yellow hover:bg-amber-400 text-game-ink';
          let iconBg = 'bg-amber-100 text-amber-600 border-amber-400';

          if (dec.color === 'mint') {
            btnBg = 'bg-game-mint hover:bg-emerald-400 text-game-ink';
            iconBg = 'bg-emerald-100 text-emerald-600 border-emerald-400';
          } else if (dec.color === 'blue') {
            btnBg = 'bg-game-blue hover:bg-sky-400 text-game-ink';
            iconBg = 'bg-sky-100 text-sky-600 border-sky-400';
          } else if (dec.color === 'coral') {
            btnBg = 'bg-game-coral hover:bg-rose-400 text-white';
            iconBg = 'bg-rose-100 text-rose-600 border-rose-400';
          } else if (dec.color === 'purple') {
            btnBg = 'bg-game-purple hover:bg-purple-400 text-white';
            iconBg = 'bg-purple-100 text-purple-600 border-purple-400';
          }

          return (
            <div
              key={dec.id}
              draggable
              onMouseEnter={() => spaceAudio.playPop()}
              onDragStart={(e) => handleDragStart(e, dec.id)}
              onTouchStart={(e) => handleTouchStart(e, dec.id)}
              onTouchMove={handleTouchMove}
              onTouchEnd={(e) => handleTouchEnd(e, dec.id)}
              onTouchCancel={handleTouchCancel}
              style={{ touchAction: 'none' }}
              className="bg-game-cream border-3 border-game-ink rounded-2xl p-2.5 sm:p-3 shadow-chunky hover:-translate-y-0.5 transition-all duration-150 cursor-grab active:cursor-grabbing flex flex-col justify-between touch-none select-none"
            >
              <div>
                {/* Header: Option number & Drag grip */}
                <div className="flex items-center justify-between text-[10px] font-heading font-bold text-slate-500 mb-1">
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-100 border border-slate-300">
                    #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <GripVertical className="w-3 h-3" />
                    <span className="hidden sm:inline">Drag me</span>
                  </div>
                </div>

                {/* Big Icon + 2-3 Word Title */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 flex items-center justify-center shrink-0 ${iconBg} shadow-xs`}>
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-game-ink leading-tight truncate">
                    {dec.title}
                  </h3>
                </div>

                {/* Simple Trade-off Badges */}
                <div className="flex flex-wrap gap-1 mb-2.5">
                  {dec.chips.map((chip, cIdx) => (
                    <span
                      key={cIdx}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] sm:text-xs font-heading font-extrabold border border-game-ink ${
                        chip.isPlus
                          ? 'bg-game-mint/40 text-emerald-950'
                          : 'bg-game-coral/30 text-rose-950'
                      }`}
                    >
                      <span>{chip.icon}</span>
                      <span>{chip.label}</span>
                      <span className="text-xs sm:text-sm">{chip.val}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* 3D Action Button */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={(e) => {
                  e.stopPropagation();
                  spaceAudio.playActivate();
                  onSelectDecision(dec.id);
                }}
                className={`w-full min-h-[40px] sm:min-h-[44px] py-1.5 px-3 rounded-xl font-heading font-extrabold text-sm tracking-wide border-2 border-game-ink shadow-sm border-b-4 active:border-b-1 active:translate-y-1 transition-all flex items-center justify-center gap-1.5 ${btnBg} touch-manipulation`}
              >
                <span>{dec.actionText || 'USE CARD'}</span>
                <span>➔</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
