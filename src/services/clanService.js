/**
 * Clan / Group System Service for Space Base Rescue! (Supabase + Local Fallback)
 * Enforces strict 3-clan limit and unique membership constraints.
 */

import { supabase, isSupabaseConnected } from './supabaseClient';
import { getLocalScores, deduplicateLeaderboardEntries } from '../utils/leaderboard';

const LOCAL_CLANS_KEY = 'space_base_local_clans_v1';
const LOCAL_MEMBERS_KEY = 'space_base_local_members_v1';

function generateClanCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no confusing I/1/O/0
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Local storage fallback helpers
function getLocalClans() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_CLANS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalClans(clans) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_CLANS_KEY, JSON.stringify(clans));
  } catch (e) {}
}

function getLocalMembers() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_MEMBERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalMembers(members) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(members));
  } catch (e) {}
}

/**
 * Get count of clans the player has joined
 */
export async function getPlayerClanCount(playerId) {
  if (isSupabaseConnected()) {
    try {
      const { count, error } = await supabase
        .from('clan_members')
        .select('*', { count: 'exact', head: true })
        .eq('player_id', playerId);

      if (!error && typeof count === 'number') {
        return count;
      }
    } catch (e) {}
  }

  const localMembers = getLocalMembers();
  return localMembers.filter((m) => m.player_id === playerId).length;
}

/**
 * Fetch all clans the player belongs to
 */
export async function getPlayerClans(playerId) {
  if (isSupabaseConnected()) {
    try {
      const { data, error } = await supabase
        .from('clan_members')
        .select(`
          clan_id,
          clans (
            id,
            name,
            code,
            created_by_player_id,
            created_at
          )
        `)
        .eq('player_id', playerId);

      if (!error && Array.isArray(data)) {
        return data.map((d) => d.clans).filter(Boolean);
      }
    } catch (e) {
      console.warn('Supabase getPlayerClans failed, using local fallback:', e);
    }
  }

  const localMembers = getLocalMembers().filter((m) => m.player_id === playerId);
  const clanIds = localMembers.map((m) => m.clan_id);
  const localClans = getLocalClans();
  return localClans.filter((c) => clanIds.includes(c.id));
}

/**
 * Create a new clan
 */
