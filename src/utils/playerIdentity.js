/**
 * Zero-Password Unique Player Identity System
 * Automatically generates a UUID v4 and a 4-digit Cadet Tag (#XXXX) on first visit.
 * Persisted in localStorage so two cadets with the same name never collide.
 */

const ID_KEY = 'space_base_player_uuid_v2';
const TAG_KEY = 'space_base_player_tag_v2';

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateTag() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `#${num}`;
}

export function getPlayerId() {
  if (typeof window === 'undefined') return 'cadet_anon';
  try {
    let id = localStorage.getItem(ID_KEY);
    if (!id) {
      id = generateUUID();
      localStorage.setItem(ID_KEY, id);
    }
    return id;
  } catch (e) {
    return 'cadet_anon';
  }
}

export function getPlayerTag() {
  if (typeof window === 'undefined') return '#0001';
  try {
    let tag = localStorage.getItem(TAG_KEY);
    if (!tag) {
      tag = generateTag();
      localStorage.setItem(TAG_KEY, tag);
    }
    return tag;
  } catch (e) {
    return '#0001';
  }
}
