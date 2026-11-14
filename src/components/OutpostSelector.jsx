import React from 'react';
import { Sparkles, Trophy, Award, Dices, Palette, Coins, Brain, Users } from 'lucide-react';
import AstronautAvatar from './AstronautAvatar';
import { spaceAudio } from '../utils/audio';

export default function OutpostSelector({
  onSelectOutpost,
  lang = 'en',
  onToggleLang,
  playerName = 'Captain Nova',
  playerTag = '#0000',
  onNameChange,
  avatar,
  onOpenCustomizer,
  coins = 100,
  onOpenQuiz,
  difficulty = 'medium',
  onDifficultyChange,
  onOpenBadges,
  onOpenLeaderboard,
  onOpenClans,
  t
}) {
  const handleRandomName = () => {
    spaceAudio.playBoing();
    const list = t?.randomNames || ['Captain Nova', 'Astro Leo', 'Commander Ada', 'Cosmo Maya'];
    const filtered = list.filter((n) => n !== playerName);
    const chosen = filtered[Math.floor(Math.random() * filtered.length)] || list[0];
    onNameChange(chosen);
  };

  const difficulties = [
    {
      id: 'easy',
      name: t?.diffEasy || '🌟 Explorer',
      desc: t?.diffDescEasy || '4 Days • Safe Supplies',
      badge: '🌟'
    },
    {
      id: 'medium',
      name: t?.diffMed || '🚀 Commander',
      desc: t?.diffDescMed || '5 Days • Standard Storms',
      badge: '🚀'
    },
    {
      id: 'hard',
      name: t?.diffHard || '🔥 NASA Pro',
      desc: t?.diffDescHard || '7 Days • 2x Score',
      badge: '🔥'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-2 px-3 animate-fade-in flex flex-col items-center justify-center my-auto">
      {/* Top Bar: Language Switcher + Badges & Leaderboard buttons */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-2 max-w-3xl">
        {/* Language Toggle */}
        <div className="flex items-center gap-1 p-1 bg-game-cream border-2 border-game-ink rounded-full shadow-sm">
          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              if (lang !== 'en') onToggleLang('en');
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-full font-heading font-extrabold text-xs transition-all ${
              lang === 'en'
                ? 'bg-game-yellow text-game-ink border border-game-ink shadow-sm'
                : 'text-slate-600 hover:text-game-ink'
            }`}
          >
            <span>🇬🇧</span>
            <span>English</span>
          </button>
          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              if (lang !== 'tr') onToggleLang('tr');
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-full font-heading font-extrabold text-xs transition-all ${
              lang === 'tr'
                ? 'bg-game-coral text-white border border-game-ink shadow-sm'
                : 'text-slate-600 hover:text-game-ink'
            }`}
          >
            <span>🇹🇷</span>
            <span>Türkçe</span>
          </button>
        </div>

        {/* Coins, Quiz, Badges & Leaderboard Shortcuts */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Star Coins Balance */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 border-2 border-game-ink font-heading font-black text-xs shadow-chunky">
            <Coins className="w-3.5 h-3.5 text-amber-950 animate-bounce" />
            <span>{coins} 🪙</span>
          </div>

          {/* Quiz Button */}
          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onOpenQuiz();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-300 hover:bg-sky-200 text-sky-950 border-2 border-game-ink font-heading font-extrabold text-xs shadow-chunky transition-transform active:translate-y-0.5"
            title="Earn Star Coins by answering NASA space science questions"
          >
            <Brain className="w-3.5 h-3.5 text-indigo-900" />
            <span>{t?.bonusQuizBtn || '🧠 Quiz (+🪙)'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 border-2 border-game-ink font-heading font-extrabold text-xs shadow-chunky transition-transform active:translate-y-0.5"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{t?.badgesBtn || '🏅 Badges'}</span>
          </button>

          {/* Clans Button */}
          {onOpenClans && (
            <button
              type="button"
              onClick={() => {
                spaceAudio.playClick();
                onOpenClans();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white border-2 border-game-ink font-heading font-extrabold text-xs shadow-chunky transition-transform active:translate-y-0.5"
              title={t?.clansNavBtn || 'Space Clans'}
            >
              <Users className="w-3.5 h-3.5 text-indigo-100" />
              <span>{t?.clansNavBtn || '👥 Clans'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-300 hover:bg-yellow-200 text-slate-900 border-2 border-game-ink font-heading font-extrabold text-xs shadow-chunky transition-transform active:translate-y-0.5"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{t?.leaderboardBtn || '🏆 Leaderboard'}</span>
          </button>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-game-yellow border-2 border-game-ink shadow-sm mb-1 animate-bounce-gentle">
          <Sparkles className="w-3 h-3 text-game-ink" />
          <span className="font-heading font-extrabold text-[11px] uppercase tracking-wider text-game-ink">
            {t?.tagline || '2026 NASA Space Apps Challenge'}
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-wide drop-shadow-md leading-tight">
          {t?.gameTitle || 'Space Base Rescue!'}
        </h1>
        <p className="font-heading font-extrabold text-xs sm:text-base text-game-yellow mt-0.5">
          {t?.subtitle || 'Pick a base and keep your crew safe!'}
        </p>
      </div>

      {/* Cadet Name Input + Customizer + Randomizer Bar */}
      <div className="w-full max-w-2xl bg-game-cream/95 backdrop-blur-xs border-3 border-game-ink rounded-2xl p-2 sm:p-2.5 shadow-chunky mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* Clickable Custom Avatar Icon */}
          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onOpenCustomizer();
            }}
            className="w-10 h-10 rounded-2xl bg-amber-200 border-2 border-game-ink flex items-center justify-center shrink-0 overflow-hidden shadow-xs hover:scale-105 active:scale-95 transition-all group"
            title={t?.customizeBtn || 'Customize Avatar'}
          >
            <AstronautAvatar avatar={avatar} size={36} isWaving={true} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block leading-tight">
                {t?.nameLabel || 'Astronaut Call-Sign:'}
              </label>
              {playerTag && (
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200/90 px-1.5 py-0.5 rounded border border-amber-400 shadow-xs">
                  {playerTag}
                </span>
              )}
            </div>
            <input
              type="text"
              value={playerName}
              maxLength={20}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder={t?.namePlaceholder || 'Enter cadet name...'}
              className="w-full bg-transparent font-heading font-black text-sm sm:text-base text-game-ink placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Customize Button */}
          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onOpenCustomizer();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-900 border-2 border-game-ink font-heading font-black text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
          >
            <Palette className="w-4 h-4" />
            <span>{lang === 'tr' ? '🎨 Astronotu Özelleştir' : '🎨 Customize Astronaut'}</span>
          </button>

          {/* Random Name Button */}
          <button
            type="button"
            onClick={handleRandomName}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-200 hover:bg-sky-300 text-sky-950 border-2 border-game-ink font-heading font-black text-xs shadow-sm transition-transform active:scale-95"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>{t?.randomBtn || 'Random 🎲'}</span>
          </button>
        </div>
      </div>

      {/* Difficulty Modes 3-Pill Toggle */}
      <div className="w-full max-w-2xl mb-3.5">
        <div className="text-center text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-200 mb-1">
          {t?.diffLabel || 'Mission Difficulty:'}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {difficulties.map((diff) => {
            const isSelected = difficulty === diff.id;
            return (
              <button
                key={diff.id}
                type="button"
                onClick={() => {
                  spaceAudio.playClick();
                  onDifficultyChange(diff.id);
                }}
                className={`p-2 rounded-2xl border-3 text-center transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-900 border-game-ink shadow-chunky scale-102 ring-2 ring-yellow-200'
                    : 'bg-white/80 hover:bg-white text-slate-700 border-game-ink/60'
                }`}
              >
                <div className="font-heading font-black text-xs sm:text-sm truncate">
                  {diff.name}
                </div>
                <div className="text-[9px] sm:text-[10px] font-bold opacity-80 truncate mt-0.5">
                  {diff.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2 Illustrated Planet Cards (Moon vs. Mars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 w-full max-w-3xl">
        {/* MOON BASE CARD */}
        <div className="bg-game-cream border-4 border-game-ink rounded-3xl p-4 sm:p-5 shadow-chunky hover:-translate-y-0.5 hover:shadow-pop transition-all duration-200 flex flex-col items-center text-center">
          {/* Moon SVG Artwork */}
          <div className="w-20 h-20 sm:w-28 sm:h-28 mb-2">
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="cardMoonSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E1B4B" />
                  <stop offset="100%" stopColor="#4338CA" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="72" fill="url(#cardMoonSky)" stroke="#0F172A" strokeWidth="5" />
              <path d="M 12 110 Q 80 85 148 110 L 148 152 A 72 72 0 0 1 12 152 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="4" />
              <ellipse cx="50" cy="125" rx="16" ry="6" fill="#64748B" />
              <ellipse cx="115" cy="128" rx="20" ry="7" fill="#64748B" />
              <path d="M 50 110 A 30 30 0 0 1 110 110 Z" fill="#FFFDF7" stroke="#0F172A" strokeWidth="4" />
              <circle cx="72" cy="98" r="3" fill="#0F172A" />
              <circle cx="88" cy="98" r="3" fill="#0F172A" />
              <path d="M 76 104 Q 80 108 84 104" stroke="#0F172A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <line x1="80" y1="80" x2="80" y2="65" stroke="#0F172A" strokeWidth="3" />
              <polygon points="80,65 96,72 80,79" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
              <circle cx="120" cy="45" r="4" fill="#FDE047" className="animate-ping" />
            </svg>
          </div>

          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-game-ink mb-0.5">
            {t?.moonBase || 'Moon Base'}
          </h2>
          <div className="text-[10px] font-bold text-slate-500 mb-2">
            {t?.moonLocation || 'Shackleton Crater (South Pole)'}
          </div>

          {/* 2 Visual Emoji Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
            <span className="font-heading font-extrabold text-[11px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 border-2 border-game-ink">
              {t?.moonBadge1 || '❄️ Freezing Cold'}
            </span>
            <span className="font-heading font-extrabold text-[11px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-900 border-2 border-game-ink">
              {t?.moonBadge2 || '🌫️ Sticky Dust'}
            </span>
          </div>

          {/* Giant 3D PLAY Button */}
          <button
            type="button"
            onClick={() => {
              spaceAudio.playActivate();
              onSelectOutpost('moon');
            }}
            className="w-full min-h-[44px] py-2 px-5 rounded-2xl font-heading font-extrabold text-lg tracking-wide bg-game-yellow hover:bg-amber-400 text-game-ink border-3 border-game-ink shadow-chunky border-b-5 active:border-b-2 active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <span>{t?.playBtn || 'PLAY! ➔'}</span>
          </button>
        </div>

        {/* MARS BASE CARD */}
        <div className="bg-game-cream border-4 border-game-ink rounded-3xl p-4 sm:p-5 shadow-chunky hover:-translate-y-0.5 hover:shadow-pop transition-all duration-200 flex flex-col items-center text-center">
          {/* Mars SVG Artwork */}
          <div className="w-20 h-20 sm:w-28 sm:h-28 mb-2">
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="cardMarsSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A1D24" />
                  <stop offset="100%" stopColor="#9C2D1F" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="72" fill="url(#cardMarsSky)" stroke="#0F172A" strokeWidth="5" />
              <path d="M 12 110 Q 80 85 148 110 L 148 152 A 72 72 0 0 1 12 152 Z" fill="#EA580C" stroke="#0F172A" strokeWidth="4" />
              <polygon points="40,128 48,118 56,130" fill="#9A3412" stroke="#0F172A" strokeWidth="2" />
              <polygon points="112,126 122,116 132,128" fill="#9A3412" stroke="#0F172A" strokeWidth="2" />
              <path d="M 50 110 A 30 30 0 0 1 110 110 Z" fill="#FFFDF7" stroke="#0F172A" strokeWidth="4" />
              <circle cx="80" cy="98" r="8" fill="#34D399" />
              <path d="M 77 98 Q 80 92 83 98" stroke="#047857" strokeWidth="2" fill="none" />
              <line x1="80" y1="80" x2="80" y2="60" stroke="#0F172A" strokeWidth="3" />
              <circle cx="80" cy="58" r="4" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" />
              <path d="M 72 54 Q 80 48 88 54" stroke="#FBBF24" strokeWidth="2" fill="none" className="animate-ping" />
            </svg>
          </div>

          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-game-ink mb-0.5">
            {t?.marsBase || 'Mars Base'}
          </h2>
          <div className="text-[10px] font-bold text-slate-500 mb-2">
            {t?.marsLocation || 'Jezero Crater Delta'}
          </div>

          {/* 2 Visual Emoji Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
            <span className="font-heading font-extrabold text-[11px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-950 border-2 border-game-ink">
              {t?.marsBadge1 || '🌪️ Dust Storms'}
            </span>
            <span className="font-heading font-extrabold text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 border-2 border-game-ink">
              {t?.marsBadge2 || '📡 Slow Radio'}
            </span>
          </div>

          {/* Giant 3D PLAY Button */}
          <button
            type="button"
            onClick={() => {
              spaceAudio.playActivate();
              onSelectOutpost('mars');
            }}
            className="w-full min-h-[44px] py-2 px-5 rounded-2xl font-heading font-extrabold text-lg tracking-wide bg-game-coral hover:bg-rose-400 text-white border-3 border-game-ink shadow-chunky border-b-5 active:border-b-2 active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <span>{t?.playBtn || 'PLAY! ➔'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
