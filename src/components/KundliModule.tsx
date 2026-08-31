import React, { useState } from 'react';
import {
  Compass,
  Printer,
  Sparkles,
  Calendar,
  Layers,
  Table,
  Home,
  Clock,
  ShieldAlert,
  Flame,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Share2,
  Edit3,
  X,
  MapPin,
  User,
  Heart,
  GraduationCap,
  Briefcase,
  Brain,
  Award,
  ChevronRight,
  TrendingUp,
  Coins,
  Activity,
  Eye,
  BookOpen
} from 'lucide-react';
import { BirthDetails, KundliData, DashafalReport } from '../types';
import { KundliChart } from './KundliChart';
import { calculateKundli } from '../services/astrology/ephemeris';
import { calculateDashafal, calculateLifePredictions } from '../services/astrology/predictions';
import { useTranslation } from '../i18n/LanguageContext';

interface KundliModuleProps {
  kundli?: KundliData | null;
  activeKundli?: KundliData | null;
  onAskAI?: () => void;
  onSaveProfile?: (kundli: KundliData) => void;
  onUpdateBirthDetails?: (details: BirthDetails) => void;
  onNavigateToDashaRemedies?: () => void;
  onNavigateToLearning?: () => void;
}

const DEFAULT_FALLBACK_DETAILS: BirthDetails = {
  name: 'Aarav Sharma',
  gender: 'male',
  dob: '1995-10-15',
  time: '08:30',
  place: 'New Delhi, India',
  latitude: 28.6139,
  longitude: 77.2090,
  timezone: 5.5,
  ayanamsa: 'lahiri'
};

