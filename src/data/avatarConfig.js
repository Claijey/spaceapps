/**
 * Astronaut Avatar Customizer Configurations & Star Coins Cosmetic Economy
 * 100% Client-side and stored in localStorage.
 */

export const SUIT_COLORS = [
  { id: 'white', name: { en: 'NASA White', tr: 'NASA Beyazı' }, hex: '#F8FAFC', accent: '#CBD5E1', border: '#0F172A', price: 0 },
  { id: 'orange', name: { en: 'Mars Orange', tr: 'Mars Turuncusu' }, hex: '#EA580C', accent: '#C2410C', border: '#0F172A', price: 0 },
  { id: 'blue', name: { en: 'Sky Blue', tr: 'Gök Mavisi' }, hex: '#38BDF8', accent: '#0284C7', border: '#0F172A', price: 100 },
  { id: 'mint', name: { en: 'Mint Green', tr: 'Nane Yeşili' }, hex: '#34D399', accent: '#059669', border: '#0F172A', price: 100 },
  { id: 'purple', name: { en: 'Galaxy Purple', tr: 'Galaksi Moru' }, hex: '#A855F7', accent: '#7E22CE', border: '#0F172A', price: 120 },
  { id: 'yellow', name: { en: 'Sunny Yellow', tr: 'Güneş Sarısı' }, hex: '#FBBF24', accent: '#D97706', border: '#0F172A', price: 100 }
];

export const SKIN_TONES = [
  { id: 'light', name: { en: 'Light', tr: 'Açık' }, hex: '#FDDFCA', price: 0 },
  { id: 'fair', name: { en: 'Fair', tr: 'Buğday' }, hex: '#F3C59F', price: 0 },
  { id: 'medium', name: { en: 'Golden', tr: 'Altın' }, hex: '#E0AC69', price: 0 },
  { id: 'tan', name: { en: 'Tan', tr: 'Esmer' }, hex: '#8D5524', price: 0 },
  { id: 'dark', name: { en: 'Deep', tr: 'Koyu' }, hex: '#4C2D16', price: 0 }
];

export const FACE_STYLES = [
  { id: 'smile', icon: '😊', name: { en: 'Happy Smile', tr: 'Mutlu Gülüş' }, price: 0 },
  { id: 'shades', icon: '😎', name: { en: 'Cool Shades', tr: 'Havalı Gözlük' }, price: 0 },
  { id: 'stars', icon: '🤩', name: { en: 'Star Eyes', tr: 'Yıldız Gözler' }, price: 100 },
  { id: 'wink', icon: '😉', name: { en: 'Winking', tr: 'Göz Kırpan' }, price: 100 },
  { id: 'brave', icon: '😼', name: { en: 'Brave Cadet', tr: 'Cesur Kaşif' }, price: 120 }
];

export const HELMET_STYLES = [
  { id: 'bubble', icon: '🪖', name: { en: 'Bubble Visor', tr: 'Klasik Vizör' }, price: 0 },
  { id: 'cap', icon: '🧢', name: { en: 'Explorer Cap', tr: 'Kaşif Şapkası' }, price: 0 },
  { id: 'cat', icon: '🐱', name: { en: 'Cat Ears', tr: 'Kedi Kulaklı' }, price: 120 },
  { id: 'antenna', icon: '📡', name: { en: 'Antenna Bot', tr: 'Antenli Robot' }, price: 100 },
  { id: 'crown', icon: '👑', name: { en: 'Star Crown', tr: 'Yıldız Tacı' }, price: 120 }
];

export const CHEST_PATCHES = [
  { id: 'rocket', icon: '🚀', name: { en: 'Rocket', tr: 'Roket' }, price: 0 },
  { id: 'moon', icon: '🌙', name: { en: 'Moon', tr: 'Hilal Ay' }, price: 0 },
  { id: 'planet', icon: '🪐', name: { en: 'Planet', tr: 'Gezegen' }, price: 100 },
  { id: 'zap', icon: '⚡', name: { en: 'Lightning', tr: 'Şimşek' }, price: 100 }
];

export const COSMETIC_PRICES = {
  // Suits
  blue: 100,
  mint: 100,
  purple: 120,
  yellow: 100,
  // Faces
  stars: 100,
  wink: 100,
  brave: 120,
  // Helmets
  cat: 120,
  antenna: 100,
  crown: 120,
  // Patches
  planet: 100,
  zap: 100
};

