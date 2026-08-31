import React from 'react';
import {
  User,
  Wallet,
  Clock,
  BookOpen,
  ShoppingBag,
  Star,
  ChevronRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { KundliData } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface UserDashboardProps {
  walletBalance: number;
  activeKundli?: KundliData | null;
  onSelectTab: (tab: any) => void;
  onAddMoney: (amount: number) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  walletBalance,
  activeKundli,
  onSelectTab,
  onAddMoney
}) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* User Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-stone-950 to-amber-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center text-3xl text-amber-300 shadow-inner">
            👤
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-cinzel text-amber-200">
                Welcome, {activeKundli?.birthDetails?.name || 'Seeker'}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                Gold Seeker
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Kundli Lagna: <strong className="text-amber-300">{activeKundli?.ascendant?.sign || 'Scorpio'}</strong> • Moon Sign: <strong className="text-amber-300">{activeKundli?.moonSign?.sign || 'Taurus'}</strong> • Mahadasha: <strong className="text-amber-300">{activeKundli?.dasha?.currentMahadasha || 'Jupiter'}</strong>
            </p>
          </div>
        </div>

        {/* Wallet Quick Card */}
        <div className="bg-stone-900/90 border border-amber-500/40 p-4 rounded-2xl flex items-center gap-4">
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Astro Wallet Balance</span>
            <span className="text-2xl font-bold font-cinzel text-amber-300">₹{walletBalance}</span>
          </div>
          <button
            onClick={() => onAddMoney(500)}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add ₹500</span>
          </button>
        </div>
      </div>

      {/* Quick Action Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'My Kundli Birth Chart',
            desc: 'View D1 to D60 charts, doshas & transits',
            tab: 'kundli',
            icon: '☸️',
            color: 'from-amber-600 to-yellow-600'
          },
          {
            title: 'AI Vedic Astrologer',
            desc: 'Instant 24/7 AI chat with Acharya Devavrata',
            tab: 'ai-astrologer',
            icon: '🧘',
            color: 'from-purple-600 to-pink-600'
          },
          {
            title: 'Consult Live Astrologers',
            desc: 'Connect with verified Gurus on Call/Video',
            tab: 'marketplace',
            icon: '🔮',
            color: 'from-blue-600 to-indigo-600'
          },
          {
            title: 'My Reports & Dossiers',
            desc: 'Download 50+ page life horoscopes',
            tab: 'reports',
            icon: '📜',
            color: 'from-emerald-600 to-teal-600'
          }
        ].map(card => (
          <button
            key={card.tab}
            onClick={() => onSelectTab(card.tab)}
            className="p-5 bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 rounded-3xl text-left flex flex-col justify-between shadow-xl transition-all hover:scale-[1.02] group"
          >
            <div>
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-sm font-cinzel text-stone-100 group-hover:text-amber-200">{card.title}</h3>
              <p className="text-xs text-stone-400 mt-1">{card.desc}</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 mt-4">
              <span>Open Module</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity Log */}
      <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h3 className="text-lg font-bold font-cinzel text-amber-200">Recent Activity & Consultations</h3>
        <div className="divide-y divide-stone-800 text-xs text-stone-300">
          <div className="py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300">🕉️</span>
              <div>
                <span className="font-bold text-stone-100 block">AI Astrologer Consultation Session</span>
                <span className="text-[11px] text-stone-400">Asked about Career & Saturn Transit</span>
              </div>
            </div>
            <span className="text-stone-400">Today</span>
          </div>

          <div className="py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300">📜</span>
              <div>
                <span className="font-bold text-stone-100 block">Life Horoscope Dossier Generated</span>
                <span className="text-[11px] text-stone-400">PDF Downloaded (52 Pages)</span>
              </div>
            </div>
            <span className="text-stone-400">Yesterday</span>
          </div>
        </div>
      </div>

    </div>
  );
};
