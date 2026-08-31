import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { DASHA_REMEDIES_DATABASE, PlanetDashaRemedy } from '../data/dashaRemediesData';
import { KundliData } from '../types';
import {
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  CheckCircle2,
  BookOpen,
  Sun,
  Moon,
  Flame,
  Zap,
  Crown,
  Heart,
  Calendar,
  Layers,
  Search,
  ExternalLink
} from 'lucide-react';

interface DashaRemediesModuleProps {
  activeKundli?: KundliData | null;
  onExploreShop?: () => void;
  onNavigateToGurukul?: () => void;
}

const PLANET_KEYS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

const PLANET_ICONS: Record<string, string> = {
  Sun: '☀️',
  Moon: '🌙',
  Mars: '🔴',
  Mercury: '🟢',
  Jupiter: '🟡',
  Venus: '💎',
  Saturn: '🪐',
  Rahu: '🌑',
  Ketu: '☄️'
};

export const DashaRemediesModule: React.FC<DashaRemediesModuleProps> = ({
  activeKundli,
  onExploreShop,
  onNavigateToGurukul
}) => {
  const { language } = useTranslation();
  const isHi = language === 'hi';

  const userActiveMahadasha = activeKundli?.dasha?.currentMahadasha || 'Saturn';
  const userActiveAntardasha = activeKundli?.dasha?.currentAntardasha || 'Jupiter';
  const userLagnaSign = activeKundli?.lagna?.sign || 'Aries';

  const [selectedPlanet, setSelectedPlanet] = useState<string>(userActiveMahadasha);
  const [activeSubTab, setActiveSubTab] = useState<'gemstone' | 'sacred-paths' | 'daan-vrat' | 'rudraksha-yantra'>('gemstone');
  const [selectedPathId, setSelectedPathId] = useState<string>('');

  // Chanting Audio Simulator state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [chantCount, setChantCount] = useState<number>(0);

  const remedyData: PlanetDashaRemedy = DASHA_REMEDIES_DATABASE[selectedPlanet] || DASHA_REMEDIES_DATABASE['Sun'];

  useEffect(() => {
    if (remedyData.sacredPaths.length > 0) {
      setSelectedPathId(remedyData.sacredPaths[0].id);
    }
    setIsPlayingAudio(false);
    setAudioProgress(0);
  }, [selectedPlanet]);

  // Audio simulator interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setChantCount(c => c + 1);
            return 0;
          }
          return prev + 2;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  const activePath = remedyData.sacredPaths.find(p => p.id === selectedPathId) || remedyData.sacredPaths[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/90 via-stone-900 to-stone-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? 'दशा एवं वैदिक उपाय संहिता' : 'Dasha Remedies & Sacred Paths'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-amber-100 tracking-wide">
              {isHi ? 'दशा अनुसार कौन सा रत्न पहनें एवं कौन सा पाठ करें?' : 'Dasha Gemstone Rules & Mandatory Sacred Paths'}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
              {isHi
                ? 'अपनी सक्रिय महादशा के अनुसार प्रामाणिक रत्न, धारण विधि, धातु, उंगली, वर्जित रत्न एवं संकट निवारक सिद्ध स्तोत्र/पाठ का संपूर्ण विवरण।'
                : 'Prescription rules for Gemstones, wearing methods, forbidden pairs, and sacred Vedic Paths/Stotras for your running Mahadasha.'}
            </p>
          </div>

          {/* User's Active Dasha Badge */}
          {activeKundli && (
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/40 shadow-xl flex flex-col items-center justify-center text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400">
                {isHi ? 'आपकी वर्तमान दशा' : 'Your Running Dasha'}
              </span>
              <div className="flex items-center gap-2 font-cinzel font-bold text-amber-200 text-base sm:text-lg">
                <span>{PLANET_ICONS[userActiveMahadasha]} {userActiveMahadasha}</span>
                <span className="text-stone-500">/</span>
                <span>{userActiveAntardasha}</span>
              </div>
              <button
                onClick={() => setSelectedPlanet(userActiveMahadasha)}
                className="mt-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold border border-amber-500/30 transition-all"
              >
                {isHi ? 'मेरी दशा के उपाय देखें' : 'View My Dasha Remedies'}
              </button>
            </div>
          )}
        </div>

        {/* Planet Selection Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PLANET_KEYS.map(planetKey => {
            const isSelected = selectedPlanet === planetKey;
            const isUserRunningDasha = userActiveMahadasha === planetKey;
            return (
              <button
                key={planetKey}
                onClick={() => setSelectedPlanet(planetKey)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <span>{PLANET_ICONS[planetKey]}</span>
                <span>{isHi ? DASHA_REMEDIES_DATABASE[planetKey]?.planetHi : planetKey}</span>
                {isUserRunningDasha && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${isSelected ? 'bg-stone-950 text-amber-400' : 'bg-amber-500 text-stone-950'}`}>
                    {isHi ? 'सक्रिय' : 'Active'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Quick Profile of Chosen Planet */}
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl">
                {PLANET_ICONS[selectedPlanet]}
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  {remedyData.sanskritName}
                </span>
                <h2 className="text-xl font-bold font-cinzel text-amber-200">
                  {isHi ? remedyData.planetHi : remedyData.planet}
                </h2>
                <p className="text-xs text-stone-400">
                  {isHi ? `लग्न: ${userLagnaSign}` : `User Lagna: ${userLagnaSign}`}
                </p>
              </div>
            </div>

            {/* Navigation Tabs for Remedy Types */}
            <div className="space-y-2">
              {[
                { id: 'gemstone', label: isHi ? 'रत्न निर्धारण नियम' : 'Gemstone Prescription', icon: Crown },
                { id: 'sacred-paths', label: isHi ? 'अनिवार्य पवित्र पाठ / स्तोत्र' : 'Sacred Paths & Stotras', icon: BookOpen },
                { id: 'daan-vrat', label: isHi ? 'दान सामग्री एवं व्रत विधि' : 'Charity (Daan) & Vrats', icon: Calendar },
                { id: 'rudraksha-yantra', label: isHi ? 'रुद्राक्ष एवं यंत्र' : 'Rudraksha & Yantra', icon: ShieldCheck }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-md shadow-amber-500/10'
                        : 'text-stone-300 hover:bg-stone-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Incompatible Gemstone Warning Box */}
            <div className="bg-rose-950/30 border border-rose-500/40 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{isHi ? 'वर्जित रत्न संयोजन (सावधानी!)' : 'Strictly Incompatible Gems'}</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                {isHi
                  ? `इस महादशा/ग्रह के साथ भूलकर भी ${remedyData.gemstone.incompatibleGemsHi.join(', ')} न पहनें। इससे विपरीत परिणाम हो सकते हैं।`
                  : `Never wear ${remedyData.gemstone.incompatibleGems.join(', ')} together with this gemstone.`}
              </p>
            </div>
          </div>

          {/* Gurukul & Shop Shortcuts */}
          <div className="bg-gradient-to-br from-stone-900 to-amber-950/40 border border-amber-500/20 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-sm font-cinzel text-amber-200">
              {isHi ? 'ज्योतिष सीखें एवं अभिमंत्रित रत्न' : 'Learn More & Certified Store'}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {isHi
                ? 'हमारे वैदिक ज्योतिष गुरुकुल में 12 भावों और भविष्यवाणियों के गुप्त सूत्र सीखें या 100% सर्टिफाइड रत्न प्राप्त करें।'
                : 'Explore our Vedic Gurukul curriculum or order 100% lab-certified, energized gemstones.'}
            </p>
            <div className="flex flex-col gap-2">
              {onNavigateToGurukul && (
                <button
                  onClick={onNavigateToGurukul}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold flex items-center justify-between transition-colors"
                >
                  <span>{isHi ? 'ज्योतिष गुरुकुल मॉड्यूल' : 'Astrology Gurukul Module'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
              {onExploreShop && (
                <button
                  onClick={onExploreShop}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center justify-between transition-colors"
                >
                  <span>{isHi ? 'रत्न एवं रुद्राक्ष ई-स्टोर' : 'Astro Gems E-Store'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Detailed Remedy Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB 1: GEMSTONE RULES */}
          {activeSubTab === 'gemstone' && (
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-stone-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {isHi ? 'रत्न शास्त्र निर्देशिका' : 'Gemstone Prescription Protocol'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-cinzel text-amber-200 mt-1">
                  {isHi ? remedyData.gemstone.nameHi : remedyData.gemstone.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  {isHi ? remedyData.gemstone.rulesSummaryHi : remedyData.gemstone.rulesSummary}
                </p>
              </div>

              {/* Gemstone Specification Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: isHi ? 'उचित वजन (रत्ती)' : 'Ideal Weight (Ratti)',
                    value: remedyData.gemstone.idealCarat
                  },
                  {
                    label: isHi ? 'उचित धातु' : 'Ideal Metal',
                    value: isHi ? remedyData.gemstone.idealMetalHi : remedyData.gemstone.idealMetal
                  },
                  {
                    label: isHi ? 'धारण करने वाली उंगली' : 'Wearing Finger',
                    value: isHi ? remedyData.gemstone.wearingFingerHi : remedyData.gemstone.wearingFinger
                  },
                  {
                    label: isHi ? 'शुभ वार एवं पक्ष' : 'Auspicious Day & Phase',
                    value: isHi ? remedyData.gemstone.auspiciousDayHi : remedyData.gemstone.auspiciousDay
                  },
                  {
                    label: isHi ? 'प्राण-प्रतिष्ठा मुहूर्त' : 'Consecration Time',
                    value: isHi ? remedyData.gemstone.consecrationTimeHi : remedyData.gemstone.consecrationTime
                  },
                  {
                    label: isHi ? 'विकल्प / उपरत्न' : 'Substitute Gemstones',
                    value: isHi ? remedyData.gemstone.secondaryGemsHi.join(', ') : remedyData.gemstone.secondaryGems.join(', ')
                  }
                ].map((spec, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                      {spec.label}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-amber-100">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Consecration Mantra Box */}
              <div className="p-6 rounded-3xl bg-amber-950/30 border border-amber-500/30 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>{isHi ? 'रत्न प्राण-प्रतिष्ठा बीज मंत्र (108 जप)' : 'Consecration Beej Mantra (108 Chants)'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/20 text-center font-cinzel text-base sm:text-lg text-amber-200 font-bold">
                  {remedyData.gemstone.beejMantra}
                </div>
                <p className="text-xs text-stone-300 text-center">
                  {isHi
                    ? 'विधि: गंगाजल, कच्चे दूध और शहद से शुद्ध कर शुक्ल पक्ष के दिन 108 बार इस मंत्र का जाप करके धारण करें।'
                    : 'Method: Purify with Gangajal, raw milk, and honey. Chant the Beej mantra 108 times before wearing.'}
                </p>
              </div>

              {/* Benefic vs Malefic Lagna Lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isHi ? 'शुभ एवं कारक लग्न (पहन सकते हैं)' : 'Benefic Lagnas (Safe to Wear)'}</span>
                  </span>
                  <p className="text-xs text-stone-300">
                    {remedyData.gemstone.beneficLagnas.join(', ')}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{isHi ? 'अशुभ लग्न (परामर्श बिना न पहनें)' : 'Malefic Lagnas (Avoid Without Advice)'}</span>
                  </span>
                  <p className="text-xs text-stone-300">
                    {remedyData.gemstone.maleficLagnas.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SACRED PATHS & STOTRAS */}
          {activeSubTab === 'sacred-paths' && (
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-stone-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {isHi ? 'दशा शांति एवं संकट मोचन महापाठ' : 'Sacred Vedic Paths & Stotras'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-cinzel text-amber-200 mt-1">
                  {isHi ? `${remedyData.planetHi} दशा में अनिवार्य पाठ` : `Mandatory Recitations for ${remedyData.planet} Dasha`}
                </h3>
              </div>

              {/* Path Switcher Tabs */}
              <div className="flex flex-wrap gap-2">
                {remedyData.sacredPaths.map(path => (
                  <button
                    key={path.id}
                    onClick={() => setSelectedPathId(path.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedPathId === path.id
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    {isHi ? path.nameHi : path.name}
                  </button>
                ))}
              </div>

              {/* Active Path Details */}
              {activePath && (
                <div className="space-y-6">
                  {/* Summary & Timings Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase font-bold">
                        {isHi ? 'आवृत्ति (संख्या)' : 'Frequency'}
                      </span>
                      <p className="text-xs font-bold text-amber-200">
                        {isHi ? activePath.frequencyHi : activePath.frequency}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase font-bold">
                        {isHi ? 'उचित समय व विधि' : 'Timing & Puja'}
                      </span>
                      <p className="text-xs font-bold text-amber-200">
                        {isHi ? activePath.timingHi : activePath.timing}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase font-bold">
                        {isHi ? 'अलौकिक लाभ' : 'Spiritual Benefits'}
                      </span>
                      <p className="text-xs font-bold text-amber-200 truncate">
                        {isHi ? activePath.benefitsHi : activePath.benefits}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Chanting Player Simulator */}
                  <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-stone-950 to-stone-900 border border-amber-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow-lg transition-all"
                        >
                          {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                        </button>
                        <div>
                          <span className="text-xs font-bold text-amber-200 block">
                            {isHi ? 'वैदिक मंत्र जाप सिमुलेटर' : 'Vedic Chanting Simulator'}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {isHi ? `जाप संख्या: ${chantCount} बार` : `Chant Count: ${chantCount} times`}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsPlayingAudio(false);
                          setAudioProgress(0);
                          setChantCount(0);
                        }}
                        className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-stone-200"
                        title="Reset counter"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-300"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Full Sanskrit Lyrics Box */}
                  <div className="p-6 rounded-3xl bg-stone-950 border border-amber-500/20 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>{isHi ? 'मूल संस्कृत श्लोक एवं स्तोत्र' : 'Authentic Sanskrit Verses'}</span>
                    </h4>
                    <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 font-serif text-xs sm:text-sm text-amber-100 leading-loose whitespace-pre-line text-center">
                      {activePath.fullLyricsSanskrit}
                    </div>
                  </div>

                  {/* Hindi & English Meaning */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-amber-400">
                        {isHi ? 'भावार्थ (सरल हिंदी)' : 'Hindi Meaning'}
                      </span>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {activePath.hindiMeaning}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-amber-400">
                        {isHi ? 'अंग्रेजी अनुवाद' : 'English Translation'}
                      </span>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {activePath.englishMeaning}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DAAN & VRAT */}
          {activeSubTab === 'daan-vrat' && (
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-stone-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {isHi ? 'वैदिक दान एवं व्रत अनुष्ठान' : 'Remedial Charity & Fasting Rituals'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-cinzel text-amber-200 mt-1">
                  {isHi ? `${remedyData.planetHi} के लिए दान एवं व्रत` : `Daan & Vrat for ${remedyData.planet}`}
                </h3>
              </div>

              {/* Daan Items */}
              <div className="p-6 rounded-3xl bg-stone-950 border border-amber-500/20 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {isHi ? 'दान की जाने वाली पवित्र वस्तुएं' : 'Sacred Charity Items (Daan)'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(isHi ? remedyData.daanUpay.itemsHi : remedyData.daanUpay.items).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-xs">
                    <strong className="text-amber-300 block">{isHi ? 'दान का शुभ वार:' : 'Day of Charity:'}</strong>
                    <span className="text-stone-300">{isHi ? remedyData.daanUpay.dayHi : remedyData.daanUpay.day}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-xs">
                    <strong className="text-amber-300 block">{isHi ? 'दान के पात्र:' : 'Recipient:'}</strong>
                    <span className="text-stone-300">{isHi ? remedyData.daanUpay.recipientHi : remedyData.daanUpay.recipient}</span>
                  </div>
                </div>
              </div>

              {/* Vrat Section */}
              <div className="p-6 rounded-3xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {isHi ? 'व्रत संकल्प एवं विधि' : 'Fasting Procedure'}
                </h4>
                <h5 className="font-bold text-base font-cinzel text-amber-200">
                  {isHi ? remedyData.vratUpay.nameHi : remedyData.vratUpay.name}
                </h5>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isHi ? remedyData.vratUpay.procedureHi : remedyData.vratUpay.procedure}
                </p>
                <div className="text-[11px] text-amber-300 font-medium">
                  {isHi ? `संकल्प अवधि: ${remedyData.vratUpay.duration}` : `Duration: ${remedyData.vratUpay.duration}`}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RUDRAKSHA & YANTRA */}
          {activeSubTab === 'rudraksha-yantra' && (
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-stone-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {isHi ? 'दिव्य रुद्राक्ष एवं प्राण प्रतिष्ठित यंत्र' : 'Sacred Rudraksha & Yantras'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-cinzel text-amber-200 mt-1">
                  {isHi ? `${remedyData.planetHi} सुरक्षा कवच` : `Protection Shield for ${remedyData.planet}`}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Rudraksha Card */}
                <div className="p-6 rounded-3xl bg-stone-950 border border-amber-500/20 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
                    📿
                  </div>
                  <h4 className="font-bold text-base font-cinzel text-amber-200">
                    {isHi ? remedyData.rudraksha.mukhiHi : remedyData.rudraksha.mukhi}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {isHi ? remedyData.rudraksha.benefitHi : remedyData.rudraksha.benefit}
                  </p>
                </div>

                {/* Yantra Card */}
                <div className="p-6 rounded-3xl bg-stone-950 border border-amber-500/20 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
                    ☸️
                  </div>
                  <h4 className="font-bold text-base font-cinzel text-amber-200">
                    {isHi ? remedyData.yantra.nameHi : remedyData.yantra.name}
                  </h4>
                  <p className="text-xs text-stone-300">
                    <strong className="text-amber-400">{isHi ? 'स्थापना दिशा: ' : 'Placement Direction: '}</strong>
                    {isHi ? remedyData.yantra.directionHi : remedyData.yantra.direction}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
