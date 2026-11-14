import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Volume2, 
  VolumeX, 
  Music, 
  Database, 
  RotateCcw, 
  Award, 
  Trophy, 
  Users,
  Maximize2,
  Minimize2
} from 'lucide-react';
import AstronautAvatar from './AstronautAvatar';
import { spaceAudio } from '../utils/audio';

export default function HeaderBar({
  isGameActive = false,
  currentDay = 1,
  totalDays = 5,
  outpostConfig,
  weatherData,
  difficulty = 'medium',
  playerName = 'Cadet',
  playerTag = '#0000',
  avatar,
  coins = 100,
  onOpenSources,
  onOpenBadges,
  onOpenLeaderboard,
  onOpenClans,
  onExitGame,
  isSfxMuted = false,
  onToggleSfx,
  isBgmPlaying = false,
  onToggleBgm,
  lang = 'en',
  onToggleLang,
  t
}) {
  const isLive = weatherData?.isLive;

  const [isFullscreen, setIsFullscreen] = useState(() => {
    if (typeof document === 'undefined') return false;
    return Boolean(document.fullscreenElement || document.webkitFullscreenElement);
  });

  const isFullscreenSupported = typeof document !== 'undefined' && Boolean(
    document.fullscreenEnabled || document.webkitFullscreenEnabled
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = () => {
    spaceAudio.playClick();
    try {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const el = document.documentElement;
        if (el.requestFullscreen) {
          el.requestFullscreen().catch(() => {});
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    } catch (e) {
      // Safe fallback
    }
  };

  const getDiffBadge = () => {
    if (difficulty === 'hard') return '🔥';
    if (difficulty === 'easy') return '🌟';
    return '🚀';
  };

  return (
    <header className="w-full h-11 sm:h-12 px-2 sm:px-4 z-40 shrink-0 flex items-center">
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Game Title Logo & Call-sign */}
        <div 
          onClick={onExitGame}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-game-yellow border-2 sm:border-3 border-game-ink shadow-sm flex items-center justify-center text-game-ink group-hover:rotate-6 transition-transform">
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-sm sm:text-base text-white tracking-wide leading-none drop-shadow-sm flex items-center gap-1.5">
              <span>{t?.gameTitle || 'Space Base Rescue!'}</span>
            </div>
            {isGameActive && (
              <div className="text-[10px] sm:text-xs font-heading font-extrabold text-game-yellow flex items-center gap-1.5">
                <span>{outpostConfig?.name || (outpostConfig?.id === 'mars' ? t?.marsBase : t?.moonBase)}</span>
                <span className="text-white/60">•</span>
                <span className="flex items-center gap-1 text-amber-200">
                  <span className="w-5 h-5 rounded-full bg-amber-100 border border-game-ink flex items-center justify-center overflow-hidden shrink-0">
                    <AstronautAvatar avatar={avatar} size={18} />
                  </span>
                  <span>{playerName}</span>
                  {playerTag && (
                    <span className="text-[9px] font-mono text-amber-300/90 bg-slate-900/60 px-1 py-0.5 rounded border border-amber-400/30">
                      {playerTag}
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* In-Game Day Badge & Difficulty Indicator */}
        {isGameActive && (
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <div className="bg-game-cream border-2 border-game-ink rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 shadow-sm flex items-center gap-1 font-heading font-extrabold text-[11px] sm:text-xs text-game-ink">
              <span>☀️</span>
              <span>{t?.dayIndicator?.replace('{current}', currentDay).replace('{total}', totalDays) || `Day ${currentDay} of ${totalDays}`}</span>
            </div>
            <div className="hidden sm:flex items-center px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 border-2 border-game-ink font-heading font-black text-[11px] shadow-sm">
              <span>{getDiffBadge()}</span>
            </div>
            {/* Star Coins Balance */}
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 border-2 border-game-ink font-heading font-black text-[11px] shadow-sm">
              <span>{coins} 🪙</span>
            </div>
          </div>
        )}

        {/* Top Right Controls (Badges, Leaderboard, Music, SFX, Language, NASA Sources) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Quick Badges modal toggle */}
          {onOpenBadges && (
            <button
              type="button"
              onClick={() => {
                spaceAudio.playClick();
                onOpenBadges();
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-400 border-2 border-game-ink flex items-center justify-center text-slate-900 shadow-sm transition-transform active:scale-95"
              title={t?.badgesBtn || 'Badges'}
            >
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          {/* Quick Clans page toggle */}
          {onOpenClans && (
            <button
              type="button"
              onClick={() => {
                spaceAudio.playClick();
                onOpenClans();
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-500 border-2 border-game-ink flex items-center justify-center text-white shadow-sm transition-transform active:scale-95"
              title={t?.clansNavBtn || 'Clans'}
            >
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          {/* Quick Leaderboard modal toggle */}
          {onOpenLeaderboard && (
            <button
              type="button"
              onClick={() => {
                spaceAudio.playClick();
                onOpenLeaderboard();
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-yellow-300 border-2 border-game-ink flex items-center justify-center text-slate-900 shadow-sm transition-transform active:scale-95"
              title={t?.leaderboardBtn || 'Leaderboard'}
            >
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          {/* Fun BGM Music Toggle */}
          <button
            type="button"
            onClick={onToggleBgm}
            className={`flex items-center gap-1 px-2 py-1 rounded-full font-heading font-extrabold text-xs border-2 border-game-ink shadow-sm transition-all ${
              isBgmPlaying
                ? 'bg-game-mint text-game-ink ring-2 ring-emerald-300'
                : 'bg-game-cream text-slate-500 hover:text-game-ink'
            }`}
            title={isBgmPlaying ? (t?.musicOn || 'Music: ON') : (t?.musicOff || 'Music: OFF')}
          >
            <Music className={`w-3.5 h-3.5 ${isBgmPlaying ? 'animate-bounce text-emerald-900' : 'text-slate-400'}`} />
            <span className="hidden md:inline font-bold">
              {isBgmPlaying ? (t?.musicBtn || 'Music') : (t?.musicOff || 'Music: OFF')}
            </span>
          </button>

          {/* SFX Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSfx}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border-2 border-game-ink flex items-center justify-center shadow-sm transition-transform active:scale-95 ${
              !isSfxMuted
                ? 'bg-game-cream text-sky-600'
                : 'bg-slate-300 text-slate-500'
            }`}
            title={!isSfxMuted ? (t?.sfxOn || 'SFX: ON') : (t?.sfxOff || 'SFX: OFF')}
          >
            {!isSfxMuted ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" />}
          </button>

          {/* Fullscreen Toggle */}
          {isFullscreenSupported && (
            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl border-2 border-game-ink flex items-center justify-center shadow-sm bg-game-cream text-game-ink transition-transform active:scale-95"
              title={isFullscreen ? (lang === 'tr' ? 'Tam Ekrandan Çık' : 'Exit Fullscreen') : (lang === 'tr' ? 'Tam Ekran Yap' : 'Enter Fullscreen')}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-game-ink" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-game-ink" />
              )}
            </button>
          )}

          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onToggleLang(lang === 'en' ? 'tr' : 'en');
            }}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-game-cream border-2 border-game-ink text-game-ink font-heading font-extrabold text-xs shadow-sm hover:scale-105 transition-all"
            title="Switch Language (English / Türkçe)"
          >
            <span>{lang === 'en' ? '🇬🇧 EN' : '🇹🇷 TR'}</span>
          </button>

          {/* Discreet NASA Data button for Space Apps Judges & Parents */}
          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onOpenSources();
            }}
            title="Real NASA DONKI API Data & Science Attribution"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border-2 border-slate-600 text-slate-200 hover:text-white text-xs font-heading font-bold shadow-sm transition-all"
          >
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
            <Database className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">{t?.nasaDataBtn || 'NASA Data'}</span>
          </button>

          {/* Exit / Switch Base button if playing */}
          {isGameActive && (
            <button
              type="button"
              onClick={onExitGame}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-game-cream border-2 border-game-ink flex items-center justify-center text-game-ink shadow-sm hover:scale-105 transition-all"
              title={t?.changeBase || 'Change Planet Base'}
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
