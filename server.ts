import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

// Lazy initialization for Gemini AI SDK
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes First
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'ASTRO APP Vedic Engine API',
      timestamp: new Date().toISOString(),
      hasGeminiKey: !!process.env.GEMINI_API_KEY
    });
  });

  // AI Vedic Astrologer Chat endpoint
  app.post('/api/ai/astrologer-chat', async (req, res) => {
    try {
      const { message, language = 'en', birthDetails, kundliContext, history = [] } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const client = getGeminiClient();

      // System Prompt constructing authentic Vedic Astrology grounding
      let systemInstruction = `You are Acharya Devavrata, a revered, compassionate, and deeply knowledgeable Vedic Astrologer (Jyotish Acharya) with 35+ years of experience in Parashari, Jaimini, and KP astrology systems.
Your consultations are spiritual, uplifting, practical, empathetic, and grounded strictly in classical Vedic principles (Brihat Parashara Hora Shastra, Phaladeepika, Saravali).
Always respond in the requested language: "${language}" (If Hindi, use respectful Devavani/Hindi terms like नमस्कार, महादशा, शुभ योग; If English, use clean, polished tone with Sanskrit terms in parentheses).

IMPORTANT GUIDELINES:
1. Ground your interpretation in the user's computed birth chart provided below. Do NOT invent conflicting planetary placements.
2. Provide positive, constructive guidance. If there are difficult placements (like Saturn Sade Sati, Rahu transit, or 8th/12th house placements), balance with practical remedies (Mantras, Charity/Daan, Meditation, Gemstones, behavioral advice).
3. Frame remedies in classical Vedic tradition (e.g. Gayatri Mantra, Hanuman Chalisa, Peepal tree worship, feeding cows/birds, Lord Shiva Rudrabhishek).
4. Keep answers organized with clear headings or bullet points for readability.
5. Conclude with a warm Vedic blessing (e.g., "ॐ शान्तिः | May the cosmic light guide your path.").`;

      if (kundliContext) {
        systemInstruction += `\n\nUSER'S CALCULATED BIRTH CHART DATA:
- Name: ${kundliContext.name || 'Seeker'}
- Ascendant (Lagna): ${kundliContext.ascendant?.sign || 'Calculated'} (${kundliContext.ascendant?.degreeFormatted || ''})
- Moon Sign (Rashi): ${kundliContext.moonSign?.sign || 'Calculated'} | Nakshatra: ${kundliContext.moonSign?.nakshatra || ''} (Pada ${kundliContext.moonSign?.nakshatraPada || ''})
- Sun Sign: ${kundliContext.sunSign?.sign || 'Calculated'}
- Active Mahadasha: ${kundliContext.dasha?.currentMahadasha || 'Active Period'} -> Antardasha: ${kundliContext.dasha?.currentAntardasha || ''}
- Manglik Status: ${kundliContext.doshas?.manglik?.isManglik ? 'Manglik (' + kundliContext.doshas?.manglik?.severity + ')' : 'Non-Manglik'}
- Sade Sati Status: ${kundliContext.doshas?.sadeSati?.status || 'Not active'}
- Kaal Sarp Status: ${kundliContext.doshas?.kaalSarp?.hasDosha ? kundliContext.doshas?.kaalSarp?.type : 'None'}`;
      }

      if (client) {
        // Construct conversation contents with history
        const contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          history.slice(-6).forEach(h => {
            contents.push({
              role: h.sender === 'user' ? 'user' : 'model',
              parts: [{ text: h.text }]
            });
          });
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const response = await client.models.generateContent({
          model: 'gemini-3.7-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.95
          }
        });

        const aiResponseText = response.text || 'May the stars illuminate your journey with peace and clarity.';
        return res.json({
          reply: aiResponseText,
          source: 'gemini'
        });
      } else {
        // Fallback intelligent response if GEMINI_API_KEY is not configured
        const fallbackReply = generateFallbackAstrologyResponse(message, language, kundliContext);
        return res.json({
          reply: fallbackReply,
          source: 'astrological_rule_engine'
        });
      }
    } catch (error: any) {
      console.error('Error in /api/ai/astrologer-chat:', error);
      res.status(500).json({
        error: 'Failed to consult the AI Astrologer. Please try again.',
        details: error.message
      });
    }
  });

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ASTRO APP Server running on http://0.0.0.0:${PORT}`);
  });
}

