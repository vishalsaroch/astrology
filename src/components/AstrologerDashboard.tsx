import React, { useState } from 'react';
import {
  Award,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  PhoneCall,
  Video
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const AstrologerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(true);
  const [chatRate, setChatRate] = useState(25);
  const [callRate, setCallRate] = useState(35);
  const [videoRate, setVideoRate] = useState(50);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Astrologer Guru Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-950 to-amber-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
            alt="Astrologer"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-cinzel text-amber-200">
                Acharya Vidyadhar Shastri (Guru Portal)
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Master
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Rating: <strong className="text-amber-300">4.95 ⭐ (18,450+ Consultations)</strong> • 24 Years Experience
            </p>
          </div>
        </div>

        {/* Online Status Toggle */}
        <div className="flex items-center gap-3 bg-stone-900/90 border border-stone-800 p-3 rounded-2xl">
          <span className="text-xs font-semibold text-stone-300">Consultation Status:</span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isOnline ? 'bg-emerald-500 text-stone-950' : 'bg-stone-700 text-stone-300'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-stone-950 animate-ping' : 'bg-stone-400'}`} />
            <span>{isOnline ? 'ONLINE (Ready for Calls)' : 'OFFLINE'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Earnings (This Month)', value: '₹1,48,250', icon: DollarSign, color: 'text-amber-400' },
          { label: 'Total Consultations', value: '18,450', icon: Users, color: 'text-blue-400' },
          { label: 'Avg Rating Score', value: '4.95 / 5.0', icon: Award, color: 'text-yellow-400' },
          { label: 'Total Talk Minutes', value: '62,400 mins', icon: Clock, color: 'text-emerald-400' }
        ].map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-stone-900/90 border border-stone-800 p-6 rounded-3xl space-y-2 shadow-xl">
              <div className="flex justify-between items-center text-stone-400">
                <span className="text-xs font-semibold">{m.label}</span>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div className="text-2xl font-bold font-cinzel text-stone-100">{m.value}</div>
            </div>
          );
        })}
      </div>

      {/* Rate Setting Cards */}
      <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h3 className="text-lg font-bold font-cinzel text-amber-200">Consultation Pricing Controls</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-stone-800/60 rounded-2xl border border-stone-700/60 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <MessageSquare className="w-4 h-4" /> Chat Consultation (₹/min)
            </div>
            <input
              type="number"
              value={chatRate}
              onChange={e => setChatRate(Number(e.target.value))}
              className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 text-sm font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="p-4 bg-stone-800/60 rounded-2xl border border-stone-700/60 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <PhoneCall className="w-4 h-4" /> Audio Call Rate (₹/min)
            </div>
            <input
              type="number"
              value={callRate}
              onChange={e => setCallRate(Number(e.target.value))}
              className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 text-sm font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="p-4 bg-stone-800/60 rounded-2xl border border-stone-700/60 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold">
              <Video className="w-4 h-4" /> Video Call Rate (₹/min)
            </div>
            <input
              type="number"
              value={videoRate}
              onChange={e => setVideoRate(Number(e.target.value))}
              className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 text-sm font-bold focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-stone-950 via-purple-950 to-stone-950 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <h1 className="text-2xl font-bold font-cinzel text-purple-200">
          Super Admin Astro Platform Control Center
        </h1>
        <p className="text-xs text-stone-300 mt-1">
          Monitor real-time platform metrics, multilinguality traffic, active astrologers, and GMV revenue.
        </p>
      </div>

      {/* Admin Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Gross Merchandise Value (GMV)', val: '₹14,80,900', color: 'text-amber-400' },
          { label: 'Active Users (24h)', val: '48,210', color: 'text-emerald-400' },
          { label: 'Registered Astrologers', val: '128 Verified', color: 'text-blue-400' },
          { label: 'Languages Active', val: '10 Indian Languages', color: 'text-purple-400' }
        ].map(item => (
          <div key={item.label} className="bg-stone-900/90 border border-stone-800 p-6 rounded-3xl space-y-2 shadow-xl">
            <span className="text-xs text-stone-400 font-semibold">{item.label}</span>
            <div className={`text-2xl font-bold font-cinzel ${item.color}`}>{item.val}</div>
          </div>
        ))}
      </div>

      {/* Language Distribution Breakdown */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h3 className="text-lg font-bold font-cinzel text-amber-200">Multilingual Traffic Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {[
            { lang: 'Hindi (हिन्दी)', pct: '42%' },
            { lang: 'English', pct: '24%' },
            { lang: 'Marathi (मराठी)', pct: '11%' },
            { lang: 'Gujarati (ગુજરાતી)', pct: '8%' },
            { lang: 'Tamil (தமிழ்)', pct: '5%' },
            { lang: 'Telugu (తెలుగు)', pct: '4%' },
            { lang: 'Bengali (বাংলা)', pct: '3%' },
            { lang: 'Kannada (ಕನ್ನಡ)', pct: '1.5%' },
            { lang: 'Malayalam (മലയാളം)', pct: '1%' },
            { lang: 'Punjabi (ਪੰਜਾਬੀ)', pct: '0.5%' }
          ].map(l => (
            <div key={l.lang} className="p-3 bg-stone-800/60 rounded-2xl border border-stone-700/60">
              <span className="font-semibold text-stone-200 block truncate">{l.lang}</span>
              <span className="font-bold text-amber-400 text-sm font-cinzel mt-1 block">{l.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
