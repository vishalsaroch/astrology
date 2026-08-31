import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  User,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RefreshCw,
  Compass,
  Flame,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { KundliData } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface AIAstrologerModuleProps {
  activeKundli?: KundliData | null;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAstrologerModule: React.FC<AIAstrologerModuleProps> = ({ activeKundli }) => {
  const { language, t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      sender: 'ai',
      text: `ॐ नमो भगवते वासुदेवाय | Greetings! I am **Acharya Devavrata**, your AI Vedic Astrology mentor. ${
        activeKundli
          ? `I have connected with ${activeKundli.birthDetails.name}’s Vedic chart (${activeKundli.ascendant.sign} Lagna, ${activeKundli.moonSign.sign} Moon sign, ${activeKundli.dasha.currentMahadasha} Mahadasha).`
          : 'Please feel free to ask any question regarding career, relationships, planetary periods (Dasha), doshas, or remedies.'
      }\n\nHow may I guide your journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickQuestions = [
    'When will my career grow and will I get a promotion in 2026?',
    'How is my marriage timing and relationship compatibility?',
    'What remedies should I perform for my current Mahadasha period?',
    'Which gemstone or rudraksha is most auspicious for my chart?',
    'Is there any effect of Saturn Sade Sati or Manglik Dosha on me?'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/astrologer-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language,
          birthDetails: activeKundli?.birthDetails,
          kundliContext: activeKundli,
          history: messages
        })
      });

      const data = await response.json();
      const aiReplyText = data.reply || 'May cosmic harmony and planetary grace illuminate your steps.';

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      const fallbackMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'The stars indicate a temporary cosmic alignment shift. In general, chanting the Gayatri Mantra or Maha Mrityunjaya Mantra brings instant calm and dispels negativity. Please try asking again shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text.replace(/[*#_]/g, ''));
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-stone-950 to-amber-950 border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-500 to-yellow-400 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-2xl">
              🧘
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-200">
                Acharya Devavrata (AI Vedic Sage)
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              Grounded in Brihat Parashara Hora Shastra, Jaimini, & real-time ephemeris calculations.
            </p>
          </div>
        </div>

        {/* Active Kundli Badge */}
        {activeKundli ? (
          <div className="bg-stone-900/80 border border-amber-500/40 px-3.5 py-2 rounded-2xl text-xs text-stone-200">
            <div className="font-semibold text-amber-300 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Connected Chart: {activeKundli.birthDetails.name}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {activeKundli.ascendant.sign} Lagna • {activeKundli.moonSign.sign} Moon • {activeKundli.dasha.currentMahadasha} Dasha
            </div>
          </div>
        ) : (
          <div className="bg-stone-900/80 border border-stone-700 px-3.5 py-2 rounded-2xl text-xs text-stone-400">
            <span>✨ General Astro Consultation Mode</span>
          </div>
        )}
      </div>

      {/* Chat Container */}
      <div className="bg-stone-900/90 border border-amber-500/20 rounded-3xl shadow-2xl flex flex-col h-[560px] overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-sm shrink-0 mt-1">
                  🕉️
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-medium rounded-tr-none'
                    : 'bg-stone-800/90 text-stone-100 border border-stone-700/80 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/10 dark:border-white/10 text-[10px] opacity-75">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="hover:text-amber-300 transition-colors p-1"
                        title="Read Aloud"
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-amber-300 transition-colors p-1"
                        title="Copy Answer"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-sm shrink-0 mt-1">
                  <User className="w-4 h-4 text-amber-400" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-sm shrink-0 mt-1">
                🕉️
              </div>
              <div className="bg-stone-800/90 border border-stone-700/80 rounded-2xl rounded-tl-none p-4 text-xs text-stone-300 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Consulting cosmic ephemeris and Vedic shastras...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="p-3 bg-stone-950/80 border-t border-stone-800 flex overflow-x-auto gap-2 text-xs">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-200 border border-stone-700 whitespace-nowrap text-xs transition-all disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-stone-900 border-t border-stone-800">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Ask anything about career, love, health, dasha, or remedies..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 rounded-2xl text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 disabled:opacity-50 text-stone-950 rounded-2xl shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
