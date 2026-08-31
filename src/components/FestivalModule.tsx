import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Flame,
  Moon,
  Sun,
  Star,
  Clock,
  Heart
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const FestivalModule: React.FC = () => {
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const festivals = [
    {
      name: 'Maha Shivratri',
      date: '16 February 2026',
      month: 1,
      tithi: 'Magha Krishna Chaturdashi',
      pujaMuhurat: 'Nishita Kaal: 12:09 AM to 01:00 AM',
      significance: 'Night of cosmic convergence of Shiva and Shakti. Fasting and Rudrabhishek wash away generational negative karma.',
      icon: '🕉️'
    },
    {
      name: 'Holi & Holika Dahan',
      date: '03 March 2026',
      month: 2,
      tithi: 'Phalguna Purnima',
      pujaMuhurat: '06:24 PM to 08:52 PM',
      significance: 'Celebration of truth victory (Bhakt Prahlad) over demoniac forces and arrival of the vibrant spring equinox.',
      icon: '🎨'
    },
    {
      name: 'Chaitra Navratri & Rama Navami',
      date: '19 March - 27 March 2026',
      month: 2,
      tithi: 'Chaitra Shukla Pratipada to Navami',
      pujaMuhurat: 'Ghatasthapana: 06:18 AM to 10:14 AM',
      significance: '9 Sacred nights worshipping Navadurga, culminating in the incarnation of Lord Rama.',
      icon: '🔱'
    },
    {
      name: 'Raksha Bandhan & Shravan Purnima',
      date: '28 August 2026',
      month: 7,
      tithi: 'Shravana Shukla Purnima',
      pujaMuhurat: '01:30 PM to 08:45 PM (Post Bhadra)',
      significance: 'Sacred protective thread ceremony reinforcing unconditional familial bond and spiritual guardianship.',
      icon: '🪢'
    },
    {
      name: 'Krishna Janmashtami',
      date: '04 September 2026',
      month: 8,
      tithi: 'Bhadrapada Krishna Ashtami',
      pujaMuhurat: 'Nishita Puja: 11:58 PM to 12:44 AM',
      significance: 'Divine descent of Lord Sri Krishna (Rohini Nakshatra). Midnight fasting and Bhagavad Gita recitation.',
      icon: '🦚'
    },
    {
      name: 'Ganesh Chaturthi',
      date: '15 September 2026',
      month: 8,
      tithi: 'Bhadrapada Shukla Chaturthi',
      pujaMuhurat: 'Madhyahna Muhurat: 11:02 AM to 01:30 PM',
      significance: 'Arrival of Lord Ganesha, the remover of all obstacles and giver of intellect (Buddhi) and siddhi.',
      icon: '🐘'
    },
    {
      name: 'Sharad Navratri & Dussehra (Vijayadashami)',
      date: '11 October - 20 October 2026',
      month: 9,
      tithi: 'Ashwin Shukla Pratipada to Dashami',
      pujaMuhurat: 'Vijay Muhurat: 02:05 PM to 02:52 PM',
      significance: 'Triumph of Goddess Durga over Mahishasura and Lord Rama over Ravana.',
      icon: '🏹'
    },
    {
      name: 'Diwali (Deepavali & Lakshmi Puja)',
      date: '08 November 2026',
      month: 10,
      tithi: 'Kartika Amavasya',
      pujaMuhurat: 'Pradosh Kaal: 05:40 PM to 07:35 PM',
      significance: 'Festival of lights, welcoming Goddess Mahalakshmi and Lord Kuber for yearly abundance and spiritual light.',
      icon: '🪔'
    }
  ];

  const filtered = festivals.filter(f => f.month === selectedMonth || selectedMonth === -1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Calendar className="w-3.5 h-3.5 text-rose-400" />
          Vedic & Hindu Festivals Calendar 2026
        </div>
        <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
          {t('festivals')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2">
          Dates, auspicious Tithis, fast rules, and exact Puja Muhurats for major festivals.
        </p>
      </div>

      {/* Month Filter Bar */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        <button
          onClick={() => setSelectedMonth(-1)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedMonth === -1
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
              : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
          }`}
        >
          All Months
        </button>
        {months.map((m, idx) => (
          <button
            key={m}
            onClick={() => setSelectedMonth(idx)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedMonth === idx
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Festivals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(fest => (
          <div
            key={fest.name}
            className="bg-stone-900/90 border border-amber-500/20 hover:border-amber-400/60 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between transition-all"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                    {fest.icon}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg font-cinzel text-amber-200">
                      {fest.name}
                    </h3>
                    <span className="text-xs text-amber-300 font-semibold">{fest.date}</span>
                  </div>
                </div>
              </div>

              <div className="bg-stone-800/50 p-3 rounded-2xl border border-stone-800 space-y-1 text-xs">
                <div className="text-stone-400">
                  <span className="font-semibold text-stone-300">Tithi:</span> {fest.tithi}
                </div>
                <div className="text-stone-400">
                  <span className="font-semibold text-emerald-400">Puja Muhurat:</span> {fest.pujaMuhurat}
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                {fest.significance}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
