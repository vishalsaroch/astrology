import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  MessageSquare,
  Video,
  Star,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  Send,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  X,
  Languages,
  Award
} from 'lucide-react';
import { AstrologerProfile } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface AstrologerMarketplaceProps {
  walletBalance: number;
  onDeductBalance: (amount: number) => boolean;
}

const SAMPLE_ASTROLOGERS: AstrologerProfile[] = [
  {
    id: 'astro-1',
    name: 'Acharya Vidyadhar Shastri',
    title: 'Senior Vedic & KP Astrology Master',
    experienceYears: 24,
    languages: ['Hindi', 'English', 'Sanskrit', 'Gujarati'],
    specialties: ['Kundli & Parashari', 'KP Astrology', 'Career Timing', 'Vedic Remedies'],
    rating: 4.95,
    totalConsultations: 18450,
    pricePerMinute: { chat: 25, call: 35, video: 50 },
    isOnline: true,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    bio: 'Gold medalist from Banaras Hindu University. Specializing in high-accuracy Dasha timing, business growth, and matrimonial compatibility.'
  },
  {
    id: 'astro-2',
    name: 'Dr. Meenakshi Sundaram',
    title: 'Nadi & Prashna Kundli Specialist',
    experienceYears: 19,
    languages: ['Tamil', 'English', 'Telugu', 'Hindi'],
    specialties: ['Nadi Astrology', 'Prashna Shastra', 'Childbirth & Progeny', 'Gemology'],
    rating: 4.92,
    totalConsultations: 14200,
    pricePerMinute: { chat: 20, call: 30, video: 45 },
    isOnline: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Descendant of traditional Nadi astrologers from Thanjavur. Expertise in thumb impression analysis and instantaneous Prashna charts.'
  },
  {
    id: 'astro-3',
    name: 'Pandit Radheshyam Joshi',
    title: 'Gun Milan & Dosha Nivaran Expert',
    experienceYears: 30,
    languages: ['Hindi', 'Marathi', 'English'],
    specialties: ['Kundli Milan (36 Gunas)', 'Manglik & Kaal Sarp', 'Puja & Yantras', 'Vastu'],
    rating: 4.88,
    totalConsultations: 22100,
    pricePerMinute: { chat: 18, call: 28, video: 40 },
    isOnline: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Renowned authority on Ashtakoota matchmaking, Manglik cancellation nuances, and Vedic ritual remedies.'
  },
  {
    id: 'astro-4',
    name: 'Tarot Reader Sanjana Rao',
    title: 'Mystic Tarot & Numerology Intuitive',
    experienceYears: 12,
    languages: ['English', 'Hindi', 'Bengali'],
    specialties: ['Tarot Spreads', 'Life Path Numbers', 'Relationship Healing', 'Chakra Balance'],
    rating: 4.94,
    totalConsultations: 9800,
    pricePerMinute: { chat: 22, call: 32, video: 48 },
    isOnline: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Certified International Tarot Guild reader. Combines intuitive Celtic symbology with Pythagorean number vibration.'
  },
  {
    id: 'astro-5',
    name: 'Astrologer Gurpreet Singh',
    title: 'Lal Kitab & Vastu Consultant',
    experienceYears: 16,
    languages: ['Punjabi', 'Hindi', 'English'],
    specialties: ['Lal Kitab Remedies', 'Commercial Vastu', 'Court Cases & Debt', 'Planetary Pacification'],
    rating: 4.89,
    totalConsultations: 11300,
    pricePerMinute: { chat: 20, call: 30, video: 42 },
    isOnline: false,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Expert in simple, powerful, and practical Lal Kitab remedies without complex rituals.'
  }
];

