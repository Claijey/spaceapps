/**
 * Universal Multi-Device Leaderboard Engine for Space Base Rescue!
 * Connected to Supabase real-time backend with local fallback.
 * STRICT RULE: ZERO fake or seeded data. Only real player submissions.
 * Guaranteed idempotency and one best entry per (player, outpost, difficulty).
 */

import { supabase, isSupabaseConnected } from '../services/supabaseClient';

const LOCAL_STORAGE_KEY = 'space_base_real_scores_v2';

/**
 * Deduplicate an array of score entries so that each player has at most
 * ONE best (highest-scoring) entry for each (outpost, difficulty) combination.
 */
export function deduplicateLeaderboardEntries(entries) {
  if (!Array.isArray(entries)) return [];
  const map = new Map();

  for (const entry of entries) {
    if (!entry) continue;
    const pId = entry.playerId || entry.player_id || `${entry.playerName || ''}_${entry.playerTag || ''}`;
    const outpost = entry.outpost || 'unknown';
    const difficulty = entry.difficulty || 'medium';
    const key = `${pId}__${outpost}__${difficulty}`;

    const score = Number(entry.score) || 0;
    const existing = map.get(key);

    if (!existing) {
      map.set(key, entry);
    } else {
      const existingScore = Number(existing.score) || 0;
      if (score > existingScore) {
        map.set(key, entry);
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));
}

export function getLocalScores() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const deduped = deduplicateLeaderboardEntries(parsed);
    // If raw array had duplicate entries, clean up localStorage silently on read
    if (Array.isArray(parsed) && deduped.length !== parsed.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(deduped));
    }
    return deduped;
  } catch (e) {
    return [];
  }
}

export function saveLocalScore(entry) {
  if (typeof window === 'undefined') return [];
  try {
    const current = getLocalScores();
    const pId = entry.playerId || entry.player_id || `${entry.playerName || ''}_${entry.playerTag || ''}`;
    const outpost = entry.outpost;
    const difficulty = entry.difficulty;
    const newScore = Number(entry.score) || 0;

    const existingIndex = current.findIndex((e) => {
      const eId = e.playerId || e.player_id || `${e.playerName || ''}_${e.playerTag || ''}`;
      return eId === pId && e.outpost === outpost && e.difficulty === difficulty;
    });

    let updated;
    if (existingIndex >= 0) {
      const existing = current[existingIndex];
      const existingScore = Number(existing.score) || 0;
      if (newScore > existingScore) {
        // Only update if new score is higher
        updated = [...current];
        updated[existingIndex] = { ...existing, ...entry, score: newScore };
      } else {
        // Replaying with a lower or equal score does not overwrite
        updated = current;
      }
    } else {
      updated = [entry, ...current];
    }

    const deduped = deduplicateLeaderboardEntries(updated).slice(0, 50);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(deduped));
    return deduped;
  } catch (e) {
    return [];
  }
}

/**
 * Fetch Universal Top Scores from Supabase and/or local fallback.
 * Always deduplicates by (player_id, outpost, difficulty) keeping strictly
 * the single best score for each player per category.
 */
export async function fetchUniversalLeaderboard({ outpost = 'all', difficulty = 'all' } = {}) {
  let supabaseEntries = [];

  if (isSupabaseConnected()) {
    try {
      let query = supabase
        .from('scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(100);

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

  // Get local real scores matching filter
  const localEntries = getLocalScores().filter((d) => {
    if (outpost && outpost !== 'all' && d.outpost !== outpost) return false;
    if (difficulty && difficulty !== 'all' && d.difficulty !== difficulty) return false;
    return true;
  });

  // Merge both sources and deduplicate by (player_id, outpost, difficulty)
  const merged = [...supabaseEntries, ...localEntries];
  const deduped = deduplicateLeaderboardEntries(merged);
  return deduped.slice(0, 50);
}

/**
 * Submit a newly completed mission run (with idempotency and best-score upsert)
 */
export async function submitScore(entry) {
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
    daysSurvived: entry.daysSurvived || 1,
    isWin: Boolean(entry.isWin),
    date: new Date().toISOString().split('T')[0]
  };

  // Always save locally (with best-score upsert logic)
  saveLocalScore(normalized);

  // Sync to Supabase if connected
  if (isSupabaseConnected()) {
    try {
      // Check if player already has an entry for this (player_id, outpost, difficulty)
      const { data: existingRows, error: fetchErr } = await supabase
        .from('scores')
        .select('id, score')
        .eq('player_id', normalized.playerId)
        .eq('outpost', normalized.outpost)
        .eq('difficulty', normalized.difficulty)
        .order('score', { ascending: false });

      if (!fetchErr && existingRows && existingRows.length > 0) {
        const bestExisting = existingRows[0];
        const existingScore = Number(bestExisting.score) || 0;

        if (normalized.score > existingScore) {
          // New score is higher: update the row
          await supabase
            .from('scores')
            .update({
              player_name: normalized.playerName,
              player_tag: normalized.playerTag,
              avatar_config: normalized.avatar,
              score: normalized.score,
              days_survived: normalized.daysSurvived,
              created_at: new Date().toISOString()
            })
            .eq('id', bestExisting.id);
        }

        // Clean up any historical duplicate rows if they exist
        if (existingRows.length > 1) {
          const duplicateIds = existingRows.slice(1).map((r) => r.id);
          await supabase.from('scores').delete().in('id', duplicateIds);
        }
      } else {
        // No existing record found: upsert / insert
        const { error: upsertErr } = await supabase
          .from('scores')
          .upsert(
            [
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
            ],
            { onConflict: 'player_id,outpost,difficulty' }
          );

        if (upsertErr) {
          // If onConflict fails because UNIQUE constraint is not yet applied in DB, fallback to insert
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
        }
      }
    } catch (e) {
      console.warn('Supabase score persist error:', e);
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
