import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Heart,
  Home,
  Car,
  Building,
  Briefcase,
  Baby,
  Plane,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const MuhuratModule: React.FC = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<'vivah' | 'griha' | 'vehicle' | 'property' | 'business' | 'naamkaran'>('vivah');

  const muhuratCategories = [
    { id: 'vivah', label: 'Vivah (Marriage)', icon: Heart, desc: 'Auspicious wedding dates with Jupiter and Venus alignment.' },
    { id: 'griha', label: 'Griha Pravesh', icon: Home, desc: 'Housewarming ceremony to bring peace, prosperity, and Vastu harmony.' },
    { id: 'vehicle', label: 'Vehicle Purchase', icon: Car, desc: 'Auspicious nakshatras for purchasing and driving new vehicles.' },
    { id: 'property', label: 'Property & Land Registry', icon: Building, desc: 'Registry and Bhoomi Pujan timings for long-term real estate stability.' },
    { id: 'business', label: 'Business Opening / Shop', icon: Briefcase, desc: 'Inauguration and commercial contract signing windows.' },
    { id: 'naamkaran', label: 'Naamkaran (Naming)', icon: Baby, desc: 'Baby naming ceremony aligned with Moon Nakshatra sounds.' }
  ];

  const sampleDates = [
    { date: '14 November 2026', tithi: 'Shukla Ekadashi (Dev Uthani)', nakshatra: 'Uttara Ashadha', timing: '06:45 AM to 01:20 PM', auspiciousness: 'Highly Auspicious' },
    { date: '21 November 2026', tithi: 'Shukla Trayodashi', nakshatra: 'Rohini', timing: '08:15 AM to 11:40 AM', auspiciousness: 'Excellent' },
    { date: '28 November 2026', tithi: 'Krishna Dwitiya', nakshatra: 'Mrigashira', timing: '07:30 AM to 12:10 PM', auspiciousness: 'Highly Auspicious' },
    { date: '04 December 2026', tithi: 'Krishna Saptami', nakshatra: 'Hasta', timing: '09:00 AM to 02:30 PM', auspiciousness: 'Favorable' },
    { date: '11 December 2026', tithi: 'Shukla Chaturthi', nakshatra: 'Pushya', timing: '06:30 AM to 10:45 AM', auspiciousness: 'Supreme (Pushya Nakshatra)' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          Vedic Shubh Muhurat Calendar 2026-2027
        </div>
        <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
          {t('muhurat')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2">
          Calculate the most auspicious planetary windows for marriages, housewarming, investments, and business inaugurations.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {muhuratCategories.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedType === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedType(cat.id as any)}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-amber-500/40'
              }`}
            >
              <div className={`p-2.5 rounded-xl mb-2 ${isSelected ? 'bg-stone-950 text-amber-300' : 'bg-stone-800 text-amber-400'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs font-cinzel block truncate w-full">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dates Table Card */}
      <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold font-cinzel text-amber-200">
            Upcoming Auspicious Dates for {muhuratCategories.find(c => c.id === selectedType)?.label}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            {muhuratCategories.find(c => c.id === selectedType)?.desc}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-800/80 text-amber-300 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="py-3.5 px-4 rounded-l-xl">Auspicious Date</th>
                <th className="py-3.5 px-3">Tithi & Paksha</th>
                <th className="py-3.5 px-3">Nakshatra</th>
                <th className="py-3.5 px-3">Shubh Window</th>
                <th className="py-3.5 px-4 rounded-r-xl">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {sampleDates.map(row => (
                <tr key={row.date} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-stone-100 font-cinzel flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>{row.date}</span>
                  </td>
                  <td className="py-4 px-3 text-stone-300">{row.tithi}</td>
                  <td className="py-4 px-3 text-amber-300 font-medium">{row.nakshatra}</td>
                  <td className="py-4 px-3 font-mono text-stone-200">{row.timing}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                      {row.auspiciousness}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