export const AstrologerMarketplace: React.FC<AstrologerMarketplaceProps> = ({
  walletBalance,
  onDeductBalance
}) => {
  const { t } = useTranslation();
  const [selectedAstrologer, setSelectedAstrologer] = useState<AstrologerProfile | null>(null);
  const [sessionType, setSessionType] = useState<'chat' | 'call' | 'video' | null>(null);
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [activeSessionDuration, setActiveSessionDuration] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'astro'; text: string; time: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  // Timer for active consultation session
  useEffect(() => {
    let interval: any = null;
    if (sessionType && selectedAstrologer) {
      interval = setInterval(() => {
        setActiveSessionDuration(prev => {
          const next = prev + 1;
          // Every 60 seconds, deduct per-minute price from wallet
          if (next > 0 && next % 60 === 0) {
            const cost = selectedAstrologer.pricePerMinute[sessionType];
            const ok = onDeductBalance(cost);
            if (!ok) {
              alert('Wallet balance exhausted. Consultation session ended.');
              setSessionType(null);
            }
          }
          return next;
        });
      }, 1000);
    } else {
      setActiveSessionDuration(0);
    }
    return () => clearInterval(interval);
  }, [sessionType, selectedAstrologer]);

  const startConsultation = (astro: AstrologerProfile, type: 'chat' | 'call' | 'video') => {
    const minRequired = astro.pricePerMinute[type] * 3; // at least 3 mins balance
    if (walletBalance < minRequired) {
      alert(`Minimum wallet balance of ₹${minRequired} (for 3 mins) required to start this consultation. Please recharge wallet.`);
      return;
    }

    setSelectedAstrologer(astro);
    setSessionType(type);
    setChatMessages([
      {
        sender: 'astro',
        text: `नमस्ते! I am ${astro.name}. I am looking into your planetary placements now. What question is foremost on your mind?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChatInput('');

    // Simulate Astrologer reply
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'astro',
          text: `I have analyzed your query regarding "${userText.substring(0, 30)}...". The 10th and 11th lord alignments indicate auspicious momentum. You should strengthen Jupiter and perform water oblation to Surya at dawn.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1800);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredAstrologers = filterSpecialty === 'all'
    ? SAMPLE_ASTROLOGERS
    : SAMPLE_ASTROLOGERS.filter(a => a.specialties.some(s => s.toLowerCase().includes(filterSpecialty.toLowerCase())));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Verified Jyotish Acharyas & Gurus
        </div>
        <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
          {t('talkToAstrologer')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2">
          Connect in real-time with India’s top Vedic, Nadi, KP, Tarot & Vastu practitioners via live Chat, Audio, or Video.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'all', label: 'All Specializations' },
          { id: 'Vedic', label: 'Vedic & Kundli' },
          { id: 'KP', label: 'KP Astrology' },
          { id: 'Nadi', label: 'Nadi Shastra' },
          { id: 'Tarot', label: 'Tarot & Intuition' },
          { id: 'Vastu', label: 'Vastu & Lal Kitab' }
        ].map(chip => (
          <button
            key={chip.id}
            onClick={() => setFilterSpecialty(chip.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterSpecialty === chip.id
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Astrologers Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAstrologers.map(astro => (
          <div
            key={astro.id}
            className="bg-stone-900/90 border border-amber-500/20 hover:border-amber-400/60 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between transition-all hover:scale-[1.01]"
          >
            {/* Top Astrologer Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={astro.avatarUrl}
                    alt={astro.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-md"
                  />
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-stone-900 ${
                    astro.isOnline ? 'bg-emerald-500' : 'bg-stone-600'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-stone-100 font-cinzel truncate">
                      {astro.name}
                    </h3>
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  </div>
                  <p className="text-xs text-amber-300 truncate">{astro.title}</p>
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-1">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {astro.rating}
                    </span>
                    <span>•</span>
                    <span>{astro.experienceYears} Yrs Exp</span>
                    <span>•</span>
                    <span>{astro.totalConsultations.toLocaleString()}+ orders</span>
                  </div>
                </div>
              </div>

              {/* Bio & Specialties */}
              <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                {astro.bio}
              </p>

              <div className="flex flex-wrap gap-1">
                {astro.specialties.map(spec => (
                  <span key={spec} className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] text-stone-300 font-medium">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-stone-500" />
                <span>{astro.languages.join(', ')}</span>
              </div>
            </div>

            {/* Pricing & Connect Action Buttons */}
            <div className="pt-4 border-t border-stone-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-400">Starting from:</span>
                <span className="font-bold text-amber-300">₹{astro.pricePerMinute.chat}/min</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => startConsultation(astro, 'chat')}
                  className="py-2.5 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-200 rounded-xl text-xs font-bold border border-stone-700 flex flex-col items-center gap-1 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Chat (₹{astro.pricePerMinute.chat})</span>
                </button>

                <button
                  onClick={() => startConsultation(astro, 'call')}
                  className="py-2.5 bg-stone-800 hover:bg-emerald-600 hover:text-stone-950 text-stone-200 rounded-xl text-xs font-bold border border-stone-700 flex flex-col items-center gap-1 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Call (₹{astro.pricePerMinute.call})</span>
                </button>

                <button
                  onClick={() => startConsultation(astro, 'video')}
                  className="py-2.5 bg-stone-800 hover:bg-purple-600 hover:text-stone-950 text-stone-200 rounded-xl text-xs font-bold border border-stone-700 flex flex-col items-center gap-1 transition-all"
                >
                  <Video className="w-4 h-4 text-purple-400" />
                  <span>Video (₹{astro.pricePerMinute.video})</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Active Consultation Modal (Live Chat, Call, Video) */}
      {sessionType && selectedAstrologer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full h-[600px] flex flex-col shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95">
            
            {/* Session Top Bar */}
            <div className="bg-stone-950 px-6 py-3.5 border-b border-stone-800 flex justify-between items-center text-stone-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedAstrologer.avatarUrl}
                  alt={selectedAstrologer.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400"
                />
                <div>
                  <h4 className="font-bold text-sm font-cinzel text-amber-200">{selectedAstrologer.name}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>In Consultation ({sessionType.toUpperCase()})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-amber-500/20 text-amber-300 font-mono font-bold text-xs px-3 py-1.5 rounded-xl border border-amber-500/40 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(activeSessionDuration)}</span>
                </div>

                <button
                  onClick={() => setSessionType(null)}
                  className="p-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-xl border border-rose-500/40 transition-colors"
                  title="End Consultation"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Session Body based on Type */}
            {sessionType === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none'
                            : 'bg-stone-800 text-stone-100 border border-stone-700 rounded-tl-none'
                        }`}
                      >
                        <div>{msg.text}</div>
                        <span className="text-[9px] opacity-75 block text-right mt-1">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="p-3 bg-stone-950 border-t border-stone-800 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Type your message to astrologer..."
                    className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}

            {sessionType === 'call' && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 flex items-center justify-center animate-pulse">
                    <img
                      src={selectedAstrologer.avatarUrl}
                      alt={selectedAstrologer.name}
                      className="w-24 h-24 rounded-full object-cover shadow-xl"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-cinzel text-amber-200">{selectedAstrologer.name}</h3>
                  <p className="text-xs text-stone-400 mt-1">Vedic Audio Channel Active • 256-bit Encrypted</p>
                </div>

                {/* Simulated Audio Waveform */}
                <div className="flex items-center gap-1.5 h-8">
                  {[4, 8, 14, 20, 12, 18, 24, 16, 8, 12, 22, 14, 6].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-emerald-400 rounded-full animate-bounce"
                      style={{ height: `${h * 1.5}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-full border transition-all ${
                      isMuted ? 'bg-rose-600 text-white border-rose-500' : 'bg-stone-800 text-stone-200 border-stone-700'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => setSessionType(null)}
                    className="p-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-xl"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

            {sessionType === 'video' && (
              <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                {/* Full Astrologer Video Simulation */}
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
                  alt="Live Video"
                  className="w-full h-full object-cover opacity-85"
                />

                {/* Picture-in-picture User Camera */}
                <div className="absolute top-4 right-4 w-28 h-36 bg-stone-800 rounded-2xl border-2 border-amber-500/60 overflow-hidden shadow-2xl flex items-center justify-center text-xs text-stone-400">
                  <span>Your Camera</span>
                </div>

                {/* Video Controls Bar */}
                <div className="absolute bottom-6 flex items-center gap-4 bg-stone-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-stone-700 shadow-2xl">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-full ${isMuted ? 'bg-rose-600 text-white' : 'bg-stone-800 text-stone-200'}`}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsVideoMuted(!isVideoMuted)}
                    className={`p-3 rounded-full ${isVideoMuted ? 'bg-rose-600 text-white' : 'bg-stone-800 text-stone-200'}`}
                  >
                    <VideoOff className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSessionType(null)}
                    className="p-3 bg-rose-600 hover:bg-rose-500 text-white rounded-full"
                  >
                    <PhoneOff className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
