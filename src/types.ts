export type Language = 'en' | 'hi' | 'mr' | 'pa' | 'gu' | 'bn' | 'ta' | 'te' | 'kn' | 'ml';

export type UserRole = 'user' | 'astrologer' | 'admin';

export interface BirthDetails {
  name: string;
  gender: 'male' | 'female' | 'other';
  dob: string; // YYYY-MM-DD
  time: string; // HH:mm
  place: string;
  latitude: number;
  longitude: number;
  timezone: number; // e.g. 5.5 for IST
  ayanamsa?: 'lahiri' | 'kp' | 'raman';
}

export interface PlanetPosition {
  name: string;
  sanskritName: string;
  symbol: string;
  longitude: number;
  sign: string;
  signLord: string;
  signIndex: number; // 0 to 11
  degree: number; // 0 to 30
  degreeFormatted: string;
  house: number; // 1 to 12
  nakshatra: string;
  nakshatraLord: string;
  nakshatraPada: number;
  isRetrograde: boolean;
  isCombust: boolean;
  status: 'Exalted' | 'Debilitated' | 'Moolatrikona' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Enemy';
  speed: number;
  relationshipWithLagna: string;
}

export interface HouseDetail {
  houseNumber: number;
  sign: string;
  signIndex: number;
  lord: string;
  occupants: string[];
  aspects: string[];
  significance: string;
  sanskritName: string;
}

export interface DivisionalChart {
  id: string;
  name: string;
  code: string; // D1, D2, D9, etc.
  description: string;
  planetsInHouses: Record<number, string[]>; // House 1..12 -> Array of planet names
  lagnaSignIndex: number;
}

export interface DashaPeriod {
  planet: string;
  startDate: string;
  endDate: string;
  durationYears: number;
  antardashas?: DashaPeriod[];
  pratyantardashas?: DashaPeriod[];
}

export interface DashafalReport {
  mahadashaLord: string;
  antardashaLord: string;
  pratyantardashaLord: string;
  currentPeriodFormatted: string;
  dashaPhase: string; // 'आरंभिक काल (Initial)' | 'मध्य काल (Peak)' | 'संधि काल (Concluding)'
  mutualRelationship: string; // '5/9 नवपंचम (Ati Shubha)' | '6/8 षडाष्टक (Friction)' | etc.
  overallScore: number; // 0-100
  overallStatus: 'अति शुभ (Extremely Auspicious)' | 'शुभ एवं फलदायी (Auspicious)' | 'मिश्रित फल (Mixed)' | 'चुनौतीपूर्ण (Challenging)' | 'कष्ट निवारक (Critical Caution)';
  generalLife: {
    hindi: string;
    english: string;
    vitalityScore: number;
  };
  career: {
    hindi: string;
    english: string;
    score: number;
    opportunities: string[];
    precautions: string[];
  };
  wealth: {
    hindi: string;
    english: string;
    score: number;
    financialTrend: string;
    wealthYogasActive: string[];
    precautions: string[];
  };
  loveMarriage: {
    hindi: string;
    english: string;
    score: number;
    relationshipStatus: string;
    advice: string;
  };
  education: {
    hindi: string;
    english: string;
    score: number;
    focusAreas: string[];
  };
  health: {
    hindi: string;
    english: string;
    score: number;
    vulnerableAreas: string[];
    wellnessTips: string[];
  };
  remedies: {
    beejMantra: string;
    mantraCount: number;
    sacredStotra: string;
    prescribedGemstone: string;
    gemstoneMetalFinger: string;
    incompatibleGems: string;
    daanItems: string[];
    auspiciousDay: string;
    rudraksha: string;
    fastDay: string;
  };
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
}

