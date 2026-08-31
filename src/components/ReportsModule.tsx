import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Download,
  Printer,
  CheckCircle2,
  FileText,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { KundliData } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface ReportsModuleProps {
  activeKundli?: KundliData | null;
  walletBalance: number;
  onPurchaseReport: (cost: number, reportTitle: string) => boolean;
}

export const ReportsModule: React.FC<ReportsModuleProps> = ({
  activeKundli,
  walletBalance,
  onPurchaseReport
}) => {
  const { t } = useTranslation();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [purchasedReports, setPurchasedReports] = useState<string[]>(['rep-1']);

  const reportCatalog = [
    {
      id: 'rep-1',
      title: 'Complete 50+ Page Vedic Life Horoscope',
      pages: '52 Pages',
      price: 499,
      isFree: true,
      desc: 'All divisional charts (D1 to D60), complete 120-year Vimshottari Dasha sequence, Ashtakvarga scores, and life roadmap.',
      features: ['D1 to D60 Charts', 'Full Dasha Timeline', 'Planetary Strengths (Shadbala)', 'Dosha Analysis & Remedies']
    },
    {
      id: 'rep-2',
      title: 'Career & Business Growth Dossier 2026-2030',
      pages: '28 Pages',
      price: 299,
      isFree: false,
      desc: 'Deep analysis of the 10th house (Karma Bhava), Dashamsha (D10) chart, favorable job change periods, promotion timing, and wealth accumulation.',
      features: ['D10 Dashamsha Deep Dive', 'Promotion & Job Change Windows', 'Business vs Employment Verdict', 'Wealth Planets Activation']
    },
    {
      id: 'rep-3',
      title: 'Marriage & Matrimonial Compatibility Dossier',
      pages: '34 Pages',
      price: 349,
      isFree: false,
      desc: 'Comprehensive 7th house (Kalatra Bhava), D9 Navamsha, Manglik balance, partner personality traits, and timing of marriage.',
      features: ['Spouse Appearance & Nature', 'Marriage Timing Windows', 'Manglik & Nadi Remedial Protocol', 'Post-Marriage Wealth Harmony']
    },
    {
      id: 'rep-4',
      title: 'Shani Sade Sati & Karmic Debt Protection Guide',
      pages: '22 Pages',
      price: 199,
      isFree: false,
      desc: 'Complete Saturn transit timeline for your Moon sign with customized remedial measures, charity routines, and protective mantras.',
      features: ['Exact Rising, Peak & Setting Dates', 'Remedial Vedic Puja Procedures', 'Auspicious Gemstone/Rudraksha Advice', 'Career & Health Safeguards']
    }
  ];

  const handleOrder = (rep: typeof reportCatalog[0]) => {
    if (rep.isFree || purchasedReports.includes(rep.id)) {
      setSelectedReport(rep.id);
      return;
    }

    if (walletBalance < rep.price) {
      alert(`Insufficient wallet balance. You need ₹${rep.price}. Please add money to your wallet.`);
      return;
    }

    const success = onPurchaseReport(rep.price, rep.title);
    if (success) {
      setPurchasedReports(prev => [...prev, rep.id]);
      setSelectedReport(rep.id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          Premium Vedic Astrology Reports
        </div>
        <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
          {t('astrologyReports')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2">
          Download, print, or review meticulously generated Vedic PDF dossiers based on your precise birth chart.
        </p>
      </div>

      {/* Catalog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCatalog.map(rep => {
          const isPurchased = purchasedReports.includes(rep.id);
          return (
            <div
              key={rep.id}
              className="bg-stone-900/90 border border-amber-500/20 hover:border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 flex flex-col justify-between transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700 text-[10px] font-bold uppercase">
                      {rep.pages}
                    </span>
                    <h3 className="font-bold text-lg font-cinzel text-amber-200 mt-2">
                      {rep.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    {rep.isFree ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                        FREE
                      </span>
                    ) : (
                      <span className="text-xl font-bold font-cinzel text-amber-300">
                        ₹{rep.price}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {rep.desc}
                </p>

                <div className="space-y-1.5 pt-2">
                  {rep.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800">
                <button
                  onClick={() => handleOrder(rep)}
                  className={`w-full py-3 rounded-2xl text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${
                    isPurchased || rep.isFree
                      ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20'
                      : 'bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 text-stone-950 shadow-amber-500/25'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{isPurchased || rep.isFree ? 'View / Download Report' : `Generate Dossier (₹${rep.price})`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generated Report Viewer Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95">
            
            {/* Viewer Header */}
            <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex justify-between items-center text-stone-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-base font-cinzel text-amber-200">
                  {reportCatalog.find(r => r.id === selectedReport)?.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-stone-700"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Print PDF</span>
                </button>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Viewer Report Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-200 text-xs sm:text-sm leading-relaxed">
              <div className="text-center pb-6 border-b border-stone-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">ASTRO APP VEDIC HOROSCOPE DOSSIER</span>
                <h2 className="text-xl sm:text-2xl font-black font-cinzel text-amber-200">
                  {activeKundli?.birthDetails.name || 'Aarav Sharma'}’s Comprehensive Astrological Blueprint
                </h2>
                <p className="text-stone-400 text-xs">
                  Born on {activeKundli?.birthDetails.dob || '1995-10-15'} at {activeKundli?.birthDetails.time || '08:30'} in {activeKundli?.birthDetails.place || 'New Delhi, India'}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-amber-300 font-cinzel">1. Executive Astrological Summary</h3>
                <p>
                  Your natal chart indicates an Ascendant (Lagna) in <strong>{activeKundli?.ascendant.sign || 'Scorpio'}</strong> with the Moon in <strong>{activeKundli?.moonSign.sign || 'Taurus'}</strong> ({activeKundli?.moonSign.nakshatra || 'Rohini'} Nakshatra, Pada {activeKundli?.moonSign.nakshatraPada || 2}). The primary planetary ruler is well-placed, giving immense inner resilience, creative intellect, and long-term strategic success.
                </p>

                <h3 className="font-bold text-sm text-amber-300 font-cinzel">2. Vimshottari Mahadasha Analysis (Current Period)</h3>
                <p>
                  You are currently progressing through the <strong>{activeKundli?.dasha.currentMahadasha || 'Jupiter'} Mahadasha</strong>. This period emphasizes wisdom expansion, educational growth, foreign connections, and financial stabilization.
                </p>

                <h3 className="font-bold text-sm text-amber-300 font-cinzel">3. Dosha Status & Recommendations</h3>
                <p>
                  - <strong>Manglik Dosha:</strong> {activeKundli?.doshas.manglik.isManglik ? 'Present (' + activeKundli?.doshas.manglik.severity + ')' : 'Clear / Non-Manglik'}.<br />
                  - <strong>Shani Sade Sati:</strong> {activeKundli?.doshas.sadeSati.status || 'Not in active peak'}.<br />
                  - <strong>Kaal Sarp Yoga:</strong> {activeKundli?.doshas.kaalSarp.hasDosha ? activeKundli?.doshas.kaalSarp.type : 'Clear'}.
                </p>

                <div className="p-4 bg-stone-950/80 rounded-2xl border border-amber-500/30 text-amber-200">
                  ✨ <strong>Prescribed Vedic Action:</strong> Perform regular Gayatri Mantra recitation and donate yellow lentils on Thursdays to maximize prosperity.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
