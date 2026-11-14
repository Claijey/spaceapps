import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Trophy, Rocket, Calendar, Award, Gift } from 'lucide-react';
import AstronautAvatar from './AstronautAvatar';
import { getLeaderboard } from '../utils/leaderboard';
import { DAILY_TOP10_REWARDS, getLastDailyClaim, setLastDailyClaim } from '../data/avatarConfig';
import { translations } from '../data/translations';
import { playPop, playSuccess } from '../utils/audio';

export function LeaderboardModal({
  isOpen,
  onClose,
  playerName = 'Cadet',
  playerId = 'cadet_player',
  onRewardCoins,
  lang = 'en'
}) {
  const [filter, setFilter] = useState('all'); // 'all', 'moon', 'mars'
  const [entries, setEntries] = useState([]);
  const [claimedToday, setClaimedToday] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEntries(getLeaderboard());
      const todayStr = new Date().toISOString().split('T')[0];
      setClaimedToday(getLastDailyClaim() === todayStr);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t = translations[lang] || translations.en;

  const filteredEntries = entries.filter((item) => {
    if (filter === 'all') return true;
    return item.outpost === filter;
  });

  const getRankBadge = (index) => {
    if (index === 0) return <span className="text-2xl">🥇</span>;
    if (index === 1) return <span className="text-2xl">🥈</span>;
    if (index === 2) return <span className="text-2xl">🥉</span>;
    return (
      <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-fredoka font-black text-sm flex items-center justify-center">
        #{index + 1}
      </span>
    );
  };

  const getDiffBadge = (diff) => {
    if (diff === 'hard') {
      return (
        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-300 text-xs font-black">
          🔥 {lang === 'tr' ? 'NASA Uzmanı' : 'NASA Pro'}
        </span>
      );
    }
    if (diff === 'easy') {
      return (
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-black">
          🌟 {lang === 'tr' ? 'Kaşif' : 'Explorer'}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300 text-xs font-black">
        🚀 {lang === 'tr' ? 'Komutan' : 'Commander'}
      </span>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-game-cream border-4 border-yellow-400 rounded-3xl shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 px-6 py-4 border-b-4 border-yellow-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border-2 border-amber-600 flex items-center justify-center shadow-inner">
              <Trophy className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black font-fredoka text-slate-900 leading-tight">
                {t.leaderboardTitle}
              </h2>
              <p className="text-xs md:text-sm font-bold text-amber-900">
                {lang === 'tr' ? 'En Yüksek Puanlı Görevler' : 'Top Space Mission Records'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="w-10 h-10 rounded-2xl bg-amber-100 hover:bg-white text-slate-700 border-2 border-amber-600 flex items-center justify-center font-bold transition-transform active:scale-95 shadow-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Daily Top-10 Coin Reward Banner */}
        {(() => {
          const playerRankIndex = entries.findIndex(
            (e) => (e.playerId && e.playerId === playerId) || (e.playerName && e.playerName.toLowerCase() === (playerName || '').toLowerCase())
          );
          const isTop10 = playerRankIndex >= 0 && playerRankIndex < 10;
          const rankNum = playerRankIndex + 1;
          const rewardAmount = isTop10 ? (DAILY_TOP10_REWARDS[rankNum] || 50) : 0;

          if (!isTop10) return null;

          const handleClaim = () => {
            const todayStr = new Date().toISOString().split('T')[0];
            setLastDailyClaim(todayStr);
            setClaimedToday(true);
            playSuccess();
            try {
              confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.5 },
                colors: ['#FBBF24', '#FDE047', '#34D399', '#38BDF8']
              });
            } catch (e) {}
            if (onRewardCoins) {
              onRewardCoins(rewardAmount);
            }
          };

          return (
            <div className="mx-4 md:mx-6 mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 border-3 border-amber-500 shadow-sm flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-2xl animate-bounce">🎁</span>
                <div className="min-w-0">
                  <div className="font-heading font-black text-xs sm:text-sm text-slate-900 leading-tight truncate">
                    {lang === 'tr' ? `Günlük İlk 10 Kadet Ödülü! Sıralama #${rankNum}` : `Daily Top-10 Cadet Reward! Rank #${rankNum}`}
                  </div>
                  <div className="text-[11px] font-bold text-amber-950 truncate">
                    {claimedToday
                      ? (t.rewardClaimed || 'Claimed! 🎉')
                      : `+${rewardAmount} 🪙 ${lang === 'tr' ? 'hesabına eklenmeye hazır!' : 'ready to claim!'}`}
                  </div>
                </div>
              </div>

              {!claimedToday ? (
                <button
                  type="button"
                  onClick={handleClaim}
                  className="px-3.5 py-1.5 rounded-xl bg-game-mint hover:bg-emerald-400 text-slate-900 font-heading font-black text-xs sm:text-sm border-2 border-game-ink shadow-sm transition-transform active:scale-95 shrink-0"
                >
                  {t.claimRewardBtn?.replace('{reward}', rewardAmount) || `Claim +${rewardAmount} 🪙!`}
                </button>
              ) : (
                <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-heading font-black text-xs border border-emerald-300 shrink-0">
                  {t.rewardClaimed || 'Claimed ✓'}
                </span>
              )}
            </div>
          );
        })()}

        {/* Filter Tabs */}
        <div className="px-6 py-3 bg-amber-50/50 border-b border-amber-200 flex gap-2">
          <button
            onClick={() => {
              playPop();
              setFilter('all');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs md:text-sm font-black transition-all ${
              filter === 'all'
                ? 'bg-amber-400 text-slate-900 shadow-sm border-2 border-amber-600'
                : 'bg-white text-slate-600 border border-slate-300 hover:bg-amber-100'
            }`}
          >
            {t.filterAll}
          </button>
          <button
            onClick={() => {
              playPop();
              setFilter('moon');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs md:text-sm font-black transition-all flex items-center gap-1.5 ${
              filter === 'moon'
                ? 'bg-indigo-500 text-white shadow-sm border-2 border-indigo-700'
                : 'bg-white text-slate-600 border border-slate-300 hover:bg-indigo-50'
            }`}
          >
            <span>🌙</span> {t.filterMoon}
          </button>
          <button
            onClick={() => {
              playPop();
              setFilter('mars');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs md:text-sm font-black transition-all flex items-center gap-1.5 ${
              filter === 'mars'
                ? 'bg-rose-500 text-white shadow-sm border-2 border-rose-700'
                : 'bg-white text-slate-600 border border-slate-300 hover:bg-rose-50'
            }`}
          >
            <span>🪐</span> {t.filterMars}
          </button>
        </div>

        {/* Table Content */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[55vh] space-y-2.5">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-bold">
              {t.noScores}
            </div>
          ) : (
            filteredEntries.map((item, index) => (
              <div
                key={item.id || index}
                className="p-3 md:p-3.5 bg-white border-2 border-slate-200 hover:border-amber-400 rounded-2xl flex items-center justify-between gap-3 shadow-sm transition-all"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 sm:w-9 flex items-center justify-center shrink-0">
                    {getRankBadge(index)}
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-amber-100 border-2 border-game-ink flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                    <AstronautAvatar avatar={item.avatar} size={30} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-fredoka font-black text-base text-slate-900 truncate">
                        {item.playerName || 'Cadet'}
                      </span>
                      {getDiffBadge(item.difficulty)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                      <span className="flex items-center gap-1">
                        {item.outpost === 'moon' ? '🌙 Moon Base' : '🪐 Mars Base'}
                      </span>
                      <span>•</span>
                      <span>
                        {item.daysSurvived} {lang === 'tr' ? 'Gün' : 'Days'}
                      </span>
                      {item.date && (
                        <>
                          <span>•</span>
                          <span>{item.date}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-fredoka font-black text-lg md:text-xl text-amber-600">
                    {item.score?.toLocaleString()} <span className="text-xs font-bold text-slate-500">pts</span>
                  </div>
                  {item.isWin && (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {lang === 'tr' ? 'Görev Başarılı' : 'Completed'}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t-2 border-slate-200 flex justify-end">
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="px-6 py-2.5 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-fredoka font-black text-base border-2 border-yellow-600 shadow-sm transition-transform active:scale-95"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardModal;