export interface LifePredictions {
  natureAndPersonality: {
    temperament: string; // 'सात्विक (Spiritual/Pure)' | 'राजसिक (Action-Driven/Dynamic)' | 'तामसिक (Determined/Material)'
    element: string; // 'अग्नि तत्व (Fire)' | 'पृथ्वी तत्व (Earth)' | 'वायु तत्व (Air)' | 'जल तत्व (Water)'
    modality: string; // 'चर (Movable)' | 'स्थिर (Fixed)' | 'द्विस्वभाव (Dual)'
    lagnaSignInfluence: string;
    lagnaLordPlacement: string;
    moonSignNature: string;
    nakshatraPersonality: string;
    keyStrengths: string[];
    areasForGrowth: string[];
    hindi: string;
    english: string;
  };
  loveAndMarriage: {
    seventhHouseCondition: string;
    seventhLordDignity: string;
    venusCondition: string;
    jupiterCondition: string;
    navamshaVerdict: string;
    manglikAnalysis: string;
    spouseProfile: {
      appearance: string;
      nature: string;
      direction: string;
      professionHint: string;
      personalityVibe: string;
    };
    marriageTimingWindows: string[];
    harmonyScore: number;
    hindi: string;
    english: string;
    remedies: string[];
  };
  educationAndIntellect: {
    secondHouseFoundation: string;
    fourthHouseSchooling: string;
    fifthHouseIntellect: string;
    ninthHouseHigherLearning: string;
    mercuryCondition: string;
    jupiterCondition: string;
    d24ChaturvimshamshaAnalysis: string;
    intellectType: string;
    recommendedStreams: string[];
    higherEducationAndAbroad: string;
    competitiveExamScore: number;
    hindi: string;
    english: string;
    remedies: string[];
  };
  professionAndCareer: {
    tenthHouseStatus: string;
    tenthLordDignity: string;
    occupantsAndAspects: string;
    d10DashamshaVerdict: string;
    careerTrack: 'Govt Job / Public Administration' | 'Corporate Leadership / Tech Industry' | 'Independent Business / Entrepreneurship' | 'Professional Practice / Consultancy';
    favorableDomains: string[];
    wealthAccumulationLevel: string;
    peakRisePeriods: string[];
    hindi: string;
    english: string;
    remedies: string[];
  };
}

export interface VimshottariDasha {
  currentMahadasha: string;
  currentAntardasha: string;
  currentPratyantardasha: string;
  balanceAtBirth: {
    planet: string;
    years: number;
    months: number;
    days: number;
  };
  periods: DashaPeriod[];
}

export interface DoshaAnalysis {
  manglik: {
    isManglik: boolean;
    severity: 'None' | 'Low' | 'Medium' | 'High' | 'Cancelled';
    details: string;
    cancellationReason?: string;
    remedies: string[];
  };
  kaalSarp: {
    hasDosha: boolean;
    type: string;
    direction: 'Udit (Rising)' | 'Anudit (Setting)' | 'None';
    details: string;
    remedies: string[];
  };
  sadeSati: {
    status: 'Not Active' | '1st Phase (Rising)' | '2nd Phase (Peak)' | '3rd Phase (Setting)' | 'Dhaiya (Small Affliction)';
    description: string;
    currentTransitSign: string;
    remedies: string[];
  };
  pitruDosha: {
    hasDosha: boolean;
    reason: string;
    remedies: string[];
  };
}

export interface KundliData {
  id: string;
  birthDetails: BirthDetails;
  ascendant: {
    sign: string;
    signIndex: number;
    degree: number;
    formatted: string;
    nakshatra: string;
    nakshatraPada: number;
    lord: string;
  };
  moonSign: {
    sign: string;
    signIndex: number;
    nakshatra: string;
    nakshatraPada: number;
    nakshatraLord: string;
  };
  sunSign: {
    sign: string;
    signIndex: number;
  };
  tithi: string;
  yoga: string;
  karana: string;
  vaara: string;
  ayanamsaName: string;
  planets: PlanetPosition[];
  houses: HouseDetail[];
  divisionalCharts: Record<string, DivisionalChart>;
  dasha: VimshottariDasha;
  doshas: DoshaAnalysis;
  predictions?: LifePredictions;
  activeDashafal?: DashafalReport;
  calculatedAt: string;
}

export interface AshtakootaScore {
  name: string;
  sanskrit: string;
  maxPoints: number;
  obtainedPoints: number;
  description: string;
  boyDetail: string;
  girlDetail: string;
  status: 'Good' | 'Average' | 'Poor' | 'Dosha';
}

export interface MatchmakingResult {
  boy: KundliData;
  girl: KundliData;
  scores: AshtakootaScore[];
  totalScore: number;
  maxScore: number;
  percentage: number;
  nadiDosha: boolean;
  bhakootDosha: boolean;
  ganaDosha: boolean;
  manglikMatch: {
    boyManglik: boolean;
    girlManglik: boolean;
    compatible: boolean;
    remark: string;
  };
  verdict: 'Excellent Match' | 'Good Match' | 'Average Match' | 'Not Recommended';
  summary: string;
  recommendations: string[];
}

