import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Moon,
  Heart,
  Calendar,
  PhoneCall,
  Coins,
  MapPin,
  Clock,
  User,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { BirthDetails } from '../types';

interface HeroSectionProps {
  onGenerateKundli: (details: BirthDetails) => void;
  setActiveTab?: (tab: string) => void;
  onNavigate?: (tab: string) => void;
}

const PRESET_CITIES = [
  { name: 'New Delhi, India', lat: 28.6139, lon: 77.2090, tz: 5.5 },
  { name: 'Mumbai, India', lat: 19.0760, lon: 72.8777, tz: 5.5 },
  { name: 'Bengaluru, India', lat: 12.9716, lon: 77.5946, tz: 5.5 },
  { name: 'Kolkata, India', lat: 22.5726, lon: 88.3639, tz: 5.5 },
  { name: 'Chennai, India', lat: 13.0827, lon: 80.2707, tz: 5.5 },
  { name: 'Hyderabad, India', lat: 17.3850, lon: 78.4867, tz: 5.5 },
  { name: 'Ahmedabad, India', lat: 23.0225, lon: 72.5714, tz: 5.5 },
  { name: 'Pune, India', lat: 18.5204, lon: 73.8567, tz: 5.5 },
  { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708, tz: 4.0 },
  { name: 'London, UK', lat: 51.5074, lon: -0.1278, tz: 0.0 },
  { name: 'New York, USA', lat: 40.7128, lon: -74.0060, tz: -5.0 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, tz: 8.0 }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGenerateKundli,
  setActiveTab: propSetActiveTab,
  onNavigate
}) => {
  const setActiveTab = propSetActiveTab || onNavigate || (() => {});
  const { t } = useTranslation();

  const [form, setForm] = useState<BirthDetails>({
    name: 'Aarav Sharma',
    gender: 'male',
    dob: '1995-10-15',
    time: '08:30',
    place: 'New Delhi, India',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 5.5,
    ayanamsa: 'lahiri'
  });

  const handleCitySelect = (cityName: string) => {
    const found = PRESET_CITIES.find(c => c.name === cityName);
    if (found) {
      setForm(prev => ({
        ...prev,
        place: found.name,
        latitude: found.lat,
        longitude: found.lon,
        timezone: found.tz
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateKundli(form);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 text-stone-100 border-b border-amber-500/20">
      {/* Background Starry / Golden Glow Aura */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-amber-500 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[450px] h-[450px] bg-yellow-600 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            100% Accurate Vedic Astrology Engine
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 mb-4 drop-shadow-sm">
            {t('discoverFuture')}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Hero Grid: Left Form Card + Right Cosmic Feature Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Kundli Input Form Card (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-cinzel text-amber-200">
                    {t('generateFreeKundli')}
                  </h2>
                  <p className="text-xs text-stone-400">Enter precise birth time for maximum planetary accuracy</p>
                </div>
              </div>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                ✓ Free Instant Analysis
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t('fullName')} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-stone-800/90 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t('gender')} *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['male', 'female', 'other'] as const).map(g => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setForm({ ...form, gender: g })}
                        className={`py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                          form.gender === g
                            ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm'
                            : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
                        }`}
                      >
                        {g === 'male' ? t('male') : (g === 'female' ? t('female') : t('other'))}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* DOB */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t('dateOfBirth')} *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={form.dob}
                      onChange={e => setForm({ ...form, dob: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-stone-800/90 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Birth Time */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t('birthTime')} *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="time"
                      required
                      value={form.time}
                      onChange={e => setForm({ ...form, time: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-stone-800/90 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Birth Place */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {t('birthPlace')} (City, Country) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={form.place}
                    onChange={e => setForm({ ...form, place: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-800/90 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    placeholder="Enter City Name"
                  />
                </div>

                {/* Quick Preset City Chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-stone-400 font-medium">Quick select:</span>
                  {PRESET_CITIES.slice(0, 6).map(city => (
                    <button
                      type="button"
                      key={city.name}
                      onClick={() => handleCitySelect(city.name)}
                      className={`text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                        form.place === city.name
                          ? 'bg-amber-500/30 text-amber-200 border-amber-500/50'
                          : 'bg-stone-800/60 text-stone-400 border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      {city.name.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transform active:scale-[0.99] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('generateNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Lahiri Chitra Paksha Ayanamsa
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> D1 to D60 Charts Included
                </span>
              </div>
            </form>
          </div>

          {/* Quick Access Astrological Service Tiles (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {[
              {
                id: 'horoscope',
                title: t('todayHoroscope'),
                desc: 'Daily, weekly, monthly & yearly astrological forecast for all 12 signs.',
                icon: Moon,
                color: 'from-blue-600/20 to-indigo-600/20 text-blue-300 border-blue-500/30'
              },
              {
                id: 'matchmaking',
                title: t('kundliMatching'),
                desc: 'Detailed 36 Guna Ashtakoota Milan, Nadi, Bhakoot & Manglik compatibility.',
                icon: Heart,
                color: 'from-rose-600/20 to-pink-600/20 text-rose-300 border-rose-500/30'
              },
              {
                id: 'panchang',
                title: t('dailyPanchang'),
                desc: 'Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Yamagandam & Choghadiya.',
                icon: Calendar,
                color: 'from-amber-600/20 to-yellow-600/20 text-amber-300 border-amber-500/30'
              },
              {
                id: 'ai-astrologer',
                title: t('aiAstrologer'),
                desc: 'Ask career, marriage, or financial queries directly to our AI Vedic Sage.',
                icon: Sparkles,
                badge: 'AI Powered',
                color: 'from-purple-600/20 to-amber-600/20 text-purple-300 border-purple-500/30'
              }
            ].map(item => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`p-4 rounded-2xl bg-stone-900/80 border ${item.color} hover:border-amber-400/60 cursor-pointer transition-all hover:scale-[1.01] shadow-md group`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/60 group-hover:border-amber-500/40">
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm font-cinzel text-stone-100 group-hover:text-amber-200 flex items-center gap-2">
                          {item.title}
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-950 font-bold">
                              {item.badge}
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-300 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
