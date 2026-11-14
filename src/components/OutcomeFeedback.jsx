import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function OutcomeFeedback({
  decision,
  nextDay,
  totalDays = 5,
  isLastDay = false,
  onProceed,
  t
}) {
  if (!decision) return null;
  const [showFact, setShowFact] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-game-sky/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-md bg-game-cream border-4 border-game-ink rounded-3xl p-5 sm:p-7 shadow-pop relative overflow-hidden text-center max-h-[92vh] overflow-y-auto">
        {/* Playful Floating Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-game-yellow border-3 border-game-ink shadow-chunky text-2xl mb-3 animate-bounce">
          🎉
        </div>

        {/* 1-Sentence Comic Outcome */}
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-game-ink leading-tight mb-3">
          {decision.comicOutcome}
        </h2>

        {/* Visual Blocks Delta summary */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
          {decision.effects.power !== 0 && (
            <span
              className={`font-heading font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-xl border border-game-ink flex items-center gap-1 ${
                decision.effects.power > 0
                  ? 'bg-game-mint text-game-ink'
                  : 'bg-game-coral text-white'
              }`}
            >
              <span>⚡ {t?.battery || 'Battery'}:</span>
              <span>{decision.effects.power > 0 ? `+${decision.effects.power}` : decision.effects.power}</span>
            </span>
          )}

          {decision.effects.lifeSupport !== 0 && (
            <span
              className={`font-heading font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-xl border border-game-ink flex items-center gap-1 ${
                decision.effects.lifeSupport > 0
                  ? 'bg-game-mint text-game-ink'
                  : 'bg-game-coral text-white'
              }`}
            >
              <span>💨 {t?.airHeat || 'Air & Heat'}:</span>
              <span>{decision.effects.lifeSupport > 0 ? `+${decision.effects.lifeSupport}` : decision.effects.lifeSupport}</span>
            </span>
          )}

          {decision.effects.shielding !== 0 && (
            <span
              className={`font-heading font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-xl border border-game-ink flex items-center gap-1 ${
                decision.effects.shielding > 0
                  ? 'bg-game-mint text-game-ink'
                  : 'bg-game-coral text-white'
              }`}
            >
              <span>🛡️ {t?.shield || 'Shield'}:</span>
              <span>{decision.effects.shielding > 0 ? `+${decision.effects.shielding}` : decision.effects.shielding}</span>
            </span>
          )}
        </div>

        {/* Real NASA Science Fact toggle */}
        <div className="mb-5">
          <button
            type="button"
            onClick={() => setShowFact(!showFact)}
            className="text-xs font-heading font-extrabold text-slate-500 hover:text-game-ink flex items-center justify-center gap-1 mx-auto transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-game-blueDark" />
            <span>{showFact ? (t?.hideFactToggle || 'Hide Real NASA Fact') : (t?.curiousFactToggle || 'Curious? Read Real NASA Fact ▾')}</span>
          </button>

          {showFact && (
            <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border-2 border-amber-300 text-left text-xs font-medium text-amber-950 leading-relaxed animate-fade-in">
              <span className="font-heading font-extrabold block text-amber-800 mb-0.5">
                {t?.realNasaFactTitle || 'Real NASA Mission Science:'}
              </span>
              {decision.nasaFact}
            </div>
          )}
        </div>

        {/* 3D Next Day Button */}
        <button
          type="button"
          onClick={() => {
            spaceAudio.playClick();
            onProceed();
          }}
          className="w-full min-h-[48px] py-2.5 px-5 rounded-2xl font-heading font-extrabold text-lg sm:text-xl tracking-wide bg-game-mint hover:bg-emerald-400 text-game-ink border-3 border-game-ink shadow-chunky border-b-5 active:border-b-2 active:translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          <span>
            {isLastDay
              ? (t?.finalScoreBtn || 'See Final Score! 🏆')
              : (t?.nextDayBtn?.replace('{n}', nextDay) || `Next Day (Day ${nextDay}) ➔`)}
          </span>
        </button>
      </div>
    </div>
  );
}
