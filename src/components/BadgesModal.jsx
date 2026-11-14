import React, { useEffect } from 'react';
import { X, Award, Sparkles } from 'lucide-react';
import { ACHIEVEMENTS, getUnlockedAchievements } from '../data/achievements';
import { translations } from '../data/translations';
import { playPop } from '../utils/audio';

export default function BadgesModal({ isOpen, onClose, lang = 'en' }) {
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
  const unlockedIds = getUnlockedAchievements();
  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENTS.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-game-cream border-4 border-amber-400 rounded-3xl shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 px-6 py-4 border-b-4 border-amber-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border-2 border-amber-600 flex items-center justify-center shadow-inner">
              <Award className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black font-fredoka text-slate-900 leading-tight">
                {t.badgesTitle}
              </h2>
              <p className="text-xs md:text-sm font-bold text-amber-900">
                {t.unlockedCount.replace('{count}', unlockedCount).replace('{total}', totalCount)}
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

        {/* Progress Bar */}
        <div className="px-6 pt-4 pb-2 bg-amber-50/50 border-b border-amber-200">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1.5">
            <span>{lang === 'tr' ? 'Rozet İlerlemesi' : 'Badge Progress'}</span>
            <span className="text-amber-700 font-extrabold">{progressPercent}%</span>
          </div>
          <div className="w-full h-3.5 bg-slate-200 rounded-full border-2 border-slate-300 overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-500 shadow"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Badges Grid */}
        <div className="p-6 overflow-y-auto space-y-4 max-h-[60vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {ACHIEVEMENTS.map((item) => {
              const isUnlocked = unlockedIds.includes(item.id);
              const title = item.title[lang] || item.title.en;
              const desc = item.desc[lang] || item.desc.en;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border-3 flex items-start gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-white border-amber-400 shadow-md hover:border-amber-500 hover:scale-[1.02]'
                      : 'bg-slate-100/70 border-slate-200 opacity-60'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border-2 shadow-inner ${
                      isUnlocked
                        ? 'bg-amber-100 border-amber-400'
                        : 'bg-slate-200 border-slate-300 grayscale'
                    }`}
                  >
                    {isUnlocked ? item.icon : '🔒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-fredoka font-black text-base text-slate-900 leading-tight">
                        {title}
                      </span>
                      {isUnlocked && (
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-snug mt-1">
                      {desc}
                    </p>
                    <div className="mt-2">
                      {isUnlocked ? (
                        <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {lang === 'tr' ? 'Kazanıldı ✓' : 'Unlocked ✓'}
                        </span>
                      ) : (
                        <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 border border-slate-300">
                          {t.lockedBadge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t-2 border-slate-200 flex justify-end">
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-fredoka font-black text-base border-2 border-amber-600 shadow-sm transition-transform active:scale-95"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

export { BadgesModal };
