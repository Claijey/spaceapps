import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, ArrowRight, Award, Trophy, Brain } from 'lucide-react';
import AstronautAvatar from './AstronautAvatar';
import { spaceAudio } from '../utils/audio';

export default function MissionDebrief({
  runId,
  debriefData,
  scoreData,
  playerName = 'Cadet',
  playerTag = '#0000',
  avatar,
  coins = 100,
  onOpenQuiz,
  onPlayAgain,
  onSwitchOutpost,
  onOpenBadges,
  onOpenLeaderboard,
  onOpenClans,
  lang = 'en',
  t
}) {
  const { isEmergency, stars, title, message, finalBlocks, outpostType } = debriefData;
  const isMoon = outpostType === 'moon';

  useEffect(() => {
    if (!isEmergency) {
      spaceAudio.playSuccess();
      try {
        confetti({
          particleCount: 160,
          spread: 90,
          origin: { y: 0.55 },
          colors: ['#FBBF24', '#38BDF8', '#34D399', '#FB7185', '#FFFDF7']
        });
      } catch (e) {
        // Safe fallback
      }
    } else {
      spaceAudio.playWarning();
    }
  }, [isEmergency]);

  return (
    <div className="w-full max-w-lg mx-auto py-3 sm:py-6 px-3 animate-fade-in text-center space-y-3.5 my-auto">
      {/* Big Winner Card */}
      <div className="bg-game-cream border-4 border-game-ink rounded-3xl p-4 sm:p-6 shadow-pop relative overflow-hidden">
        {/* Star Rating */}
        <div className="flex items-center justify-center gap-2 mb-2 text-3xl sm:text-4xl">
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              className={`transform transition-all duration-300 ${
                star <= stars ? 'scale-110 animate-bounce' : 'opacity-25 grayscale'
              }`}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Triumphant Custom Avatar */}
        <div className="flex justify-center my-2 transform hover:scale-105 transition-transform">
          <AstronautAvatar avatar={avatar} size={76} isWaving={!isEmergency} />
        </div>

        {/* Cadet Call-sign */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-200 border-2 border-game-ink text-slate-800 text-xs font-heading font-black mb-1">
          <span>🧑‍🚀 {playerName}</span>
          {playerTag && (
            <span className="text-[10px] font-mono text-amber-900 bg-amber-300/80 px-1.5 py-0.2 rounded border border-amber-400">
              {playerTag}
            </span>
          )}
        </div>

        {/* Title & Message */}
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-game-ink mb-1">
          {title}
        </h1>
        <p className="font-heading font-bold text-xs sm:text-sm text-slate-700 leading-snug max-w-sm mx-auto mb-4">
          {message}
        </p>

        {/* Mission Score Box */}
        {scoreData && (
          <div className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-200 border-3 border-amber-500 rounded-2xl p-3 mb-4 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-900 mb-0.5">
              {t?.scoreLabel || 'Final Mission Score:'}
            </div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-slate-900 leading-none">
              {scoreData.finalScore?.toLocaleString()} <span className="text-sm font-bold text-amber-900">pts</span>
            </div>
            <div className="text-[11px] font-bold text-slate-700 mt-1 flex items-center justify-center gap-2 flex-wrap">
              <span>{t?.scoreBreakdown?.replace('{score}', scoreData.finalScore).replace('{mult}', scoreData.mult) || `${scoreData.mult}x Multiplier`}</span>
              <span>•</span>
              <span>
                {scoreData.baseDays}d + {scoreData.blockPoints}res {scoreData.winBonus > 0 && `+ ${scoreData.winBonus}win`}
              </span>
            </div>
          </div>
        )}

        {/* Final 3 Resource Blocks */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-amber-50 border-2 border-amber-300 mb-4">
          <div className="text-center">
            <span className="text-lg block mb-0.5">⚡</span>
            <span className="font-heading font-extrabold text-sm sm:text-base text-game-ink">
              {finalBlocks.power}/5
            </span>
            <span className="text-[10px] font-bold text-slate-500 block">{t?.battery || 'Battery'}</span>
          </div>

          <div className="text-center">
            <span className="text-lg block mb-0.5">💨</span>
            <span className="font-heading font-extrabold text-sm sm:text-base text-game-ink">
              {finalBlocks.lifeSupport}/5
            </span>
            <span className="text-[10px] font-bold text-slate-500 block">{t?.airHeat || 'Air & Heat'}</span>
          </div>

          <div className="text-center">
            <span className="text-lg block mb-0.5">🛡️</span>
            <span className="font-heading font-extrabold text-sm sm:text-base text-game-ink">
              {finalBlocks.shielding}/5
            </span>
            <span className="text-[10px] font-bold text-slate-500 block">{t?.shield || 'Shield'}</span>
          </div>
        </div>

        {/* Hall of Fame & Badges Buttons Row */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onOpenBadges();
            }}
            className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-heading font-black text-xs sm:text-sm border-2 border-game-ink shadow-chunky transition-transform active:translate-y-0.5 flex items-center justify-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>{t?.badgesBtn || '🏅 Badges'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onOpenLeaderboard();
            }}
            className="py-2 px-3 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-heading font-black text-xs sm:text-sm border-2 border-game-ink shadow-chunky transition-transform active:translate-y-0.5 flex items-center justify-center gap-1.5"
          >
            <Trophy className="w-4 h-4" />
            <span>{t?.leaderboardBtn || '🏆 Leaderboard'}</span>
          </button>
        </div>

        {/* 3D Action Buttons */}
        <div className="space-y-2">
          {onOpenQuiz && (
            <button
              type="button"
              onClick={() => {
                spaceAudio.playClick();
                onOpenQuiz();
              }}
              className="w-full min-h-[44px] py-2 px-5 rounded-2xl font-heading font-extrabold text-base tracking-wide bg-sky-300 hover:bg-sky-200 text-sky-950 border-3 border-game-ink shadow-chunky border-b-5 active:border-b-2 active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <Brain className="w-5 h-5 text-indigo-900" />
              <span>{t?.bonusQuizBtn || '🧠 Bonus Quiz (+🪙)'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              spaceAudio.playActivate();
              onPlayAgain();
            }}
            className="w-full min-h-[44px] py-2 px-5 rounded-2xl font-heading font-extrabold text-base sm:text-lg tracking-wide bg-game-yellow hover:bg-amber-400 text-game-ink border-3 border-game-ink shadow-chunky border-b-5 active:border-b-2 active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t?.playAgainBtn || 'Play Again! 🚀'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              spaceAudio.playActivate();
              onSwitchOutpost();
            }}
            className="w-full min-h-[40px] py-1.5 px-5 rounded-2xl font-heading font-extrabold text-sm sm:text-base tracking-wide bg-game-blue hover:bg-sky-400 text-game-ink border-3 border-game-ink shadow-chunky border-b-5 active:border-b-2 active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <span>{t?.switchPlanetBtn?.replace('{planet}', isMoon ? (t?.marsBase || 'Mars Base') : (t?.moonBase || 'Moon Base')) || `Play ${isMoon ? 'Mars Base' : 'Moon Base'}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