export const KundliModule: React.FC<KundliModuleProps> = ({
  kundli: propKundli,
  activeKundli,
  onAskAI,
  onSaveProfile,
  onUpdateBirthDetails,
  onNavigateToDashaRemedies,
  onNavigateToLearning
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'dasha' | 'predictions' | 'divisional' | 'planets' | 'houses' | 'dosha'>('overview');
  const [selectedDivChart, setSelectedDivChart] = useState<string>('D1');
  const [copied, setCopied] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [predictionSubTab, setPredictionSubTab] = useState<'all' | 'love' | 'education' | 'nature' | 'profession'>('all');

  // Selected Dasha period for custom Dashafal inspection
  const [selectedMaha, setSelectedMaha] = useState<string | null>(null);
  const [selectedAntar, setSelectedAntar] = useState<string | null>(null);

  // Resolved Kundli ensuring it's never undefined
  const [localKundli, setLocalKundli] = useState<KundliData | null>(null);

  const resolvedKundli: KundliData =
    localKundli ||
    propKundli ||
    activeKundli ||
    calculateKundli(DEFAULT_FALLBACK_DETAILS);

  const [editForm, setEditForm] = useState<BirthDetails>(() => resolvedKundli.birthDetails);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = calculateKundli(editForm);
    setLocalKundli(updated);
    if (onUpdateBirthDetails) {
      onUpdateBirthDetails(editForm);
    }
    if (onSaveProfile) {
      onSaveProfile(updated);
    }
    setIsEditOpen(false);
  };

  const kundli = resolvedKundli;

  // Active or selected Dashafal report
  const effectiveMaha = selectedMaha || kundli.dasha.currentMahadasha;
  const effectiveAntar = selectedAntar || kundli.dasha.currentAntardasha;
  const effectivePraty = kundli.dasha.currentPratyantardasha;

  const dashafal: DashafalReport = calculateDashafal(kundli, effectiveMaha, effectiveAntar, effectivePraty);
  const predictions = kundli.predictions || calculateLifePredictions(kundli);

  const divisionalChartList = [
    { id: 'D1', name: 'D1 - Rashi (Lagna Chart)' },
    { id: 'D9', name: 'D9 - Navamsha (Dharma & Spouse)' },
    { id: 'D2', name: 'D2 - Hora (Wealth & Assets)' },
    { id: 'D3', name: 'D3 - Drekkana (Courage & Siblings)' },
    { id: 'D4', name: 'D4 - Chaturthamsa (Fixed Assets)' },
    { id: 'D7', name: 'D7 - Saptamsa (Children & Lineage)' },
    { id: 'D10', name: 'D10 - Dashamsha (Career & Status)' },
    { id: 'D12', name: 'D12 - Dwadashamsha (Ancestry)' },
    { id: 'D16', name: 'D16 - Shodashamsha (Luxuries)' },
    { id: 'D20', name: 'D20 - Vimsamsha (Spiritual Power)' },
    { id: 'D24', name: 'D24 - Chaturvimshamsha (Knowledge)' },
    { id: 'D27', name: 'D27 - Bhamsa (Inner Strengths)' },
    { id: 'D30', name: 'D30 - Trimsamsha (Misfortunes)' },
    { id: 'D60', name: 'D60 - Shashtiamsha (Past Karma)' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Profile Bar */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase">
              Vedic Kundli Blueprint
            </span>
            <span className="text-xs text-stone-400">ID: {kundli.id || 'KND-VEDIC'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-200">
            {kundli.birthDetails?.name || 'User'}’s Vedic Horoscope
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            🗓️ {kundli.birthDetails?.dob} at {kundli.birthDetails?.time} | 📍 {kundli.birthDetails?.place} (Lat: {(kundli.birthDetails?.latitude ?? 28.61).toFixed(2)}°, Lon: {(kundli.birthDetails?.longitude ?? 77.21).toFixed(2)}°)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 no-print">
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Birth Details</span>
          </button>

          {onAskAI && (
            <button
              onClick={onAskAI}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Astrologer</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print Chart</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold"
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>{copied ? 'Copied Link!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Edit Birth Details Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 text-stone-100 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-cinzel text-amber-200 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Update Birth Parameters
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={editForm.dob}
                    onChange={e => setEditForm(prev => ({ ...prev, dob: e.target.value }))}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Time of Birth</label>
                  <input
                    type="time"
                    value={editForm.time}
                    onChange={e => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Birth Place / City</label>
                <input
                  type="text"
                  value={editForm.place}
                  onChange={e => setEditForm(prev => ({ ...prev, place: e.target.value }))}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-stone-400 font-semibold mb-0.5">Latitude (°N)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={editForm.latitude}
                    onChange={e => setEditForm(prev => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-stone-400 font-semibold mb-0.5">Longitude (°E)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={editForm.longitude}
                    onChange={e => setEditForm(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-stone-400 font-semibold mb-0.5">Timezone (GMT+)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editForm.timezone}
                    onChange={e => setEditForm(prev => ({ ...prev, timezone: parseFloat(e.target.value) || 5.5 }))}
                    className="w-full px-2.5 py-1.5 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 font-mono text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold rounded-xl shadow-lg shadow-amber-500/20"
              >
                Recalculate Vedic Chart
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-1 border-b border-stone-800 no-print">
        {[
          { id: 'overview', label: 'Charts & Overview', icon: Compass },
          { id: 'dasha', label: 'दशाफल एवं विंशोत्तरी (Dashafal)', icon: Clock, badge: 'सटीक फल' },
          { id: 'predictions', label: 'फलित ज्योतिष (Life Predictions)', icon: Brain, badge: 'Love, Career, Edu' },
          { id: 'divisional', label: 'Divisional Charts (D1-D60)', icon: Layers },
          { id: 'planets', label: 'Planetary Table', icon: Table },
          { id: 'houses', label: '12 Houses (Bhavas)', icon: Home },
          { id: 'dosha', label: 'Dosha & Remedies', icon: ShieldAlert }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 hover:text-amber-200 border border-stone-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-stone-950 text-amber-400' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW (Basic Details + D1 & D9 Charts Side-by-side) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Key Astrological Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Ascendant (Lagna)', val: kundli.ascendant.sign, sub: kundli.ascendant.formatted, color: 'text-amber-300' },
              { label: 'Moon Sign (Rashi)', val: kundli.moonSign.sign, sub: `${kundli.moonSign.nakshatra} (P${kundli.moonSign.nakshatraPada})`, color: 'text-blue-300' },
              { label: 'Sun Sign', val: kundli.sunSign.sign, sub: 'Surya Rashi', color: 'text-orange-300' },
              { label: 'Birth Tithi', val: kundli.tithi, sub: 'Lunar Day', color: 'text-emerald-300' },
              { label: 'Vedic Yoga', val: kundli.yoga, sub: 'Cosmic Union', color: 'text-purple-300' },
              { label: 'Active Mahadasha', val: `${kundli.dasha.currentMahadasha} - ${kundli.dasha.currentAntardasha}`, sub: 'Current Planetary Period', color: 'text-yellow-300' }
            ].map((card, idx) => (
              <div key={idx} className="bg-stone-900/90 border border-stone-800 rounded-2xl p-3.5 shadow-sm">
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                  {card.label}
                </span>
                <span className={`text-sm font-bold font-cinzel ${card.color} block mt-0.5 truncate`}>
                  {card.val}
                </span>
                <span className="text-[11px] text-stone-400 block mt-0.5 truncate">
                  {card.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Life Prediction Highlights Card */}
          <div className="bg-gradient-to-r from-stone-900 via-amber-950/20 to-stone-900 border border-amber-500/30 rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">फलित सारांश (Life Highlights)</span>
                <h3 className="text-xl font-bold font-cinzel text-amber-200">चार मुख्य जीवन स्तंभ (4 Core Life Pillars)</h3>
              </div>
              <button
                onClick={() => setActiveTab('predictions')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold"
              >
                <span>विस्तृत फलित देखें</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-rose-400 mb-1.5">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-bold font-cinzel">Love & Marriage</span>
                </div>
                <span className="text-xs text-stone-200 block font-semibold">{predictions.loveAndMarriage.spouseProfile.nature}</span>
                <span className="text-[11px] text-stone-400 block mt-1">Harmony Score: {predictions.loveAndMarriage.harmonyScore}%</span>
              </div>

              <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-blue-400 mb-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-bold font-cinzel">Education & Mind</span>
                </div>
                <span className="text-xs text-stone-200 block font-semibold">{predictions.educationAndIntellect.intellectType}</span>
                <span className="text-[11px] text-stone-400 block mt-1">Exam Score: {predictions.educationAndIntellect.competitiveExamScore}%</span>
              </div>

              <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
                  <Brain className="w-4 h-4" />
                  <span className="text-xs font-bold font-cinzel">Nature & Personality</span>
                </div>
                <span className="text-xs text-stone-200 block font-semibold">{predictions.natureAndPersonality.temperament}</span>
                <span className="text-[11px] text-stone-400 block mt-1">{predictions.natureAndPersonality.element}</span>
              </div>

              <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-amber-400 mb-1.5">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs font-bold font-cinzel">Career & Profession</span>
                </div>
                <span className="text-xs text-stone-200 block font-semibold">{predictions.professionAndCareer.careerTrack}</span>
                <span className="text-[11px] text-stone-400 block mt-1">{predictions.professionAndCareer.wealthAccumulationLevel}</span>
              </div>
            </div>
          </div>

          {/* Charts Dual Column (D1 Rashi & D9 Navamsha) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-stone-900/80 border border-amber-500/20 rounded-3xl p-5 shadow-lg flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-2 px-2">
                <h3 className="font-bold text-sm text-amber-200 font-cinzel">D1 - Rashi Chart (Birth Lagna)</h3>
                <span className="text-[10px] text-stone-400">Primary Physical Life Chart</span>
              </div>
              <KundliChart kundli={kundli} chartType="D1" />
            </div>

            <div className="bg-stone-900/80 border border-amber-500/20 rounded-3xl p-5 shadow-lg flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-2 px-2">
                <h3 className="font-bold text-sm text-amber-200 font-cinzel">D9 - Navamsha Chart (Dharma & Spouse)</h3>
                <span className="text-[10px] text-stone-400">Spiritual & Marital Blueprint</span>
              </div>
              <KundliChart kundli={kundli} chartType="D9" />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VIMSHOTTARI DASHA & DASHAFAL (दशाफल एवं विंशोत्तरी विश्लेषण) */}
      {activeTab === 'dasha' && (
        <div className="space-y-6">
          
          {/* Active Dashafal Hero Card */}
          <div className="bg-gradient-to-r from-stone-900 via-amber-950/30 to-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase">
                    दशाफल सटीक फलित विश्लेषण
                  </span>
                  <span className="text-xs text-stone-400">{dashafal.dashaPhase}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-200 flex items-center gap-2">
                  <span>{dashafal.currentPeriodFormatted}</span>
                </h2>
                <p className="text-xs text-stone-300 mt-1 font-mono">
                  संबंध: {dashafal.mutualRelationship}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <div className={`px-4 py-2 rounded-2xl border font-bold text-xs ${
                  dashafal.overallScore >= 75
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : dashafal.overallScore >= 55
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  {dashafal.overallStatus}
                </div>
                <span className="text-[11px] text-stone-400 font-semibold">
                  समग्र दशा प्रभाव स्कोर: <strong className="text-amber-300">{dashafal.overallScore}/100</strong>
                </span>
              </div>
            </div>

            {/* General Life Effect Narrative */}
            <div className="bg-stone-900/90 border border-amber-500/20 p-5 rounded-2xl space-y-3">
              <h4 className="text-sm font-bold font-cinzel text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>दशा प्रभाव एवं जीवन दशा (Comprehensive Vedic Dashafal)</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                {dashafal.generalLife.hindi}
              </p>
              <p className="text-xs text-stone-400 leading-relaxed italic border-t border-stone-800/80 pt-2">
                {dashafal.generalLife.english}
              </p>
            </div>

            {/* 4 Sector Dashafal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Career in Dasha */}
              <div className="bg-stone-900/80 border border-stone-800 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm font-cinzel">
                    <Briefcase className="w-4 h-4" />
                    <span>कार्यक्षेत्र व आजीविका (Career & Business)</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
                    Score: {dashafal.career.score}%
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {dashafal.career.hindi}
                </p>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">प्रमुख अवसर:</span>
                  {dashafal.career.opportunities.map((opp, i) => (
                    <div key={i} className="text-xs text-stone-300 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{opp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wealth in Dasha */}
              <div className="bg-stone-900/80 border border-stone-800 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-cinzel">
                    <Coins className="w-4 h-4" />
                    <span>धन, संपत्ति व वित्तीय स्थिति (Wealth & Finance)</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    Score: {dashafal.wealth.score}%
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {dashafal.wealth.hindi}
                </p>
                <span className="text-xs text-amber-300/90 font-semibold block bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                  वित्तीय रुझान: {dashafal.wealth.financialTrend}
                </span>
              </div>

              {/* Love & Family in Dasha */}
              <div className="bg-stone-900/80 border border-stone-800 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm font-cinzel">
                    <Heart className="w-4 h-4" />
                    <span>प्रेम संबंध व वैवाहिक सुख (Love & Relationships)</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                    Score: {dashafal.loveMarriage.score}%
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {dashafal.loveMarriage.hindi}
                </p>
                <span className="text-xs text-rose-300/90 font-semibold block bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                  संबंध स्थिति: {dashafal.loveMarriage.relationshipStatus}
                </span>
              </div>

              {/* Education in Dasha */}
              <div className="bg-stone-900/80 border border-stone-800 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm font-cinzel">
                    <GraduationCap className="w-4 h-4" />
                    <span>विद्या, बुद्धि व अध्ययन (Education & Learning)</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                    Score: {dashafal.education.score}%
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {dashafal.education.hindi}
                </p>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">मुख्य अध्ययन क्षेत्र:</span>
                  {dashafal.education.focusAreas.map((fa, i) => (
                    <div key={i} className="text-xs text-stone-300 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{fa}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dasha Remedies (मंत्र, रत्न, स्तोत्र व दान) */}
            <div className="bg-stone-900/95 border border-amber-500/30 p-6 rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h4 className="text-base font-bold font-cinzel text-amber-200 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <span>दशा शांति एवं सुरक्षात्मक वैदिक उपाय (Sacred Dasha Remedies)</span>
                </h4>
                {onNavigateToDashaRemedies && (
                  <button
                    onClick={onNavigateToDashaRemedies}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold underline"
                  >
                    विस्तृत रत्न व अनुष्ठान मॉड्यूल →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                
                {/* Mantra */}
                <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-800 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-amber-400">वैदिक बीज मंत्र (Daily Japa):</span>
                  <p className="text-xs font-bold text-amber-200 font-mono bg-stone-900 p-2 rounded-lg border border-stone-700">
                    {dashafal.remedies.beejMantra}
                  </p>
                  <span className="text-[11px] text-stone-400 block">जप संख्या: {dashafal.remedies.mantraCount.toLocaleString()} बार</span>
                </div>

                {/* Stotra Path */}
                <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-800 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">नित्य स्तोत्र पाठ:</span>
                  <p className="text-xs font-semibold text-stone-200">
                    {dashafal.remedies.sacredStotra}
                  </p>
                  <span className="text-[11px] text-stone-400 block">शुभ दिन: {dashafal.remedies.auspiciousDay}</span>
                </div>

                {/* Gemstone & Rule */}
                <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-800 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-blue-400">अनुशंसित रत्न व नियम:</span>
                  <p className="text-xs font-semibold text-stone-200">
                    {dashafal.remedies.prescribedGemstone}
                  </p>
                  <span className="text-[10px] text-amber-300/80 block">धातु/उंगली: {dashafal.remedies.gemstoneMetalFinger}</span>
                  <span className="text-[10px] text-rose-400 block">वर्जित रत्न: {dashafal.remedies.incompatibleGems}</span>
                </div>
              </div>

              {/* Daan and Fasting */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-stone-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">शुभ दान सामग्री (Charity Items):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dashafal.remedies.daanItems.map((item, i) => (
                      <span key={i} className="px-2 py-1 bg-stone-800 text-stone-200 rounded-lg text-[11px] border border-stone-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">रुद्राक्ष एवं व्रत (Rudraksha & Fast):</span>
                  <p className="text-xs text-stone-300">
                    ✨ <strong>{dashafal.remedies.rudraksha}</strong> धारण करें | 🌿 व्रत: {dashafal.remedies.fastDay}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 120-Year Vimshottari Mahadasha Sequence Explorer */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="text-lg font-bold font-cinzel text-amber-200">120-Year Vimshottari Mahadasha Sequence</h3>
                <p className="text-xs text-stone-400">
                  Calculated from natal Moon nakshatra ({kundli.moonSign.nakshatra}) balance at birth: {kundli.dasha.balanceAtBirth.planet} ({kundli.dasha.balanceAtBirth.years}y {kundli.dasha.balanceAtBirth.months}m {kundli.dasha.balanceAtBirth.days}d)
                </p>
              </div>
              <span className="text-xs text-amber-400 font-semibold">
                💡 किसी भी महादशा या अन्तर्दशा पर क्लिक करके उसका सटीक दशाफल देखें
              </span>
            </div>

            <div className="space-y-3">
              {kundli.dasha.periods.map(period => {
                const isCurrent = period.planet === kundli.dasha.currentMahadasha;
                const isSelectedMaha = period.planet === effectiveMaha;

                return (
                  <div
                    key={period.planet}
                    className={`p-4 rounded-2xl border transition-all ${
                      isSelectedMaha
                        ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-500/10'
                        : isCurrent
                        ? 'bg-stone-800/80 border-amber-500/50'
                        : 'bg-stone-800/40 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setSelectedMaha(period.planet);
                          setSelectedAntar(period.planet);
                        }}
                        className="flex items-center gap-3 text-left w-full sm:w-auto"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isCurrent ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-700 text-stone-200'
                        }`}>
                          {period.planet.substring(0, 2)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-stone-100 flex items-center gap-2">
                            {period.planet} Mahadasha ({period.durationYears} Years)
                            {isCurrent && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                                CURRENT MAHADASHA
                              </span>
                            )}
                            {isSelectedMaha && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                                SELECTED FOR DASHAFAL
                              </span>
                            )}
                          </h4>
                          <span className="text-xs text-stone-400 font-mono">
                            {period.startDate} to {period.endDate}
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Antardashas nested row */}
                    {period.antardashas && period.antardashas.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-1.5 text-[11px]">
                        {period.antardashas.map(sub => {
                          const isSubActive = isCurrent && sub.planet === kundli.dasha.currentAntardasha;
                          const isSubSelected = isSelectedMaha && sub.planet === effectiveAntar;

                          return (
                            <button
                              key={sub.planet}
                              onClick={() => {
                                setSelectedMaha(period.planet);
                                setSelectedAntar(sub.planet);
                              }}
                              className={`p-1.5 rounded-lg border text-center transition-all ${
                                isSubSelected
                                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-300 shadow-md'
                                  : isSubActive
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                                  : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                              }`}
                            >
                              <span className="block font-semibold">{sub.planet}</span>
                              <span className="text-[9px] block opacity-80">{sub.startDate.split('-')[0]}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LIFE PREDICTIONS (Love, Education, Nature, Profession) */}
      {activeTab === 'predictions' && (
        <div className="space-y-6">
          
          {/* Sub-Pillar Filters */}
          <div className="flex flex-wrap gap-2 pb-2">
            {[
              { id: 'all', label: 'सभी 4 स्तंभ (All 4 Pillars)', icon: Sparkles },
              { id: 'love', label: '💖 प्रेम व विवाह (Love & Marriage)', icon: Heart },
              { id: 'education', label: '🎓 शिक्षा व मेधा (Education & Intellect)', icon: GraduationCap },
              { id: 'nature', label: '🧠 स्वभाव व व्यक्तित्व (Nature & Personality)', icon: Brain },
              { id: 'profession', label: '💼 व्यवसाय व करियर (Profession & Career)', icon: Briefcase }
            ].map(pTab => {
              const Icon = pTab.icon;
              const isPActive = predictionSubTab === pTab.id;
              return (
                <button
                  key={pTab.id}
                  onClick={() => setPredictionSubTab(pTab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isPActive
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pTab.label}</span>
                </button>
              );
            })}
          </div>

          {/* PILLAR 1: LOVE & MARRIAGE */}
          {(predictionSubTab === 'all' || predictionSubTab === 'love') && (
            <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-rose-200">
                      प्रेम, वैवाहिक सुख एवं जीवनसाथी (Love & Marriage Analysis)
                    </h3>
                    <p className="text-xs text-stone-400">
                      7th House (Kalatra Bhava), Venus, Jupiter, Navamsha D9 & Manglik Assessment
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                    वैवाहिक सामंजस्य: {predictions.loveAndMarriage.harmonyScore}%
                  </div>
                </div>
              </div>

              {/* Detailed Narrative */}
              <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-rose-300">
                  वैदिक फलित निर्णय (Vedic Marital Verdict):
                </h4>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {predictions.loveAndMarriage.hindi}
                </p>
                <p className="text-xs text-stone-400 leading-relaxed italic border-t border-stone-800 pt-2">
                  {predictions.loveAndMarriage.english}
                </p>
              </div>

              {/* Spouse Characteristics Profile */}
              <div className="bg-stone-900/60 border border-rose-500/20 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-rose-300">
                  भावी जीवनसाथी का स्वरूप एवं लक्षण (Spouse Characteristics):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                    <span className="text-[10px] text-stone-400 font-semibold block">रूप-रंग व आकर्षण</span>
                    <span className="text-xs font-bold text-stone-100 mt-0.5 block">{predictions.loveAndMarriage.spouseProfile.appearance}</span>
                  </div>
                  <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                    <span className="text-[10px] text-stone-400 font-semibold block">स्वभाव व गुण</span>
                    <span className="text-xs font-bold text-stone-100 mt-0.5 block">{predictions.loveAndMarriage.spouseProfile.nature}</span>
                  </div>
                  <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                    <span className="text-[10px] text-stone-400 font-semibold block">संभावित दिशा</span>
                    <span className="text-xs font-bold text-rose-300 mt-0.5 block">{predictions.loveAndMarriage.spouseProfile.direction}</span>
                  </div>
                  <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                    <span className="text-[10px] text-stone-400 font-semibold block">कार्यक्षेत्र / पेशा</span>
                    <span className="text-xs font-bold text-stone-100 mt-0.5 block">{predictions.loveAndMarriage.spouseProfile.professionHint}</span>
                  </div>
                </div>
              </div>

              {/* Timing Windows & Remedies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block">अनुकूल वैवाहिक आयु व समय:</span>
                  {predictions.loveAndMarriage.marriageTimingWindows.map((tw, i) => (
                    <div key={i} className="flex items-center gap-2 text-stone-200">
                      <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{tw}</span>
                    </div>
                  ))}
                  <div className="text-[11px] text-stone-400 pt-1">
                    मांगलिक स्थिति: <strong className="text-stone-200">{predictions.loveAndMarriage.manglikAnalysis}</strong>
                  </div>
                </div>

                <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">दांपत्य सुख हेतु वैदिक उपाय:</span>
                  {predictions.loveAndMarriage.remedies.map((rem, i) => (
                    <div key={i} className="flex items-start gap-2 text-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{rem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PILLAR 2: EDUCATION & INTELLECT */}
          {(predictionSubTab === 'all' || predictionSubTab === 'education') && (
            <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-blue-200">
                      शिक्षा, विद्या एवं बौद्धिक क्षमता (Education & Intellect)
                    </h3>
                    <p className="text-xs text-stone-400">
                      5th House (Intellect), 4th House (Degrees), Mercury, Jupiter & D24 Chaturvimshamsha
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold">
                    प्रतियोगी परीक्षा स्कोर: {predictions.educationAndIntellect.competitiveExamScore}%
                  </div>
                </div>
              </div>

              {/* Detailed Narrative */}
              <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-blue-300">
                  बौद्धिक प्रारूप एवं मेधा (Cognitive Archetype):
                </h4>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {predictions.educationAndIntellect.hindi}
                </p>
                <p className="text-xs text-stone-400 leading-relaxed italic border-t border-stone-800 pt-2">
                  {predictions.educationAndIntellect.english}
                </p>
              </div>

              {/* Recommended Streams */}
              <div className="bg-stone-900/60 border border-blue-500/20 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-blue-300">
                  सर्वोत्तम अध्ययन एवं करियर विषय (Top Academic Streams):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {predictions.educationAndIntellect.recommendedStreams.map((stream, i) => (
                    <div key={i} className="bg-stone-800/80 p-3 rounded-xl border border-stone-700 flex items-start gap-2">
                      <Award className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-stone-200 font-semibold">{stream}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Higher Study & Remedies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-blue-400 block">उच्च शिक्षा एवं विदेश अध्ययन:</span>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    {predictions.educationAndIntellect.higherEducationAndAbroad}
                  </p>
                  <p className="text-[11px] text-stone-400 pt-1">
                    {predictions.educationAndIntellect.d24ChaturvimshamshaAnalysis}
                  </p>
                </div>

                <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">विद्या व एकाग्रता हेतु वैदिक उपाय:</span>
                  {predictions.educationAndIntellect.remedies.map((rem, i) => (
                    <div key={i} className="flex items-start gap-2 text-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{rem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PILLAR 3: NATURE & PERSONALITY */}
          {(predictionSubTab === 'all' || predictionSubTab === 'nature') && (
            <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-emerald-200">
                      स्वभाव, व्यक्तित्व एवं गुण-दोष (Nature & Personality)
                    </h3>
                    <p className="text-xs text-stone-400">
                      1st House (Lagna), Moon Sign, Sun Vitality, Element & Gunas Composition
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    {predictions.natureAndPersonality.temperament}
                  </div>
                </div>
              </div>

              {/* Detailed Narrative */}
              <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-300">
                  व्यक्तित्व विश्लेषण (Vedic Psychological Blueprint):
                </h4>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {predictions.natureAndPersonality.hindi}
                </p>
                <p className="text-xs text-stone-400 leading-relaxed italic border-t border-stone-800 pt-2">
                  {predictions.natureAndPersonality.english}
                </p>
              </div>

              {/* Element, Modality & Strengths */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">प्रमुख स्वाभाविक गुण (Key Strengths):</span>
                  {predictions.natureAndPersonality.keyStrengths.map((str, i) => (
                    <div key={i} className="flex items-start gap-2 text-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">सुधार योग्य बिंदु (Areas for Growth):</span>
                  {predictions.natureAndPersonality.areasForGrowth.map((gro, i) => (
                    <div key={i} className="flex items-start gap-2 text-stone-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{gro}</span>
                    </div>
                  ))}
                  <div className="text-[11px] text-stone-400 pt-1">
                    तत्व: <strong>{predictions.natureAndPersonality.element}</strong> | स्वभाव: <strong>{predictions.natureAndPersonality.modality}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PILLAR 4: PROFESSION & CAREER */}
          {(predictionSubTab === 'all' || predictionSubTab === 'profession') && (
            <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-200">
                      व्यवसाय, आजीविका व पद-प्रतिष्ठा (Profession & Career)
                    </h3>
                    <p className="text-xs text-stone-400">
                      10th House (Karma Bhava), D10 Dashamsha, Service vs Business & Dhana Yogas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                    {predictions.professionAndCareer.careerTrack}
                  </div>
                </div>
              </div>

              {/* Detailed Narrative */}
              <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-amber-300">
                  आजीविका व सफलता का वैदिक विश्लेषण (Professional Destiny):
                </h4>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {predictions.professionAndCareer.hindi}
                </p>
                <p className="text-xs text-stone-400 leading-relaxed italic border-t border-stone-800 pt-2">
                  {predictions.professionAndCareer.english}
                </p>
              </div>

              {/* Favorable Domains */}
              <div className="bg-stone-900/60 border border-amber-500/20 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-amber-300">
                  अनुकूलतम व्यावसायिक क्षेत्र (Top Career Fields):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {predictions.professionAndCareer.favorableDomains.map((dom, i) => (
                    <div key={i} className="bg-stone-800/80 p-3 rounded-xl border border-stone-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-stone-200 font-semibold">{dom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peak Periods & Career Remedies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">करियर में सर्वोच्च उत्थान काल (Peak Rise Timeline):</span>
                  {predictions.professionAndCareer.peakRisePeriods.map((pk, i) => (
                    <div key={i} className="flex items-center gap-2 text-stone-200">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{pk}</span>
                    </div>
                  ))}
                  <div className="text-[11px] text-stone-400 pt-1">
                    संपत्ति निर्माण: <strong className="text-stone-200">{predictions.professionAndCareer.wealthAccumulationLevel}</strong>
                  </div>
                </div>

                <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-yellow-400 block">करियर व व्यापार वृद्धि हेतु वैदिक उपाय:</span>
                  {predictions.professionAndCareer.remedies.map((rem, i) => (
                    <div key={i} className="flex items-start gap-2 text-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                      <span>{rem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: DIVISIONAL CHARTS (D1-D60) */}
      {activeTab === 'divisional' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {divisionalChartList.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedDivChart(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedDivChart === item.id
                    ? 'bg-amber-500 text-stone-950 border-amber-300 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-stone-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl flex flex-col items-center">
            <h3 className="text-lg font-bold font-cinzel text-amber-200 mb-1">
              {divisionalChartList.find(d => d.id === selectedDivChart)?.name}
            </h3>
            <p className="text-xs text-stone-400 mb-6">
              {kundli.divisionalCharts[selectedDivChart]?.description || 'Vedic Divisional Chart'}
            </p>
            <KundliChart kundli={kundli} chartType={selectedDivChart} />
          </div>
        </div>
      )}

      {/* TAB 5: PLANETARY TABLE */}
      {activeTab === 'planets' && (
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-xl overflow-x-auto">
          <div className="mb-4">
            <h3 className="text-lg font-bold font-cinzel text-amber-200">Planetary Positions & Dignity</h3>
            <p className="text-xs text-stone-400">Exact longitude, sign placement, nakshatra, and dignity</p>
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 font-semibold uppercase text-[10px]">
                <th className="py-3 px-3">Planet</th>
                <th className="py-3 px-3">Sign</th>
                <th className="py-3 px-3">House</th>
                <th className="py-3 px-3">Degree</th>
                <th className="py-3 px-3">Nakshatra</th>
                <th className="py-3 px-3">Pada</th>
                <th className="py-3 px-3">Speed / Motion</th>
                <th className="py-3 px-3">Status / Dignity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-mono">
              {kundli.planets.map(p => (
                <tr key={p.name} className="hover:bg-stone-800/40">
                  <td className="py-3 px-3 font-bold font-sans text-stone-100 flex items-center gap-1.5">
                    <span>{p.name}</span>
                    {p.isRetrograde && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">R</span>
                    )}
                    {p.isCombust && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">C</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-stone-300 font-sans">{p.sign}</td>
                  <td className="py-3 px-3 text-amber-400 font-bold">{p.house}</td>
                  <td className="py-3 px-3 text-stone-300">{p.degreeFormatted}</td>
                  <td className="py-3 px-3 text-stone-300 font-sans">{p.nakshatra}</td>
                  <td className="py-3 px-3 text-stone-300">{p.nakshatraPada}</td>
                  <td className="py-3 px-3 text-stone-400">{(p.speed ?? 1.0).toFixed(2)}°/d</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-sans ${
                      p.status === 'Exalted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                      p.status === 'Own Sign' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                      p.status === 'Debilitated' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      'bg-stone-800 text-stone-300'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 6: 12 HOUSES (BHAVAS) */}
      {activeTab === 'houses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kundli.houses.map(h => (
            <div key={h.houseNumber} className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                <span className="text-xs font-bold text-amber-400 font-cinzel">
                  House {h.houseNumber} ({h.sign})
                </span>
                <span className="text-[10px] text-stone-400">Lord: {h.lord}</span>
              </div>
              <p className="text-xs font-semibold text-stone-200">{h.significance}</p>
              <div className="text-[11px] text-stone-400">
                <span>Planets in House: </span>
                <strong className="text-stone-200">
                  {h.occupants && h.occupants.length > 0 ? h.occupants.join(', ') : 'None'}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 7: DOSHA ANALYSIS & REMEDIES */}
      {activeTab === 'dosha' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Manglik Dosha Card */}
            <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base font-cinzel text-stone-100">Manglik (Kuja) Dosha</h3>
                    <span className="text-xs text-stone-400">Mars placement from Lagna/Moon</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  kundli.doshas.manglik.isManglik
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {kundli.doshas.manglik.isManglik ? `Manglik (${kundli.doshas.manglik.severity})` : 'Non-Manglik'}
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed bg-stone-800/40 p-3 rounded-xl border border-stone-800">
                {kundli.doshas.manglik.details}
                {kundli.doshas.manglik.cancellationReason && (
                  <span className="block mt-1 text-emerald-400 font-semibold">
                    ✓ Cancellation: {kundli.doshas.manglik.cancellationReason}
                  </span>
                )}
              </p>

              <div>
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                  Recommended Remedies:
                </h5>
                <ul className="space-y-1 text-xs text-stone-300">
                  {kundli.doshas.manglik.remedies.map((rem, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Kaal Sarp Dosha Card */}
            <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base font-cinzel text-stone-100">Kaal Sarp Yoga / Dosha</h3>
                    <span className="text-xs text-stone-400">Rahu-Ketu Nodal Axis Hemming</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  kundli.doshas.kaalSarp.hasDosha
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {kundli.doshas.kaalSarp.hasDosha ? 'Dosha Present' : 'Not Present'}
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed bg-stone-800/40 p-3 rounded-xl border border-stone-800">
                {kundli.doshas.kaalSarp.details}
              </p>

              <div>
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                  Recommended Remedies:
                </h5>
                <ul className="space-y-1 text-xs text-stone-300">
                  {kundli.doshas.kaalSarp.remedies.map((rem, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Shani Sade Sati Status Card */}
            <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base font-cinzel text-stone-100">Shani Sade Sati & Dhaiya</h3>
                    <span className="text-xs text-stone-400">Saturn transit relative to natal Moon</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  {kundli.doshas.sadeSati.status}
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed bg-stone-800/40 p-3 rounded-xl border border-stone-800">
                {kundli.doshas.sadeSati.description}
              </p>

              <div>
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                  Protective Remedies:
                </h5>
                <ul className="space-y-1 text-xs text-stone-300">
                  {kundli.doshas.sadeSati.remedies.map((rem, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pitru Dosha Card */}
            <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base font-cinzel text-stone-100">Pitru Dosha & Ancestral Karma</h3>
                    <span className="text-xs text-stone-400">Sun & 9th House Affliction analysis</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  kundli.doshas.pitruDosha.hasDosha
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {kundli.doshas.pitruDosha.hasDosha ? 'Dosha Detected' : 'Clear / Auspicious'}
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed bg-stone-800/40 p-3 rounded-xl border border-stone-800">
                {kundli.doshas.pitruDosha.reason}
              </p>

              <div>
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                  Ancestral Peace Remedies:
                </h5>
                <ul className="space-y-1 text-xs text-stone-300">
                  {kundli.doshas.pitruDosha.remedies.map((rem, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
