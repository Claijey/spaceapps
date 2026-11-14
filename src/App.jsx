import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import ResourceHUD from './components/ResourceHUD';
import AstroBuddy from './components/AstroBuddy';
import OutpostDioramaSVG from './components/OutpostDioramaSVG';
import DecisionDeck from './components/DecisionDeck';
import OutcomeFeedback from './components/OutcomeFeedback';
import DataSourcesModal from './components/DataSourcesModal';
import BadgesModal from './components/BadgesModal';
import { AchievementToast } from './components/AchievementToast';
import SpaceQuizModal from './components/SpaceQuizModal';
import CustomizePage from './pages/CustomizePage';
import LeaderboardPage from './pages/LeaderboardPage';
import MissionDebrief from './components/MissionDebrief';
import OutpostSelector from './components/OutpostSelector';
import { getSpaceWeatherData } from './services/nasaApi';
import { 
  OUTPOST_CONFIGS, 
  DIFFICULTY_CONFIGS,
  generateSolScenarios, 
  evaluateDebrief 
} from './engine/missionEngine';
import { unlockAchievement } from './data/achievements';
import {
  getStoredAvatar,
  saveStoredAvatar,
  getPlayerCoins,
  addPlayerCoins,
  getUnlockedCosmetics,
  unlockCosmetic
} from './data/avatarConfig';
import { getPlayerId, getPlayerTag } from './utils/playerIdentity';
import { calculateScore, submitScore } from './utils/leaderboard';
import { translations } from './data/translations';
import { spaceAudio } from './utils/audio';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Language State ('en' | 'tr')
  const [lang, setLang] = useState('en');
  const t = translations[lang] || translations.en;

  // Zero-Password Unique Player Identity System
  const [playerId] = useState(() => getPlayerId());
  const [playerTag] = useState(() => getPlayerTag());

  // Player Settings & Economy State
  const [playerName, setPlayerName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('space_base_cadet_name') || 'Captain Nova';
    }
    return 'Captain Nova';
  });

  const [difficulty, setDifficulty] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('space_base_difficulty') || 'medium';
    }
    return 'medium';
  });

  const [avatar, setAvatar] = useState(() => getStoredAvatar());
  const [coins, setCoins] = useState(() => getPlayerCoins());
  const [unlockedCosmetics, setUnlockedCosmetics] = useState(() => getUnlockedCosmetics());

  // Navigation / Phase
  const [gameState, setGameState] = useState('select'); // 'select' | 'playing' | 'outcome' | 'debrief'
  const [outpostType, setOutpostType] = useState('moon');

  // Space Weather Data & Honesty State
  const [weatherData, setWeatherData] = useState(null);

  // Gameplay State
  const [currentDay, setCurrentDay] = useState(1);
  const [blocks, setBlocks] = useState({ power: 4, lifeSupport: 4, shielding: 3 });
  const [lastDelta, setLastDelta] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [currentDecision, setCurrentDecision] = useState(null);
  const [commDelayActive, setCommDelayActive] = useState(false);
  const [houstonGuidanceQueued, setHoustonGuidanceQueued] = useState(false);
  const [missionScore, setMissionScore] = useState(null);

  // Modals & Toasts
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeAchievementToast, setActiveAchievementToast] = useState(null);

  // Sound Settings
  const [isSfxMuted, setIsSfxMuted] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);

  // Drag and Drop State
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS.medium;
  const totalDays = diffConfig.totalDays;

  // Save cadet name to localStorage
  const handleNameChange = (name) => {
    setPlayerName(name);
    try {
      localStorage.setItem('space_base_cadet_name', name);
    } catch (e) {
      // ignore
    }
  };

  // Save difficulty to localStorage
  const handleDifficultyChange = (diff) => {
    setDifficulty(diff);
    try {
      localStorage.setItem('space_base_difficulty', diff);
    } catch (e) {
      // ignore
    }
  };

  // Save custom avatar
  const handleSaveAvatar = (newAvatar) => {
    setAvatar(newAvatar);
    saveStoredAvatar(newAvatar);
  };

  // Economy Handlers
  const handleRewardCoins = (amount) => {
    const updated = addPlayerCoins(amount);
    setCoins(updated);
  };

  const handleUnlockCosmetic = (id) => {
    const updated = unlockCosmetic(id);
    setUnlockedCosmetics(updated);
  };

  // Helper to trigger badge unlock & toast
  const triggerUnlock = useCallback((badgeId) => {
    const unlocked = unlockAchievement(badgeId);
    if (unlocked) {
      setActiveAchievementToast(unlocked);
    }
  }, []);

  // Fetch NASA DONKI data on mount
  useEffect(() => {
    async function loadData() {
      const data = await getSpaceWeatherData();
      setWeatherData(data);
    }
    loadData();
  }, []);

  // Audio Toggle Handlers
  const handleToggleBgm = () => {
    const playing = spaceAudio.toggleBgm();
    setIsBgmPlaying(playing);
  };

  const handleToggleSfx = () => {
    const unmuted = spaceAudio.toggleSfx();
    setIsSfxMuted(!unmuted);
  };

  // Start game for selected planet (Moon or Mars)
  const handleStartGame = useCallback((chosenOutpost) => {
    const activeDiff = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS.medium;
    setOutpostType(chosenOutpost);
    setCurrentDay(1);
    setBlocks({ ...activeDiff.initialBlocks });
    setLastDelta(null);
    setMissionScore(null);
    setCommDelayActive(false);
    setHoustonGuidanceQueued(false);

    // Auto-start fun background music on first start if not already on
    if (!isBgmPlaying) {
      spaceAudio.startBgm();
      setIsBgmPlaying(true);
    }

    const generated = generateSolScenarios(
      chosenOutpost,
      weatherData?.events || [],
      lang,
      difficulty,
      playerName
    );
    setScenarios(generated);
    setGameState('playing');
  }, [difficulty, isBgmPlaying, lang, playerName, weatherData]);

  // URL Route Synchronization
  useEffect(() => {
    const path = location.pathname;
    if (path === '/moon') {
      if (gameState === 'select' || outpostType !== 'moon') {
        handleStartGame('moon');
      }
    } else if (path === '/mars') {
      if (gameState === 'select' || outpostType !== 'mars') {
        handleStartGame('mars');
      }
    } else if (path === '/') {
      if (gameState !== 'select') {
        setGameState('select');
      }
    }
  }, [location.pathname, handleStartGame, gameState, outpostType]);

  // Re-generate localized scenarios when language, outpost, or difficulty changes
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'outcome') {
      const generated = generateSolScenarios(
        outpostType,
        weatherData?.events || [],
        lang,
        difficulty,
        playerName
      );
      setScenarios(generated);
    }
  }, [lang, outpostType, weatherData, gameState, difficulty, playerName]);

  // Player makes a decision
  const handleSelectDecision = (decisionId) => {
    const activeScenario = scenarios[currentDay - 1];
    if (!activeScenario) return;

    const chosen = activeScenario.decisions.find((d) => d.id === decisionId);
    if (!chosen) return;

    // Calculate updated 5-block resources (clamped [0, 5])
    const newPower = Math.max(0, Math.min(5, blocks.power + (chosen.effects.power || 0)));
    const newLifeSupport = Math.max(0, Math.min(5, blocks.lifeSupport + (chosen.effects.lifeSupport || 0)));
    const newShielding = Math.max(0, Math.min(5, blocks.shielding + (chosen.effects.shielding || 0)));

    // Real-time Action Achievement checks
    if (newPower === 5) {
      triggerUnlock('full_power');
    }
    if (chosen.id.startsWith('moon_2') || chosen.id.startsWith('mars_2')) {
      triggerUnlock('solar_shield_hero');
    }
    if (['moon_3a', 'moon_3b', 'mars_3a'].includes(chosen.id)) {
      triggerUnlock('dust_buster');
    }
    if (chosen.id === 'mars_4a') {
      triggerUnlock('earth_caller');
    }

    let isDelayTriggered = commDelayActive;
    let isHoustonQueued = houstonGuidanceQueued;

    if (chosen.isDelayChoice) {
      isDelayTriggered = true;
      isHoustonQueued = true;
      spaceAudio.playTransmission();
    } else if ((chosen.effects.shielding || 0) > 0 || (chosen.effects.power || 0) > 0) {
      spaceAudio.playPowerUp();
    } else {
      spaceAudio.playBoing();
    }

    setLastDelta({ ...chosen.effects });
    setBlocks({ power: newPower, lifeSupport: newLifeSupport, shielding: newShielding });
    setCommDelayActive(isDelayTriggered);
    setHoustonGuidanceQueued(isHoustonQueued);
    setCurrentDecision(chosen);

    // Show immediate fun comic outcome modal
    setGameState('outcome');
  };

  // Conclude mission and save score
  const handleEndMission = async (finalB, daysCompleted) => {
    const isEmergency = finalB.power <= 0 || finalB.lifeSupport <= 0 || finalB.shielding <= 0;
    const isWin = !isEmergency;

    const scoreInfo = calculateScore(daysCompleted, finalB, difficulty, isWin);
    setMissionScore(scoreInfo);

    // Persist to Universal Supabase Leaderboard (and local fallback)
    await submitScore({
      playerName: playerName || 'Cadet',
      playerId,
      playerTag,
      outpost: outpostType,
      difficulty,
      score: scoreInfo.finalScore,
      daysSurvived: daysCompleted,
      isWin,
      avatar
    });

    // Check Debrief Achievements
    if (isWin) {
      if (outpostType === 'moon') triggerUnlock('moon_walker');
      if (outpostType === 'mars') triggerUnlock('mars_pioneer');
      if (difficulty === 'hard') triggerUnlock('nasa_pro_legend');
      if (finalB.power >= 3 && finalB.lifeSupport >= 3 && finalB.shielding >= 3) {
        triggerUnlock('master_balancer');
      }
    }

    setGameState('debrief');
  };

  // Proceed to next day or debrief
  const handleProceedNextDay = () => {
    // If critical failure reached
    if (blocks.power <= 0 || blocks.lifeSupport <= 0 || blocks.shielding <= 0) {
      handleEndMission(blocks, currentDay);
      return;
    }

    // If final day completed
    if (currentDay >= totalDays) {
      let finalB = { ...blocks };
      if (houstonGuidanceQueued) {
        finalB = {
          power: Math.min(5, finalB.power + 1),
          lifeSupport: Math.min(5, finalB.lifeSupport + 1),
          shielding: Math.min(5, finalB.shielding + 1)
        };
        setBlocks(finalB);
      }
      handleEndMission(finalB, totalDays);
      return;
    }

    const nextDayNum = currentDay + 1;
    setCurrentDay(nextDayNum);

    if (nextDayNum === 2) {
      spaceAudio.playLaser();
    }

    if (nextDayNum === 5 && houstonGuidanceQueued) {
      setCommDelayActive(false);
    }

    // Mid-mission Quiz trigger on Day 3 or Day 5
    if (nextDayNum === 3 || nextDayNum === 5) {
      setIsQuizOpen(true);
    }

    setLastDelta(null);
    setGameState('playing');
  };

  // If user navigated to /customize, render full-screen CustomizePage
  if (location.pathname === '/customize') {
    return (
      <CustomizePage
        initialAvatar={avatar}
        playerName={playerName}
        onNameChange={handleNameChange}
        onSaveAvatar={handleSaveAvatar}
        coins={coins}
        onAddCoins={handleRewardCoins}
        unlockedCosmetics={unlockedCosmetics}
        onUnlockCosmetic={handleUnlockCosmetic}
        onBack={() => navigate('/')}
        lang={lang}
      />
    );
  }

  // If user navigated to /leaderboard or /clans, render full-screen LeaderboardPage
  if (location.pathname === '/leaderboard' || location.pathname === '/clans') {
    return (
      <LeaderboardPage
        initialTab={location.pathname === '/clans' ? 'clans' : 'universal'}
        playerName={playerName}
        playerTag={playerTag}
        playerId={playerId}
        avatar={avatar}
        coins={coins}
        onRewardCoins={handleRewardCoins}
        onBack={() => navigate('/')}
        lang={lang}
      />
    );
  }

  const currentScenario = scenarios[currentDay - 1];
  const activeConfig = OUTPOST_CONFIGS[outpostType];

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-2 md:p-3 gap-1.5 md:gap-2 bg-gradient-to-b from-[#1E1B4B] via-[#2A2665] to-[#1E1B4B] text-game-ink font-body selection:bg-game-yellow max-md:min-h-[100dvh] max-md:h-auto max-md:overflow-y-auto">
      {/* Header Bar */}
      <HeaderBar
        isGameActive={gameState === 'playing' || gameState === 'outcome'}
        currentDay={currentDay}
        totalDays={totalDays}
        outpostConfig={activeConfig}
        weatherData={weatherData}
        difficulty={difficulty}
        playerName={playerName}
        playerTag={playerTag}
        avatar={avatar}
        coins={coins}
        isSfxMuted={isSfxMuted}
        onToggleSfx={handleToggleSfx}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        onOpenSources={() => setIsSourcesOpen(true)}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onOpenLeaderboard={() => navigate('/leaderboard')}
        onOpenClans={() => navigate('/clans')}
        onExitGame={() => navigate('/')}
        lang={lang}
        onToggleLang={setLang}
        t={t}
      />

      {/* Main Game Stage */}
      {gameState === 'select' && (
        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <OutpostSelector
            onSelectOutpost={(planet) => {
              navigate(`/${planet}`);
            }}
            lang={lang}
            onToggleLang={setLang}
            playerName={playerName}
            playerTag={playerTag}
            onNameChange={handleNameChange}
            avatar={avatar}
            onOpenCustomizer={() => navigate('/customize')}
            coins={coins}
            onOpenQuiz={() => setIsQuizOpen(true)}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onOpenBadges={() => setIsBadgesOpen(true)}
            onOpenLeaderboard={() => navigate('/leaderboard')}
            onOpenClans={() => navigate('/clans')}
            t={t}
          />
        </div>
      )}

      {(gameState === 'playing' || gameState === 'outcome') && (
        <main className="flex-1 min-h-0 w-full max-w-5xl mx-auto flex flex-col justify-between gap-1.5 md:gap-2 overflow-hidden">
          {/* ZONE 1: Top HUD + Astro-Buddy (shrink-0) */}
          <div className="shrink-0 w-full space-y-1.5 sm:space-y-2">
            <ResourceHUD blocks={blocks} lastDelta={lastDelta} t={t} />
            <AstroBuddy
              speechText={currentScenario?.buddySpeech || "What should we do to protect our base?"}
              t={t}
            />
          </div>

          {/* ZONE 2: Center Diorama Container (flex-1 min-h-0 flex items-center justify-center) */}
          <div className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
            <div className="w-full max-h-full flex items-center justify-center">
              <OutpostDioramaSVG
                outpostType={outpostType}
                blocks={blocks}
                avatar={avatar}
                hasSpaceWeather={Boolean(currentScenario?.eventAlert)}
                isCommDelayActive={commDelayActive}
                onDropDecision={handleSelectDecision}
                isDraggingOver={isDraggingOver}
                setIsDraggingOver={setIsDraggingOver}
                t={t}
              />
            </div>
          </div>

          {/* ZONE 3: Bottom Decision Cards (shrink-0) */}
          <div className="shrink-0 w-full">
            <DecisionDeck
              scenario={currentScenario}
              onSelectDecision={handleSelectDecision}
            />
          </div>
        </main>
      )}

      {gameState === 'debrief' && (
        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <MissionDebrief
            debriefData={evaluateDebrief(blocks, outpostType, lang)}
            scoreData={missionScore}
            playerName={playerName}
            playerTag={playerTag}
            avatar={avatar}
            coins={coins}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onPlayAgain={() => handleStartGame(outpostType)}
            onSwitchOutpost={() => navigate(outpostType === 'moon' ? '/mars' : '/moon')}
            onOpenBadges={() => setIsBadgesOpen(true)}
            onOpenLeaderboard={() => navigate('/leaderboard')}
            onOpenClans={() => navigate('/clans')}
            lang={lang}
            t={t}
          />
        </div>
      )}

      {/* Immediate Fun Comic Outcome Modal */}
      {gameState === 'outcome' && currentDecision && (
        <OutcomeFeedback
          decision={currentDecision}
          nextDay={currentDay + 1}
          totalDays={totalDays}
          isLastDay={currentDay >= totalDays || blocks.power <= 0 || blocks.lifeSupport <= 0 || blocks.shielding <= 0}
          onProceed={handleProceedNextDay}
          t={t}
        />
      )}

      {/* Discreet NASA Data & Sources Modal for Judges & Parents */}
      <DataSourcesModal
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
        weatherData={weatherData}
        t={t}
      />

      {/* Badges / Trophy Case Modal */}
      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        lang={lang}
      />

      {/* 4-Option NASA Space Academy Quiz Pop-up */}
      <SpaceQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onRewardCoins={handleRewardCoins}
        lang={lang}
      />

      {/* Unlocked Badge Floating Toast */}
      {activeAchievementToast && (
        <AchievementToast
          achievement={activeAchievementToast}
          lang={lang}
          onClose={() => setActiveAchievementToast(null)}
        />
      )}
    </div>
  );
}
