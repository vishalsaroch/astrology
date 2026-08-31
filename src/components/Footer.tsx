import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Globe,
  Heart,
  Mail,
  Phone,
  Lock
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { Language } from '../types';

interface FooterProps {
  onSelectTab: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { language, setLanguage, t } = useTranslation();

  const allLanguages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' }
  ];

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Sanskrit Shloka */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center text-amber-400 font-black font-cinzel text-sm">
                  ॐ
                </div>
              </div>
              <span className="font-extrabold text-base font-cinzel text-amber-200 tracking-wider">
                ASTRO APP
              </span>
            </div>

            <p className="text-stone-400 text-[11px] leading-relaxed">
              India's premier 10-Language Vedic Astrology, Real-Time Ephemeris Kundli, Gun Milan & Jyotish Platform.
            </p>

            <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800 text-[11px] text-amber-300 font-cinzel">
              ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥
            </div>
          </div>

          {/* Col 2: Astrological Modules */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300 font-cinzel">Astrological Services</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => onSelectTab('kundli')} className="hover:text-amber-200 transition-colors">Vedic Kundli & D1-D60 Charts</button></li>
              <li><button onClick={() => onSelectTab('matchmaking')} className="hover:text-amber-200 transition-colors">36 Gun Milan Matchmaking</button></li>
              <li><button onClick={() => onSelectTab('panchang')} className="hover:text-amber-200 transition-colors">Daily Vedic Panchang & Choghadiya</button></li>
              <li><button onClick={() => onSelectTab('horoscope')} className="hover:text-amber-200 transition-colors">Daily & Monthly Rashi Horoscope</button></li>
              <li><button onClick={() => onSelectTab('muhurat')} className="hover:text-amber-200 transition-colors">Shubh Vivah & Griha Muhurat</button></li>
            </ul>
          </div>

          {/* Col 3: Mystical & Consultations */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300 font-cinzel">Mystic & Consultations</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => onSelectTab('ai-astrologer')} className="hover:text-amber-200 transition-colors">Acharya Devavrata (AI Astrologer)</button></li>
              <li><button onClick={() => onSelectTab('marketplace')} className="hover:text-amber-200 transition-colors">Talk / Chat with Verified Astrologers</button></li>
              <li><button onClick={() => onSelectTab('tarot')} className="hover:text-amber-200 transition-colors">78-Card Tarot Deck & Oracle Spreads</button></li>
              <li><button onClick={() => onSelectTab('numerology')} className="hover:text-amber-200 transition-colors">Chaldean & Pythagorean Numerology</button></li>
              <li><button onClick={() => onSelectTab('shop')} className="hover:text-amber-200 transition-colors">Certified Gemstones & Rudraksha Shop</button></li>
            </ul>
          </div>

          {/* Col 4: Trust & Language Switcher */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300 font-cinzel">10 Languages Supported</h4>
            <div className="flex flex-wrap gap-1.5">
              {allLanguages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    language === l.code
                      ? 'bg-amber-500 text-stone-950 font-black'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2 text-[10px] text-stone-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-bit SSL Encrypted • 100% Privacy</span>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 border-t border-stone-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-stone-400">
          <p>© {new Date().getFullYear()} ASTRO APP. All Vedic algorithms adhere strictly to Brihat Parashara Hora Shastra principles.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onSelectTab('blog')} className="hover:text-amber-300">Vedic FAQ & Guides</button>
            <span>•</span>
            <button onClick={() => onSelectTab('remedies')} className="hover:text-amber-300">Mantras & Remedies</button>
            <span>•</span>
            <button onClick={() => onSelectTab('festivals')} className="hover:text-amber-300">Festivals Calendar</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