export async function createClan({ name, playerId, playerName, playerTag, avatar }) {
  const trimmedName = (name || '').trim();
  if (trimmedName.length < 2) {
    return { error: 'invalid_name' };
  }

  // 1. Check strict 3-clan limit
  const currentCount = await getPlayerClanCount(playerId);
  if (currentCount >= 3) {
    return { error: 'max_clans_reached' };
  }

  const code = generateClanCode();

  if (isSupabaseConnected()) {
    try {
      // Insert clan
      const { data: clanData, error: clanError } = await supabase
        .from('clans')
        .insert([
          {
            name: trimmedName,
            code,
            created_by_player_id: playerId
          }
        ])
        .select()
        .single();

      if (clanError || !clanData) {
        return { error: clanError?.message || 'create_failed' };
      }

      // Auto-join creator
      const { error: memberError } = await supabase
        .from('clan_members')
        .insert([
          {
            clan_id: clanData.id,
            player_id: playerId,
            player_name: playerName,
            player_tag: playerTag,
            avatar_config: avatar || {}
          }
        ]);

      if (memberError) {
        return { error: memberError.message };
      }

      return { clan: clanData };
    } catch (e) {
      console.warn('Supabase createClan error:', e);
    }
  }

  // Local fallback
  const newClan = {
    id: `clan_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: trimmedName,
    code,
    created_by_player_id: playerId,
    created_at: new Date().toISOString()
  };

  const localClans = getLocalClans();
  saveLocalClans([...localClans, newClan]);

  const localMembers = getLocalMembers();
  saveLocalMembers([
    ...localMembers,
    {
      id: `member_${Date.now()}`,
      clan_id: newClan.id,
      player_id: playerId,
      player_name: playerName,
      player_tag: playerTag,
      avatar_config: avatar || {},
      joined_at: new Date().toISOString()
    }
  ]);

  return { clan: newClan };
}

/**
 * Join an existing clan by its 6-character code
 */
export async function joinClanByCode({ code, playerId, playerName, playerTag, avatar }) {
  const cleanCode = (code || '').trim().toUpperCase();
  if (cleanCode.length !== 6) {
    return { error: 'invalid_code' };
  }

  // 1. Check strict 3-clan limit
  const currentCount = await getPlayerClanCount(playerId);
  if (currentCount >= 3) {
    return { error: 'max_clans_reached' };
  }

  if (isSupabaseConnected()) {
    try {
      // Find clan
      const { data: clanData, error: clanError } = await supabase
        .from('clans')
        .select('*')
        .eq('code', cleanCode)
        .single();

      if (clanError || !clanData) {
        return { error: 'clan_not_found' };
      }

      // Check if already in this clan
      const { data: existingMember } = await supabase
        .from('clan_members')
        .select('id')
        .eq('clan_id', clanData.id)
        .eq('player_id', playerId)
        .maybeSingle();

      if (existingMember) {
        return { error: 'already_member' };
      }

      // Insert member
      const { error: joinError } = await supabase
        .from('clan_members')
        .insert([
          {
            clan_id: clanData.id,
            player_id: playerId,
            player_name: playerName,
            player_tag: playerTag,
            avatar_config: avatar || {}
          }
        ]);

      if (joinError) {
        if (joinError.code === '23505' || joinError.message.includes('unique')) {
          return { error: 'already_member' };
        }
        return { error: joinError.message };
      }

      return { clan: clanData };
    } catch (e) {
      console.warn('Supabase joinClan error:', e);
    }
  }

  // Local fallback
  const localClans = getLocalClans();
  const targetClan = localClans.find((c) => c.code === cleanCode);
  if (!targetClan) {
    return { error: 'clan_not_found' };
  }

  const localMembers = getLocalMembers();
  const alreadyMember = localMembers.some(
    (m) => m.clan_id === targetClan.id && m.player_id === playerId
  );
  if (alreadyMember) {
    return { error: 'already_member' };
  }

  saveLocalMembers([
    ...localMembers,
    {
      id: `member_${Date.now()}`,
      clan_id: targetClan.id,
      player_id: playerId,
      player_name: playerName,
      player_tag: playerTag,
      avatar_config: avatar || {},
      joined_at: new Date().toISOString()
    }
  ]);

  return { clan: targetClan };
}

/**
 * Fetch leaderboard ranking ONLY members of a specific clan
 */
export async function fetchClanLeaderboard(clanId) {
  if (isSupabaseConnected()) {
    try {
      // 1. Get member player_ids
      const { data: members, error: mError } = await supabase
        .from('clan_members')
        .select('player_id, player_name, player_tag, avatar_config')
        .eq('clan_id', clanId);

      if (!mError && Array.isArray(members) && members.length > 0) {
        const playerIds = members.map((m) => m.player_id);

        // 2. Fetch scores for these members
        const { data: scores, error: sError } = await supabase
          .from('scores')
          .select('*')
          .in('player_id', playerIds)
          .order('score', { ascending: false })
          .limit(50);

        if (!sError && Array.isArray(scores)) {
          const mapped = scores.map((d) => ({
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
          return deduplicateLeaderboardEntries(mapped).slice(0, 50);
        }
      }
    } catch (e) {
      console.warn('fetchClanLeaderboard error:', e);
    }
  }

  // Local fallback
  const localMembers = getLocalMembers().filter((m) => m.clan_id === clanId);
  const memberPlayerIds = localMembers.map((m) => m.player_id);
  const localScores = getLocalScores();
  return localScores.filter((s) => memberPlayerIds.includes(s.playerId));
}
