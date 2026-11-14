import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { playPowerUp } from '../utils/audio';

export function AchievementToast({ achievement, lang = 'en', onClose }) {
  useEffect(() => {
    if (achievement) {
      playPowerUp();
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  const title = achievement.title?.[lang] || achievement.title?.en || 'Badge Unlocked!';
  const desc = achievement.desc?.[lang] || achievement.desc?.en || '';

  return (
    <div
      onClick={onClose}
      className="fixed bottom-6 right-6 z-[100] max-w-sm cursor-pointer animate-bounce-short bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-100 text-slate-900 border-4 border-amber-500 rounded-3xl p-4 shadow-2xl flex items-center gap-3.5 select-none hover:scale-105 transition-transform"
      role="alert"
    >
      <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-amber-600 flex items-center justify-center text-3xl shadow-inner shrink-0">
        {achievement.icon || '🏅'}
      </div>
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
          <span>{lang === 'tr' ? 'BAŞARIM AÇILDI!' : 'BADGE UNLOCKED!'}</span>
        </div>
        <div className="font-fredoka font-black text-lg text-slate-900 leading-tight truncate">
          {title}
        </div>
        <div className="text-xs text-slate-700 font-medium leading-snug line-clamp-2 mt-0.5">
          {desc}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="w-7 h-7 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center text-slate-700 shrink-0"
        title="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
