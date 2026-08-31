import React, { useState } from 'react';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { KundliModule } from './components/KundliModule';
import { MatchmakingModule } from './components/MatchmakingModule';
import { HoroscopeModule } from './components/HoroscopeModule';
import { PanchangModule } from './components/PanchangModule';
import { AIAstrologerModule } from './components/AIAstrologerModule';
import { TarotModule } from './components/TarotModule';
import { NumerologyModule } from './components/NumerologyModule';
import { AstrologerMarketplace } from './components/AstrologerMarketplace';
import { RemediesModule } from './components/RemediesModule';
import { ReportsModule } from './components/ReportsModule';
import { EcommerceModule } from './components/EcommerceModule';
import { MuhuratModule } from './components/MuhuratModule';
import { FestivalModule } from './components/FestivalModule';
import { BlogModule } from './components/BlogModule';
import { AstrologyAcademyModule } from './components/AstrologyAcademyModule';
import { DashaRemediesModule } from './components/DashaRemediesModule';
import { UserDashboard } from './components/UserDashboard';
import { AstrologerDashboard, AdminDashboard } from './components/AstrologerDashboard';
import { Footer } from './components/Footer';
import { calculateKundli } from './services/astrology/ephemeris';
import { BirthDetails, KundliData, UserRole } from './types';
import {
  Sparkles,
  Compass,
  Heart,
  Calendar,
  Sun,
  Coins,
  ShieldCheck,
  BookOpen,
  ShoppingBag,
  ArrowRight,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

const DEFAULT_BIRTH_DETAILS: BirthDetails = {
  name: 'Aarav Sharma',
  gender: 'male',
  dob: '1995-10-15',
  time: '08:30',
  place: 'New Delhi, India',
  latitude: 28.6139,
  longitude: 77.2090,
  timezone: 5.5
};

const MainContent: React.FC = () => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [walletBalance, setWalletBalance] = useState<number>(500); // starts with ₹500
  const [activeKundli, setActiveKundli] = useState<KundliData | null>(() =>
    calculateKundli(DEFAULT_BIRTH_DETAILS)
  );

  const handleGenerateKundli = (details: BirthDetails) => {
    const calculated = calculateKundli(details);
    setActiveKundli(calculated);
    setActiveTab('kundli');
  };

  const handleAddWalletBalance = (amount: number) => {
    setWalletBalance(prev => prev + amount);
  };

  const handleDeductWalletBalance = (amount: number): boolean => {
    if (walletBalance >= amount) {
      setWalletBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        walletBalance={walletBalance}
        onAddMoney={handleAddWalletBalance}
        userRole={userRole}
        onRoleChange={setUserRole}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <HeroSection
              onGenerateKundli={handleGenerateKundli}
              onNavigate={setActiveTab}
            />

            {/* Quick Interactive Highlights Bento Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Comprehensive Vedic Astrology Suite
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-200 mt-1">
                  10 Authentic Astrological Portals
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 mt-2">
                  Choose from precision mathematical horoscope computations to 24/7 AI consultations and verified masters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: t('kundliAnalysis'),
                    desc: 'High-precision D1 to D60 charts, Shadbala, Ashtakvarga, and 120-year Vimshottari Mahadashas.',
                    tab: 'kundli',
                    icon: '☸️',
                    accent: 'from-amber-600 to-yellow-500'
                  },
                  {
                    title: language === 'hi' ? 'ज्योतिष सीखें एवं भविष्यफल' : 'Learn Astrology & Prediction',
                    desc: language === 'hi' ? '12 भाव, नवग्रह, युति, विंशोत्तरी दशा एवं सटीक भविष्य कथन के शास्त्रीय सूत्र सीखें।' : 'Master 12 Bhavas, 9 Grahas, Yogas, Dasha timing and classical prediction formulas.',
                    tab: 'learning',
                    icon: '📖',
                    accent: 'from-blue-600 to-cyan-500'
                  },
                  {
                    title: language === 'hi' ? 'दशा अनुसार रत्न व पाठ' : 'Dasha Gemstones & Sacred Paths',
                    desc: language === 'hi' ? 'अपनी सक्रिय महादशा के अनुसार प्रामाणिक रत्न, धातु, उंगली, वर्जित रत्न एवं संकट निवारक स्तोत्र पाठ।' : 'Exact gemstone prescription rules, metals, fingers, incompatible gems, and sacred Stotras.',
                    tab: 'dasha-remedies',
                    icon: '🛡️',
                    accent: 'from-amber-600 to-emerald-500'
                  },
                  {
                    title: t('gunMilan'),
                    desc: 'Comprehensive 36 Gunas Ashtakoota compatibility with Nadi, Bhakoot, and Manglik Dosha matching.',
                    tab: 'matchmaking',
                    icon: '❤️',
                    accent: 'from-rose-600 to-pink-500'
                  },
                  {
                    title: t('aiVedicAstrologer'),
                    desc: 'Conversational Vedic Sage grounded in real planetary ephemeris and Brihat Parashara Hora Shastra.',
                    tab: 'ai-astrologer',
                    icon: '🧘',
                    accent: 'from-purple-600 to-indigo-500'
                  },
                  {
                    title: t('dailyPanchang'),
                    desc: 'Real-time Tithi, Nakshatra, Yoga, Karana, Abhijit Muhurat, Rahu Kaal, and Choghadiya timings.',
                    tab: 'panchang',
                    icon: '☀️',
                    accent: 'from-amber-600 to-orange-500'
                  }
                ].map(feature => (
                  <div
                    key={feature.tab}
                    onClick={() => setActiveTab(feature.tab)}
                    className="cursor-pointer group p-6 bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 rounded-3xl shadow-xl flex flex-col justify-between transition-all hover:scale-[1.02]"
                  >
                    <div>
                      <div className="text-3xl mb-3">{feature.icon}</div>
                      <h3 className="font-bold text-base font-cinzel text-stone-100 group-hover:text-amber-200 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>Explore Portal</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'kundli' && (
          <KundliModule
            kundli={activeKundli}
            activeKundli={activeKundli}
            onUpdateBirthDetails={handleGenerateKundli}
            onAskAI={() => setActiveTab('ai-astrologer')}
            onNavigateToDashaRemedies={() => setActiveTab('dasha-remedies')}
            onNavigateToLearning={() => setActiveTab('learning')}
          />
        )}

        {activeTab === 'learning' && (
          <AstrologyAcademyModule
            onNavigateToDashaRemedies={() => setActiveTab('dasha-remedies')}
            onNavigateToKundli={() => setActiveTab('kundli')}
          />
        )}

        {activeTab === 'dasha-remedies' && (
          <DashaRemediesModule
            activeKundli={activeKundli}
            onExploreShop={() => setActiveTab('shop')}
            onNavigateToGurukul={() => setActiveTab('learning')}
          />
        )}

        {activeTab === 'matchmaking' && <MatchmakingModule />}

        {activeTab === 'horoscope' && <HoroscopeModule />}

        {activeTab === 'panchang' && <PanchangModule />}

        {activeTab === 'ai-astrologer' && (
          <AIAstrologerModule activeKundli={activeKundli} />
        )}

        {activeTab === 'marketplace' && (
          <AstrologerMarketplace
            walletBalance={walletBalance}
            onDeductBalance={handleDeductWalletBalance}
          />
        )}

        {activeTab === 'tarot' && <TarotModule />}

        {activeTab === 'numerology' && <NumerologyModule />}

        {activeTab === 'muhurat' && <MuhuratModule />}

        {activeTab === 'remedies' && (
          <RemediesModule onExploreShop={() => setActiveTab('shop')} />
        )}

        {activeTab === 'reports' && (
          <ReportsModule
            activeKundli={activeKundli}
            walletBalance={walletBalance}
            onPurchaseReport={(cost, title) => handleDeductWalletBalance(cost)}
          />
        )}

        {activeTab === 'shop' && (
          <EcommerceModule
            walletBalance={walletBalance}
            onDeductBalance={handleDeductWalletBalance}
          />
        )}

        {activeTab === 'festivals' && <FestivalModule />}

        {activeTab === 'blog' && <BlogModule />}

        {(activeTab === 'dashboard' ||
          activeTab === 'user-dashboard' ||
          activeTab === 'astrologer-dashboard' ||
          activeTab === 'admin-dashboard') && (
          <>
            {(userRole === 'user' || activeTab === 'user-dashboard') && (
              <UserDashboard
                walletBalance={walletBalance}
                activeKundli={activeKundli}
                onSelectTab={setActiveTab}
                onAddMoney={handleAddWalletBalance}
              />
            )}
            {(userRole === 'astrologer' || activeTab === 'astrologer-dashboard') && (
              <AstrologerDashboard />
            )}
            {(userRole === 'admin' || activeTab === 'admin-dashboard') && (
              <AdminDashboard />
            )}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
