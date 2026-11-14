import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Users, 
  ArrowLeft, 
  RefreshCw, 
  Copy, 
  Check, 
  PlusCircle, 
  LogIn, 
  AlertCircle,
  Coins,
  Sparkles
} from 'lucide-react';
import AstronautAvatar from '../components/AstronautAvatar';
import { fetchUniversalLeaderboard } from '../utils/leaderboard';
import { 
  getPlayerClans, 
  createClan, 
  joinClanByCode, 
  fetchClanLeaderboard 
} from '../services/clanService';
import { 
  DAILY_TOP10_REWARDS, 
  getLastDailyClaim, 
  setLastDailyClaim 
} from '../data/avatarConfig';
import { translations } from '../data/translations';
import { playClick, playPop, playPowerUp, playSuccess, playWarning } from '../utils/audio';

export default function LeaderboardPage({
  initialTab = 'universal', // 'universal' | 'clans'
  playerName = 'Cadet',
  playerTag = '#0000',
  playerId = 'cadet_player',
  avatar,
  coins = 100,
  onRewardCoins,
  onBack,
  lang = 'en'
}) {
  const [tab, setTab] = useState(initialTab); // 'universal' | 'clans'
  const t = translations[lang] || translations.en;

  // Universal Leaderboard State
  const [outpostFilter, setOutpostFilter] = useState('all'); // 'all', 'moon', 'mars'
  const [diffFilter, setDiffFilter] = useState('all'); // 'all', 'easy', 'medium', 'hard'
  const [scores, setScores] = useState([]);
  const [isLoadingScores, setIsLoadingScores] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);

  // Clans State
  const [myClans, setMyClans] = useState([]);
  const [selectedClan, setSelectedClan] = useState(null);
  const [clanScores, setClanScores] = useState([]);
  const [isLoadingClanScores, setIsLoadingClanScores] = useState(false);
  const [newClanName, setNewClanName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [clanError, setClanError] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);

  // 1. Load Universal Scores
  const loadUniversalScores = useCallback(async () => {
    setIsLoadingScores(true);
    try {
      const data = await fetchUniversalLeaderboard({
        outpost: outpostFilter,
        difficulty: diffFilter
      });
      setScores(data || []);
    } catch (e) {
      console.warn('Failed to load scores:', e);
    } finally {
      setIsLoadingScores(false);
    }
  }, [outpostFilter, diffFilter]);

  useEffect(() => {
    loadUniversalScores();
    const todayStr = new Date().toISOString().split('T')[0];
    setClaimedToday(getLastDailyClaim() === todayStr);
  }, [loadUniversalScores]);

  // 2. Load Player Clans
  const loadClans = useCallback(async () => {
    try {
      const clans = await getPlayerClans(playerId);
      setMyClans(clans || []);
      if (clans && clans.length > 0 && !selectedClan) {
        setSelectedClan(clans[0]);
      }
    } catch (e) {
      console.warn('Failed to load clans:', e);
    }
  }, [playerId, selectedClan]);

  useEffect(() => {
    if (tab === 'clans') {
      loadClans();
    }
  }, [tab, loadClans]);

  // 3. Load Selected Clan Leaderboard
  const loadClanScores = useCallback(async (clanId) => {
    if (!clanId) return;
    setIsLoadingClanScores(true);
    try {
      const data = await fetchClanLeaderboard(clanId);
      setClanScores(data || []);
    } catch (e) {
      console.warn('Failed to load clan scores:', e);
    } finally {
      setIsLoadingClanScores(false);
    }
  }, []);

  useEffect(() => {
    if (selectedClan?.id) {
      loadClanScores(selectedClan.id);
    }
  }, [selectedClan, loadClanScores]);

  // Handle Daily Top 10 Reward Claim
  const handleClaimDailyReward = (rewardAmount) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setLastDailyClaim(todayStr);
    setClaimedToday(true);
    playSuccess();
    try {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FBBF24', '#FDE047', '#34D399', '#38BDF8']
      });
    } catch (e) {}
    if (onRewardCoins) {
      onRewardCoins(rewardAmount);
    }
  };

  // Handle Create Clan
  const handleCreateClan = async (e) => {
    e.preventDefault();
    setClanError('');
    if (myClans.length >= 3) {
      playWarning();
      setClanError(t.maxClansError || 'You can join at most 3 clans!');
      return;
    }

    const res = await createClan({
      name: newClanName,
      playerId,
      playerName,
      playerTag,
      avatar
    });

    if (res.error) {
      playWarning();
      if (res.error === 'max_clans_reached') {
        setClanError(t.maxClansError || 'You can join at most 3 clans!');
      } else if (res.error === 'invalid_name') {
        setClanError(t.invalidNameError || 'Please enter a clan name (at least 2 letters).');
      } else {
        setClanError(res.error);
      }
      return;
    }

    playSuccess();
    setNewClanName('');
    setSelectedClan(res.clan);
    await loadClans();
  };

  // Handle Join Clan by Code
  const handleJoinClan = async (e) => {
    e.preventDefault();
    setClanError('');
    if (myClans.length >= 3) {
      playWarning();
      setClanError(t.maxClansError || 'You can join at most 3 clans!');
      return;
    }

    const res = await joinClanByCode({
      code: joinCode,
      playerId,
      playerName,
      playerTag,
      avatar
    });

    if (res.error) {
      playWarning();
      if (res.error === 'max_clans_reached') {
        setClanError(t.maxClansError || 'You can join at most 3 clans!');
      } else if (res.error === 'already_member') {
        setClanError(t.alreadyMemberError || 'You are already in this clan!');
      } else if (res.error === 'clan_not_found') {
        setClanError(t.clanNotFoundError || 'Clan not found! Check the 6-character code.');
      } else {
        setClanError(t.invalidCodeError || 'Please enter a valid 6-character code.');
      }
      return;
    }

    playSuccess();
    setJoinCode('');
    setSelectedClan(res.clan);
    await loadClans();
  };

  // Copy Code
  const handleCopyCode = (code) => {
    playPop();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const getRankBadge = (index) => {
    if (index === 0) return <span className="text-2xl">🥇</span>;
    if (index === 1) return <span className="text-2xl">🥈</span>;
    if (index === 2) return <span className="text-2xl">🥉</span>;
    return (
      <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-fredoka font-black text-xs sm:text-sm flex items-center justify-center">
        #{index + 1}
      </span>
    );
  };

  const getDiffBadge = (diff) => {
    if (diff === 'hard') {
      return (
        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-300 text-[10px] sm:text-xs font-black">
          🔥 {lang === 'tr' ? 'NASA Uzmanı' : 'NASA Pro'}
        </span>
      );
    }
    if (diff === 'easy') {
      return (
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 text-[10px] sm:text-xs font-black">
          🌟 {lang === 'tr' ? 'Kaşif' : 'Explorer'}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300 text-[10px] sm:text-xs font-black">
        🚀 {lang === 'tr' ? 'Komutan' : 'Commander'}
      </span>
    );
  };

  // Check Daily Top 10 Eligibility
  const playerRankIndex = scores.findIndex(
    (e) => (e.playerId && e.playerId === playerId) || (e.playerName && e.playerName.toLowerCase() === (playerName || '').toLowerCase())
  );
  const isTop10 = playerRankIndex >= 0 && playerRankIndex < 10;
  const rankNum = playerRankIndex + 1;
  const rewardAmount = isTop10 ? (DAILY_TOP10_REWARDS[rankNum] || 50) : 0;

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-1.5 sm:p-2 md:p-4 gap-1.5 md:gap-2 bg-gradient-to-b from-[#1E1B4B] via-[#2A2665] to-[#1E1B4B] text-game-ink font-body select-none overscroll-none">
      {/* Top Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between gap-2 shrink-0">
        <button
          type="button"
          onClick={() => {
            playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-game-cream hover:bg-white text-slate-800 border-2 border-game-ink font-heading font-black text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'tr' ? 'Üsse Dön ➔' : 'Back to Base ➔'}</span>
        </button>

        {/* Tab Switcher: Universal vs Clans */}
        <div className="flex items-center gap-1 p-1 bg-amber-100/80 border-2 border-game-ink rounded-full shadow-sm">
          <button
            type="button"
            onClick={() => {
              playPop();
              setTab('universal');
            }}
            className={`flex items-center gap-1 px-3 sm:px-4 py-1 rounded-full font-heading font-extrabold text-xs sm:text-sm transition-all ${
              tab === 'universal'
                ? 'bg-amber-400 text-slate-900 border-2 border-game-ink shadow-sm scale-102'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{lang === 'tr' ? 'Dünya Sıralaması' : 'Universal Hall of Fame'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPop();
              setTab('clans');
            }}
            className={`flex items-center gap-1 px-3 sm:px-4 py-1 rounded-full font-heading font-extrabold text-xs sm:text-sm transition-all ${
              tab === 'clans'
                ? 'bg-indigo-500 text-white border-2 border-game-ink shadow-sm scale-102'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.clansNavBtn || '👥 Clans'}</span>
          </button>
        </div>

        {/* Star Coins Balance */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 border-2 border-game-ink font-heading font-black text-xs sm:text-sm shadow-chunky shrink-0">
          <Coins className="w-4 h-4 text-amber-950 animate-bounce" />
          <span>{coins} 🪙</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 w-full max-w-6xl mx-auto flex flex-col bg-game-cream border-4 border-game-ink rounded-3xl shadow-pop overflow-hidden">
        {/* ========================================================================= */}
        {/* TAB 1: UNIVERSAL LEADERBOARD */}
        {/* ========================================================================= */}
        {tab === 'universal' && (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Top Bar: Title + Refresh Button */}
            <div className="px-5 py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 border-b-4 border-game-ink flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white border-2 border-game-ink flex items-center justify-center text-amber-700 shadow-inner">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 leading-tight">
                    {t.leaderboardTitle || 'Mission Hall of Fame'}
                  </h1>
                  <p className="text-[10px] sm:text-xs font-bold text-amber-950">
                    {lang === 'tr' ? 'Gerçek Çok Oyunculu Küresel Görev Skorları' : 'Live Global Multi-Device Cadet Rankings'}
                  </p>
                </div>
              </div>

              {/* Refresh Button */}
              <button
                type="button"
                onClick={() => {
                  playPop();
                  loadUniversalScores();
                }}
                disabled={isLoadingScores}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-game-ink font-heading font-black text-xs shadow-sm transition-transform active:scale-95"
                title="Refresh latest scores"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingScores ? 'animate-spin text-amber-600' : ''}`} />
                <span className="hidden sm:inline">{t.refreshBtn || 'Refresh'}</span>
              </button>
            </div>

            {/* Daily Top-10 Reward Banner */}
            {isTop10 && (
              <div className="mx-4 mt-2.5 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 border-3 border-amber-500 shadow-sm flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl animate-bounce">🎁</span>
                  <div className="min-w-0">
                    <div className="font-heading font-black text-xs sm:text-sm text-slate-900 leading-tight truncate">
                      {lang === 'tr' ? `Günlük İlk 10 Kadet Ödülü! Sıralama #${rankNum}` : `Daily Top-10 Cadet Reward! Rank #${rankNum}`}
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-amber-950 truncate">
                      {claimedToday
                        ? (t.rewardClaimed || 'Claimed! 🎉')
                        : `+${rewardAmount} 🪙 ${lang === 'tr' ? 'hesabına eklenmeye hazır!' : 'ready to claim!'}`}
                    </div>
                  </div>
                </div>

                {!claimedToday ? (
                  <button
                    type="button"
                    onClick={() => handleClaimDailyReward(rewardAmount)}
                    className="px-3 py-1 rounded-xl bg-game-mint hover:bg-emerald-400 text-slate-900 font-heading font-black text-xs sm:text-sm border-2 border-game-ink shadow-sm transition-transform active:scale-95 shrink-0"
                  >
                    {t.claimRewardBtn?.replace('{reward}', rewardAmount) || `Claim +${rewardAmount} 🪙!`}
                  </button>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-heading font-black text-xs border border-emerald-300 shrink-0">
                    {t.rewardClaimed || 'Claimed ✓'}
                  </span>
                )}
              </div>
            )}

            {/* Filters Row */}
            <div className="px-4 py-2 bg-amber-50/70 border-b-2 border-game-ink/30 flex flex-wrap items-center justify-between gap-2 shrink-0">
              {/* Planet Filters */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setOutpostFilter('all');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                    outpostFilter === 'all'
                      ? 'bg-amber-400 text-slate-900 border-2 border-game-ink shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-300 hover:bg-amber-100'
                  }`}
                >
                  {t.filterAll || 'All Outposts'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setOutpostFilter('moon');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
                    outpostFilter === 'moon'
                      ? 'bg-indigo-500 text-white border-2 border-game-ink shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-300 hover:bg-indigo-50'
                  }`}
                >
                  <span>🌙</span> {t.filterMoon || 'Moon'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setOutpostFilter('mars');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
                    outpostFilter === 'mars'
                      ? 'bg-rose-500 text-white border-2 border-game-ink shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-300 hover:bg-rose-50'
                  }`}
                >
                  <span>🪐</span> {t.filterMars || 'Mars'}
                </button>
              </div>

              {/* Difficulty Filters */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setDiffFilter('all');
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    diffFilter === 'all'
                      ? 'bg-amber-400 text-slate-900 border-2 border-game-ink shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-300 hover:bg-amber-100'
                  }`}
                >
                  {t.filterAllDiff || 'All'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setDiffFilter('easy');
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    diffFilter === 'easy'
                      ? 'bg-emerald-400 text-slate-900 border-2 border-game-ink shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-300'
                  }`}
                >
                  🌟
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setDiffFilter('medium');
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    diffFilter === 'medium'
                      ? 'bg-sky-400 text-slate-900 border-2 border-game-ink shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-300'
                  }`}
                >
                  🚀
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setDiffFilter('hard');
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    diffFilter === 'hard'
                      ? 'bg-rose-400 text-white border-2 border-game-ink shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-300'
                  }`}
                >
                  🔥
                </button>
              </div>
            </div>

            {/* Scores Table */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-2">
              {scores.length === 0 ? (
                <div className="py-16 text-center text-slate-500 font-bold space-y-2">
                  <div className="text-4xl">🚀</div>
                  <div className="font-heading font-black text-base text-slate-700">
                    {t.noScoresUniversal || 'No mission records yet — be the first cadet to complete a mission!'}
                  </div>
                </div>
              ) : (
                scores.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="p-2.5 sm:p-3 bg-white border-2 border-slate-200 hover:border-amber-400 rounded-2xl flex items-center justify-between gap-3 shadow-xs transition-all"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="w-8 flex items-center justify-center shrink-0">
                        {getRankBadge(index)}
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-amber-100 border-2 border-game-ink flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                        <AstronautAvatar avatar={item.avatar} size={30} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-fredoka font-black text-sm sm:text-base text-slate-900 truncate">
                            {item.playerName || 'Cadet'}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            {item.playerTag}
                          </span>
                          {getDiffBadge(item.difficulty)}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                          <span>{item.outpost === 'moon' ? '🌙 Moon' : '🪐 Mars'}</span>
                          <span>•</span>
                          <span>{item.daysSurvived} {lang === 'tr' ? 'Gün' : 'Days'}</span>
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
                      <div className="font-fredoka font-black text-base sm:text-lg text-amber-600 leading-none">
                        {item.score?.toLocaleString()} <span className="text-xs font-bold text-slate-500">pts</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SPACE CLANS & SQUADS */}
        {/* ========================================================================= */}
        {tab === 'clans' && (
          <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            {/* Left Column: Joined Clans List + Create / Join Forms (md:col-span-5) */}
            <div className="md:col-span-5 p-3 sm:p-4 border-b-4 md:border-b-0 md:border-r-4 border-game-ink bg-amber-50/50 flex flex-col justify-between overflow-y-auto overscroll-contain space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h2 className="font-heading font-black text-base sm:text-lg text-slate-900">
                    {t.myClansTab || 'My Clans'} ({myClans.length}/3)
                  </h2>
                </div>

                {/* Error Banner */}
                {clanError && (
                  <div className="mb-3 p-2.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{clanError}</span>
                  </div>
                )}

                {/* Joined Clans Pills */}
                {myClans.length === 0 ? (
                  <p className="text-xs text-slate-500 font-bold mb-3">
                    {t.noClansYet || "You haven't joined any clans yet! Create one or enter an invite code."}
                  </p>
                ) : (
                  <div className="space-y-2 mb-4">
                    {myClans.map((clan) => {
                      const isSelected = selectedClan?.id === clan.id;
                      return (
                        <div
                          key={clan.id}
                          onClick={() => {
                            playPop();
                            setSelectedClan(clan);
                          }}
                          className={`p-2.5 rounded-2xl border-2 sm:border-3 cursor-pointer flex items-center justify-between gap-2 transition-all ${
                            isSelected
                              ? 'bg-amber-300 border-game-ink shadow-sm ring-2 ring-yellow-400'
                              : 'bg-white border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="font-heading font-black text-sm text-slate-900 truncate">
                              {clan.name}
                            </div>
                            <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <span>Code: <b className="text-slate-800">{clan.code}</b></span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyCode(clan.code);
                            }}
                            className="px-2 py-1 rounded-lg bg-white/80 hover:bg-white text-slate-700 border border-slate-300 text-[10px] font-black flex items-center gap-1 shrink-0"
                            title="Copy clan invite code"
                          >
                            {copiedCode === clan.code ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-500" />
                            )}
                            <span>{copiedCode === clan.code ? (t.codeCopied || 'Copied!') : (t.copyCode || 'Copy')}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 1. Create a Clan Form */}
                <form onSubmit={handleCreateClan} className="p-3 bg-white border-2 border-game-ink rounded-2xl shadow-xs mb-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-900">
                    <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.createClanTab || 'Create Clan'}</span>
                  </div>
                  <input
                    type="text"
                    value={newClanName}
                    maxLength={25}
                    onChange={(e) => setNewClanName(e.target.value)}
                    placeholder={t.enterClanName || 'Enter clan name (e.g. Apollo Squad)...'}
                    disabled={myClans.length >= 3}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-heading font-bold focus:outline-none focus:border-amber-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={myClans.length >= 3 || newClanName.trim().length < 2}
                    className="w-full py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-heading font-black text-xs border border-game-ink shadow-sm transition-transform active:scale-95"
                  >
                    {t.createClanBtn || 'Create Clan 🚀'}
                  </button>
                </form>

                {/* 2. Join by Code Form */}
                <form onSubmit={handleJoinClan} className="p-3 bg-white border-2 border-game-ink rounded-2xl shadow-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase text-indigo-900">
                    <LogIn className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{t.joinClanTab || 'Join by Code'}</span>
                  </div>
                  <input
                    type="text"
                    value={joinCode}
                    maxLength={6}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder={t.enterClanCode || 'Enter 6-char code (e.g. MARS42)...'}
                    disabled={myClans.length >= 3}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-heading font-bold tracking-widest uppercase focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={myClans.length >= 3 || joinCode.trim().length !== 6}
                    className="w-full py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-heading font-black text-xs border border-game-ink shadow-sm transition-transform active:scale-95"
                  >
                    {t.joinClanBtn || 'Join Clan ➔'}
                  </button>
                </form>
              </div>

              {/* Clan Limit Hint */}
              <div className="text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-200">
                {lang === 'tr' ? 'Not: Her oyuncu aynı anda en fazla 3 klana katılabilir.' : 'Note: Each cadet can be a member of at most 3 clans at a time.'}
              </div>
            </div>

            {/* Right Column: Selected Clan Leaderboard (md:col-span-7) */}
            <div className="md:col-span-7 p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
              {selectedClan ? (
                <div className="flex-1 min-h-0 flex flex-col">
                  {/* Clan Header */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-2 border-b-2 border-game-ink/20 shrink-0">
                    <div>
                      <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 leading-tight">
                        {selectedClan.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mt-0.5">
                        <span>{t.clanCodeLabel || 'Invite Code:'} <b className="text-slate-800 text-sm tracking-wider">{selectedClan.code}</b></span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(selectedClan.code)}
                          className="text-[11px] font-black text-indigo-700 underline"
                        >
                          {copiedCode === selectedClan.code ? 'Copied! ✓' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        playPop();
                        loadClanScores(selectedClan.id);
                      }}
                      disabled={isLoadingClanScores}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-game-ink font-heading font-black text-xs shadow-sm transition-transform active:scale-95"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingClanScores ? 'animate-spin text-indigo-600' : ''}`} />
                      <span>{t.refreshBtn || 'Refresh'}</span>
                    </button>
                  </div>

                  {/* Clan Scores List */}
                  <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-2">
                    {clanScores.length === 0 ? (
                      <div className="py-12 text-center text-slate-500 font-bold space-y-1">
                        <div className="text-3xl">👥</div>
                        <div className="text-xs">
                          {lang === 'tr' ? 'Bu klandaki üyelerin henüz bir skor kaydı yok!' : 'No mission runs submitted by this clan yet!'}
                        </div>
                      </div>
                    ) : (
                      clanScores.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-2.5 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-between gap-2 shadow-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 flex items-center justify-center shrink-0">
                              {getRankBadge(idx)}
                            </div>
                            <div className="w-7 h-7 rounded-lg bg-amber-100 border border-game-ink flex items-center justify-center shrink-0 overflow-hidden">
                              <AstronautAvatar avatar={item.avatar} size={26} />
                            </div>
                            <div className="min-w-0">
                              <div className="font-heading font-black text-xs sm:text-sm text-slate-900 truncate">
                                {item.playerName} <span className="text-[10px] text-slate-400 font-bold">{item.playerTag}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 font-medium">
                                {item.outpost === 'moon' ? '🌙 Moon' : '🪐 Mars'} • {item.daysSurvived}d
                              </div>
                            </div>
                          </div>

                          <div className="font-fredoka font-black text-sm sm:text-base text-amber-600 shrink-0">
                            {item.score?.toLocaleString()} pts
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <Users className="w-12 h-12 mb-2 text-slate-300" />
                  <p className="font-bold text-xs">
                    {lang === 'tr' ? 'Görüntülemek için soldan bir klan seç veya yeni bir klan oluştur.' : 'Select a clan from the left or create one to view the squad leaderboard.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
