import fallbackData from '../data/nasa_fallback_data.json';

const NASA_API_BASE = 'https://api.nasa.gov/DONKI';
const TIMEOUT_MS = 5000;

/**
 * Format a Date object to YYYY-MM-DD
 */
function formatDate(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Fetch with timeout helper
 */
async function fetchWithTimeout(url, timeoutMs = TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/**
 * Normalizes live DONKI events into kid-friendly mission event objects
 */
function normalizeLiveEvents(cmeList = [], sepList = [], flrList = []) {
  const events = [];

  // Parse CME events
  if (Array.isArray(cmeList)) {
    cmeList.slice(0, 3).forEach((item) => {
      const speed = item.cmeAnalyses?.[0]?.speed || 750;
      const isFast = speed > 1000;
      events.push({
        id: item.activityID || `CME-${Math.random().toString(36).substring(7)}`,
        type: 'Coronal Mass Ejection',
        classType: isFast ? 'Fast Halo CME' : 'Solar Plasma Wave',
        speedKmS: Math.round(speed),
        severity: isFast ? 'HIGH' : 'MODERATE',
        instruments: item.instruments?.[0]?.displayName || 'SOHO / STEREO',
        impact: `Fast plasma cloud moving at ${Math.round(speed)} km/s pushing charged particles into habitat sensors.`,
        juniorExplanation: 'The Sun burped a massive bubble of super-hot magnetized plasma! It is heading outward through space.',
        source: 'Live NASA DONKI'
      });
    });
  }

  // Parse SEP events
  if (Array.isArray(sepList)) {
    sepList.slice(0, 2).forEach((item) => {
      events.push({
        id: item.sepID || `SEP-${Math.random().toString(36).substring(7)}`,
        type: 'Solar Energetic Particles',
        classType: 'Proton Storm Event',
        severity: 'CRITICAL',
        instruments: item.instruments?.[0]?.displayName || 'GOES Space Weather Sensors',
        impact: 'High-speed subatomic protons streaming outward, posing radiation risk to exposed crew and electronics.',
        juniorExplanation: 'Tiny proton particles accelerated to near-light speed are whizzing past! We need our radiation shields raised.',
        source: 'Live NASA DONKI'
      });
    });
  }

  // Parse FLR events
  if (Array.isArray(flrList)) {
    flrList.slice(0, 3).forEach((item) => {
      const classType = item.classType || 'M-Class Flare';
      const isX = classType.startsWith('X');
      events.push({
        id: item.flrID || `FLR-${Math.random().toString(36).substring(7)}`,
        type: 'Solar Flare',
        classType: classType,
        severity: isX ? 'CRITICAL' : 'CAUTION',
        activeRegion: item.activeRegionNum || 'Active Sunspot',
        instruments: item.instruments?.[0]?.displayName || 'GOES Solar Sensor',
        impact: `Intense ${classType} radiation flash causing atmospheric ionization and communication static.`,
        juniorExplanation: `The Sun unleashed an ${classType} flare! Invisible radiation rays are blasting across the solar system right now.`,
        source: 'Live NASA DONKI'
      });
    });
  }

  return events;
}

/**
 * Main service to fetch NASA Space Weather with strict honesty reporting
 */
export async function getSpaceWeatherData() {
  const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
  
  // Create a 25-day recent date window
  const now = new Date();
  const past = new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000);
  const startDate = formatDate(past);
  const endDate = formatDate(now);

  try {
    // Attempt concurrent fetch of CME, SEP, and FLR with 5s timeout
    const [cmeRes, sepRes, flrRes] = await Promise.allSettled([
      fetchWithTimeout(`${NASA_API_BASE}/CME?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`),
      fetchWithTimeout(`${NASA_API_BASE}/SEP?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`),
      fetchWithTimeout(`${NASA_API_BASE}/notifications?startDate=${startDate}&endDate=${endDate}&type=FLR&api_key=${apiKey}`)
    ]);

    let cmeData = [];
    let sepData = [];
    let flrData = [];

    if (cmeRes.status === 'fulfilled' && cmeRes.value.ok) {
      cmeData = await cmeRes.value.json();
    }
    if (sepRes.status === 'fulfilled' && sepRes.value.ok) {
      sepData = await sepRes.value.json();
    }
    if (flrRes.status === 'fulfilled' && flrRes.value.ok) {
      flrData = await flrRes.value.json();
    }

    const liveEvents = normalizeLiveEvents(cmeData, sepData, flrData);

    // If at least one live event was retrieved from NASA DONKI, report LIVE status
    if (liveEvents.length > 0) {
      return {
        isLive: true,
        statusBadge: 'Data: Live NASA DONKI API',
        events: liveEvents,
        environmentalConstants: fallbackData.environmental_constants,
        osdrContext: fallbackData.osdr_science_context,
        glossary: fallbackData.glossary,
        attribution: fallbackData.metadata.attribution,
        timestamp: new Date().toISOString()
      };
    }

    // If no live events returned in window (solar quiet period or endpoint empty), use curated fallback
    console.info('[NASA DONKI] Quiet solar period or empty response. Using verified NASA archive.');
    return getArchivedFallbackData('Quiet solar period on live DONKI stream; loaded verified historical NASA events.');
  } catch (error) {
    console.warn('[NASA DONKI API] Live connection failed/timed out. Switching to verified archive:', error.message);
    return getArchivedFallbackData(error.message);
  }
}

/**
 * Returns curated fallback data with explicit offline/archived honesty badge
 */
export function getArchivedFallbackData(reason = '') {
  return {
    isLive: false,
    statusBadge: 'Data: Archived NASA Dataset (Offline Fallback)',
    reason: reason,
    events: fallbackData.archived_space_weather_events,
    environmentalConstants: fallbackData.environmental_constants,
    osdrContext: fallbackData.osdr_science_context,
    glossary: fallbackData.glossary,
    attribution: fallbackData.metadata.attribution,
    timestamp: new Date().toISOString()
  };
}
