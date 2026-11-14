import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Dices, Coins, ArrowLeft, Lock, Brain, X, Check } from 'lucide-react';
import AstronautAvatar from '../components/AstronautAvatar';
import CosmeticTile from '../components/CosmeticTile';
import SpaceQuizModal from '../components/SpaceQuizModal';
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
import { playClick, playPop, playPowerUp, playBoing, playWarning } from '../utils/audio';

export default function CustomizePage({
  initialAvatar = DEFAULT_AVATAR,
  playerName = 'Captain Nova',
  onNameChange,
  onSaveAvatar,
  coins = 100,
  onAddCoins,
  unlockedCosmetics = [],
  onUnlockCosmetic,
  onBack,
  lang = 'en'
}) {
  const [avatar, setAvatar] = useState(initialAvatar);
  const [activeTab, setActiveTab] = useState('suit'); // 'suit', 'face', 'helmet', 'patch', 'skin'
  const [buyItem, setBuyItem] = useState(null); // item pending purchase
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const t = translations[lang] || translations.en;

  const handleRandomName = () => {
    playBoing();
    const list = t?.randomNames || ['Captain Nova', 'Astro Leo', 'Commander Ada', 'Cosmo Maya'];
    const filtered = list.filter((n) => n !== playerName);
    const chosen = filtered[Math.floor(Math.random() * filtered.length)] || list[0];
    onNameChange(chosen);
  };

  const handleRandomAvatar = () => {
    playBoing();
    const randomized = getRandomAvatar();
    setAvatar(randomized);
  };

  const handleSaveAndBack = () => {
    playPowerUp();
    onSaveAvatar(avatar);
    onBack();
  };

  const handleOpenBuy = (item) => {
    playPop();
    setBuyItem(item);
  };

  const handleConfirmBuy = () => {
    if (!buyItem) return;
    const price = buyItem.price || 100;

    if (coins < price) {
      playWarning();
      return;
    }

    // Deduct coins & unlock
    onAddCoins(-price);
    onUnlockCosmetic(buyItem.id);

    // Auto-equip the purchased item
    if (activeTab === 'suit') setAvatar((prev) => ({ ...prev, suitColor: buyItem.id }));
    if (activeTab === 'face') setAvatar((prev) => ({ ...prev, faceStyle: buyItem.id }));
    if (activeTab === 'helmet') setAvatar((prev) => ({ ...prev, helmetStyle: buyItem.id }));
    if (activeTab === 'patch') setAvatar((prev) => ({ ...prev, patchIcon: buyItem.id }));
    if (activeTab === 'skin') setAvatar((prev) => ({ ...prev, skinTone: buyItem.id }));

    playPowerUp();
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#FBBF24', '#FDE047', '#34D399', '#38BDF8']
      });
    } catch (e) {}

    setBuyItem(null);
  };

  const tabs = [
    { id: 'suit', icon: '🎨', label: t.suitColorTab || 'Space Suit', items: SUIT_COLORS },
    { id: 'face', icon: '😊', label: t.faceStyleTab || 'Expression', items: FACE_STYLES },
    { id: 'helmet', icon: '🪖', label: t.helmetStyleTab || 'Helmet & Hat', items: HELMET_STYLES },
    { id: 'patch', icon: '🚀', label: t.patchTab || 'Chest Patch', items: CHEST_PATCHES },
    { id: 'skin', icon: '🧑', label: t.skinToneTab || 'Skin Tone', items: SKIN_TONES }
  ];

  const currentTabObj = tabs.find((tObj) => tObj.id === activeTab) || tabs[0];

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-2 md:p-4 gap-2 bg-gradient-to-b from-[#1E1B4B] via-[#2A2665] to-[#1E1B4B] text-game-ink font-body max-md:min-h-[100dvh] max-md:h-auto max-md:overflow-y-auto">
      {/* Top Bar: Title & Coin Balance */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between gap-2 shrink-0">
        <button
          type="button"
          onClick={handleSaveAndBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-game-cream hover:bg-white text-slate-800 border-2 border-game-ink font-heading font-black text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.saveAndBack || 'Save & Back ➔'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Star Coins Balance Badge */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 border-2 border-game-ink font-heading font-black text-xs sm:text-sm shadow-chunky">
            <Coins className="w-4 h-4 text-amber-950 animate-bounce" />
            <span>{coins} 🪙</span>
          </div>

          {/* Quick Bonus Quiz button to earn coins */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsQuizOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-300 hover:bg-sky-200 text-sky-950 border-2 border-game-ink font-heading font-black text-xs shadow-chunky transition-transform active:translate-y-0.5"
            title="Answer quiz questions to earn more Star Coins"
          >
            <Brain className="w-3.5 h-3.5 text-indigo-900" />
            <span>{t.bonusQuizBtn || '🧠 Bonus Quiz (+🪙)'}</span>
          </button>
        </div>
      </header>

      {/* Main 2-Column Spacious 100dvh Layout */}
      <main className="flex-1 min-h-0 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5 overflow-hidden">
        {/* LEFT COLUMN (md:col-span-5): Live Preview + Name Input + Save */}
        <div className="md:col-span-5 flex flex-col justify-between p-4 sm:p-5 bg-game-cream border-4 border-game-ink rounded-3xl shadow-pop overflow-hidden">
          {/* Top: Header & Name input */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-game-ink leading-tight">
                {t.customizePageTitle || 'Astronaut Studio'}
              </h1>
              <span className="text-xl">🎨</span>
            </div>

            {/* Astronaut Call-Sign Input + Randomizer */}
            <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-100/70 border-3 border-game-ink shadow-inner flex items-center justify-between gap-2 mb-3">
              <div className="min-w-0 flex-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-amber-900 block leading-tight">
                  {t?.nameLabel || 'Astronaut Call-Sign:'}
                </label>
                <input
                  type="text"
                  value={playerName}
                  maxLength={20}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder={t?.namePlaceholder || 'Enter cadet name...'}
                  className="w-full bg-transparent font-heading font-black text-sm sm:text-base text-game-ink placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleRandomName}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sky-200 hover:bg-sky-300 text-sky-950 border-2 border-game-ink font-heading font-black text-xs shadow-sm transition-transform active:scale-95 shrink-0"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>{t?.randomBtn || 'Random 🎲'}</span>
              </button>
            </div>
          </div>

          {/* Center: Hero Waving Astronaut Preview on Glowing Pedestal */}
          <div className="flex-1 min-h-[160px] flex flex-col items-center justify-center p-3 sm:p-4 bg-gradient-to-b from-[#1E1B4B] to-[#312E81] rounded-2xl border-3 border-game-ink shadow-inner relative overflow-hidden my-2">
            {/* Background stars */}
            <div className="absolute top-3 left-4 text-xs text-yellow-300 animate-ping">✦</div>
            <div className="absolute top-6 right-5 text-sm text-yellow-200">★</div>
            <div className="absolute bottom-8 left-6 text-xs text-sky-300">✦</div>
            <div className="absolute bottom-6 right-8 text-xs text-yellow-300">★</div>

            {/* Live Astronaut Avatar SVG */}
            <div className="relative my-1 transform hover:scale-105 transition-transform">
              <AstronautAvatar avatar={avatar} size={150} isWaving={true} />
            </div>

            {/* Glowing Pedestal Base */}
            <div className="w-32 h-4 bg-indigo-900/90 rounded-full border border-indigo-400/50 blur-[1px] -mt-2 shadow-xl" />
          </div>

          {/* Bottom Actions: Randomize & Save Button */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="w-full py-2 px-4 rounded-xl bg-amber-300 hover:bg-amber-400 text-slate-900 font-heading font-black text-xs sm:text-sm border-2 border-game-ink shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-95"
            >
              <Dices className="w-4 h-4" />
              <span>{t.randomAvatarBtn || 'Randomize Gear 🎲'}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveAndBack}
              className="w-full py-2.5 px-4 rounded-2xl bg-game-mint hover:bg-emerald-400 text-slate-900 font-heading font-black text-base border-3 border-game-ink shadow-chunky transition-transform active:translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.saveAstronautBtn || 'Save Astronaut! 🚀'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN (md:col-span-7): Category Pills + Visual-Only Tiles */}
        <div className="md:col-span-7 flex flex-col justify-between p-4 sm:p-5 bg-game-cream border-4 border-game-ink rounded-3xl shadow-pop overflow-hidden">
          {/* Category Selector Pills (No Horizontal Scrolling) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-amber-100/70 border-3 border-game-ink rounded-2xl mb-3 shrink-0">
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
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-heading font-black text-xs sm:text-sm transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-900 border-2 border-game-ink shadow-sm scale-102'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Visual-Only Square Selection Tiles Grid (ZERO text inside tiles) */}
          <div className="flex-1 min-h-0 bg-white border-3 border-game-ink rounded-2xl p-4 shadow-inner overflow-y-auto flex items-center justify-center">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 p-2">
              {currentTabObj.items.map((item) => {
                const isUnlocked = unlockedCosmetics.includes(item.id);
                const isSelected =
                  (activeTab === 'suit' && avatar.suitColor === item.id) ||
                  (activeTab === 'face' && avatar.faceStyle === item.id) ||
                  (activeTab === 'helmet' && avatar.helmetStyle === item.id) ||
                  (activeTab === 'patch' && avatar.patchIcon === item.id) ||
                  (activeTab === 'skin' && avatar.skinTone === item.id);

                return (
                  <CosmeticTile
                    key={item.id}
                    category={activeTab}
                    item={item}
                    isSelected={isSelected}
                    isUnlocked={isUnlocked}
                    currentAvatar={avatar}
                    onSelect={() => {
                      playPop();
                      if (activeTab === 'suit') setAvatar((prev) => ({ ...prev, suitColor: item.id }));
                      if (activeTab === 'face') setAvatar((prev) => ({ ...prev, faceStyle: item.id }));
                      if (activeTab === 'helmet') setAvatar((prev) => ({ ...prev, helmetStyle: item.id }));
                      if (activeTab === 'patch') setAvatar((prev) => ({ ...prev, patchIcon: item.id }));
                      if (activeTab === 'skin') setAvatar((prev) => ({ ...prev, skinTone: item.id }));
                    }}
                    onBuyClick={handleOpenBuy}
                  />
                );
              })}
            </div>
          </div>

          {/* Bottom Tip / Quick Quiz Link */}
          <div className="pt-3 flex items-center justify-between text-xs text-slate-600 font-bold shrink-0">
            <span>{t.customizePageSubtitle || 'Style your cadet, unlock cosmic gear with Star Coins!'}</span>
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsQuizOpen(true);
              }}
              className="sm:hidden flex items-center gap-1 text-indigo-700 underline font-black"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>{t.bonusQuizBtn || 'Quiz (+🪙)'}</span>
            </button>
          </div>
        </div>
      </main>

      {/* 1-Click Buy Confirmation Modal */}
      {buyItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setBuyItem(null)}
        >
          <div
            className="w-full max-w-sm bg-game-cream border-4 border-game-ink rounded-3xl p-5 shadow-pop text-center relative overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-300 border-3 border-game-ink mx-auto mb-3 flex items-center justify-center text-2xl shadow-inner">
              <Lock className="w-7 h-7 text-amber-950" />
            </div>

            <h3 className="font-heading font-extrabold text-xl text-game-ink mb-1">
              {t.buyConfirmTitle || 'Unlock Cosmetic?'}
            </h3>

            <p className="font-heading font-bold text-xs sm:text-sm text-slate-700 mb-4">
              {t.buyConfirmDesc?.replace('{price}', buyItem.price || 100) || `Unlock this item for ${buyItem.price || 100} 🪙?`}
            </p>

            {/* Price vs Balance Box */}
            <div className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-300 mb-4 flex items-center justify-around text-xs font-bold text-slate-700">
              <div>
                <span className="block text-slate-500 text-[10px]">Price:</span>
                <span className="font-black text-amber-700 text-sm">{buyItem.price || 100} 🪙</span>
              </div>
              <div className="h-6 w-px bg-amber-200" />
              <div>
                <span className="block text-slate-500 text-[10px]">Your Coins:</span>
                <span className={`font-black text-sm ${coins >= (buyItem.price || 100) ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {coins} 🪙
                </span>
              </div>
            </div>

            {coins >= (buyItem.price || 100) ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleConfirmBuy}
                  className="w-full py-2.5 px-4 rounded-2xl bg-game-mint hover:bg-emerald-400 text-slate-900 font-heading font-black text-base border-3 border-game-ink shadow-chunky transition-transform active:translate-y-0.5"
                >
                  {t.buyBtn?.replace('{price}', buyItem.price || 100) || `Buy for ${buyItem.price || 100} 🪙`}
                </button>
                <button
                  type="button"
                  onClick={() => setBuyItem(null)}
                  className="w-full py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  {t.closeBtn || 'Cancel'}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-300 text-[11px] font-bold text-rose-800">
                  {t.notEnoughCoins?.replace('{need}', (buyItem.price || 100) - coins) || `Need ${(buyItem.price || 100) - coins} more 🪙! Earn coins in Space Quiz!`}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBuyItem(null);
                    setIsQuizOpen(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-2xl bg-sky-300 hover:bg-sky-200 text-slate-900 font-heading font-black text-sm border-3 border-game-ink shadow-chunky transition-transform active:translate-y-0.5 flex items-center justify-center gap-1.5"
                >
                  <Brain className="w-4 h-4 text-indigo-900" />
                  <span>{t.takeQuizBtn || 'Take Space Quiz (+🪙)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBuyItem(null)}
                  className="w-full py-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  {t.closeBtn || 'Cancel'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bonus Space Quiz Modal */}
      <SpaceQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onRewardCoins={(earned) => {
          onAddCoins(earned);
        }}
        lang={lang}
      />
    </div>
  );
}
