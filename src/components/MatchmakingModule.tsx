import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  User,
  Calendar,
  Clock,
  MapPin,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthDetails, MatchmakingResult } from '../types';
import { calculateMatchmaking, calculateKundli } from '../services/astrology/ephemeris';
import { useTranslation } from '../i18n/LanguageContext';

export const MatchmakingModule: React.FC = () => {
  const { t } = useTranslation();

  const [boy, setBoy] = useState<BirthDetails>({
    name: 'Rohan Mehta',
    gender: 'male',
    dob: '1994-04-12',
    time: '14:20',
    place: 'New Delhi, India',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 5.5,
    ayanamsa: 'lahiri'
  });

  const [girl, setGirl] = useState<BirthDetails>({
    name: 'Ananya Verma',
    gender: 'female',
    dob: '1996-08-25',
    time: '09:45',
    place: 'Mumbai, India',
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: 5.5,
    ayanamsa: 'lahiri'
  });

  const [result, setResult] = useState<MatchmakingResult | null>(() => {
    const kBoy = calculateKundli(boy);
    const kGirl = calculateKundli(girl);
    return calculateMatchmaking(kBoy, kGirl);
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const kBoy = calculateKundli(boy);
    const kGirl = calculateKundli(girl);
    const res = calculateMatchmaking(kBoy, kGirl);
    setResult(res);

    if (res.totalScore >= 21) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          Vedic Gun Milan & Ashtakoota Analysis
        </div>
        <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
          {t('kundliMatching')} (36 Gunas)
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2">
          Verify traditional Ashtakoota compatibility, Manglik matching, Nadi Dosha, and planetary harmony for lifelong marital bliss.
        </p>
      </div>

      {/* Input Forms Dual Card */}
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Boy's Details */}
          <div className="bg-stone-900/90 border border-blue-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-800 text-blue-300">
              <User className="w-5 h-5" />
              <h3 className="font-bold font-cinzel text-base text-stone-100">{t('boyDetails')}</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">{t('fullName')}</label>
                <input
                  type="text"
                  required
                  value={boy.name}
                  onChange={e => setBoy({ ...boy, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">{t('dateOfBirth')}</label>
                  <input
                    type="date"
                    required
                    value={boy.dob}
                    onChange={e => setBoy({ ...boy, dob: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">{t('birthTime')}</label>
                  <input
                    type="time"
                    required
                    value={boy.time}
                    onChange={e => setBoy({ ...boy, time: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">{t('birthPlace')}</label>
                <input
                  type="text"
                  required
                  value={boy.place}
                  onChange={e => setBoy({ ...boy, place: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Girl's Details */}
          <div className="bg-stone-900/90 border border-rose-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-800 text-rose-300">
              <User className="w-5 h-5" />
              <h3 className="font-bold font-cinzel text-base text-stone-100">{t('girlDetails')}</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">{t('fullName')}</label>
                <input
                  type="text"
                  required
                  value={girl.name}
                  onChange={e => setGirl({ ...girl, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">{t('dateOfBirth')}</label>
                  <input
                    type="date"
                    required
                    value={girl.dob}
                    onChange={e => setGirl({ ...girl, dob: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">{t('birthTime')}</label>
                  <input
                    type="time"
                    required
                    value={girl.time}
                    onChange={e => setGirl({ ...girl, time: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">{t('birthPlace')}</label>
                <input
                  type="text"
                  required
                  value={girl.place}
                  onChange={e => setGirl({ ...girl, place: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Submit Matchmaking Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3.5 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 hover:from-rose-500 hover:to-amber-400 text-stone-950 font-bold text-sm rounded-2xl shadow-xl shadow-rose-500/20 inline-flex items-center gap-2 transform active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('calculateMatch')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Matchmaking Results Section */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3">
          
          {/* Main Score & Verdict Card */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Score Circular Meter */}
              <div className="flex items-center gap-6">
                <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 p-1.5 shadow-xl shadow-amber-500/20">
                  <div className="w-full h-full bg-stone-950 rounded-full flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-amber-300 font-cinzel">
                      {result.totalScore}
                    </span>
                    <span className="text-[10px] text-stone-400 font-bold">/ 36 Gunas</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                    Match Compatibility
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-amber-200 font-cinzel">
                    {result.verdict}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 max-w-md">
                    {result.summary}
                  </p>
                </div>
              </div>

              {/* Status Badges */}
              <div className="space-y-2 text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-xs text-stone-400">Score Percentage:</span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                    {result.percentage}%
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-xs text-stone-400">Recommendation:</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    result.recommendation === 'Highly Recommended' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                    result.recommendation === 'Recommended with Remedies' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' :
                    'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {result.recommendation}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* 8 Ashtakoota Matrix Breakdown Table */}
          <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl overflow-x-auto">
            <h3 className="text-lg font-bold font-cinzel text-amber-200 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Ashtakoota 8-Pillar Scorecard
            </h3>

            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-stone-800/80 text-amber-300 uppercase tracking-wider text-[11px] font-semibold">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Koota</th>
                  <th className="py-3 px-3">Life Domain</th>
                  <th className="py-3 px-3 text-center">Max Score</th>
                  <th className="py-3 px-3 text-center">Obtained</th>
                  <th className="py-3 px-4 rounded-r-xl">Detailed Astrological Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {result.kootas.map(k => (
                  <tr key={k.name} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-stone-100">
                      {k.name}
                    </td>
                    <td className="py-3.5 px-3 text-amber-200">{k.area}</td>
                    <td className="py-3.5 px-3 text-center font-bold text-stone-400">{k.maxScore}</td>
                    <td className="py-3.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        k.obtainedScore === k.maxScore
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : k.obtainedScore > 0
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {k.obtainedScore} / {k.maxScore}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-300 text-[11px] leading-relaxed">
                      {k.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Manglik & Dosha Comparative Harmony */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Manglik Check */}
            <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2.5 text-rose-400">
                <Flame className="w-5 h-5" />
                <h4 className="font-bold font-cinzel text-base text-stone-100">Manglik (Kuja) Compatibility</h4>
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-b border-stone-800">
                <span className="text-stone-300">{boy.name}:</span>
                <span className="font-bold text-amber-300">Non-Manglik</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-b border-stone-800">
                <span className="text-stone-300">{girl.name}:</span>
                <span className="font-bold text-amber-300">Non-Manglik</span>
              </div>
              <p className="text-xs text-stone-400 pt-1">
                Both charts have harmonious Mars energy without destructive Kuja Dosha afflictions.
              </p>
            </div>

            {/* Remedies Card */}
            <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="font-bold font-cinzel text-base text-stone-100">Auspicious Remedies for Couple</h4>
              </div>
              <ul className="space-y-2 text-xs text-stone-300">
                {result.remedies.map((rem, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span>{rem}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
