import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  Gem,
  CheckCircle2,
  BookOpen,
  ShoppingBag
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const RemediesModule: React.FC<{ onExploreShop?: () => void }> = ({ onExploreShop }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<'mantra' | 'gemstone' | 'rudraksha' | 'yantra' | 'puja'>('mantra');
  const [playingMantra, setPlayingMantra] = useState<string | null>(null);

  const mantras = [
    {
      id: 'm1',
      name: 'Gayatri Mantra (Rigveda 3.62.10)',
      deity: 'Savitr / Lord Surya',
      sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
      meaning: 'We meditate on the supreme effulgence of the divine creator; may the cosmic light illuminate our intellect and dispel all darkness.',
      chants: '108 Times daily at sunrise',
      benefits: 'Supreme mental clarity, intellect (Buddhi), peace, and dispelling of solar afflictions.'
    },
    {
      id: 'm2',
      name: 'Maha Mrityunjaya Mantra (Rigveda 7.59.12)',
      deity: 'Lord Shiva / Mahadeva',
      sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
      meaning: 'We worship the Three-Eyed Lord who is fragrant and nourishes all beings. May He liberate us from death and bondage to immortality.',
      chants: '108 Times using Rudraksha Mala',
      benefits: 'Protects from untimely accidents, alleviates chronic diseases, and calms Rahu/Ketu/Saturn afflictions.'
    },
    {
      id: 'm3',
      name: 'Shree Suktam (Rigveda Khila)',
      deity: 'Goddess Mahalakshmi',
      sanskrit: 'ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम् । चन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह ॥',
      meaning: 'O Agni, invoke for me Goddess Lakshmi, of golden hue, brilliant like the moon, bedecked with gold and silver garlands.',
      chants: '16 Stanzas on Fridays or Diwali',
      benefits: 'Attracts prosperity, wealth abundance, business prosperity, and cleanses poverty karma.'
    },
    {
      id: 'm4',
      name: 'Shani Gayatri & Beej Mantra',
      deity: 'Lord Shani Dev (Saturn)',
      sanskrit: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ॥ ॐ काकध्वजाय विद्महे खड्गहस्ताय धीमहि तन्नो मन्दः प्रचोदयात् ॥',
      meaning: 'Salutations to Lord Saturn, the slow-moving dispeller of arrogance and dispenser of karmic justice.',
      chants: '108 Times on Saturdays wearing dark clothes',
      benefits: 'Pacifies Sade Sati, Dhaiya, and Saturn retrograde hardships.'
    }
  ];

  const gemstones = [
    {
      name: 'Natural Ruby (Manikya)',
      planet: 'Sun (Surya)',
      metal: 'Gold / Copper',
      finger: 'Ring Finger (Right Hand)',
      dayTime: 'Sunday Sunrise',
      benefits: 'Elevates leadership power, governmental favor, vitality, and father’s blessings.'
    },
    {
      name: 'Yellow Sapphire (Pukhraj)',
      planet: 'Jupiter (Guru / Brihaspati)',
      metal: 'Gold / Brass',
      finger: 'Index Finger (Right Hand)',
      dayTime: 'Thursday Morning during Shukla Paksha',
      benefits: 'Expands spiritual wisdom, wealth, marital happiness, and academic excellence.'
    },
    {
      name: 'Blue Sapphire (Neelam)',
      planet: 'Saturn (Shani)',
      metal: 'Silver / Panchdhatu',
      finger: 'Middle Finger (Right Hand)',
      dayTime: 'Saturday Evening',
      benefits: 'Instantaneous focus, discipline, protection against enemies, and rapid career breakthroughs.'
    },
    {
      name: 'Emerald (Panna)',
      planet: 'Mercury (Budha)',
      metal: 'Gold / Silver',
      finger: 'Little Finger (Right Hand)',
      dayTime: 'Wednesday Sunrise',
      benefits: 'Boosts communication skills, stock trading, memory, and business acumen.'
    }
  ];

  const rudrakshas = [
    { mukhi: '1 Mukhi (Ekamukhi)', deity: 'Lord Shiva', rulingPlanet: 'Sun', benefits: 'Supreme consciousness, detachment, leadership, and liberation.' },
    { mukhi: '2 Mukhi (Do-Mukhi)', deity: 'Ardhanarishvara', rulingPlanet: 'Moon', benefits: 'Marital unity, emotional peace, and harmonious relationships.' },
    { mukhi: '5 Mukhi (Pancha-Mukhi)', deity: 'Kalagni Rudra', rulingPlanet: 'Jupiter', benefits: 'All-round health, blood pressure regulation, and mental tranquility.' },
    { mukhi: '7 Mukhi (Sapta-Mukhi)', deity: 'Goddess Mahalakshmi', rulingPlanet: 'Venus / Saturn', benefits: 'Financial abundance, relief from debt, and sudden prosperity.' },
    { mukhi: '14 Mukhi (Deva Mani)', deity: 'Lord Hanuman', rulingPlanet: 'Mars & Saturn', benefits: 'Awakens sixth sense, invincibility, and removes extreme planetary curses.' }
  ];

  const handleAudioToggle = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (playingMantra === id) {
        window.speechSynthesis.cancel();
        setPlayingMantra(null);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.onend = () => setPlayingMantra(null);
        utterance.onerror = () => setPlayingMantra(null);
        setPlayingMantra(id);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          Vedic Shastra Remedies & Upayas
        </div>
        <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
          {t('remedies')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2">
          Time-tested mantras, gemstone wearing guidelines, sacred rudrakshas, yantras, and remedial pujas.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {[
          { id: 'mantra', label: 'Sacred Mantras' },
          { id: 'gemstone', label: 'Ratna (Gemstones)' },
          { id: 'rudraksha', label: 'Rudraksha Beads' },
          { id: 'yantra', label: 'Vedic Yantras' },
          { id: 'puja', label: 'Remedial Pujas' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* CATEGORY 1: MANTRAS */}
      {activeCategory === 'mantra' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mantras.map(m => (
            <div key={m.id} className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold font-cinzel text-base text-amber-200">{m.name}</h3>
                    <span className="text-xs text-stone-400">Presiding Deity: {m.deity}</span>
                  </div>
                  <button
                    onClick={() => handleAudioToggle(m.id, m.sanskrit)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      playingMantra === m.id
                        ? 'bg-amber-500 text-stone-950 border-amber-400'
                        : 'bg-stone-800 text-amber-400 border-stone-700 hover:bg-stone-750'
                    }`}
                    title="Chant Audio"
                  >
                    {playingMantra === m.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-4 bg-stone-950/80 rounded-2xl border border-stone-800 text-center my-3">
                  <p className="text-sm font-semibold text-amber-300 font-cinzel leading-relaxed">
                    {m.sanskrit}
                  </p>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed italic">
                  "{m.meaning}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800 space-y-1 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Frequency:</span>
                  <span className="font-semibold text-stone-200">{m.chants}</span>
                </div>
                <div className="text-stone-400">
                  <span className="font-semibold text-amber-400">Key Benefits: </span>
                  <span>{m.benefits}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CATEGORY 2: GEMSTONES */}
      {activeCategory === 'gemstone' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gemstones.map(g => (
            <div key={g.name} className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                  <Gem className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold font-cinzel text-base text-stone-100">{g.name}</h3>
                  <span className="text-xs text-amber-300">Ruling Celestial: {g.planet}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-stone-800/50 p-3.5 rounded-2xl border border-stone-800">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Recommended Metal</span>
                  <span className="font-semibold text-stone-200">{g.metal}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Finger Placement</span>
                  <span className="font-semibold text-stone-200">{g.finger}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-stone-700/50">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Pran Pratishtha Muhurat</span>
                  <span className="font-semibold text-amber-300">{g.dayTime}</span>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                <span className="font-semibold text-amber-400">Astrological Benefits:</span> {g.benefits}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CATEGORY 3: RUDRAKSHA BEADS */}
      {activeCategory === 'rudraksha' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rudrakshas.map(r => (
            <div key={r.mukhi} className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-bold font-cinzel text-base text-amber-200">{r.mukhi}</h4>
                <span className="px-2 py-0.5 rounded-full bg-stone-800 text-[10px] font-bold text-stone-300 border border-stone-700">
                  {r.rulingPlanet}
                </span>
              </div>
              <span className="text-xs text-stone-400 block">Presiding Deity: {r.deity}</span>
              <p className="text-xs text-stone-300 leading-relaxed bg-stone-800/40 p-3 rounded-xl border border-stone-800">
                {r.benefits}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CATEGORY 4: YANTRAS & PUJAS */}
      {(activeCategory === 'yantra' || activeCategory === 'puja') && (
        <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl p-8 shadow-xl text-center space-y-4">
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-xl font-bold font-cinzel text-amber-200">
            {activeCategory === 'yantra' ? 'Sacred Geometrical Yantras (Shree Yantra, Kuber, Mahamrityunjaya)' : 'Vedic Anushthan & Online Sankalp Pujas'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            All yantras and sacred items are energized with authentic Vedic Beej Mantras during auspicious Abhijit Muhurat. Explore certified items directly in our Astro E-Store.
          </p>
          {onExploreShop && (
            <button
              onClick={onExploreShop}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl text-xs inline-flex items-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Astro E-Store</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
};