export const STARTER_UNLOCKED = [
  // All skin tones (100% free)
  'light', 'fair', 'medium', 'tan', 'dark',
  // Fixed 2 starter items per category
  'white', 'orange',
  'smile', 'shades',
  'bubble', 'cap',
  'rocket', 'moon'
];

export const DAILY_TOP10_REWARDS = {
  1: 300,
  2: 250,
  3: 200,
  4: 160,
  5: 130,
  6: 100,
  7: 80,
  8: 60,
  9: 40,
  10: 25
};

export const DEFAULT_AVATAR = {
  suitColor: 'white',
  skinTone: 'fair',
  faceStyle: 'smile',
  helmetStyle: 'bubble',
  patchIcon: 'rocket'
};

const STORAGE_KEY = 'space_base_avatar_config_v1';
const COINS_KEY = 'space_base_star_coins_v1';
const UNLOCKED_KEY = 'space_base_unlocked_cosmetics_v1';
const PLAYER_ID_KEY = 'space_base_player_id_v1';
const DAILY_CLAIM_KEY = 'space_base_last_daily_claim_v1';

export function getStoredAvatar() {
  if (typeof window === 'undefined') return DEFAULT_AVATAR;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_AVATAR;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_AVATAR, ...parsed };
  } catch (e) {
    return DEFAULT_AVATAR;
  }
}

export function saveStoredAvatar(avatar) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(avatar));
  } catch (e) {
    // ignore
  }
}

export function getPlayerCoins() {
  if (typeof window === 'undefined') return 100;
  try {
    const val = localStorage.getItem(COINS_KEY);
    if (val === null) {
      localStorage.setItem(COINS_KEY, '100');
      return 100;
    }
    const num = parseInt(val, 10);
    return isNaN(num) ? 100 : num;
  } catch (e) {
    return 100;
  }
}

export function addPlayerCoins(amount) {
  const current = getPlayerCoins();
  const updated = Math.max(0, current + amount);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(COINS_KEY, updated.toString());
    } catch (e) {}
  }
  return updated;
}

export function getUnlockedCosmetics() {
  if (typeof window === 'undefined') return STARTER_UNLOCKED;
  try {
    const raw = localStorage.getItem(UNLOCKED_KEY);
    if (!raw) {
      localStorage.setItem(UNLOCKED_KEY, JSON.stringify(STARTER_UNLOCKED));
      return STARTER_UNLOCKED;
    }
    const parsed = JSON.parse(raw);
    return Array.from(new Set([...STARTER_UNLOCKED, ...(Array.isArray(parsed) ? parsed : [])]));
  } catch (e) {
    return STARTER_UNLOCKED;
  }
}

export function unlockCosmetic(id) {
  const unlocked = getUnlockedCosmetics();
  if (unlocked.includes(id)) return unlocked;
  const updated = [...unlocked, id];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(UNLOCKED_KEY, JSON.stringify(updated));
    } catch (e) {}
  }
  return updated;
}

export function getPlayerId() {
  if (typeof window === 'undefined') return 'cadet_seed';
  try {
    let id = localStorage.getItem(PLAYER_ID_KEY);
    if (!id) {
      id = `cadet_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      localStorage.setItem(PLAYER_ID_KEY, id);
    }
    return id;
  } catch (e) {
    return 'cadet_seed';
  }
}

export function getLastDailyClaim() {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(DAILY_CLAIM_KEY) || '';
  } catch (e) {
    return '';
  }
}

export function setLastDailyClaim(dateStr) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DAILY_CLAIM_KEY, dateStr);
  } catch (e) {}
}

export function getRandomAvatar() {
  const unlocked = getUnlockedCosmetics();
  const randomFrom = (arr) => {
    const available = arr.filter((item) => unlocked.includes(item.id));
    const pool = available.length > 0 ? available : arr;
    return pool[Math.floor(Math.random() * pool.length)].id;
  };

  return {
    suitColor: randomFrom(SUIT_COLORS),
    skinTone: randomFrom(SKIN_TONES),
    faceStyle: randomFrom(FACE_STYLES),
    helmetStyle: randomFrom(HELMET_STYLES),
    patchIcon: randomFrom(CHEST_PATCHES)
  };
}