function generateFallbackAstrologyResponse(query: string, lang: string, context?: any): string {
  const q = query.toLowerCase();
  const lagna = context?.ascendant?.sign || 'your ascendant';
  const moon = context?.moonSign?.sign || 'your moon sign';
  const dasha = context?.dasha?.currentMahadasha || 'favorable planets';

  if (lang === 'hi') {
    if (q.includes('career') || q.includes('नौकरी') || q.includes('business') || q.includes('व्यापार')) {
      return `नमस्ते! आपकी कुंडली में लग्न ${lagna} और वर्तमान में ${dasha} की दशा का प्रभाव है।

🌟 **करियर दृष्टिकोण:**
- दशम भाव (कर्म भाव) आपके कर्मठ स्वभाव और नेतृत्व क्षमता को दर्शाता है।
- आगामी समय में नए व्यावसायिक संपर्क और पदोन्नति के योग बन रहे हैं।
- वरिष्ठ अधिकारियों और गुरुजनों का आशीर्वाद लें।

✨ **शुभ उपाय:**
1. प्रतिदिन प्रातः सूर्य देव को तांबे के लोटे से जल अर्पित करें (ॐ सूर्याय नमः)।
2. गुरुवार को पीले वस्त्र अथवा बेसन के मिष्ठान का दान करें।

ॐ शान्तिः | आपका भविष्य मंगलमय हो।`;
    }
    return `नमस्ते! आपके प्रश्न के संदर्भ में आपकी जन्म कुंडली का विश्लेषण:
आपकी राशि ${moon} तथा लग्न ${lagna} पर ग्रहों की अनुकूल दृष्टि है। वर्तमान समय में धैर्य और निरंतर प्रयास से कार्य सिद्ध होंगे।

✨ **दैनिक वैदिक उपाय:**
- भगवान शिव का जलाभिषेक करें और ॐ नमः शिवाय का ११ बार जप करें।
- पक्षियों को सप्तधान्य (सात प्रकार का अनाज) डालें।

शुभम् भवतु!`;
  }

  // English fallback
  if (q.includes('career') || q.includes('job') || q.includes('promotion') || q.includes('business')) {
    return `Greetings! Based on your Vedic chart with ${lagna} Ascendant and current **${dasha} Mahadasha**:

🌟 **Career & Professional Outlook:**
- The 10th house (Karma Bhava) indicates strong professional tenacity and steady growth.
- Favorable planetary transits support strategic career advancements, interviews, and leadership roles in the coming months.
- Avoid impulsive job changes without written offers.

✨ **Recommended Vedic Remedies:**
1. Offer water to Lord Surya at sunrise with the mantra: *“Om Suryaya Namaha”*.
2. Donate yellow lentils or sweets to teachers or the needy on Thursdays.
3. Wear a clean natural silver or copper accessory to strengthen focus.

*Om Shanti | May cosmic blessings illuminate your endeavors.*`;
  }

  if (q.includes('marriage') || q.includes('love') || q.includes('relationship') || q.includes('partner')) {
    return `Greetings! Analyzing your 7th house (Kalatra Bhava) and Venus placements:

💖 **Relationship & Marriage Insights:**
- Your Moon in ${moon} reveals deep emotional commitment and sensitivity in relationships.
- Favorable planetary aspects foster harmony and resolution of misunderstandings.
- Communication with honesty and mutual respect will deepen your bond.

✨ **Auspicious Remedies:**
1. Chant the Shukra (Venus) Mantra: *“Om Shum Shukraya Namaha”* on Friday evenings.
2. Feed white cows or donate rice/curd on Fridays for Venus harmonization.
3. Perform Lord Shiva & Goddess Parvati prayer for marital bliss.`;
  }

  return `Greetings! Your Vedic astrological chart highlights the following cosmic influences:

- **Ascendant Energy (${lagna}):** Reflects strong inner resilience and creative intellect.
- **Current Planetary Period (${dasha} Mahadasha):** Guides you toward spiritual growth, personal transformation, and gradual accomplishments.
- **Advice:** Maintain consistency in your daily routines, honor family elders, and make major decisions during auspicious Choghadiya timings.

✨ **Daily Harmonization Remedy:**
Chant the sacred *Maha Mrityunjaya Mantra* or *Gayatri Mantra* daily at sunrise for protection and clarity.

*May the divine planetary energies grant you peace and prosperity.*`;
}

startServer();
