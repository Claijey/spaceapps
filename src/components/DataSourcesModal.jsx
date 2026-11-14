import React from 'react';
import { X, Database, ExternalLink, Sparkles } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function DataSourcesModal({
  isOpen,
  onClose,
  weatherData,
  t
}) {
  if (!isOpen) return null;

  const isLive = weatherData?.isLive;
  const statusBadge = isLive ? (t?.liveBadge || 'Data: Live NASA DONKI API') : (t?.fallbackBadge || 'Data: Archived NASA Dataset (Offline Fallback)');
  const lastUpdated = weatherData?.timestamp ? new Date(weatherData.timestamp).toLocaleTimeString() : 'Recent';

  const sources = [
    {
      name: 'NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information)',
      role: 'Live & Archived Solar Storm Telemetry',
      facility: 'NASA Goddard Space Flight Center / CCMC',
      url: 'https://api.nasa.gov/DONKI/',
      details: 'Pulls live Solar Flares (FLR), Coronal Mass Ejections (CME), and Solar Energetic Particles (SEP) via VITE_NASA_API_KEY with a 5s timeout.'
    },
    {
      name: 'NASA OSDR (Open Science Data Repository)',
      role: 'Deep Space Radiation & Biology',
      facility: 'NASA Ames Research Center',
      url: 'https://osdr.nasa.gov/',
      details: 'Authentic ionizing radiation comparisons between ISS orbit (~150 mSv/yr), Lunar surface (~380 mSv/yr), and Mars surface (~250 mSv/yr).'
    },
    {
      name: 'NASA Artemis Lunar South Pole Architecture',
      role: 'Crater Extreme Cold (-203°C) & Sharp Regolith Dust',
      facility: 'NASA Johnson Space Center & NASA Marshall',
      url: 'https://www.nasa.gov/artemis',
      details: 'Verified thermal data for Shackleton Crater permanently shadowed regions (-203°C) and jagged electrostatic regolith dust dynamics.'
    },
    {
      name: 'NASA NTRS (NASA Technical Reports Server)',
      role: 'Deep Space Network (DSN) Mars Radio Latency',
      facility: 'NASA Jet Propulsion Laboratory (JPL)',
      url: 'https://ntrs.nasa.gov/',
      details: 'Real communication models showing 15 to 22 minute one-way (up to 44 minute round-trip) light-speed signal delay between Mars and Earth.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-game-sky/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-2xl bg-game-cream border-4 border-game-ink rounded-3xl shadow-pop overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-amber-100 border-b-3 border-game-ink flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-game-yellow border-2 border-game-ink flex items-center justify-center text-game-ink shadow-sm">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-game-ink leading-tight">
                {t?.sourcesTitle || 'NASA Data & Science Attribution'}
              </h2>
              <p className="text-[11px] font-bold text-amber-900">
                {t?.sourcesSubtitle || 'Verified Information for Space Apps Judges & Parents'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-2xl bg-game-cream hover:bg-slate-100 border-2 border-game-ink flex items-center justify-center text-game-ink shadow-sm transition-transform active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5">
          {/* Strict Honesty Status Pill */}
          <div className={`p-3.5 rounded-2xl border-2 border-game-ink ${
            isLive ? 'bg-emerald-100 text-emerald-950' : 'bg-amber-100 text-amber-950'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                <span className="font-heading font-extrabold text-xs sm:text-sm">
                  {statusBadge}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-slate-300">
                {t?.checkedTime || 'Checked:'} {lastUpdated}
              </span>
            </div>
            <p className="text-xs font-medium leading-relaxed opacity-90">
              {isLive
                ? (t?.liveDesc || 'Connected directly to NASA DONKI API endpoints.')
                : (t?.fallbackDesc || 'Utilizing our verified offline historical NASA archive.')}
            </p>
          </div>

          {/* Sources List */}
          <div className="space-y-2.5">
            <h3 className="font-heading font-extrabold text-[11px] uppercase tracking-wider text-slate-500">
              {t?.verifiedPrograms || 'Verified NASA Scientific Programs Used'}
            </h3>

            {sources.map((src, i) => (
              <div key={i} className="p-3 rounded-xl bg-white border-2 border-slate-300 hover:border-game-ink transition-all">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <div>
                    <h4 className="font-heading font-extrabold text-xs sm:text-sm text-game-ink">
                      {src.name}
                    </h4>
                    <span className="text-[11px] text-game-blueDark font-bold">
                      {src.role} • {src.facility}
                    </span>
                  </div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-lg text-slate-400 hover:text-game-ink transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                  {src.details}
                </p>
              </div>
            ))}
          </div>

          {/* Note for Judges */}
          <div className="p-3 rounded-xl bg-sky-50 border-2 border-sky-300 text-xs text-sky-950 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              {t?.judgesNote || '2026 NASA Space Apps Challenge.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t-2 border-slate-300 flex justify-end">
          <button
            type="button"
            onClick={() => {
              spaceAudio.playClick();
              onClose();
            }}
            className="px-5 py-1.5 rounded-xl font-heading font-extrabold text-xs bg-game-cream hover:bg-white text-game-ink border-2 border-game-ink shadow-sm"
          >
            {t?.closeBtn || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
