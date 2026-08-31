import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Search,
  Calendar,
  User,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const BlogModule: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const articles = [
    {
      id: 'art-1',
      title: 'How to Read Your Vedic Kundli: The 12 Bhavas and Planetary Lords Explained',
      category: 'Beginner Guide',
      author: 'Acharya Vidyadhar',
      date: 'Aug 24, 2026',
      readTime: '6 min read',
      excerpt: 'A step-by-step master guide to decoding the 12 houses (Bhavas), identifying your Lagna (Ascendant), and understanding planetary dignities.',
      imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'art-2',
      title: 'The Reality of Saturn Sade Sati: Why It Is a Period of Transformation, Not Fear',
      category: 'Planetary Transits',
      author: 'Dr. Meenakshi Sundaram',
      date: 'Aug 20, 2026',
      readTime: '8 min read',
      excerpt: 'Dispelling myths around Shani Sade Sati. Learn how Saturn acts as a compassionate guru burning away false ego and elevating true purpose.',
      imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'art-3',
      title: 'Demystifying 36 Gun Milan in Kundli Matching: Why Nadi and Bhakoot Matter Most',
      category: 'Matrimonial Astrology',
      author: 'Pt. Radheshyam Joshi',
      date: 'Aug 14, 2026',
      readTime: '5 min read',
      excerpt: 'Understand the biological and psychological significance of the 8 Ashtakoota pillars and when cancellations apply for happy marriage.',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&auto=format&fit=crop&q=80'
    }
  ];

  const faqs = [
    {
      q: 'What is the difference between Vedic Astrology and Western Astrology?',
      a: 'Vedic Astrology (Jyotish) uses the Sidereal Zodiac which accounts for the astronomical precession of equinoxes (Ayanamsa, ~24° offset). Western astrology uses the Tropical zodiac fixed to seasonal equinoxes. Vedic astrology places primary emphasis on the Ascendant (Lagna), Moon Sign (Rashi), and the precise Nakshatra Vimshottari Dasha timing system.'
    },
    {
      q: 'Why is exact birth time essential for accurate Kundli calculation?',
      a: 'The Ascendant (Lagna) changes zodiac signs every ~2 hours on average, and divisional charts (like D9 Navamsha and D60 Shashtiamsha) shift every few minutes. An accurate birth time ensures correct house placements and precise Mahadasha transitions.'
    },
    {
      q: 'What should I do if a Kundli indicates Manglik Dosha?',
      a: 'Manglik Dosha is a natural energetic placement of Mars (Kuja). Classical shastras provide numerous cancellation rules (such as Mars in own/exalted sign, aspect of Jupiter, or matching with a fellow Manglik partner). Furthermore, simple remedies like Kumbh Vivah, Hanuman Chalisa, or Tuesday fasting completely harmonize the energy.'
    },
    {
      q: 'How does the AI Vedic Astrologer work?',
      a: 'Our AI Vedic Astrologer computes your precise astronomical ephemeris (planetary degrees, nakshatras, dashas, and doshas) and grounds the generative intelligence strictly in classical Vedic texts like Brihat Parashara Hora Shastra to provide nuanced, personalized, and spiritually constructive readings.'
    }
  ];

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          Vedic Knowledge Base & Insights
        </div>
        <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
          {t('blogArticles')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2">
          Enlightening articles on planetary transits, how to read your horoscope, dosha remedies, and Vedic wisdom.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search astrology articles, topics, transits..."
          className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-700 rounded-2xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(art => (
          <div
            key={art.id}
            className="bg-stone-900/90 border border-amber-500/20 hover:border-amber-400/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all hover:scale-[1.01] group"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-stone-950">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-stone-900/80 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  {art.category}
                </span>
              </div>

              <div className="p-6 space-y-2.5">
                <div className="flex items-center gap-2 text-[10px] text-stone-400">
                  <span>{art.author}</span>
                  <span>•</span>
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="font-bold text-base font-cinzel text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1">
                Read Full Article <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-amber-400" />
          <div>
            <h3 className="text-xl font-bold font-cinzel text-amber-200">Frequently Asked Astrological Questions</h3>
            <p className="text-xs text-stone-400">Everything you need to know about Vedic astrology and horoscope calculations</p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-stone-800/60 rounded-2xl border border-stone-700/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center text-xs sm:text-sm font-bold text-stone-100 hover:text-amber-200"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-stone-300 leading-relaxed border-t border-stone-800/60 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
