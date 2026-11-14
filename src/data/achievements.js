/**
 * Space Achievements & Badges for Space Base Rescue! (NASA Space Apps 2026)
 * Stored in localStorage, 100% bilingual (EN/TR).
 */

export const ACHIEVEMENTS = [
  {
    id: 'moon_walker',
    icon: '🌙',
    title: { en: 'Moon Walker', tr: 'Ay Kaşifi' },
    desc: { en: 'Complete a mission on Moon Base.', tr: 'Ay Üssü görevini tamamla.' }
  },
  {
    id: 'mars_pioneer',
    icon: '🪐',
    title: { en: 'Mars Pioneer', tr: 'Mars Öncüsü' },
    desc: { en: 'Complete a mission on Mars Base.', tr: 'Mars Üssü görevini tamamla.' }
  },
  {
    id: 'solar_shield_hero',
    icon: '🛡️',
    title: { en: 'Solar Shield Hero', tr: 'Güneş Kalkanı Kahramanı' },
    desc: { en: 'Survive a NASA DONKI Solar Flare event.', tr: 'NASA DONKI Güneş Patlaması fırtınasını atlat.' }
  },
  {
    id: 'master_balancer',
    icon: '⚖️',
    title: { en: 'Master Balancer', tr: 'Denge Ustası' },
    desc: { en: 'Finish a mission with all 3 meters at 3/5 or higher.', tr: 'Tüm sayaçlar 3/5 veya üzerindeyken görevi bitir.' }
  },
  {
    id: 'dust_buster',
    icon: '🧹',
    title: { en: 'Dust Buster', tr: 'Toz Temizleyici' },
    desc: { en: 'Clear space dust to restore solar battery power.', tr: 'Panelleri temizleyerek bataryayı doldur.' }
  },
  {
    id: 'nasa_pro_legend',
    icon: '🏆',
    title: { en: 'NASA Pro Legend', tr: 'Uzman Efsanesi' },
    desc: { en: 'Win a 7-day mission on Hard (NASA Pro) mode.', tr: 'Zor (NASA Uzmanı) modunda 7 günlük görevi kazan.' }
  },
  {
    id: 'earth_caller',
    icon: '📡',
    title: { en: 'Deep Space Radio', tr: 'Derin Uzay Telsizi' },
    desc: { en: 'Send a signal across the 18-minute Mars delay.', tr: 'Mars 18 dakikalık gecikmesinde Dünya ile iletişim kur.' }
  },
  {
    id: 'full_power',
    icon: '⚡',
    title: { en: 'Super Charged', tr: 'Aşırı Şarj' },
    desc: { en: 'Fill the Battery meter to maximum (5/5).', tr: 'Batarya sayacını maksimuma (5/5) ulaştır.' }
  }
];

const STORAGE_KEY = 'space_base_achievements_v1';

export function getUnlockedAchievements() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function unlockAchievement(id) {
  if (typeof window === 'undefined') return null;
  try {
    const current = getUnlockedAchievements();
    if (current.includes(id)) return null; // already unlocked

    const updated = [...current, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const item = ACHIEVEMENTS.find((a) => a.id === id);
    return item || null;
  } catch (e) {
    return null;
  }
}
