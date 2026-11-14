/**
 * Universal Multi-Device Leaderboard Engine for Space Base Rescue!
 * Connected to Supabase real-time backend with local fallback.
 * STRICT RULE: ZERO fake or seeded data. Only real player submissions.
 * Unified cumulative scoring per player across missions & outposts.
 */

import { supabase, isSupabaseConnected } from '../services/supabaseClient';

const LOCAL_STORAGE_KEY = 'space_base_real_scores_v2';
const PROCESSED_RUNS_KEY = 'space_base_processed_run_ids_v1';

/**
 * Check whether a runId has already been recorded/processed.
 */
export function isRunAlreadyProcessed(runId) {
  if (!runId || typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(PROCESSED_RUNS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) && list.includes(runId);
  } catch (e) {
    return false;
  }
}

/**
 * Mark a runId as processed to guarantee strict idempotency across reloads.
 */
export function markRunAsProcessed(runId) {
  if (!runId || typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(PROCESSED_RUNS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (!list.includes(runId)) {
      list.push(runId);
      const trimmed = list.slice(-100);
      localStorage.setItem(PROCESSED_RUNS_KEY, JSON.stringify(trimmed));
    }
  } catch (e) {}
}

/**
 * Retrieve raw per-(outpost, difficulty) rows from localStorage,
 * merging any legacy exact clone duplicates on read.
 */
export function getLocalRawScores() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const map = new Map();
    for (const item of parsed) {
      if (!item) continue;
      const pId = item.playerId || item.player_id || `${item.playerName || 'Cadet'}_${item.playerTag || '#0000'}`;
      const outpost = item.outpost || 'moon';
      const difficulty = item.difficulty || 'medium';
      const key = `${pId}__${outpost}__${difficulty}`;

      if (!map.has(key)) {
        map.set(key, {
          ...item,
          playerId: pId,
          score: Number(item.score) || 0,
          daysSurvived: Number(item.daysSurvived || item.days_survived) || 1,
          missionsCount: Number(item.missionsCount || item.missions_count) || 1
        });
      } else {
        const existing = map.get(key);
        // If it's an identical legacy clone, take max; if a distinct run, sum
        if (item.id === existing.id || (item.score === existing.score && item.date === existing.date)) {
          existing.score = Math.max(existing.score, Number(item.score) || 0);
        } else {
          existing.score += Number(item.score) || 0;
          existing.daysSurvived += Number(item.daysSurvived || item.days_survived) || 0;
          existing.missionsCount += Number(item.missionsCount || item.missions_count) || 1;
        }
      }
    }

    const merged = Array.from(map.values());
    if (merged.length !== parsed.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch (e) {
    return [];
  }
}

/**
 * Aggregate a list of scores by player_id.
 * Every player appears as ONE unified row with their cumulative total score!
 */
export function aggregateLeaderboardByPlayer(entries) {
  if (!Array.isArray(entries)) return [];
  const map = new Map();

  for (const entry of entries) {
    if (!entry) continue;
    const pId = entry.playerId || entry.player_id || `${entry.playerName || 'Cadet'}_${entry.playerTag || '#0000'}`;

    const score = Number(entry.score) || 0;
    const days = Number(entry.daysSurvived || entry.days_survived) || 1;
    const missions = Number(entry.missionsCount || entry.missions_count) || 1;
    const outpost = entry.outpost || 'moon';
    const difficulty = entry.difficulty || 'medium';

    if (!map.has(pId)) {
      map.set(pId, {
        id: entry.id || `agg_${pId}`,
        playerId: pId,
        playerName: entry.playerName || entry.player_name || 'Cadet',
        playerTag: entry.playerTag || entry.player_tag || '#0000',
        avatar: entry.avatar || entry.avatar_config || {},
        score: score,
        daysSurvived: days,
        missionsCount: missions,
        outposts: new Set([outpost]),
        difficulties: new Set([difficulty]),
        latestOutpost: outpost,
        latestDifficulty: difficulty,
        date: entry.date || (entry.created_at ? entry.created_at.split('T')[0] : '') || '',
        isWin: true
      });
    } else {
      const existing = map.get(pId);
      existing.score += score;
      existing.daysSurvived += days;
      existing.missionsCount += missions;
      existing.outposts.add(outpost);
      existing.difficulties.add(difficulty);
      if (entry.playerName) existing.playerName = entry.playerName;
      if (entry.playerTag) existing.playerTag = entry.playerTag;
      if (entry.avatar && Object.keys(entry.avatar).length > 0) existing.avatar = entry.avatar;
      if (entry.date && (!existing.date || entry.date > existing.date)) existing.date = entry.date;
      existing.latestOutpost = outpost;
      existing.latestDifficulty = difficulty;
    }
  }

  const diffRank = { hard: 3, medium: 2, easy: 1 };
  const aggregated = Array.from(map.values()).map((p) => {
    let bestDiff = 'medium';
    let maxRank = 0;
    p.difficulties.forEach((d) => {
      if ((diffRank[d] || 0) > maxRank) {
        maxRank = diffRank[d];
        bestDiff = d;
      }
    });

    const outpostList = Array.from(p.outposts);
    let outpostDisplay = outpostList[0] || 'moon';
    if (outpostList.length > 1) {
      outpostDisplay = 'both';
    }

    return {
      ...p,
      difficulty: bestDiff,
      outpost: outpostDisplay,
      outposts: outpostList
    };
  });

  return aggregated.sort((a, b) => b.score - a.score);
}

// Backwards-compatible alias for deduplication
export function deduplicateLeaderboardEntries(entries) {
  return aggregateLeaderboardByPlayer(entries);
}

/**
 * Return aggregated local scores (1 row per player, summed score)
 */
export function getLocalScores() {
  return aggregateLeaderboardByPlayer(getLocalRawScores());
}

/**
 * Save an earned score to localStorage by adding it to the player's
 * cumulative score for (player_id, outpost, difficulty).
 */
export function saveLocalScore(entry) {
  if (typeof window === 'undefined') return [];
  try {
    const current = getLocalRawScores();
    const pId = entry.playerId || entry.player_id || `${entry.playerName || 'Cadet'}_${entry.playerTag || '#0000'}`;
    const outpost = entry.outpost;
    const difficulty = entry.difficulty;
    const earnedScore = Number(entry.score) || 0;
    const earnedDays = Number(entry.daysSurvived || entry.days_survived) || 1;

    const existingIndex = current.findIndex((e) => {
      const eId = e.playerId || e.player_id || `${e.playerName || ''}_${e.playerTag || ''}`;
      return eId === pId && e.outpost === outpost && e.difficulty === difficulty;
    });

    let updated;
    if (existingIndex >= 0) {
      const existing = current[existingIndex];
      const newCumulativeScore = (Number(existing.score) || 0) + earnedScore;
      const newDaysSurvived = (Number(existing.daysSurvived || existing.days_survived) || 0) + earnedDays;
      const newMissionsCount = (Number(existing.missionsCount || existing.missions_count) || 1) + 1;

      updated = [...current];
      updated[existingIndex] = {
        ...existing,
        ...entry,
        score: newCumulativeScore,
        daysSurvived: newDaysSurvived,
        missionsCount: newMissionsCount,
        date: new Date().toISOString().split('T')[0]
      };
    } else {
      updated = [
        {
          ...entry,
          score: earnedScore,
          daysSurvived: earnedDays,
          missionsCount: 1,
          date: new Date().toISOString().split('T')[0]
        },
        ...current
      ];
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return aggregateLeaderboardByPlayer(updated);
  } catch (e) {
    return [];
  }
}

/**
 * Fetch Universal Top Scores from Supabase and/or local fallback.
 * Applies filters (outpost, difficulty), then aggregates by player_id
 * so each player appears only ONCE with their cumulative score!
 */
export async function fetchUniversalLeaderboard({ outpost = 'all', difficulty = 'all' } = {}) {
  let supabaseEntries = [];

  if (isSupabaseConnected()) {
    try {
      let query = supabase
        .from('scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(200);

      if (outpost && outpost !== 'all') {
        query = query.eq('outpost', outpost);
      }
      if (difficulty && difficulty !== 'all') {
        query = query.eq('difficulty', difficulty);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data)) {
        supabaseEntries = data.map((d) => ({
          id: d.id,
          playerId: d.player_id,
          playerName: d.player_name,
          playerTag: d.player_tag || '#0000',
          avatar: d.avatar_config || {},
          outpost: d.outpost,
          difficulty: d.difficulty,
          score: Number(d.score) || 0,
          daysSurvived: Number(d.days_survived) || 1,
          missionsCount: Number(d.missions_count) || 1,
          date: d.created_at ? d.created_at.split('T')[0] : '',
          isWin: true
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local scores:', e);
    }
  }

  // Get local real scores matching filter
  const localEntries = getLocalRawScores().filter((d) => {
    if (outpost && outpost !== 'all' && d.outpost !== outpost) return false;
    if (difficulty && difficulty !== 'all' && d.difficulty !== difficulty) return false;
    return true;
  });

  // Merge both sources per (player_id, outpost, difficulty)
  const combinedMap = new Map();
  for (const entry of [...supabaseEntries, ...localEntries]) {
    const pId = entry.playerId || entry.player_id;
    const key = `${pId}__${entry.outpost}__${entry.difficulty}`;
    if (!combinedMap.has(key)) {
      combinedMap.set(key, entry);
    } else {
      const existing = combinedMap.get(key);
      if ((entry.score || 0) > (existing.score || 0)) {
        combinedMap.set(key, entry);
      }
    }
  }

  const matchingRows = Array.from(combinedMap.values());

  // Aggregate by player_id: One row per player with cumulative total!
  const aggregated = aggregateLeaderboardByPlayer(matchingRows);
  return aggregated.slice(0, 50);
}

/**
 * Submit a newly completed mission run (with idempotency and cumulative score addition)
 */
export async function submitScore(entry) {
  // Guard idempotency: never submit the same mission run twice!
  if (entry.runId && isRunAlreadyProcessed(entry.runId)) {
    console.log('submitScore: Run already processed, skipping duplicate:', entry.runId);
    return null;
  }
  if (entry.runId) {
    markRunAsProcessed(entry.runId);
  }

  const normalized = {
    id: entry.id || (entry.runId ? `score_${entry.runId}` : `score_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`),
    runId: entry.runId || null,
    playerId: entry.playerId || 'cadet_player',
    playerName: entry.playerName || 'Cadet',
    playerTag: entry.playerTag || '#0000',
    avatar: entry.avatar || {},
    outpost: entry.outpost,
    difficulty: entry.difficulty || 'medium',
    score: Number(entry.score) || 0,
    daysSurvived: Number(entry.daysSurvived) || 1,
    isWin: Boolean(entry.isWin),
    date: new Date().toISOString().split('T')[0]
  };

  // 1. Always update local storage with cumulative addition
  saveLocalScore(normalized);

  // 2. Sync cumulative addition to Supabase if connected
  if (isSupabaseConnected()) {
    try {
      // Check if atomic RPC function exists in Supabase
      const { data: rpcData, error: rpcErr } = await supabase.rpc('increment_player_score', {
        p_player_id: normalized.playerId,
        p_player_name: normalized.playerName,
        p_player_tag: normalized.playerTag,
        p_avatar_config: normalized.avatar,
        p_outpost: normalized.outpost,
        p_difficulty: normalized.difficulty,
        p_earned_score: normalized.score,
        p_days_survived: normalized.daysSurvived
      });

      if (!rpcErr && rpcData) {
        return normalized;
      }

      // Fallback: Select + Update/Insert
      const { data: existingRows, error: fetchErr } = await supabase
        .from('scores')
        .select('*')
        .eq('player_id', normalized.playerId)
        .eq('outpost', normalized.outpost)
        .eq('difficulty', normalized.difficulty);

      if (!fetchErr && existingRows && existingRows.length > 0) {
        const existing = existingRows[0];
        const newScore = (Number(existing.score) || 0) + normalized.score;
        const newDays = (Number(existing.days_survived) || 0) + normalized.daysSurvived;
        const newMissions = (Number(existing.missions_count) || 1) + 1;

        await supabase
          .from('scores')
          .update({
            player_name: normalized.playerName,
            player_tag: normalized.playerTag,
            avatar_config: normalized.avatar,
            score: newScore,
            days_survived: newDays,
            missions_count: newMissions,
            created_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (existingRows.length > 1) {
          const duplicateIds = existingRows.slice(1).map((r) => r.id);
          await supabase.from('scores').delete().in('id', duplicateIds);
        }
      } else {
        await supabase.from('scores').insert([
          {
            player_id: normalized.playerId,
            player_name: normalized.playerName,
            player_tag: normalized.playerTag,
            avatar_config: normalized.avatar,
            outpost: normalized.outpost,
            difficulty: normalized.difficulty,
            score: normalized.score,
            days_survived: normalized.daysSurvived,
            missions_count: 1
          }
        ]);
      }
    } catch (e) {
      console.warn('Supabase score persist error:', e);
    }
  }

  return normalized;
}

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

/**
 * Sync player name, tag, and avatar config across all leaderboard & clan member records.
 * Updates both localStorage and Supabase so existing scores and clan rosters show current identity.
 */
export async function syncPlayerProfileToLeaderboards({ playerId, playerName, playerTag, avatarConfig }) {
  if (!playerId && !playerTag) return;

  // 1. Update localStorage scores
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const scores = JSON.parse(raw);
      if (Array.isArray(scores)) {
        let changed = false;
        const updated = scores.map((s) => {
          const pId = s.playerId || s.player_id;
          if (pId === playerId || (playerTag && (s.playerTag === playerTag || s.player_tag === playerTag))) {
            changed = true;
            return {
              ...s,
              playerName: playerName || s.playerName || s.player_name,
              player_name: playerName || s.player_name || s.playerName,
              playerTag: playerTag || s.playerTag || s.player_tag,
              player_tag: playerTag || s.player_tag || s.playerTag,
              avatar: avatarConfig !== undefined ? avatarConfig : (s.avatar || s.avatar_config),
              avatar_config: avatarConfig !== undefined ? avatarConfig : (s.avatar_config || s.avatar)
            };
          }
          return s;
        });
        if (changed) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        }
      }
    }
  } catch (e) {
    console.warn('syncPlayerProfile localStorage scores error:', e);
  }

  // 2. Update localStorage clan members
  try {
    const rawMembers = localStorage.getItem('space_base_local_members_v1');
    if (rawMembers) {
      const members = JSON.parse(rawMembers);
      if (Array.isArray(members)) {
        let changed = false;
        const updatedMembers = members.map((m) => {
          if (m.player_id === playerId || (playerTag && m.player_tag === playerTag)) {
            changed = true;
            return {
              ...m,
              player_name: playerName || m.player_name,
              player_tag: playerTag || m.player_tag,
              avatar_config: avatarConfig !== undefined ? avatarConfig : m.avatar_config
            };
          }
          return m;
        });
        if (changed) {
          localStorage.setItem('space_base_local_members_v1', JSON.stringify(updatedMembers));
        }
      }
    }
  } catch (e) {
    console.warn('syncPlayerProfile localStorage members error:', e);
  }

  // 3. Update Supabase scores and clan_members if connected
  if (isSupabaseConnected()) {
    try {
      const payload = {};
      if (playerName) payload.player_name = playerName;
      if (playerTag) payload.player_tag = playerTag;
      if (avatarConfig !== undefined) payload.avatar_config = avatarConfig;

      if (Object.keys(payload).length > 0) {
        await Promise.allSettled([
          supabase.from('scores').update(payload).eq('player_id', playerId),
          supabase.from('clan_members').update(payload).eq('player_id', playerId)
        ]);
      }
    } catch (e) {
      console.warn('Supabase syncPlayerProfile error:', e);
    }
  }
}