export interface PanchangData {
  date: string;
  day: string;
  place: string;
  tithi: {
    name: string;
    paksha: 'Shukla' | 'Krishna';
    number: number;
    endTime: string;
  };
  nakshatra: {
    name: string;
    lord: string;
    number: number;
    endTime: string;
  };
  yoga: {
    name: string;
    endTime: string;
  };
  karana: {
    name: string;
    endTime: string;
  };
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahuKaal: { start: string; end: string };
  yamagandam: { start: string; end: string };
  gulikaKaal: { start: string; end: string };
  abhijitMuhurat: { start: string; end: string };
  brahmaMuhurat: { start: string; end: string };
  vikramSamvat: number;
  shakaSamvat: number;
  hinduMonth: string;
  rutu: string;
  ayana: string;
  choghadiyaDay: Array<{ name: string; type: 'Amrit' | 'Shubh' | 'Labh' | 'Char' | 'Rog' | 'Kaal' | 'Udveg'; time: string; auspicious: boolean }>;
  choghadiyaNight: Array<{ name: string; type: 'Amrit' | 'Shubh' | 'Labh' | 'Char' | 'Rog' | 'Kaal' | 'Udveg'; time: string; auspicious: boolean }>;
}

export interface HoroscopeData {
  sign: string;
  sanskritName: string;
  date: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  rulingPlanet: string;
  overallScore: number; // 0 to 100
  loveScore: number;
  careerScore: number;
  financeScore: number;
  healthScore: number;
  luckyNumber: number;
  luckyColor: string;
  luckyTime: string;
  dailyPrediction: string;
  lovePrediction: string;
  careerPrediction: string;
  financePrediction: string;
  healthPrediction: string;
  weeklyPrediction: string;
  monthlyPrediction: string;
  yearlyPrediction: string;
}

export interface NumerologyReport {
  name: string;
  dob: string;
  lifePathNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  birthDayNumber: number;
  attitudeNumber: number;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyDays: string[];
  luckyGems: string[];
  interpretations: {
    lifePath: string;
    destiny: string;
    soulUrge: string;
    personality: string;
    career: string;
    relationships: string;
  };
}

export interface TarotCard {
  id: number;
  name: string;
  arcana: 'Major' | 'Minor';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  number: number;
  uprightKeywords: string[];
  reversedKeywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  element: string;
  astrologicalSign?: string;
  symbolism: string;
  imageUrl: string;
}

export interface TarotReadingSpread {
  id: string;
  type: '1-card' | '3-card' | 'love' | 'career' | 'celtic-cross' | 'yes-no';
  question: string;
  cards: Array<{
    card: TarotCard;
    position: string;
    isReversed: boolean;
  }>;
  overallInterpretation: string;
  yesNoAnswer?: {
    answer: 'Yes' | 'No' | 'Maybe';
    confidence: number;
  };
  createdAt: string;
}

export interface Astrologer {
  id: string;
  name: string;
  photo?: string;
  avatarUrl?: string;
  title?: string;
  experienceYears: number;
  rating: number;
  reviewsCount?: number;
  totalConsultations?: number;
  consultationsCount?: number;
  specialties?: string[];
  specializations?: string[];
  languages: string[];
  pricePerMinute: any;
  chatPrice?: number;
  callPrice?: number;
  videoCallPrice?: number;
  bio: string;
  isOnline: boolean;
  isVerified?: boolean;
  availableNext?: string;
}

export type AstrologerProfile = Astrologer;

export type TarotSpread = TarotReadingSpread;

export interface EcommerceProduct {
  id: string;
  name: string;
  category: any;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount?: number;
  description: string;
  associatedPlanet?: string;
  planetAssociation?: string;
  benefits?: string[];
  imageUrl?: string;
  image?: string;
  inStock: boolean;
  certification?: string;
  weightCarat?: number;
  origin?: string;
  energized?: boolean;
}

export type AstroProduct = EcommerceProduct;

export interface CartItem {
  product: EcommerceProduct;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  discount: number;
  paymentMethod: 'wallet' | 'razorpay' | 'stripe';
  paymentStatus: 'paid' | 'pending' | 'failed';
  shippingStatus: 'processing' | 'shipped' | 'delivered';
  customerName: string;
  shippingAddress: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface FestivalItem {
  id: string;
  name: string;
  sanskritName: string;
  date: string;
  tithi: string;
  significance: string;
  pujaMuhurat: string;
  rituals: string[];
  category: 'Major' | 'Vrat' | 'Jayanti' | 'Purnima' | 'Ekadashi';
}

export interface RemedyItem {
  id: string;
  title: string;
  planet: string;
  dosha?: string;
  type: 'mantra' | 'gemstone' | 'rudraksha' | 'yantra' | 'puja' | 'charity';
  description: string;
  procedure: string;
  bestDayTime: string;
  mantraAudioText?: string;
  mantraRepetitions?: number;
  image: string;
}
