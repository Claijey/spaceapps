import React, { useState } from 'react';
import { X, Search, BookOpen, Volume2, Sparkles } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function GlossaryModal({
  isOpen,
  onClose,
  initialTerm = null,
  glossaryData = {}
}) {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKey, setSelectedKey] = useState(
    initialTerm && glossaryData[initialTerm] ? initialTerm : Object.keys(glossaryData)[0] || 'sol'
  );

  const termKeys = Object.keys(glossaryData);
  const filteredKeys = termKeys.filter((k) => {
    const item = glossaryData[k];
    const q = searchQuery.toLowerCase();
    return (
      item.term.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      item.analogy.toLowerCase().includes(q)
    );
  });

  const currentItem = glossaryData[selectedKey] || glossaryData[termKeys[0]];

  return (
    <div className="fixed inset-0 z-50 bg-space-950/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="w-full max-w-3xl bg-space-900 border-2 border-nasa-gold rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-space-950 border-b border-space-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-nasa-gold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg sm:text-xl text-white">
                Junior Space Glossary
              </h2>
              <p className="text-xs text-space-200">
                Official NASA Terminology & Fun Analogies
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              spaceAudio.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-space-800 hover:bg-space-700 border border-space-600 flex items-center justify-center text-space-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Sidebar + Detail view */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Term List Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-space-800 flex flex-col bg-space-950/40 shrink-0">
            {/* Search Input */}
            <div className="p-3 border-b border-space-800">
              <div className="relative">
                <Search className="w-4 h-4 text-space-200 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search space terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-space-900 border border-space-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-space-200 focus:outline-none focus:border-nasa-gold"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 max-h-48 md:max-h-none">
              {filteredKeys.length === 0 ? (
                <div className="p-3 text-xs text-space-200 text-center">
                  No matching terms found.
                </div>
              ) : (
                filteredKeys.map((k) => {
                  const item = glossaryData[k];
                  const isSelected = selectedKey === k;
                  return (
                    <button
                      key={k}
                      onClick={() => {
                        spaceAudio.playClick();
                        setSelectedKey(k);
                      }}
                      className={`w-full min-h-[44px] text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-nasa-gold/20 text-nasa-gold border border-nasa-gold/40 shadow-sm'
                          : 'text-space-200 hover:bg-space-800/80 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{item.term}</span>
                      {isSelected && <Sparkles className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Term Detail View */}
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto bg-space-900 flex flex-col justify-between">
            {currentItem ? (
              <div className="space-y-4">
                {/* Term title and pronunciation */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-space-800 text-nasa-cyan border border-space-700">
                      NASA Concept
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    {currentItem.term}
                  </h3>
                  <div className="text-xs text-space-200 italic mt-0.5">
                    Pronounced: <span className="text-nasa-gold font-medium">{currentItem.pronunciation}</span>
                  </div>
                </div>

                {/* Definition */}
                <div className="p-4 rounded-2xl bg-space-800/90 border border-space-700/80">
                  <div className="text-xs font-bold uppercase tracking-wider text-nasa-cyan mb-1.5">
                    Official Scientific Meaning
                  </div>
                  <p className="text-sm sm:text-base text-space-100 leading-relaxed">
                    {currentItem.definition}
                  </p>
                </div>

                {/* Kid-Friendly Analogy */}
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-nasa-gold mb-1.5">
                    <Sparkles className="w-4 h-4 text-nasa-gold" />
                    <span>How to Picture It (Fun Analogy)</span>
                  </div>
                  <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed">
                    {currentItem.analogy}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-space-200 text-sm text-center py-10">
                Select a term to see its definition.
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-space-800 flex justify-end">
              <button
                onClick={() => {
                  spaceAudio.playClick();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl font-heading font-semibold text-xs bg-space-800 hover:bg-space-700 text-white border border-space-600 transition-colors"
              >
                Close Glossary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
