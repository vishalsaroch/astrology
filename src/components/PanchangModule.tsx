import React, { useState } from 'react';
import {
  Calendar,
  Sun,
  Moon,
  Clock,
  ShieldAlert,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';
import { calculatePanchang } from '../services/astrology/ephemeris';
import { useTranslation } from '../i18n/LanguageContext';

export const PanchangModule: React.FC = () => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [selectedCity, setSelectedCity] = useState({ name: 'New Delhi, India', lat: 28.6139, lon: 77.2090 });

  const panchang = calculatePanchang(selectedDate, selectedCity.lat, selectedCity.lon, selectedCity.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase mb-2">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            Vedic Panchang & Muhurat Calendar
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-200">
            {t('dailyPanchang')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Samvat: {panchang.vikramSamvat} (Vikram) • {panchang.shakaSamvat} (Shaka) | Month: {panchang.hinduMonth} ({panchang.rutu})
          </p>
        </div>

        {/* Date & Location Pickers */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="pl-9 pr-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs font-semibold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <select
              value={selectedCity.name}
              onChange={e => {
                if (e.target.value === 'Mumbai, India') setSelectedCity({ name: 'Mumbai, India', lat: 19.0760, lon: 72.8777 });
                else if (e.target.value === 'Bengaluru, India') setSelectedCity({ name: 'Bengaluru, India', lat: 12.9716, lon: 77.5946 });
                else if (e.target.value === 'London, UK') setSelectedCity({ name: 'London, UK', lat: 51.5074, lon: -0.1278 });
                else if (e.target.value === 'New York, USA') setSelectedCity({ name: 'New York, USA', lat: 40.7128, lon: -74.0060 });
                else setSelectedCity({ name: 'New Delhi, India', lat: 28.6139, lon: 77.2090 });
              }}
              className="pl-9 pr-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="New Delhi, India">New Delhi, India</option>
              <option value="Mumbai, India">Mumbai, India</option>
              <option value="Bengaluru, India">Bengaluru, India</option>
              <option value="London, UK">London, UK</option>
              <option value="New York, USA">New York, USA</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sun & Moon Times Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Sunrise', val: panchang.sunrise, icon: Sun, color: 'text-amber-400' },
          { label: 'Sunset', val: panchang.sunset, icon: Sun, color: 'text-orange-400' },
          { label: 'Moonrise', val: panchang.moonrise, icon: Moon, color: 'text-blue-300' },
          { label: 'Moonset', val: panchang.moonset, icon: Moon, color: 'text-indigo-300' }
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/60">
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                  {item.label}
                </span>
                <span className="text-base font-bold font-mono text-stone-100 block">
                  {item.val}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5 Core Limbs of Panchang Matrix */}
      <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold font-cinzel text-amber-200 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          The 5 Sacred Limbs (Pancha-Anga)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">1. Tithi (Lunar Phase)</span>
            <span className="text-base font-bold text-stone-100 block mt-1">{panchang.tithi.name}</span>
            <span className="text-xs text-stone-400 block mt-0.5">Paksha: {panchang.tithi.paksha}</span>
            <span className="text-[11px] text-amber-300 font-mono block mt-1">Till: {panchang.tithi.endTime}</span>
          </div>

          <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">2. Nakshatra (Constellation)</span>
            <span className="text-base font-bold text-stone-100 block mt-1">{panchang.nakshatra.name}</span>
            <span className="text-xs text-stone-400 block mt-0.5">Lord: {panchang.nakshatra.lord}</span>
            <span className="text-[11px] text-amber-300 font-mono block mt-1">Constellation #{panchang.nakshatra.number}</span>
          </div>

          <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">3. Yoga (Luni-Solar Angle)</span>
            <span className="text-base font-bold text-stone-100 block mt-1">{panchang.yoga.name}</span>
            <span className="text-xs text-stone-400 block mt-0.5">Category: Auspicious</span>
            <span className="text-[11px] text-amber-300 font-mono block mt-1">Till: {panchang.yoga.endTime}</span>
          </div>

          <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">4. Karana (Half-Tithi)</span>
            <span className="text-base font-bold text-stone-100 block mt-1">{panchang.karana.name}</span>
            <span className="text-xs text-stone-400 block mt-0.5">Nature: Movable / Fixed</span>
            <span className="text-[11px] text-amber-300 font-mono block mt-1">Till: {panchang.karana.endTime}</span>
          </div>

          <div className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">5. Vara (Day Lord)</span>
            <span className="text-base font-bold text-stone-100 block mt-1">
              {panchang.day}
            </span>
            <span className="text-xs text-stone-400 block mt-0.5">Ayana: {panchang.ayana}</span>
            <span className="text-[11px] text-emerald-400 font-mono block mt-1">Place: {panchang.place}</span>
          </div>
        </div>
      </div>

      {/* Auspicious & Inauspicious Timings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Auspicious Muhurats */}
        <div className="bg-stone-900/90 border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400 pb-2 border-b border-stone-800">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="font-bold font-cinzel text-base text-stone-100">Shubh Muhurats (Auspicious Timings)</h4>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Abhijit Muhurat', time: `${panchang.abhijitMuhurat.start} - ${panchang.abhijitMuhurat.end}`, desc: 'Supreme muhurat for starting any auspicious work or business.' },
              { name: 'Brahma Muhurat', time: `${panchang.brahmaMuhurat.start} - ${panchang.brahmaMuhurat.end}`, desc: 'Ideal for meditation, spiritual sadhana, and Vedic study.' },
              { name: 'Amrit Choghadiya', time: '10:45 AM - 12:15 PM', desc: 'Highly auspicious for signing contracts, travels, and new tasks.' }
            ].map(m => (
              <div key={m.name} className="p-3.5 bg-stone-800/50 rounded-2xl border border-stone-700/50 flex justify-between items-start gap-3">
                <div>
                  <h5 className="font-bold text-xs text-emerald-300">{m.name}</h5>
                  <p className="text-[11px] text-stone-400 mt-0.5">{m.desc}</p>
                </div>
                <span className="text-xs font-mono font-bold text-stone-100 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/40 whitespace-nowrap">
                  {m.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Inauspicious Kaal */}
        <div className="bg-stone-900/90 border border-rose-500/30 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 text-rose-400 pb-2 border-b border-stone-800">
            <AlertOctagon className="w-5 h-5" />
            <h4 className="font-bold font-cinzel text-base text-stone-100">Ashubh Kaal (Inauspicious Timings)</h4>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Rahu Kaal', time: `${panchang.rahuKaal.start} - ${panchang.rahuKaal.end}`, desc: 'Avoid commencing important new tasks, journeys, or purchases.' },
              { name: 'Yamagandam', time: `${panchang.yamagandam.start} - ${panchang.yamagandam.end}`, desc: 'Avoid financial transactions or inaugurations.' },
              { name: 'Gulika Kaal', time: `${panchang.gulikaKaal.start} - ${panchang.gulikaKaal.end}`, desc: 'Actions initiated in Gulika tend to repeat; avoid grief work.' }
            ].map(m => (
              <div key={m.name} className="p-3.5 bg-stone-800/50 rounded-2xl border border-stone-700/50 flex justify-between items-start gap-3">
                <div>
                  <h5 className="font-bold text-xs text-rose-300">{m.name}</h5>
                  <p className="text-[11px] text-stone-400 mt-0.5">{m.desc}</p>
                </div>
                <span className="text-xs font-mono font-bold text-stone-100 bg-rose-500/20 px-2.5 py-1 rounded-lg border border-rose-500/40 whitespace-nowrap">
                  {m.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Complete Day Choghadiya Table */}
      <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold font-cinzel text-amber-200 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          Day Choghadiya (Dynamic Muhurat Hours)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {panchang.choghadiyaDay.map((ch, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-center space-y-1 ${
                ch.auspicious
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}
            >
              <span className="text-[10px] font-mono text-stone-400 block">{ch.time}</span>
              <span className="text-xs font-bold block">{ch.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold inline-block bg-stone-900/60">
                {ch.type}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

