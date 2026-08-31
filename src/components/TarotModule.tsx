import React, { useState } from 'react';
import {
  Sparkle,
  Sparkles,
  RotateCcw,
  Eye,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { generateTarotReading } from '../services/astrology/ephemeris';
import { TarotSpread } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

export const TarotModule: React.FC = () => {
  const { t } = useTranslation();
  const [spreadType, setSpreadType] = useState<'1-card' | '3-card' | 'love' | 'career' | 'celtic-cross' | 'yes-no'>('3-card');
  const [question, setQuestion] = useState('What energy should I focus on for my spiritual growth and career?');
  const [spread, setSpread] = useState<TarotSpread | null>(() => generateTarotReading('Current spiritual and life energy', '3-card'));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([0, 1, 2]);

  const handleDraw = (e: React.FormEvent) => {
    e.preventDefault();
    const newSpread = generateTarotReading(question, spreadType);
    setSpread(newSpread);
    setFlippedIndices(newSpread.cards.map((_, idx) => idx));
  };

  const toggleFlip = (index: number) => {
    if (flippedIndices.includes(index)) {
      setFlippedIndices(flippedIndices.filter(i => i !== index));
    } else {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Sparkle className="w-3.5 h-3.5 text-purple-400" />
          Mystic 78-Card Tarot Deck & Oracle
        </div>
        <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
          {t('tarotReading')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2">
          Tap into intuitive archetypes for relationship clarity, career guidance, and deep subconscious insights.
        </p>
      </div>

      {/* Spread Selector & Question Input */}
      <div className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Spread Selector Tabs */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-2">Select Sacred Spread Layout:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { id: '1-card', label: '1-Card Daily Oracle', desc: 'Instant clarity & message' },
              { id: '3-card', label: '3-Card Spread', desc: 'Past • Present • Future' },
              { id: 'love', label: 'Love & Union', desc: 'You • Partner • Outcome' },
              { id: 'career', label: 'Career Path', desc: 'Current • Challenge • Peak' },
              { id: 'celtic-cross', label: 'Celtic Cross', desc: 'Comprehensive Life Reading' },
              { id: 'yes-no', label: 'Yes / No Oracle', desc: 'Direct binary answer' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSpreadType(item.id as any)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  spreadType === item.id
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:border-amber-500/40'
                }`}
              >
                <span className="font-bold text-xs block truncate">{item.label}</span>
                <span className={`text-[10px] block mt-0.5 truncate ${spreadType === item.id ? 'text-stone-900 font-medium' : 'text-stone-400'}`}>
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Question Form */}
        <form onSubmit={handleDraw} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Focus your intention and type your question..."
            className="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 rounded-2xl text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-bold text-xs sm:text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Shuffle & Draw Cards</span>
          </button>
        </form>

      </div>

      {/* Render Drawn Cards */}
      {spread && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          
          {/* Card Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {spread.cards.map((c, idx) => {
              const isFlipped = flippedIndices.includes(idx);
              const keywords = c.isReversed ? (c.card.reversedKeywords || []) : (c.card.uprightKeywords || []);
              const meaning = c.isReversed ? c.card.reversedMeaning : c.card.uprightMeaning;

              return (
                <div
                  key={idx}
                  onClick={() => toggleFlip(idx)}
                  className="cursor-pointer group perspective-1000"
                >
                  <div className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-5 shadow-xl hover:border-amber-400/80 transition-all hover:scale-[1.02] flex flex-col h-full">
                    
                    {/* Position Name Tag */}
                    <div className="flex justify-between items-center pb-3 mb-3 border-b border-stone-800 text-xs">
                      <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                        Position {idx + 1}: {c.position}
                      </span>
                      <span className="text-[10px] text-stone-400 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Click to Flip
                      </span>
                    </div>

                    {/* Card Visual Graphic */}
                    <div className="relative aspect-[2/3] w-full max-w-[200px] mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-stone-800 to-stone-950 border-2 border-amber-500/40 flex flex-col items-center justify-between p-4 shadow-lg mb-4">
                      <div className="w-full flex justify-between text-[10px] font-bold text-amber-400 font-cinzel">
                        <span>{c.card.number}</span>
                        <span>{c.card.suit || c.card.arcana}</span>
                      </div>

                      <div className="text-center my-auto">
                        <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl mx-auto mb-2 shadow-inner">
                          {c.card.arcana === 'Major' ? '🔮' : (c.card.suit === 'Wands' ? '🪄' : (c.card.suit === 'Cups' ? '🏆' : (c.card.suit === 'Swords' ? '⚔️' : '🪙')))}
                        </div>
                        <h4 className="font-bold font-cinzel text-xs text-amber-200 uppercase tracking-wide">
                          {c.card.name}
                        </h4>
                        {c.isReversed && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-bold uppercase mt-1 inline-block">
                            Reversed
                          </span>
                        )}
                      </div>

                      <div className="text-[9px] text-stone-400 italic">
                        {c.card.element} Element
                      </div>
                    </div>

                    {/* Interpretation Text */}
                    <div className="space-y-2 text-xs text-stone-300 mt-auto">
                      <div className="flex flex-wrap gap-1">
                        {keywords.map(kw => (
                          <span key={kw} className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] text-amber-300 font-medium">
                            {kw}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-stone-300 leading-relaxed bg-stone-800/40 p-2.5 rounded-xl border border-stone-800">
                        {meaning}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Yes/No Answer Banner if present */}
          {spread.yesNoAnswer && (
            <div className="bg-amber-500/10 border border-amber-500/40 rounded-3xl p-6 text-center space-y-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Oracle Verdict</span>
              <h3 className="text-2xl font-black font-cinzel text-amber-200">
                {spread.yesNoAnswer.answer} ({spread.yesNoAnswer.confidence}% Alignment)
              </h3>
            </div>
          )}

          {/* Reading Summary Card */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3">
            <h3 className="text-lg font-bold font-cinzel text-amber-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Oracle Synthesis & Advice
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {spread.overallInterpretation}
            </p>
          </div>

        </div>
      )}

    </div>
  );
};

