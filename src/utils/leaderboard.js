/**
 * Universal Multi-Device Leaderboard Engine for Space Base Rescue!
 * Connected to Supabase real-time backend with local fallback.
 * STRICT RULE: ZERO fake or seeded data. Only real player submissions.
 */

import { supabase, isSupabaseConnected } from '../services/supabaseClient';

const LOCAL_STORAGE_KEY = 'space_base_real_scores_v2';

export function getLocalScores() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveLocalScore(entry) {
  if (typeof window === 'undefined') return [];
  try {
    const current = getLocalScores();
    const updated = [entry, ...current.filter((e) => e.id !== entry.id)]
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

/**
 * Fetch Universal Top Scores from Supabase (or fallback to local real submissions)
 */
export async function fetchUniversalLeaderboard({ outpost = 'all', difficulty = 'all' } = {}) {
  if (isSupabaseConnected()) {
    try {
      let query = supabase
        .from('scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(50);

      if (outpost && outpost !== 'all') {
        query = query.eq('outpost', outpost);
      }
      if (difficulty && difficulty !== 'all') {
        query = query.eq('difficulty', difficulty);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data)) {
        // Normalize column names to match UI
        return data.map((d) => ({
          id: d.id,
          playerId: d.player_id,
          playerName: d.player_name,
          playerTag: d.player_tag || '#0000',
          avatar: d.avatar_config || {},
          outpost: d.outpost,
          difficulty: d.difficulty,
          score: d.score,
          daysSurvived: d.days_survived,
          date: d.created_at ? d.created_at.split('T')[0] : '',
          isWin: true
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local scores:', e);
    }
  }

  // Fallback to local real submitted scores (zero fake/demo data)
  const local = getLocalScores();
  return local.filter((d) => {
    if (outpost && outpost !== 'all' && d.outpost !== outpost) return false;
    if (difficulty && difficulty !== 'all' && d.difficulty !== difficulty) return false;
    return true;
  });
}

/**
 * Submit a newly completed mission run
 */
export async function submitScore(entry) {
  const normalized = {
    id: entry.id || `score_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    playerId: entry.playerId || 'cadet_player',
    playerName: entry.playerName || 'Cadet',
    playerTag: entry.playerTag || '#0000',
    avatar: entry.avatar || {},
    outpost: entry.outpost,
    difficulty: entry.difficulty || 'medium',
    score: entry.score || 0,
    daysSurvived: entry.daysSurvived || 1,
    isWin: Boolean(entry.isWin),
    date: new Date().toISOString().split('T')[0]
  };

  // Always save locally
  saveLocalScore(normalized);

  // Sync to Supabase if connected
  if (isSupabaseConnected()) {
    try {
      await supabase.from('scores').insert([
        {
          player_id: normalized.playerId,
          player_name: normalized.playerName,
          player_tag: normalized.playerTag,
          avatar_config: normalized.avatar,
          outpost: normalized.outpost,
          difficulty: normalized.difficulty,
          score: normalized.score,
          days_survived: normalized.daysSurvived
        }
      ]);
    } catch (e) {
      console.warn('Supabase score insert failed:', e);
    }
  }

  return normalized;
}

// Backwards-compatible synchronous getter
export function getLeaderboard() {
  return getLocalScores();
}

export function saveLeaderboardEntry(entry) {
  submitScore(entry);
  return getLocalScores();
}

export function calculateScore(daysSurvived, remainingBlocks, difficulty = 'medium', isWin = false) {
  const multipliers = {
    easy: 1.0,
    medium: 1.5,
    hard: 2.0
  };
  const mult = multipliers[difficulty] || 1.5;
  const totalBlocks = Math.max(0, (remainingBlocks.power || 0) + (remainingBlocks.lifeSupport || 0) + (remainingBlocks.shielding || 0));
  const baseDays = daysSurvived * 100;
  const blockPoints = totalBlocks * 50;
  const winBonus = isWin ? 250 : 0;

  const finalScore = Math.round((baseDays + blockPoints + winBonus) * mult);
  return {
    finalScore,
    mult,
    baseDays,
    blockPoints,
    winBonus,
    totalBlocks
  };
}
