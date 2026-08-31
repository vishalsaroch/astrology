import React, { useState } from 'react';
import {
  Coins,
  Sparkles,
  User,
  Calendar,
  Heart,
  Briefcase,
  Gem,
  CheckCircle2
} from 'lucide-react';
import { calculateNumerology } from '../services/astrology/ephemeris';
import { useTranslation } from '../i18n/LanguageContext';

export const NumerologyModule: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('Aarav Sharma');
  const [dob, setDob] = useState('1995-10-15');

  const report = calculateNumerology(name, dob);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Coins className="w-3.5 h-3.5 text-yellow-400" />
          Vedic & Pythagorean Numerology Analysis
        </div>
        <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
          {t('numerology')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2">
          Discover your core vibrational numbers: Life Path, Destiny (Expression), and Soul Urge.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-2xl mx-auto space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">Full Name (at Birth)</label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 font-semibold"
                placeholder="e.g. Aarav Sharma"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">Date of Birth</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6 Core Vibrational Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Life Path Number',
            num: report.lifePathNumber,
            desc: 'Your central soul purpose, life lessons, and supreme destiny on Earth.',
            ruler: 'Sun / Jupiter',
            color: 'from-amber-600 to-yellow-500'
          },
          {
            title: 'Destiny (Expression) Number',
            num: report.destinyNumber,
            desc: 'Natural talents, personal abilities, and physical potential coded in your name.',
            ruler: 'Mercury / Venus',
            color: 'from-blue-600 to-indigo-500'
          },
          {
            title: 'Soul Urge (Heart Desire)',
            num: report.soulUrgeNumber,
            desc: 'Inner spiritual craving, true passions, and subconscious emotional desires.',
            ruler: 'Moon / Venus',
            color: 'from-rose-600 to-pink-500'
          },
          {
            title: 'Personality Number',
            num: report.personalityNumber,
            desc: 'How the outer world perceives you, your aura, charisma, and first impression.',
            ruler: 'Mars / Saturn',
            color: 'from-purple-600 to-amber-500'
          },
          {
            title: 'Birth Day Number',
            num: report.birthDayNumber,
            desc: 'Specific innate skills and unique mindset gifted on the exact calendar day of birth.',
            ruler: 'Planetary Lord',
            color: 'from-emerald-600 to-teal-500'
          },
          {
            title: 'Attitude Number',
            num: report.attitudeNumber,
            desc: 'Your immediate reaction style to unexpected challenges and daily events.',
            ruler: 'Solar Energy',
            color: 'from-orange-600 to-amber-500'
          }
        ].map(item => (
          <div key={item.title} className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  {item.title}
                </span>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-stone-950 font-black text-xl font-cinzel shadow-md`}>
                  {item.num}
                </div>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-between items-center text-xs text-stone-400">
              <span>Vibrational Ruler:</span>
              <span className="font-semibold text-amber-300">{item.ruler}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lucky Harmonies & Recommendations */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <h3 className="text-lg font-bold font-cinzel text-amber-200 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Numerological Harmonies for {name}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60 text-center">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Compatible Numbers</span>
            <span className="text-lg font-bold text-amber-400 font-cinzel mt-1 block">
              {report.luckyNumbers.join(', ')}
            </span>
          </div>

          <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60 text-center">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Lucky Days</span>
            <span className="text-sm font-bold text-emerald-300 mt-1 block">
              {report.luckyDays.join(', ')}
            </span>
          </div>

          <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60 text-center">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Lucky Colors</span>
            <span className="text-sm font-bold text-rose-300 mt-1 block">
              {report.luckyColors.join(', ')}
            </span>
          </div>

          <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60 text-center">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Auspicious Gem</span>
            <span className="text-sm font-bold text-yellow-300 mt-1 block">
              {report.luckyGems.join(', ')}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
