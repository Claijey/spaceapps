import React, { useState, useEffect } from 'react';
import { X, Sparkles, Dices, RotateCcw, Check } from 'lucide-react';
import AstronautAvatar from './AstronautAvatar';
import {
  SUIT_COLORS,
  SKIN_TONES,
  FACE_STYLES,
  HELMET_STYLES,
  CHEST_PATCHES,
  DEFAULT_AVATAR,
  getRandomAvatar
} from '../data/avatarConfig';
import { translations } from '../data/translations';
import { playPop, playPowerUp, playBoing } from '../utils/audio';

export default function AvatarCustomizerModal({
  isOpen,
  onClose,
  currentAvatar = DEFAULT_AVATAR,
  onSave,
  lang = 'en'
}) {
  const [avatar, setAvatar] = useState(currentAvatar);
  const [activeTab, setActiveTab] = useState('suit'); // 'suit', 'skin', 'face', 'helmet', 'patch'

  useEffect(() => {
    if (isOpen) {
      setAvatar(currentAvatar);
    }
  }, [isOpen, currentAvatar]);

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

  const handleRandomize = () => {
    playBoing();
    const randomized = getRandomAvatar();
    setAvatar(randomized);
  };

  const handleReset = () => {
    playPop();
    setAvatar(DEFAULT_AVATAR);
  };

  const handleSave = () => {
    playPowerUp();
    onSave(avatar);
    onClose();
  };

  const tabs = [
    { id: 'suit', icon: '🎨', label: t.suitColorTab || 'Space Suit' },
    { id: 'skin', icon: '🧑', label: t.skinToneTab || 'Skin Tone' },
    { id: 'face', icon: '😊', label: t.faceStyleTab || 'Expression' },
    { id: 'helmet', icon: '🪖', label: t.helmetStyleTab || 'Helmet & Hat' },
    { id: 'patch', icon: '🚀', label: t.patchTab || 'Chest Patch' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] flex flex-col bg-game-cream border-4 border-game-ink rounded-3xl shadow-pop overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 px-5 py-3.5 border-b-4 border-game-ink flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-game-ink flex items-center justify-center text-xl shadow-inner">
              🎨
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black font-fredoka text-slate-900 leading-tight">
                {t.customizerTitle || 'Design Your Astronaut!'}
              </h2>
              <p className="text-[11px] md:text-xs font-bold text-amber-950">
                {t.customizerSubtitle || 'Pick your space suit, helmet, expression, and badge!'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-2xl bg-amber-100 hover:bg-white text-slate-800 border-2 border-game-ink flex items-center justify-center font-bold transition-transform active:scale-95 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Preview + Right Options */}
        <div className="p-4 sm:p-5 flex-1 min-h-0 overflow-y-auto flex flex-col md:flex-row items-center md:items-stretch gap-4 sm:gap-6">
          {/* LEFT: Live Large Astronaut Preview */}
          <div className="w-full md:w-56 shrink-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1E1B4B] to-[#312E81] rounded-3xl border-3 border-game-ink shadow-inner relative overflow-hidden">
            {/* Background stars */}
            <div className="absolute top-3 left-4 text-xs text-yellow-300 animate-ping">✦</div>
            <div className="absolute top-6 right-5 text-sm text-yellow-200">★</div>
            <div className="absolute bottom-8 left-6 text-xs text-sky-300">✦</div>

            {/* Astronaut Avatar SVG */}
            <div className="relative my-2 transform hover:scale-105 transition-transform">
              <AstronautAvatar avatar={avatar} size={135} isWaving={true} />
            </div>

            {/* Pedestal Stand */}
            <div className="w-28 h-3.5 bg-indigo-900/80 rounded-full border border-indigo-400/40 blur-[1px] -mt-1 shadow-lg" />

            {/* Quick Randomize & Reset Buttons */}
            <div className="flex items-center gap-2 mt-4 w-full">
              <button
                type="button"
                onClick={handleRandomize}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-amber-300 hover:bg-amber-400 text-slate-900 font-heading font-black text-xs border-2 border-game-ink shadow-sm flex items-center justify-center gap-1 transition-transform active:scale-95"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>{t.randomAvatarBtn || 'Random 🎲'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-1.5 px-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-heading font-black text-xs border-2 border-game-ink shadow-sm flex items-center justify-center transition-transform active:scale-95"
                title="Reset to default"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT: Swatches and Options */}
          <div className="w-full flex-1 min-w-0 flex flex-col">
            {/* Category Selector Tabs */}
            <div className="flex gap-1.5 p-1 bg-amber-100/70 border-2 border-game-ink rounded-2xl mb-3 overflow-x-auto shrink-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      playPop();
                      setActiveTab(tab.id);
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-heading font-black text-xs whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-amber-400 text-slate-900 border-2 border-game-ink shadow-sm scale-102'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Category Options Box */}
            <div className="flex-1 bg-white border-3 border-game-ink rounded-2xl p-3 sm:p-4 shadow-inner min-h-[160px] flex items-center justify-center">
              {/* 1. SUIT COLOR SWATCHES */}
              {activeTab === 'suit' && (
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5 w-full">
                  {SUIT_COLORS.map((s) => {
                    const isSelected = avatar.suitColor === s.id;
                    const name = s.name[lang] || s.name.en;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          playPop();
                          setAvatar((prev) => ({ ...prev, suitColor: s.id }));
                        }}
                        className={`min-h-[48px] p-2 rounded-2xl border-3 flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-game-ink shadow-chunky ring-2 ring-yellow-400 scale-102 bg-amber-50'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-full border-2 border-slate-900 shadow-sm shrink-0 flex items-center justify-center text-xs font-black"
                          style={{ backgroundColor: s.hex }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-slate-900" />}
                        </div>
                        <span className="font-heading font-black text-xs text-slate-800 truncate">
                          {name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. SKIN TONE SWATCHES */}
              {activeTab === 'skin' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
                  {SKIN_TONES.map((st) => {
                    const isSelected = avatar.skinTone === st.id;
                    const name = st.name[lang] || st.name.en;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          playPop();
                          setAvatar((prev) => ({ ...prev, skinTone: st.id }));
                        }}
                        className={`min-h-[48px] p-2 rounded-2xl border-3 flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-game-ink shadow-chunky ring-2 ring-yellow-400 scale-102 bg-amber-50'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-full border-2 border-slate-900 shadow-sm shrink-0 flex items-center justify-center text-xs font-black"
                          style={{ backgroundColor: st.hex }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-slate-900" />}
                        </div>
                        <span className="font-heading font-black text-xs text-slate-800 truncate">
                          {name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 3. FACE EXPRESSION BUTTONS */}
              {activeTab === 'face' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
                  {FACE_STYLES.map((f) => {
                    const isSelected = avatar.faceStyle === f.id;
                    const name = f.name[lang] || f.name.en;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          playPop();
                          setAvatar((prev) => ({ ...prev, faceStyle: f.id }));
                        }}
                        className={`min-h-[48px] p-2 rounded-2xl border-3 flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-game-ink bg-amber-100 shadow-chunky ring-2 ring-yellow-400 scale-102'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <span className="text-2xl shrink-0">{f.icon}</span>
                        <span className="font-heading font-black text-xs text-slate-800 truncate">
                          {name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 4. HELMET / HAT BUTTONS */}
              {activeTab === 'helmet' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
                  {HELMET_STYLES.map((h) => {
                    const isSelected = avatar.helmetStyle === h.id;
                    const name = h.name[lang] || h.name.en;
                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => {
                          playPop();
                          setAvatar((prev) => ({ ...prev, helmetStyle: h.id }));
                        }}
                        className={`min-h-[48px] p-2 rounded-2xl border-3 flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-game-ink bg-amber-100 shadow-chunky ring-2 ring-yellow-400 scale-102'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <span className="text-2xl shrink-0">{h.icon}</span>
                        <span className="font-heading font-black text-xs text-slate-800 truncate">
                          {name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 5. CHEST PATCH BUTTONS */}
              {activeTab === 'patch' && (
                <div className="grid grid-cols-2 gap-2.5 w-full">
                  {CHEST_PATCHES.map((p) => {
                    const isSelected = avatar.patchIcon === p.id;
                    const name = p.name[lang] || p.name.en;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          playPop();
                          setAvatar((prev) => ({ ...prev, patchIcon: p.id }));
                        }}
                        className={`min-h-[48px] p-2.5 rounded-2xl border-3 flex items-center gap-3 transition-all ${
                          isSelected
                            ? 'border-game-ink bg-amber-100 shadow-chunky ring-2 ring-yellow-400 scale-102'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <span className="text-3xl shrink-0">{p.icon}</span>
                        <div className="text-left min-w-0">
                          <div className="font-heading font-black text-xs sm:text-sm text-slate-800 truncate">
                            {name}
                          </div>
                          <div className="text-[10px] font-bold text-slate-500">
                            {lang === 'tr' ? 'Göğüs Arması' : 'Chest Patch'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer: Save Button */}
        <div className="px-5 py-3.5 bg-slate-50 border-t-3 border-game-ink flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => {
              playPop();
              onClose();
            }}
            className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-heading font-black text-xs sm:text-sm border-2 border-game-ink shadow-sm transition-transform active:scale-95"
          >
            {t.closeBtn || 'Cancel'}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-2xl bg-game-mint hover:bg-emerald-400 text-slate-900 font-heading font-black text-sm sm:text-base border-3 border-game-ink shadow-chunky transition-transform active:translate-y-0.5 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.saveAstronautBtn || 'Save Astronaut! 🚀'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { AvatarCustomizerModal };
