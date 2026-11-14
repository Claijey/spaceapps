import React from 'react';
import { Zap, Wind, Shield } from 'lucide-react';

export default function ResourceHUD({ blocks, lastDelta = null, t }) {
  const gauges = [
    {
      key: 'power',
      label: t?.battery || 'Battery',
      icon: Zap,
      emoji: '⚡',
      value: blocks.power,
      delta: lastDelta?.power,
      activeColor: 'bg-game-yellow border-amber-500 shadow-sm',
    },
    {
      key: 'lifeSupport',
      label: t?.airHeat || 'Air & Heat',
      icon: Wind,
      emoji: '💨',
      value: blocks.lifeSupport,
      delta: lastDelta?.lifeSupport,
      activeColor: 'bg-game-mint border-emerald-600 shadow-sm',
    },
    {
      key: 'shielding',
      label: t?.shield || 'Shield',
      icon: Shield,
      emoji: '🛡️',
      value: blocks.shielding,
      delta: lastDelta?.shielding,
      activeColor: 'bg-game-blue border-sky-600 shadow-sm',
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-1 sm:px-2 shrink-0">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
        {gauges.map((g) => {
          const currentVal = Math.max(0, Math.min(5, g.value));
          const isDanger = currentVal <= 1;

          return (
            <div
              key={g.key}
              className={`bg-game-cream border-3 border-game-ink rounded-xl sm:rounded-2xl px-2 py-1.5 sm:px-3 sm:py-2 shadow-chunky transition-transform duration-200 ${
                isDanger ? 'ring-3 ring-rose-500 animate-pulse' : ''
              }`}
            >
              {/* Header: Emoji/Icon + Name + Delta badge */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-base sm:text-lg" role="img" aria-label={g.label}>
                    {g.emoji}
                  </span>
                  <span className="font-heading font-extrabold text-xs sm:text-sm text-game-ink truncate">
                    {g.label}
                  </span>
                </div>

                {/* Delta Chip (+1 or -1) */}
                {g.delta !== undefined && g.delta !== null && g.delta !== 0 && (
                  <span
                    className={`font-heading font-extrabold text-[10px] sm:text-xs px-1.5 py-0.2 rounded-full border border-game-ink ${
                      g.delta > 0
                        ? 'bg-game-mint text-game-ink'
                        : 'bg-game-coral text-white'
                    }`}
                  >
                    {g.delta > 0 ? `+${g.delta}` : `${g.delta}`}
                  </span>
                )}
              </div>

              {/* 5-Block Chunky Segments */}
              <div className="grid grid-cols-5 gap-1 h-4 sm:h-5">
                {[1, 2, 3, 4, 5].map((seg) => {
                  const isLit = seg <= currentVal;

                  return (
                    <div
                      key={seg}
                      className={`h-full rounded-md border border-game-ink transition-all duration-200 ${
                        isLit
                          ? `${g.activeColor} scale-100`
                          : 'bg-slate-200/60 border-dashed border-slate-400 opacity-40'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Status Hint */}
              <div className="flex justify-between items-center mt-1 text-[10px] font-heading font-bold">
                <span className={isDanger ? 'text-rose-600 font-extrabold' : 'text-slate-500'}>
                  {isDanger ? (t?.statusLow || '⚠️ Low!') : (t?.statusFull?.replace('{n}', currentVal) || `${currentVal}/5 Full`)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
