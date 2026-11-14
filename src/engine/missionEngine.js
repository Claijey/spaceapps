/**
 * Mission Engine for "Space Base Rescue!" (NASA Space Apps 2026)
 * Supports dynamic English & Turkish localization with difficulty modes and real NASA DONKI mechanics.
 */
import { translations } from '../data/translations';

export const DIFFICULTY_CONFIGS = {
  easy: {
    id: 'easy',
    totalDays: 4,
    multiplier: 1.0,
    badge: '🌟',
    initialBlocks: {
      power: 4,
      lifeSupport: 4,
      shielding: 4
    }
  },
  medium: {
    id: 'medium',
    totalDays: 5,
    multiplier: 1.5,
    badge: '🚀',
    initialBlocks: {
      power: 4,
      lifeSupport: 4,
      shielding: 3
    }
  },
  hard: {
    id: 'hard',
    totalDays: 7,
    multiplier: 2.0,
    badge: '🔥',
    initialBlocks: {
      power: 3,
      lifeSupport: 3,
      shielding: 3
    }
  }
};

export const OUTPOST_CONFIGS = {
  moon: { id: 'moon' },
  mars: { id: 'mars' }
};

/**
 * Generate 4, 5, or 7 game days tailored to Moon vs Mars in EN or TR
 */
