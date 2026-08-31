import React, { useState } from 'react';
import {
  Sparkles,
  Globe,
  Wallet,
  User,
  ShieldCheck,
  Compass,
  Moon,
  Heart,
  Calendar,
  BookOpen,
  ShoppingBag,
  Sparkle,
  PhoneCall,
  Menu,
  X,
  Check,
  Coins
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onSelectTab?: (tab: string) => void;
  walletBalance?: number;
  onAddMoney?: (amount: number) => void;
  userRole?: UserRole;
  currentRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  setCurrentRole?: (role: UserRole) => void;
  appName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'home',
  setActiveTab: propSetActiveTab,
  onSelectTab,
  walletBalance = 500,
  onAddMoney = (_amount: number) => {},
  userRole,
  currentRole: propCurrentRole,
  onRoleChange,
  setCurrentRole: propSetCurrentRole,
  appName = 'ASTRO APP'
}) => {
  const setActiveTab = propSetActiveTab || onSelectTab || (() => {});
  const currentRole = propCurrentRole || userRole || 'user';
  const setCurrentRole = propSetCurrentRole || onRoleChange || (() => {});

  const { language, setLanguage, languages, currentLangMeta, t } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState<number>(500);

  const isHi = language === 'hi';

  const navLinks = [
    { id: 'kundli', label: isHi ? 'कुंडली' : 'Kundli', icon: Compass },
    { id: 'learning', label: isHi ? 'ज्योतिष सीखें' : 'Learn Astrology', icon: BookOpen, badge: 'New' },
    { id: 'dasha-remedies', label: isHi ? 'दशा रत्न व पाठ' : 'Dasha Gems & Paths', icon: ShieldCheck, badge: 'Vedic' },
    { id: 'horoscope', label: isHi ? 'राशिफल' : 'Horoscope', icon: Moon },
    { id: 'matchmaking', label: isHi ? 'गुण मिलान' : 'Gun Milan', icon: Heart },
    { id: 'panchang', label: isHi ? 'पंचांग' : 'Panchang', icon: Calendar },
    { id: 'ai-astrologer', label: isHi ? 'AI ज्योतिषी' : 'AI Astrologer', icon: Sparkles, badge: 'AI' },
    { id: 'marketplace', label: isHi ? 'ज्योतिषी परामर्श' : 'Astrologers', icon: PhoneCall, badge: 'Live' },
    { id: 'tarot', label: isHi ? 'टैरो' : 'Tarot', icon: Sparkle },
    { id: 'numerology', label: isHi ? 'अंकशास्त्र' : 'Numerology', icon: Coins },
    { id: 'muhurat', label: isHi ? 'मुहूर्त' : 'Muhurat', icon: Calendar },
    { id: 'reports', label: isHi ? 'रिपोर्ट्स' : 'Reports', icon: BookOpen },
    { id: 'remedies', label: isHi ? 'वैदिक उपाय' : 'Remedies', icon: ShieldCheck },
    { id: 'shop', label: isHi ? 'आस्ट्रो शॉप' : 'Shop', icon: ShoppingBag }
  ];

  const handleRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (rechargeAmount > 0) {
      onAddMoney(rechargeAmount);
      setIsWalletModalOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-amber-500/20 text-stone-100 shadow-lg shadow-black/20">
      {/* Top Banner / Ticker */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 text-amber-100 text-xs px-4 py-1.5 flex justify-between items-center border-b border-amber-500/30">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-amber-200">
            ☀️ {t('dailyPanchang')}: Bhadrapada Shukla Paksha | Abhijit Muhurat: 11:54 AM - 12:46 PM
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-medium">
          <span className="text-amber-200/90">📞 Live Astrologers Available</span>
          <span className="text-amber-300">|</span>
          <span className="text-amber-200/90">🛡️ 100% Verified Vedic Astrologers</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-400 p-0.5 shadow-md shadow-amber-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 bg-clip-text text-transparent font-cinzel">
                  ॐ
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-wider font-cinzel text-amber-100 uppercase">
                  {appName}
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                  VEDIC
                </span>
              </div>
              <p className="text-[10px] text-stone-400 hidden sm:block tracking-wide">
                Kundli • Horoscope • Matchmaking
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 7).map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                      : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500 text-stone-950 font-bold">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* More Menu for additional portals */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsMoreOpen(!isMoreOpen);
                  setIsLangOpen(false);
                  setIsRoleOpen(false);
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  navLinks.slice(7).some(l => l.id === activeTab)
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
                }`}
              >
                <span>{isHi ? 'अन्य सेवाएं ▼' : 'More ▼'}</span>
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-800">
                    {isHi ? 'वैदिक ज्योतिष सेवाएं' : 'More Vedic Portals'}
                  </div>
                  {navLinks.slice(7).map(link => {
                    const Icon = link.icon;
                    const isActive = activeTab === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => {
                          setActiveTab(link.id);
                          setIsMoreOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                          isActive
                            ? 'bg-amber-500/20 text-amber-300 font-semibold'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-amber-400" />
                          <span>{link.label}</span>
                        </div>
                        {link.badge && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500 text-stone-950 font-bold">
                            {link.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons: Language, Wallet, Role Switcher, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsRoleOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-800/80 hover:bg-stone-800 text-stone-200 rounded-lg text-xs font-medium border border-stone-700 transition-colors shadow-sm"
                title="Change Language"
              >
                <span className="text-sm">{currentLangMeta.flag}</span>
                <span className="hidden md:inline font-semibold">{currentLangMeta.nativeName}</span>
                <Globe className="w-3.5 h-3.5 text-amber-400" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-stone-900 border border-amber-500/30 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-800">
                    Select Language (10 Languages)
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {languages.map(l => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                          language === l.code
                            ? 'bg-amber-500/20 text-amber-300 font-semibold'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{l.flag}</span>
                          <span>{l.nativeName}</span>
                          <span className="text-[10px] text-stone-500">({l.name})</span>
                        </div>
                        {language === l.code && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wallet Button */}
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-amber-600/30 to-yellow-600/20 hover:from-amber-600/40 hover:to-yellow-600/30 text-amber-200 border border-amber-500/40 rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <Wallet className="w-3.5 h-3.5 text-amber-400" />
              <span>₹{walletBalance}</span>
              <span className="hidden sm:inline text-[10px] bg-amber-500 text-stone-950 font-bold px-1.5 py-0.2 rounded">
                + Add
              </span>
            </button>

            {/* Role Switcher (User / Astrologer / Admin) */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsRoleOpen(!isRoleOpen);
                  setIsLangOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700/80 text-stone-300 rounded-lg text-xs font-medium border border-stone-700 transition-colors"
                title="Switch Dashboard Role"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="capitalize font-semibold">{currentRole}</span>
              </button>

              {isRoleOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-stone-900 border border-amber-500/30 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-800">
                    Switch Workspace Role
                  </div>
                  {[
                    { role: 'user', label: 'User Dashboard', icon: User },
                    { role: 'astrologer', label: 'Astrologer Portal', icon: Sparkles },
                    { role: 'admin', label: 'Admin Console', icon: ShieldCheck }
                  ].map(item => (
                    <button
                      key={item.role}
                      onClick={() => {
                        setCurrentRole(item.role as UserRole);
                        setActiveTab(item.role === 'user' ? 'user-dashboard' : (item.role === 'astrologer' ? 'astrologer-dashboard' : 'admin-dashboard'));
                        setIsRoleOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left ${
                        currentRole === item.role
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'text-stone-300 hover:bg-stone-800 hover:text-amber-200'
                      }`}
                    >
                      <span>{item.label}</span>
                      {currentRole === item.role && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-stone-900 border-b border-amber-500/20 px-4 pt-2 pb-4 space-y-1">
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Wallet Recharge Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-stone-900 border border-amber-500/30 rounded-2xl max-w-md w-full p-6 text-stone-100 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsWalletModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-200 font-cinzel">Add Funds to Astro Wallet</h3>
                <p className="text-xs text-stone-400">Instant balance for consultations, reports & shop</p>
              </div>
            </div>

            <div className="p-3.5 bg-stone-800/80 rounded-xl border border-stone-700/80 mb-4 flex justify-between items-center">
              <span className="text-xs text-stone-300">Current Balance:</span>
              <span className="text-lg font-bold text-amber-400">₹{walletBalance}</span>
            </div>

            <form onSubmit={handleRecharge} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Select or Enter Amount (INR)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[200, 500, 1000, 2000].map(amt => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setRechargeAmount(amt)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        rechargeAmount === amt
                          ? 'bg-amber-500 text-stone-950 border-amber-400'
                          : 'bg-stone-800 text-stone-200 border-stone-700 hover:border-amber-500/50'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-stone-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={rechargeAmount}
                    onChange={e => setRechargeAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 font-semibold focus:outline-none focus:border-amber-500"
                    placeholder="Enter Custom Amount"
                    required
                  />
                </div>
              </div>

              {/* Simulated Gateway Options */}
              <div className="p-3 bg-stone-800/50 rounded-xl border border-stone-700 text-xs space-y-2 text-stone-300">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure 256-bit Encrypted Checkout
                  </span>
                  <span className="text-[10px] text-stone-400">Razorpay / Stripe</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Instant credit to your balance. Safe, refundable, and verified transactions.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsWalletModalOpen(false)}
                  className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-bold rounded-xl text-xs shadow-md shadow-amber-500/20"
                >
                  Proceed to Pay ₹{rechargeAmount}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
