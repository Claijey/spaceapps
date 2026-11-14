import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Brain, CheckCircle, XCircle } from 'lucide-react';
import { getRandomQuizQuestion } from '../data/quizQuestions';
import { translations } from '../data/translations';
import { playClick, playSuccess, playWarning } from '../utils/audio';

export default function SpaceQuizModal({
  isOpen,
  onClose,
  onRewardCoins,
  initialQuestion = null,
  lang = 'en'
}) {
  const [currentQ, setCurrentQ] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentQ(initialQuestion || getRandomQuizQuestion());
      setSelectedIdx(null);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  }, [isOpen, initialQuestion]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !currentQ) return null;

  const t = translations[lang] || translations.en;
  const questionText = currentQ.question[lang] || currentQ.question.en;
  const options = currentQ.options[lang] || currentQ.options.en;
  const explanation = currentQ.explanation[lang] || currentQ.explanation.en;

  const handleSelectOption = (idx) => {
    if (isAnswered) return;

    setSelectedIdx(idx);
    setIsAnswered(true);

    const correct = idx === currentQ.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      playSuccess();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FBBF24', '#34D399', '#38BDF8', '#FDE047']
        });
      } catch (e) {}

      if (onRewardCoins) {
        onRewardCoins(currentQ.coins);
      }
    } else {
      playWarning();
    }
  };

  const handleFinish = () => {
    playClick();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[92vh] flex flex-col bg-game-cream border-4 border-game-ink rounded-3xl shadow-pop overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400 px-5 py-3.5 border-b-4 border-game-ink flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-game-ink flex items-center justify-center text-slate-900 text-xl shadow-inner">
              <Brain className="w-5 h-5 text-indigo-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-black font-fredoka leading-tight text-white drop-shadow-sm">
                  {t.quizTitle || 'NASA Space Academy Quiz'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 border-2 border-game-ink font-heading font-black text-xs shadow-sm">
                  +{currentQ.coins} 🪙
                </span>
              </div>
              <p className="text-[11px] font-bold text-sky-100">
                {t.quizSubtitle || 'Answer correctly to earn Star Coins!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-2xl bg-white/90 hover:bg-white text-slate-800 border-2 border-game-ink flex items-center justify-center font-bold transition-transform active:scale-95 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-4 sm:p-6 flex-1 min-h-0 overflow-y-auto space-y-4">
          {/* Question Box */}
          <div className="p-4 rounded-2xl bg-amber-100/70 border-3 border-game-ink shadow-inner">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-900 mb-1">
              {currentQ.topic}
            </div>
            <div className="font-heading font-black text-base sm:text-lg text-slate-900 leading-snug">
              {questionText}
            </div>
          </div>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {options.map((option, idx) => {
              const isSelected = selectedIdx === idx;
              const isRight = idx === currentQ.correctIndex;

              let btnStyle = 'bg-white border-slate-300 hover:border-game-ink hover:bg-amber-50 text-slate-800';

              if (isAnswered) {
                if (isRight) {
                  btnStyle = 'bg-emerald-300 border-emerald-600 text-slate-950 shadow-sm ring-2 ring-emerald-400';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-300 border-rose-600 text-slate-950 shadow-sm';
                } else {
                  btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`min-h-[48px] p-3 rounded-2xl border-3 text-left font-heading font-bold text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle} ${
                    !isAnswered ? 'active:translate-y-0.5' : ''
                  }`}
                >
                  <span className="flex-1 leading-snug">{option}</span>
                  {isAnswered && isRight && (
                    <CheckCircle className="w-5 h-5 text-emerald-800 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isRight && (
                    <XCircle className="w-5 h-5 text-rose-800 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Outcome & Explanation */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl border-3 animate-fade-in ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : 'bg-amber-50 border-amber-400 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-heading font-black text-sm mb-1">
                {isCorrect ? (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>{t.correctToast?.replace('{coins}', currentQ.coins) || `Correct! +${currentQ.coins} 🪙 Earned!`}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>{t.incorrectToast || 'Good try! Here is the real NASA fact:'}</span>
                  </>
                )}
              </div>
              <p className="text-xs font-medium leading-relaxed">
                {explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {isAnswered && (
          <div className="px-5 py-3.5 bg-slate-50 border-t-3 border-game-ink flex justify-end shrink-0 animate-fade-in">
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-2xl bg-game-yellow hover:bg-amber-400 text-slate-900 font-heading font-black text-sm sm:text-base border-3 border-game-ink shadow-chunky transition-transform active:translate-y-0.5 flex items-center gap-2"
            >
              <span>{isCorrect ? `Collect +${currentQ.coins} 🪙 & Continue ➔` : (t.continueBtn || 'Continue ➔')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { SpaceQuizModal };