export function generateSolScenarios(outpostType, weatherEvents = [], lang = 'en', difficulty = 'medium', astronautName = 'Cadet') {
  const isMoon = outpostType === 'moon';
  const t = translations[lang] || translations.en;
  const rawScenarios = t.scenarios[outpostType] || translations.en.scenarios[outpostType];
  const diffConfig = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS.medium;

  // Base icon and effect matrices for all 7 days
  const moonConfigs = [
    // Day 1
    {
      decisions: [
        { id: 'moon_1a', icon: 'Flame', color: 'mint', chips: [{ icon: '💨', label: t.airHeat, val: '+1', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 1, shielding: 0 } },
        { id: 'moon_1b', icon: 'Sun', color: 'yellow', chips: [{ icon: '⚡', label: t.battery, val: '+1', isPlus: true }, { icon: '💨', label: t.airHeat, val: '-1', isPlus: false }], effects: { power: 1, lifeSupport: -1, shielding: 0 } },
        { id: 'moon_1c', icon: 'Shield', color: 'blue', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 2 } }
      ]
    },
    // Day 2 (DONKI Space Weather)
    {
      decisions: [
        { id: 'moon_2a', icon: 'ShieldAlert', color: 'blue', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 2 } },
        { id: 'moon_2b', icon: 'Mountain', color: 'purple', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '💨', label: t.airHeat, val: '-1', isPlus: false }], effects: { power: 0, lifeSupport: -1, shielding: 2 } },
        { id: 'moon_2c', icon: 'Lock', color: 'yellow', chips: [{ icon: '🛡️', label: t.shield, val: '+1', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 1 } }
      ]
    },
    // Day 3
    {
      decisions: [
        { id: 'moon_3a', icon: 'Zap', color: 'yellow', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '🛡️', label: t.shield, val: '-1', isPlus: false }], effects: { power: 2, lifeSupport: 0, shielding: -1 } },
        { id: 'moon_3b', icon: 'Sparkles', color: 'mint', chips: [{ icon: '⚡', label: t.battery, val: '+1', isPlus: true }, { icon: '💨', label: t.airHeat, val: '-1', isPlus: false }], effects: { power: 1, lifeSupport: -1, shielding: 0 } },
        { id: 'moon_3c', icon: 'BatteryCharging', color: 'coral', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '🛡️', label: t.shield, val: '-1', isPlus: false }], effects: { power: 2, lifeSupport: 0, shielding: -1 } }
      ]
    },
    // Day 4
    {
      decisions: [
        { id: 'moon_4a', icon: 'Flame', color: 'coral', chips: [{ icon: '💨', label: t.airHeat, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-2', isPlus: false }], effects: { power: -2, lifeSupport: 2, shielding: 0 } },
        { id: 'moon_4b', icon: 'Bed', color: 'purple', chips: [{ icon: '🛡️', label: t.shield, val: '+1', isPlus: true }, { icon: '💨', label: t.airHeat, val: '-1', isPlus: false }], effects: { power: 0, lifeSupport: -1, shielding: 1 } },
        { id: 'moon_4c', icon: 'Radio', color: 'blue', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '🛡️', label: t.shield, val: '-1', isPlus: false }], effects: { power: 2, lifeSupport: 0, shielding: -1 } }
      ]
    },
    // Day 5
    {
      decisions: [
        { id: 'moon_5a', icon: 'Rocket', color: 'mint', chips: [{ icon: '💨', label: t.airHeat, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 2, shielding: 0 } },
        { id: 'moon_5b', icon: 'Shield', color: 'blue', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 2 } },
        { id: 'moon_5c', icon: 'BatteryCharging', color: 'yellow', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '💨', label: t.airHeat, val: '+1', isPlus: true }], effects: { power: 2, lifeSupport: 1, shielding: -1 } }
      ]
    },
    // Day 6 (Hard Mode)
    {
      decisions: [
        { id: 'moon_6a', icon: 'Shield', color: 'blue', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 2 } },
        { id: 'moon_6b', icon: 'ShieldAlert', color: 'purple', chips: [{ icon: '🛡️', label: t.shield, val: '+1', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 1 } },
        { id: 'moon_6c', icon: 'Lock', color: 'yellow', chips: [{ icon: '🛡️', label: t.shield, val: '+1', isPlus: true }, { icon: '💨', label: t.airHeat, val: '-1', isPlus: false }], effects: { power: 0, lifeSupport: -1, shielding: 1 } }
      ]
    },
    // Day 7 (Hard Mode)
    {
      decisions: [
        { id: 'moon_7a', icon: 'Rocket', color: 'mint', chips: [{ icon: '💨', label: t.airHeat, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 2, shielding: 0 } },
        { id: 'moon_7b', icon: 'Shield', color: 'blue', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 2 } },
        { id: 'moon_7c', icon: 'BatteryCharging', color: 'yellow', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '💨', label: t.airHeat, val: '+1', isPlus: true }], effects: { power: 2, lifeSupport: 1, shielding: -1 } }
      ]
    }
  ];

  const marsConfigs = [
    // Day 1
    {
      decisions: [
        { id: 'mars_1a', icon: 'Wind', color: 'mint', chips: [{ icon: '💨', label: t.airHeat, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 2, shielding: 0 } },
        { id: 'mars_1b', icon: 'Sun', color: 'yellow', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '💨', label: t.airHeat, val: '-1', isPlus: false }], effects: { power: 2, lifeSupport: -1, shielding: 0 } },
        { id: 'mars_1c', icon: 'Shield', color: 'blue', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 2 } }
      ]
    },
    // Day 2 (DONKI Space Weather)
    {
      decisions: [
        { id: 'mars_2a', icon: 'Mountain', color: 'purple', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '💨', label: t.airHeat, val: '-1', isPlus: false }], effects: { power: 0, lifeSupport: -1, shielding: 2 } },
        { id: 'mars_2b', icon: 'Droplets', color: 'blue', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 2 } },
        { id: 'mars_2c', icon: 'Compass', color: 'yellow', chips: [{ icon: '🛡️', label: t.shield, val: '+1', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 1 } }
      ]
    },
    // Day 3
    {
      decisions: [
        { id: 'mars_3a', icon: 'Wind', color: 'blue', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '🛡️', label: t.shield, val: '-1', isPlus: false }], effects: { power: 2, lifeSupport: 0, shielding: -1 } },
        { id: 'mars_3b', icon: 'Flame', color: 'coral', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '💨', label: t.airHeat, val: '-1', isPlus: false }], effects: { power: 2, lifeSupport: -1, shielding: 0 } },
        { id: 'mars_3c', icon: 'Moon', color: 'purple', chips: [{ icon: '🛡️', label: t.shield, val: '+1', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 1 } }
      ]
    },
    // Day 4 (18-Min Delay)
    {
      decisions: [
        { id: 'mars_4a', icon: 'Radio', color: 'blue', chips: [{ icon: '⚡', label: t.battery, val: '-1', isPlus: false }, { icon: '📡', label: 'Earth Telemetry', val: 'Tomorrow', isPlus: true }], effects: { power: -1, lifeSupport: 0, shielding: 0 }, isDelayChoice: true },
        { id: 'mars_4b', icon: 'Wrench', color: 'mint', chips: [{ icon: '💨', label: t.airHeat, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-2', isPlus: false }], effects: { power: -2, lifeSupport: 2, shielding: 0 } },
        { id: 'mars_4c', icon: 'Sparkles', color: 'yellow', chips: [{ icon: '💨', label: t.airHeat, val: '+1', isPlus: true }, { icon: '🛡️', label: t.shield, val: '-1', isPlus: false }], effects: { power: 0, lifeSupport: 1, shielding: -1 } }
      ]
    },
    // Day 5
    {
      decisions: [
        { id: 'mars_5a', icon: 'Rocket', color: 'mint', chips: [{ icon: '💨', label: t.airHeat, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 2, shielding: 0 } },
        { id: 'mars_5b', icon: 'Shield', color: 'blue', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 2 } },
        { id: 'mars_5c', icon: 'Sparkles', color: 'yellow', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '💨', label: t.airHeat, val: '+1', isPlus: true }], effects: { power: 2, lifeSupport: 1, shielding: -1 } }
      ]
    },
    // Day 6 (Hard Mode)
    {
      decisions: [
        { id: 'mars_6a', icon: 'Zap', color: 'yellow', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '🛡️', label: t.shield, val: '-1', isPlus: false }], effects: { power: 2, lifeSupport: 0, shielding: -1 } },
        { id: 'mars_6b', icon: 'Shield', color: 'blue', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 2 } },
        { id: 'mars_6c', icon: 'Wind', color: 'mint', chips: [{ icon: '💨', label: t.airHeat, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 2, shielding: 0 } }
      ]
    },
    // Day 7 (Hard Mode)
    {
      decisions: [
        { id: 'mars_7a', icon: 'Rocket', color: 'mint', chips: [{ icon: '💨', label: t.airHeat, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 2, shielding: 0 } },
        { id: 'mars_7b', icon: 'Shield', color: 'blue', chips: [{ icon: '🛡️', label: t.shield, val: '+2', isPlus: true }, { icon: '⚡', label: t.battery, val: '-1', isPlus: false }], effects: { power: -1, lifeSupport: 0, shielding: 2 } },
        { id: 'mars_7c', icon: 'Sparkles', color: 'yellow', chips: [{ icon: '⚡', label: t.battery, val: '+2', isPlus: true }, { icon: '💨', label: t.airHeat, val: '+1', isPlus: true }], effects: { power: 2, lifeSupport: 1, shielding: -1 } }
      ]
    }
  ];

  const configs = isMoon ? moonConfigs : marsConfigs;

  // Slice based on difficulty days (4, 5, or 7)
  const sliced = rawScenarios.slice(0, diffConfig.totalDays);

  return sliced.map((s, idx) => {
    const dayConfig = configs[idx] || configs[0];
    const speech = (s.buddySpeech || '').replace('{name}', astronautName || 'Cadet');

    return {
      day: idx + 1,
      title: s.title,
      buddySpeech: speech,
      eventAlert: s.eventAlert,
      decisions: s.decisions.map((d, dIdx) => {
        const baseD = dayConfig.decisions[dIdx] || dayConfig.decisions[0];
        return {
          ...baseD,
          title: d.title,
          actionText: d.actionText,
          comicOutcome: d.comicOutcome,
          nasaFact: d.nasaFact
        };
      })
    };
  });
}

/**
 * Evaluates game over / win debrief with stars and localized text
 */
export function evaluateDebrief(blocks, outpostType = 'moon', lang = 'en') {
  const isEmergency = blocks.power <= 0 || blocks.lifeSupport <= 0 || blocks.shielding <= 0;
  const total = blocks.power + blocks.lifeSupport + blocks.shielding;
  const t = translations[lang] || translations.en;

  let stars = 3;
  let title = t.winTitle3;
  let message = t.winDesc3;

  if (isEmergency) {
    stars = 1;
    title = t.winTitle1;
    message = t.winDesc1;
  } else if (total >= 11) {
    stars = 3;
    title = t.winTitle3;
    message = t.winDesc3;
  } else if (total >= 7) {
    stars = 2;
    title = t.winTitle2;
    message = t.winDesc2;
  }

  return {
    isEmergency,
    stars,
    title,
    message,
    finalBlocks: blocks,
    outpostType
  };
}
