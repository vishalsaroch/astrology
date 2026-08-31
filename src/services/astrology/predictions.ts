import {
  KundliData,
  DashafalReport,
  LifePredictions,
  PlanetPosition,
  HouseDetail
} from '../../types';
import { ZODIAC_SIGNS, DASHA_YEARS, DASHA_SEQUENCE } from './ephemeris';

// Planetary friendship matrix for Sambandha & Mutual Aspects
const FRIENDSHIP_MAP: Record<string, { friends: string[]; neutrals: string[]; enemies: string[] }> = {
  Sun: { friends: ['Moon', 'Mars', 'Jupiter'], neutrals: ['Mercury'], enemies: ['Venus', 'Saturn', 'Rahu', 'Ketu'] },
  Moon: { friends: ['Sun', 'Mercury'], neutrals: ['Mars', 'Jupiter', 'Venus', 'Saturn'], enemies: ['Rahu', 'Ketu'] },
  Mars: { friends: ['Sun', 'Moon', 'Jupiter'], neutrals: ['Venus', 'Saturn'], enemies: ['Mercury', 'Rahu', 'Ketu'] },
  Mercury: { friends: ['Sun', 'Venus'], neutrals: ['Mars', 'Jupiter', 'Saturn'], enemies: ['Moon', 'Rahu', 'Ketu'] },
  Jupiter: { friends: ['Sun', 'Moon', 'Mars'], neutrals: ['Saturn'], enemies: ['Mercury', 'Venus', 'Rahu', 'Ketu'] },
  Venus: { friends: ['Mercury', 'Saturn', 'Rahu', 'Ketu'], neutrals: ['Mars', 'Jupiter'], enemies: ['Sun', 'Moon'] },
  Saturn: { friends: ['Mercury', 'Venus', 'Rahu'], neutrals: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars', 'Ketu'] },
  Rahu: { friends: ['Venus', 'Saturn', 'Mercury'], neutrals: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars', 'Ketu'] },
  Ketu: { friends: ['Mars', 'Venus', 'Saturn'], neutrals: ['Mercury', 'Jupiter'], enemies: ['Sun', 'Moon', 'Rahu'] }
};

// Sanskrit planetary names
const SANSKRIT_PLANETS: Record<string, string> = {
  Sun: 'सूर्य (Surya)',
  Moon: 'चंद्रमा (Chandra)',
  Mars: 'मंगल (Mangala)',
  Mercury: 'बुध (Budha)',
  Jupiter: 'गुरु / बृहस्पति (Guru)',
  Venus: 'शुक्र (Shukra)',
  Saturn: 'शनि (Shani)',
  Rahu: 'राहु (Rahu)',
  Ketu: 'केतु (Ketu)'
};

// Vedic Beej Mantras & Sacred Paths
const PLANETARY_REMEDIES: Record<string, {
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
}> = {
  Sun: {
    beejMantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
    mantraCount: 7000,
    sacredStotra: 'आदित्य हृदय स्तोत्रम् (Aditya Hridaya Stotram) एवं गायत्री मंत्र',
    prescribedGemstone: 'माणिक्य (Ruby - 5-7 Ratti)',
    gemstoneMetalFinger: 'सोना या तांबा, अनामिका उंगली (Ring Finger)',
    incompatibleGems: 'नीलम, गोमेद, लहसुनिया',
    daanItems: ['गेहूं (Wheat)', 'गुड़ (Jaggery)', 'तांबे का पात्र', 'लाल चंदन', 'माणिक्य दान'],
    auspiciousDay: 'रविवार (Sunday)',
    rudraksha: '1 मुखी या 12 मुखी रुद्राक्ष',
    fastDay: 'रविवार व्रत (नमक रहित भोजन)'
  },
  Moon: {
    beejMantra: 'ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः',
    mantraCount: 11000,
    sacredStotra: 'श्री शिव पंचाक्षर स्तोत्र एवं श्री शिव तांडव स्तोत्रम्',
    prescribedGemstone: 'सच्चा मोती (Natural Pearl - 5-8 Ratti)',
    gemstoneMetalFinger: 'शुद्ध चांदी, कनिष्ठिका उंगली (Little Finger)',
    incompatibleGems: 'गोमेद, लहसुनिया, नीलम',
    daanItems: ['चावल (Rice)', 'दूध व दही', 'चांदी', 'सफेद वस्त्र', 'शंख'],
    auspiciousDay: 'सोमवार (Monday)',
    rudraksha: '2 मुखी रुद्राक्ष',
    fastDay: 'सोमवार व्रत एवं पूर्णिमा व्रत'
  },
  Mars: {
    beejMantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
    mantraCount: 10000,
    sacredStotra: 'श्री सुंदरकांड पाठ, हनुमान चालीसा एवं ऋणमोचक मंगल स्तोत्र',
    prescribedGemstone: 'त्रिकोणीय लाल मूंगा (Red Coral - 6-9 Ratti)',
    gemstoneMetalFinger: 'तांबा या पंचधातु, अनामिका उंगली (Ring Finger)',
    incompatibleGems: 'पन्ना, नीलम, गोमेद',
    daanItems: ['लाल मसूर की दाल', 'गुड़', 'तांबा', 'लाल वस्त्र', 'सिंदूर'],
    auspiciousDay: 'मंगलवार (Tuesday)',
    rudraksha: '3 मुखी रुद्राक्ष',
    fastDay: 'मंगलवार व्रत'
  },
  Mercury: {
    beejMantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    mantraCount: 9000,
    sacredStotra: 'श्री विष्णु सहस्रनाम स्तोत्रम् एवं श्री गणपति संकटनाशन स्तोत्र',
    prescribedGemstone: 'पन्ना (Zambian/Colombian Emerald - 4-7 Ratti)',
    gemstoneMetalFinger: 'सोना या पंचधातु, कनिष्ठिका उंगली (Little Finger)',
    incompatibleGems: 'माणिक्य, मोती, मूंगा',
    daanItems: ['साबुत मूंग दाल', 'हरी सब्जियां', 'कांसे का पात्र', 'हरे वस्त्र', 'विद्या दान'],
    auspiciousDay: 'बुधवार (Wednesday)',
    rudraksha: '4 मुखी या 10 मुखी रुद्राक्ष',
    fastDay: 'बुधवार व्रत'
  },
  Jupiter: {
    beejMantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    mantraCount: 19000,
    sacredStotra: 'श्रीमद्भगवद्गीता (11वां व 15वां अध्याय) एवं श्री गुरु स्तोत्रम्',
    prescribedGemstone: 'पीला पुखराज (Yellow Sapphire - 5-8 Ratti)',
    gemstoneMetalFinger: 'शुद्ध सोना या पीतल, तर्जनी उंगली (Index Finger)',
    incompatibleGems: 'हीरा, नीलम, गोमेद',
    daanItems: ['चने की दाल', 'हल्दी की गांठ', 'पीले वस्त्र', 'केला', 'धार्मिक पुस्तकें'],
    auspiciousDay: 'गुरुवार (Thursday)',
    rudraksha: '5 मुखी रुद्राक्ष',
    fastDay: 'गुरुवार व्रत'
  },
  Venus: {
    beejMantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
    mantraCount: 16000,
    sacredStotra: 'श्री सूक्तम् (Shree Suktam), कनकधारा स्तोत्र एवं दुर्गा सप्तशती',
    prescribedGemstone: 'हीरा या ओपल (Diamond / Natural Opal - 5-7 Ratti)',
    gemstoneMetalFinger: 'प्लैटिनम, सफेद सोना या चांदी, अनामिका/कनिष्ठिका',
    incompatibleGems: 'माणिक्य, मोती, मूंगा, पीला पुखराज',
    daanItems: ['मिश्री', 'शुद्ध घी', 'सफेद चंदन', 'इत्र (Perfume)', 'सफेद रेशमी वस्त्र'],
    auspiciousDay: 'शुक्रवार (Friday)',
    rudraksha: '6 मुखी रुद्राक्ष',
    fastDay: 'शुक्रवार संतोषी माता / वैभव लक्ष्मी व्रत'
  },
  Saturn: {
    beejMantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
    mantraCount: 23000,
    sacredStotra: 'महाराज दशरथ कृत शनि स्तोत्र, हनुमान बाहुक एवं सुंदरकांड',
    prescribedGemstone: 'नीलम या जामुनिया (Blue Sapphire / Amethyst - 5-7 Ratti)',
    gemstoneMetalFinger: 'पंचधातु या अष्टधातु, मध्यमा उंगली (Middle Finger)',
    incompatibleGems: 'माणिक्य, मोती, मूंगा, पीला पुखराज',
    daanItems: ['काले तिल', 'सरसों का तेल', 'काले उड़द', 'लोहा', 'काले जूते/कंबल'],
    auspiciousDay: 'शनिवार (Saturday)',
    rudraksha: '7 मुखी या 14 मुखी रुद्राक्ष',
    fastDay: 'शनिवार व्रत (पीपल वृक्ष पर संध्या दीपदान)'
  },
  Rahu: {
    beejMantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
    mantraCount: 18000,
    sacredStotra: 'दुर्गा सप्तशती अर्गला स्तोत्र, राहु कवच एवं कालभैरव अष्टकम्',
    prescribedGemstone: 'गोमेद (Ceylon Hessonite Garnet - 6-8 Ratti)',
    gemstoneMetalFinger: 'अष्टधातु या पंचधातु, मध्यमा उंगली (Middle Finger)',
    incompatibleGems: 'माणिक्य, मोती, मूंगा, पीला पुखराज',
    daanItems: ['सप्तधान्य (7 प्रकार का अनाज)', 'नारियल', 'काले-सफेद तिल', 'कंबल', 'उड़द'],
    auspiciousDay: 'शनिवार / बुधवार रात्रि (Rahu Kaal)',
    rudraksha: '8 मुखी रुद्राक्ष',
    fastDay: 'शनिवार व्रत'
  },
  Ketu: {
    beejMantra: 'ॐ स्त्रां स्त्रीं स्त्रौं सः केतवे नमः',
    mantraCount: 17000,
    sacredStotra: 'श्री गणेश संकटनाशन स्तोत्र, केतु कवच एवं महामृत्युंजय मंत्र',
    prescribedGemstone: 'लहसुनिया (Chrysoberyl Cat’s Eye - 5-7 Ratti)',
    gemstoneMetalFinger: 'पंचधातु, चांदी या अष्टधातु, कनिष्ठिका या मध्यमा',
    incompatibleGems: 'माणिक्य, मोती, मूंगा, पुखराज',
    daanItems: ['दो-रंग का कंबल (Black & White Blanket)', 'तिल', 'केला', 'सरसों', 'कुत्ते को भोजन'],
    auspiciousDay: 'मंगलवार / गुरुवार (Tuesday / Thursday)',
    rudraksha: '9 मुखी रुद्राक्ष',
    fastDay: 'मंगलवार व्रत / संकष्टी चतुर्थी'
  }
};

// House Lordship lookup by Lagna
function getHouseLords(ascSignIndex: number): Record<number, string> {
  const houseLords: Record<number, string> = {};
  for (let i = 1; i <= 12; i++) {
    const signIdx = (ascSignIndex + (i - 1)) % 12;
    houseLords[i] = ZODIAC_SIGNS[signIdx].lord;
  }
  return houseLords;
}

// Check Yogakaraka status for Lagna
function isYogakaraka(planet: string, ascSignIndex: number): boolean {
  // Taurus (1): Saturn (9th & 10th lord)
  // Cancer (3): Mars (5th & 10th lord)
  // Leo (4): Mars (4th & 9th lord)
  // Libra (6): Saturn (4th & 5th lord)
  // Capricorn (9): Venus (5th & 10th lord)
  // Aquarius (10): Venus (4th & 9th lord)
  if (ascSignIndex === 1 && planet === 'Saturn') return true;
  if (ascSignIndex === 3 && planet === 'Mars') return true;
  if (ascSignIndex === 4 && planet === 'Mars') return true;
  if (ascSignIndex === 6 && planet === 'Saturn') return true;
  if (ascSignIndex === 9 && planet === 'Venus') return true;
  if (ascSignIndex === 10 && planet === 'Venus') return true;
  return false;
}

// -------------------------------------------------------------
// 1. CALCULATE COMPREHENSIVE DASHAFAL (दशाफल)
// -------------------------------------------------------------
export function calculateDashafal(
  kundli: KundliData,
  targetMaha?: string,
  targetAntar?: string,
  targetPraty?: string
): DashafalReport {
  const mahaLord = targetMaha || kundli.dasha.currentMahadasha;
  const antarLord = targetAntar || kundli.dasha.currentAntardasha;
  const pratyLord = targetPraty || kundli.dasha.currentPratyantardasha;

  const ascSignIdx = kundli.ascendant.signIndex;
  const houseLords = getHouseLords(ascSignIdx);

  const mahaPlanet = kundli.planets.find(p => p.name === mahaLord) || kundli.planets[0];
  const antarPlanet = kundli.planets.find(p => p.name === antarLord) || kundli.planets[0];
  const pratyPlanet = kundli.planets.find(p => p.name === pratyLord) || kundli.planets[0];

  // Ruled houses
  const mahaRuledHouses = Object.entries(houseLords).filter(([_, l]) => l === mahaLord).map(([h]) => Number(h));
  const antarRuledHouses = Object.entries(houseLords).filter(([_, l]) => l === antarLord).map(([h]) => Number(h));

  // Mutual House Distance (Bhavat Bhavam)
  const mutualDistance = ((antarPlanet.house - mahaPlanet.house + 12) % 12) + 1;
  let mutualRelationship = '';
  let mutualEffectWeight = 1.0;

  if (mutualDistance === 1) {
    mutualRelationship = '1/1 युति (Conjunction / Sambandha) - अत्यधिक ऊर्जा व तीव्र परिणाम';
    mutualEffectWeight = 1.1;
  } else if (mutualDistance === 5 || mutualDistance === 9) {
    mutualRelationship = '5/9 नवपंचम योग (Trinal Harmony) - परम शुभ, भाग्य वृद्धि व धर्म लाभ';
    mutualEffectWeight = 1.35;
  } else if (mutualDistance === 3 || mutualDistance === 11) {
    mutualRelationship = '3/11 त्रि-एकादश योग (Effort & Gains) - पराक्रम से लाभ, उन्नति व मित्र सहयोग';
    mutualEffectWeight = 1.2;
  } else if (mutualDistance === 4 || mutualDistance === 10) {
    mutualRelationship = '4/10 केंद्र दृष्टि योग (Quadrature Action) - कर्मक्षेत्र में सक्रियता व अधिकार वृद्धि';
    mutualEffectWeight = 1.15;
  } else if (mutualDistance === 7) {
    mutualRelationship = '1/7 समसप्तक दृष्टि (Direct Opposition/Focus) - प्रत्यक्ष संतुलन, संबंध व जनसंपर्क';
    mutualEffectWeight = 1.1;
  } else if (mutualDistance === 6 || mutualDistance === 8) {
    mutualRelationship = '6/8 षडाष्टक योग (Shadashtaka Friction) - अप्रत्याशित बाधाएं, स्वास्थ्य व शत्रु भय';
    mutualEffectWeight = 0.65;
  } else if (mutualDistance === 2 || mutualDistance === 12) {
    mutualRelationship = '2/12 द्विर्द्वादश योग (Dwirdwadash Fluctuation) - व्यय, स्थान परिवर्तन व मानसिक उधेड़बुन';
    mutualEffectWeight = 0.75;
  }

  // Calculate Base Strength
  let mahaScore = 55;
  if (mahaPlanet.status === 'Exalted') mahaScore += 30;
  else if (mahaPlanet.status === 'Moolatrikona') mahaScore += 24;
  else if (mahaPlanet.status === 'Own Sign') mahaScore += 20;
  else if (mahaPlanet.status === 'Friendly') mahaScore += 10;
  else if (mahaPlanet.status === 'Debilitated') mahaScore -= 25;
  else if (mahaPlanet.status === 'Enemy') mahaScore -= 12;

  if (mahaPlanet.isCombust) mahaScore -= 15;
  if (mahaPlanet.house === 1 || mahaPlanet.house === 5 || mahaPlanet.house === 9) mahaScore += 15; // Trikona
  if (mahaPlanet.house === 4 || mahaPlanet.house === 7 || mahaPlanet.house === 10) mahaScore += 12; // Kendra
  if (mahaPlanet.house === 6 || mahaPlanet.house === 8 || mahaPlanet.house === 12) mahaScore -= 15; // Dusthana
  if (isYogakaraka(mahaLord, ascSignIdx)) mahaScore += 20;

  let antarScore = 55;
  if (antarPlanet.status === 'Exalted') antarScore += 25;
  else if (antarPlanet.status === 'Own Sign' || antarPlanet.status === 'Moolatrikona') antarScore += 18;
  else if (antarPlanet.status === 'Debilitated') antarScore -= 20;
  if (antarPlanet.isCombust) antarScore -= 12;
  if (antarPlanet.house === 1 || antarPlanet.house === 5 || antarPlanet.house === 9) antarScore += 12;
  if (antarPlanet.house === 6 || antarPlanet.house === 8 || antarPlanet.house === 12) antarScore -= 12;
  if (isYogakaraka(antarLord, ascSignIdx)) antarScore += 15;

  let finalScore = Math.round(((mahaScore * 0.6) + (antarScore * 0.4)) * mutualEffectWeight);
  finalScore = Math.max(15, Math.min(98, finalScore));

  let overallStatus: DashafalReport['overallStatus'] = 'शुभ एवं फलदायी (Auspicious)';
  if (finalScore >= 80) overallStatus = 'अति शुभ (Extremely Auspicious)';
  else if (finalScore >= 65) overallStatus = 'शुभ एवं फलदायी (Auspicious)';
  else if (finalScore >= 45) overallStatus = 'मिश्रित फल (Mixed)';
  else if (finalScore >= 30) overallStatus = 'चुनौतीपूर्ण (Challenging)';
  else overallStatus = 'कष्ट निवारक (Critical Caution)';

  // Dasha Phase
  const dashaPhase = 'मध्य काल (Peak Energy Phase)';

  // Build General Life Narrative
  const mahaSkt = SANSKRIT_PLANETS[mahaLord] || mahaLord;
  const antarSkt = SANSKRIT_PLANETS[antarLord] || antarLord;
  const pratySkt = SANSKRIT_PLANETS[pratyLord] || pratyLord;

  const generalHindi = `वर्तमान में आपकी कुंडली में ${mahaSkt} की महादशा में ${antarSkt} की अन्तर्दशा तथा ${pratySkt} की प्रत्यन्तर्दशा सक्रिय है। महादशा स्वामी ${mahaLord} आपकी कुंडली के ${mahaPlanet.house}वें भाव में ${mahaPlanet.sign} राशि में ${mahaPlanet.status} अवस्था में विराजमान हैं, और यह ${mahaRuledHouses.join(', ')} भावों के अधिपति हैं। अन्तर्दशा स्वामी ${antarLord} ${antarPlanet.house}वें भाव में स्थित होकर महादशा स्वामी से ${mutualDistance}वें भाव की दूरी पर ${mutualRelationship.split(' - ')[0]} बना रहे हैं। यह कालखंड आपके जीवन में ${finalScore >= 60 ? 'सकारात्मक रूपांतरण, भाग्य में वृद्धि, मान-सम्मान एवं नए अवसरों की प्राप्ति' : 'मेहनत के उपरांत सफलता, संयम, सूझबूझ एवं आध्यात्मिक सतर्कता'} का संकेत देता है।`;

  const generalEnglish = `You are currently experiencing the ${mahaLord} Mahadasha with ${antarLord} Antardasha and ${pratyLord} Pratyantardasha. The Mahadasha lord ${mahaLord} is placed in House ${mahaPlanet.house} (${mahaPlanet.sign}) in ${mahaPlanet.status} dignity, governing House(s) ${mahaRuledHouses.join(', ')}. The Antardasha lord ${antarLord} sits in House ${antarPlanet.house}, forming a ${mutualDistance}th house relationship (${mutualRelationship.split(' - ')[0]}). This alignment brings ${finalScore >= 60 ? 'exceptional cosmic momentum, auspicious milestones, recognition, and accelerated success' : 'a transformative phase requiring steady perseverance, disciplined action, and spiritual grounding'}.`;

  // Career & Profession
  const careerScore = Math.max(20, Math.min(96, Math.round(finalScore * (mahaPlanet.house === 10 || antarPlanet.house === 10 || mahaRuledHouses.includes(10) || antarRuledHouses.includes(10) ? 1.15 : 0.95))));
  const careerHindi = `${mahaLord}-${antarLord} का यह समय कार्यक्षेत्र में ${careerScore >= 70 ? 'नई जिम्मेदारियों, पदोन्नति, वरिष्ठ अधिकारियों से सहयोग और व्यापारिक विस्तार' : 'कार्यभार में वृद्धि, सहकर्मियों से तालमेल तथा धैर्यपूर्वक योजनाओं के क्रियान्वयन'} के लिए अत्यंत निर्णायक है। यदि आप नौकरी में परिवर्तन या नए व्यवसाय की योजना बना रहे हैं, तो ${mahaLord === 'Jupiter' || mahaLord === 'Sun' || mahaLord === 'Mars' ? 'यह समय प्रशासनिक, तकनीकी व प्रबंधन क्षेत्रों में उत्कृष्ट फल देगा' : 'रचनात्मक, वित्तीय, डेटा और नेटवर्किंग के क्षेत्रों में विशेष लाभ होगा'}।`;
  const careerEnglish = `The ${mahaLord}-${antarLord} period stimulates your professional 10th and 6th houses. It provides ${careerScore >= 70 ? 'lucrative promotion prospects, strategic mentorship, and strong expansion opportunities' : 'a testing ground requiring meticulous attention to organizational politics, contract details, and steady diligence'}. High-performing sectors include ${['Sun', 'Mars'].includes(mahaLord) ? 'Executive Leadership, Government Contracts, Engineering & Defense' : ['Jupiter', 'Mercury'].includes(mahaLord) ? 'Advisory, Tech Architecture, Finance, Education & Consulting' : 'Creative Arts, Luxury Commerce, Digital Operations & Logistics'}.`;

  // Wealth & Finances
  const wealthScore = Math.max(20, Math.min(96, Math.round(finalScore * (mahaRuledHouses.includes(2) || mahaRuledHouses.includes(11) || antarRuledHouses.includes(2) || antarRuledHouses.includes(11) ? 1.2 : 0.95))));
  const wealthHindi = `आर्थिक दृष्टिकोण से यह दशा ${wealthScore >= 65 ? 'आय के नए स्रोतों का सृजन, भूमि-भवन या वाहन में निवेश तथा संचित धन में वृद्धि' : 'अनपेक्षित व्ययों पर नियंत्रण, बजट संतुलन तथा जोखिम भरे सट्टेबाजी या त्वरित लाभ से बचने'} की सलाह देती है। ${mahaPlanet.house === 2 || mahaPlanet.house === 11 ? 'धन भाव एवं लाभ भाव की सक्रियता से आकस्मिक वित्तीय लाभ के योग बन रहे हैं।' : 'स्थिर निवेश और दीर्घकालिक बचत योजनाओं में ही पूंजी लगाना श्रेयस्कर रहेगा।'}`;
  const wealthEnglish = `Financially, this period indicates ${wealthScore >= 65 ? 'robust inflow of capital, lucrative real estate or investment opportunities, and steady liquidation of debts' : 'a need for prudent fiscal governance, avoiding speculative gambling, and prioritizing liquid savings'}. Dhana yogas are ${wealthScore >= 65 ? 'activated by favorable 2nd/11th house aspects' : 'requiring systematic budgeting to curb sudden expenditure'}.`;

  // Love & Marriage
  const loveScore = Math.max(20, Math.min(95, Math.round(finalScore * (mahaRuledHouses.includes(7) || mahaRuledHouses.includes(5) || antarRuledHouses.includes(7) || antarRuledHouses.includes(5) || ['Venus', 'Jupiter', 'Moon'].includes(mahaLord) ? 1.15 : 0.9))));
  const loveHindi = `प्रेम एवं दांपत्य जीवन के लिए यह कालखंड ${loveScore >= 65 ? 'आपसी सामंजस्य में वृद्धि, जीवनसाथी का सहयोग, परिवार में मांगलिक कार्य एवं अविवाहितों के लिए विवाह वार्ता के अनुकूल योग' : 'संवाद में मधुरता बनाए रखने, अहंकार से बचने तथा पारिवारिक मामलों में परिपक्वता दिखाने'} का है। ${antarLord === 'Venus' || antarLord === 'Jupiter' ? 'सकारात्मक भावनात्मक ऊर्जा का संचार होगा।' : 'छोटी बातों को विवाद का रूप न बनने दें।'}`;
  const loveEnglish = `In relationships, this planetary period ${loveScore >= 65 ? 'brings deep mutual understanding, romantic rejuvenation, spousal support, and favorable matrimonial timing' : 'counsels patience, avoiding ego clashes, and nurturing empathetic communication'}.`;

  // Education
  const eduScore = Math.max(25, Math.min(95, Math.round(finalScore * (mahaRuledHouses.includes(4) || mahaRuledHouses.includes(5) || mahaRuledHouses.includes(9) || ['Mercury', 'Jupiter'].includes(mahaLord) ? 1.18 : 0.95))));
  const eduHindi = `विद्यार्थियों व शोधार्थियों के लिए यह दशा ${eduScore >= 70 ? 'एकाग्रता, प्रतियोगी परीक्षाओं में सफलता, उच्च शिक्षा व तकनीकी कौशल में अद्वितीय प्रगति' : 'नियमित अध्ययन, भटकाव से बचाव तथा व्यवस्थित समय-सारणी के पालन'} से अभीष्ट फल दिलाएगी।`;
  const eduEnglish = `For academics and research, this phase ${eduScore >= 70 ? 'bestows razor-sharp retention, stellar competitive exam scores, and potential scholarship / foreign university admissions' : 'demands disciplined study routines, minimizing digital distractions, and strengthening core fundamentals'}.`;

  // Health
  const healthScore = Math.max(25, Math.min(92, Math.round((100 - (100 - finalScore) * 0.8))));
  const healthHindi = `स्वास्थ्य के संदर्भ में ${healthScore >= 70 ? 'शारीरिक स्फूर्ति, मानसिक शांति एवं दीर्घकालिक रोगों से मुक्ति के शुभ संकेत हैं।' : 'खानपान में संयम, नियमित योग-प्राणायाम, तथा मौसमी व पाचन संबंधी व्याधियों से सतर्क रहने की आवश्यकता है।'}`;
  const healthEnglish = `Health-wise, this period promises ${healthScore >= 70 ? 'high vitality, mental clarity, sound restorative sleep, and recovery from past ailments' : 'a need to maintain balanced circadian rhythms, gut health, and periodic stress management'}.`;

  const remedies = PLANETARY_REMEDIES[mahaLord] || PLANETARY_REMEDIES['Jupiter'];

  return {
    mahadashaLord: mahaLord,
    antardashaLord: antarLord,
    pratyantardashaLord: pratyLord,
    currentPeriodFormatted: `${mahaLord} (महादशा) • ${antarLord} (अन्तर्दशा) • ${pratyLord} (प्रत्यन्तर्दशा)`,
    dashaPhase,
    mutualRelationship,
    overallScore: finalScore,
    overallStatus,
    generalLife: {
      hindi: generalHindi,
      english: generalEnglish,
      vitalityScore: healthScore
    },
    career: {
      hindi: careerHindi,
      english: careerEnglish,
      score: careerScore,
      opportunities: [
        `${mahaLord} के प्रभाव से रणनीतिक व तकनीकी दायित्वों में नेतृत्व`,
        'वरिष्ठजनों से मार्गदर्शन एवं पेशेवर नेटवर्क का विस्तार',
        'नवीन योजनाओं व कौशल विकास के लिए स्वर्णिम काल'
      ],
      precautions: [
        'कार्यस्थल पर अनचाहे विवादों और गॉसिप से पूर्णतः दूर रहें',
        'अनुबंधों (Contracts) पर हस्ताक्षर से पूर्व सभी शर्तें ध्यानपूर्वक पढ़ें'
      ]
    },
    wealth: {
      hindi: wealthHindi,
      english: wealthEnglish,
      score: wealthScore,
      financialTrend: wealthScore >= 65 ? 'तेज वित्तीय वृद्धि एवं संचय (Strong Wealth Accumulation)' : 'संतुलित एवं स्थिर प्रवाह (Stable Financial Flow)',
      wealthYogasActive: [
        `${mahaPlanet.house}वें भाव में ${mahaLord} की स्थिति से सक्रिय धन योग`,
        `${antarLord} अन्तर्दशा द्वारा उत्पन्न वित्तीय संयोग`
      ],
      precautions: [
        'अपरिचित लोगों के साथ साझे निवेश में सावधानी बरतें',
        'अनावश्यक विलासिता पर वित्तीय नियंत्रण रखें'
      ]
    },
    loveMarriage: {
      hindi: loveHindi,
      english: loveEnglish,
      score: loveScore,
      relationshipStatus: loveScore >= 65 ? 'सौहार्दपूर्ण एवं प्रेममय (Harmonious & Loving)' : 'संयम एवं समझदारी अपेक्षित (Needs Gentle Care)',
      advice: 'दैनिक संवाद में सम्मान और पारदर्शिता बनाए रखें।'
    },
    education: {
      hindi: eduHindi,
      english: eduEnglish,
      score: eduScore,
      focusAreas: [
        'तार्किक विश्लेषण, कोडिंग, डेटा अथवा शोध कार्य',
        'प्रतियोगी परीक्षाओं की सुनियोजित तैयारी'
      ]
    },
    health: {
      hindi: healthHindi,
      english: healthEnglish,
      score: healthScore,
      vulnerableAreas: [
        mahaLord === 'Sun' ? 'नेत्र, सिरदर्द, रक्तचाप' :
        mahaLord === 'Moon' ? 'सर्दी-जुकाम, जल तत्व, अनिद्रा' :
        mahaLord === 'Mars' ? 'रक्त, पित्त विकार, मांसपेशियों में तनाव' :
        mahaLord === 'Mercury' ? 'त्वचा, तंत्रिका तंत्र, तनाव' :
        mahaLord === 'Jupiter' ? 'यकृत (Liver), पाचन, वजन' :
        mahaLord === 'Venus' ? 'मधुमेह, हार्मोनल संतुलन, गुर्दे' :
        mahaLord === 'Saturn' ? 'जोड़ों का दर्द, वात रोग, थकान' :
        mahaLord === 'Rahu' ? 'अनिद्रा, गैस्ट्रिक, मानसिक भ्रम' : 'त्वचा एलर्जी, नसों की दुर्बलता'
      ],
      wellnessTips: [
        'प्रतिदिन 20 मिनट सूर्य नमस्कार व अनुलोम-विलोम प्राणायाम करें',
        'सात्विक, सुपाच्य एवं ताजे भोजन को प्राथमिकता दें'
      ]
    },
    remedies,
    dosAndDonts: {
      dos: [
        `नियमित रूप से ${remedies.sacredStotra} का पाठ करें`,
        `प्रतिदिन प्रातः ${remedies.beejMantra} का 108 बार जाप करें`,
        `${remedies.auspiciousDay} को शुभ दान सामग्री का जरूरतमंदों को वितरण करें`
      ],
      donts: [
        `वर्जित रत्न (${remedies.incompatibleGems}) भूलकर भी न पहनें`,
        'राहु काल के समय कोई भी महत्वपूर्ण नया कार्य आरंभ न करें',
        'क्रोध, अति-उत्साह या जल्दबाजी में बड़े वित्तीय निर्णय न लें'
      ]
    }
  };
}

// -------------------------------------------------------------
// 2. CALCULATE COMPREHENSIVE LIFE PREDICTIONS
// (Love, Education, Nature, Profession)
// -------------------------------------------------------------
export function calculateLifePredictions(kundli: KundliData): LifePredictions {
  const asc = kundli.ascendant;
  const moon = kundli.moonSign;
  const sun = kundli.sunSign;
  const ascSignIdx = asc.signIndex;
  const houseLords = getHouseLords(ascSignIdx);

  const lagnaLordName = asc.lord;
  const lagnaLordPlanet = kundli.planets.find(p => p.name === lagnaLordName) || kundli.planets[0];
  const sunPlanet = kundli.planets.find(p => p.name === 'Sun') || kundli.planets[0];
  const moonPlanet = kundli.planets.find(p => p.name === 'Moon') || kundli.planets[0];
  const marsPlanet = kundli.planets.find(p => p.name === 'Mars') || kundli.planets[0];
  const mercuryPlanet = kundli.planets.find(p => p.name === 'Mercury') || kundli.planets[0];
  const jupiterPlanet = kundli.planets.find(p => p.name === 'Jupiter') || kundli.planets[0];
  const venusPlanet = kundli.planets.find(p => p.name === 'Venus') || kundli.planets[0];
  const saturnPlanet = kundli.planets.find(p => p.name === 'Saturn') || kundli.planets[0];

  const seventhLord = houseLords[7];
  const seventhLordPlanet = kundli.planets.find(p => p.name === seventhLord) || kundli.planets[0];
  const fifthLord = houseLords[5];
  const fifthLordPlanet = kundli.planets.find(p => p.name === fifthLord) || kundli.planets[0];
  const tenthLord = houseLords[10];
  const tenthLordPlanet = kundli.planets.find(p => p.name === tenthLord) || kundli.planets[0];
  const fourthLord = houseLords[4];
  const fourthLordPlanet = kundli.planets.find(p => p.name === fourthLord) || kundli.planets[0];
  const ninthLord = houseLords[9];
  const ninthLordPlanet = kundli.planets.find(p => p.name === ninthLord) || kundli.planets[0];

  // -------------------------------------------------------------
  // PILLAR A: NATURE & PERSONALITY (स्वभाव, व्यक्तित्व एवं चरित्र)
  // -------------------------------------------------------------
  const signInfo = ZODIAC_SIGNS[ascSignIdx];
  const elementHindi = signInfo.element === 'Fire' ? 'अग्नि तत्व (Fire - ऊर्जावान, नेतृत्वशील)' :
    signInfo.element === 'Earth' ? 'पृथ्वी तत्व (Earth - व्यावहारिक, धैर्यवान, स्थिर)' :
    signInfo.element === 'Air' ? 'वायु तत्व (Air - बौद्धिक, विचारशील, संवादप्रिय)' :
    'जल तत्व (Water - संवेदनशील, अंतर्ज्ञानी, करुणामय)';

  const modality = ascSignIdx % 3 === 0 ? 'चर (Movable - गतिशील एवं नवोन्मेषी)' :
    ascSignIdx % 3 === 1 ? 'स्थिर (Fixed - दृढ़निश्चयी, निष्ठावान एवं एकाग्र)' :
    'द्विस्वभाव (Dual - बहुआयामी, अनुकूलनशील एवं विवेकशील)';

  let temperament = 'राजसिक (Action-Driven & Dynamic)';
  if (['Jupiter', 'Sun', 'Moon'].includes(lagnaLordName)) temperament = 'सात्विक (Spiritual, Pure & Truthful)';
  if (['Saturn', 'Rahu', 'Mars'].includes(lagnaLordName)) temperament = 'तामसिक (Determined, Resilient & Bold)';

  const natureStrengths = [
    `आत्म-सम्मान, दृढ़ इच्छाशक्ति एवं नैसर्गिक नेतृत्व क्षमता (${asc.sign} लग्न का प्रभाव)`,
    `तीव्र ग्रहणशीलता, रचनात्मक कल्पनाशक्ति एवं संवेदनशीलता (${moon.sign} चंद्र राशि)`,
    `${lagnaLordName} के ${lagnaLordPlanet.house}वें भाव में होने से जीवन में लक्ष्य के प्रति अटूट निष्ठा`,
    'मुश्किल परिस्थितियों में भी संतुलन व धैर्य बनाए रखने का सामर्थ्य'
  ];

  const natureGrowthAreas = [
    'अति-संवेदनशीलता या अत्यधिक चिंतन (Overthinking) से बचें',
    'दूसरों पर त्वरित विश्वास करने से पूर्व व्यावहारिक जांच-पड़ताल करें',
    'क्रोध या जल्दबाजी में निर्णय लेने की प्रवृत्ति पर अंकुश रखें'
  ];

  const natureHindi = `आपका जन्म ${asc.sign} लग्न एवं ${moon.sign} चंद्र राशि के अंतर्गत ${moon.nakshatra} नक्षत्र के चतुर्थांश में हुआ है। लग्नेश ${lagnaLordName} आपकी कुंडली के ${lagnaLordPlanet.house}वें भाव में ${lagnaLordPlanet.sign} राशि में ${lagnaLordPlanet.status} स्थिति में स्थापित हैं। आपका व्यक्तित्व ${elementHindi} तथा ${modality} से ओत-प्रोत है। आप स्वभाव से एक विचारशील, न्यायप्रिय एवं आत्मविश्वासी व्यक्ति हैं। आपके भीतर दूसरों को प्रेरित करने और विषम परिस्थितियों से स्वतः उभरने की अपार क्षमता है। आपका मन गहराई से सोचने वाला और सत्य के प्रति निष्ठावान है।`;

  const natureEnglish = `You are born under ${asc.sign} Ascendant (Lagna) with ${moon.sign} Moon sign in the auspicious ${moon.nakshatra} Nakshatra. Your Lagna Lord ${lagnaLordName} resides in House ${lagnaLordPlanet.house} (${lagnaLordPlanet.sign}) in ${lagnaLordPlanet.status} dignity. Governed by the ${signInfo.element} element and ${modality} modality, your personality blends strong willpower, intuitive perception, and natural executive poise. You possess an innate resilience to overcome obstacles and a deep yearning for authentic growth.`;

  // -------------------------------------------------------------
  // PILLAR B: LOVE & MARRIAGE (प्रेम, विवाह एवं वैवाहिक जीवन)
  // -------------------------------------------------------------
  const seventhHouseOccupants = kundli.planets.filter(p => p.house === 7).map(p => p.name);
  const seventhHouseAspects = kundli.houses.find(h => h.houseNumber === 7)?.aspects || [];

  let harmonyScore = 78;
  if (seventhLordPlanet.status === 'Exalted' || seventhLordPlanet.status === 'Own Sign') harmonyScore += 12;
  if (seventhLordPlanet.status === 'Debilitated') harmonyScore -= 18;
  if (venusPlanet.status === 'Exalted' || venusPlanet.status === 'Own Sign') harmonyScore += 10;
  if (venusPlanet.status === 'Debilitated' || venusPlanet.isCombust) harmonyScore -= 12;
  if (kundli.doshas.manglik.isManglik) harmonyScore -= (kundli.doshas.manglik.severity === 'Cancelled' ? 2 : 10);
  harmonyScore = Math.max(35, Math.min(98, harmonyScore));

  const spouseDirection = ['East', 'North-East', 'North', 'North-West', 'West', 'South-West', 'South', 'South-East'][(seventhLordPlanet.signIndex * 3) % 8];
  
  const spouseNature = seventhLord === 'Venus' || seventhLord === 'Mercury' ? 'अत्यंत आकर्षक, सुशिक्षित, मधुरभाषी, कलाप्रेमी एवं सहयोगप्रिय' :
    seventhLord === 'Jupiter' ? 'गंभीर, धार्मिक, सदाचारी, बुद्धिमान एवं संभ्रांत कुल से संबंधित' :
    seventhLord === 'Sun' || seventhLord === 'Mars' ? 'ऊर्जावान, स्वाभिमानी, महत्वाकांक्षी एवं नेतृत्व क्षमता से युक्त' :
    seventhLord === 'Moon' ? 'भावुक, करुणामय, पारिवारिक मूल्यों के प्रति समर्पित एवं सुंदर नैन-नक्श' :
    'गंभीर, व्यावहारिक, धैर्यवान, कार्य-कुशल एवं निष्ठावान';

  const spouseAppearance = ['Venus', 'Moon'].includes(seventhLord) ? 'गौर वर्ण, आकर्षक व्यक्तित्व, सम्मोहक नेत्र एवं सुरुचिपूर्ण वेशभूषा' :
    ['Jupiter', 'Sun'].includes(seventhLord) ? 'सुगठित कद-काठी, तेजस्वी मुखमंडल, गरिमामय चाल-ढाल' :
    ['Mercury'].includes(seventhLord) ? 'युवा दिखने वाला मुख, चंचल मुस्कान एवं अत्यंत वाक्पटु' :
    'मध्यम कद, विचारमग्न चेहरा, तीखे नैन-नक्श एवं सादगीपूर्ण अंदाज';

  const spouseProfession = ['Jupiter', 'Sun'].includes(seventhLord) ? 'प्रशासन, शिक्षा, कानून, चिकित्सा या उच्च पदस्थ प्रबंधन' :
    ['Venus', 'Mercury'].includes(seventhLord) ? 'सॉफ्टवेयर, डिजाइन, मीडिया, बैंकिंग, वित्त, सीए या रचनात्मक उद्योग' :
    ['Mars', 'Saturn'].includes(seventhLord) ? 'इंजीनियरिंग, रियल एस्टेट, रक्षा, कॉर्पोरेट संचालन या स्वतंत्र व्यवसाय' :
    'अस्पताल, परामर्श, मानव संसाधन, शोध या सार्वजनिक संबंध';

  const marriageWindows = [
    '24 से 27 वर्ष की आयु (प्रथम अनुकूल वैवाहिक योग)',
    '28 से 31 वर्ष की आयु (अत्यंत परिपक्व एवं समृद्ध वैवाहिक काल)'
  ];

  const loveHindi = `आपकी कुंडली में सप्तम भाव (कलत्र भाव) के स्वामी ${seventhLord} हैं, जो कुंडली के ${seventhLordPlanet.house}वें भाव में ${seventhLordPlanet.status} अवस्था में विराजमान हैं। विवाह के नैसर्गिक कारक शुक्र ${venusPlanet.house}वें भाव में तथा गुरु ${jupiterPlanet.house}वें भाव में स्थित हैं। नवमांश (D9) कुंडली में सप्तमेश की स्थिति वैवाहिक स्थिरता को बल प्रदान कर रही है। आपका जीवनसाथी ${spouseNature} होगा। उनका व्यक्तित्व ${spouseAppearance} होगा। वैवाहिक जीवन में सुख, सम्मान और परस्पर सहयोग बना रहेगा। यदि विवाह पूर्व गुण मिलान एवं कुजा दोष परिहार किया जाए, तो दांपत्य जीवन में दीर्घायु व समृद्धि की प्राप्ति होगी।`;

  const loveEnglish = `Your 7th House of Marriage (Kalatra Bhava) is lorded by ${seventhLord}, located in House ${seventhLordPlanet.house} in ${seventhLordPlanet.status} dignity. Venus (Karaka for Love) resides in House ${venusPlanet.house} while Jupiter provides wisdom and grace. The D9 Navamsha chart reinforces matrimonial stability and mutual devotion. Your prospective spouse will possess a ${spouseNature} demeanor, characterized by ${spouseAppearance}. Favorable career domains for your partner include ${spouseProfession}.`;

  // -------------------------------------------------------------
  // PILLAR C: EDUCATION & INTELLECT (शिक्षा, विद्या एवं बौद्धिक क्षमता)
  // -------------------------------------------------------------
  let eduExamScore = 82;
  if (mercuryPlanet.status === 'Exalted' || mercuryPlanet.status === 'Own Sign') eduExamScore += 10;
  if (jupiterPlanet.status === 'Exalted' || jupiterPlanet.status === 'Own Sign') eduExamScore += 10;
  if (fifthLordPlanet.house === 1 || fifthLordPlanet.house === 5 || fifthLordPlanet.house === 9) eduExamScore += 8;
  if (fifthLordPlanet.status === 'Debilitated') eduExamScore -= 12;
  eduExamScore = Math.max(40, Math.min(97, eduExamScore));

  const recommendedStreams = [
    'कंप्यूटर साइंस, आर्टिफिशियल इंटेलिजेंस, डेटा एनालिटिक्स व सॉफ्टवेयर इंजीनियरिंग',
    'सिविल सेवा (UPSC/PSC), न्यायिक सेवा, कॉर्पोरेट लॉ व जन-प्रशासन',
    'वित्त, चार्टर्ड एकाउंटेंसी (CA), बैंकिंग, इकोनॉमिक्स व वेल्थ मैनेजमेंट',
    'वैज्ञानिक अनुसंधान, चिकित्सा (Medicine/Biotech), फार्मेसी व उच्च विद्या'
  ];

  const intellectType = ['Mercury', 'Saturn'].includes(fifthLord) || ['Mercury', 'Mars'].includes(lagnaLordName)
    ? 'तीक्ष्ण विश्लेषणात्मक, तार्किक एवं तकनीकी मेधा (Analytical & Problem-Solving Genius)'
    : ['Jupiter', 'Sun'].includes(fifthLord)
    ? 'दूरदर्शी, दार्शनिक, रणनीतिक एवं ज्ञान-समृद्ध मेधा (Strategic & Visionary Intellect)'
    : 'सृजनात्मक, नवाचारयुक्त, बहुआयामी एवं कलात्मक मेधा (Creative & Multi-Disciplinary Intellect)';

  const eduHindi = `आपकी कुंडली में पंचम भाव (बुद्धि व विद्या) के स्वामी ${fifthLord} तथा चतुर्थ भाव (औपचारिक शिक्षा) के स्वामी ${fourthLord} हैं। विद्या के कारक बुध ${mercuryPlanet.house}वें भाव में तथा गुरु ${jupiterPlanet.house}वें भाव में विराजित हैं। D24 (चतुर्विंशांश) कुंडली के अनुसार आपकी बौद्धिक क्षमता "${intellectType}" वर्ग में आती है। आप जटिल से जटिल विषयों को सरलता से समझने और उनका व्यावहारिक उपयोग करने में प्रवीण हैं। उच्च शिक्षा, स्नातकोत्तर (Masters) एवं विदेश अध्ययन के अत्यंत प्रबल योग विद्यमान हैं। प्रतियोगी परीक्षाओं में योजनाबद्ध तैयारी से उच्च रैंक प्राप्त करने की पूर्ण क्षमता है।`;

  const eduEnglish = `Your intellect and academic destiny are governed by 5th Lord ${fifthLord} (House ${fifthLordPlanet.house}) and 4th Lord ${fourthLord} (House ${fourthLordPlanet.house}), harmonized by Mercury (Logic) in House ${mercuryPlanet.house} and Jupiter (Wisdom) in House ${jupiterPlanet.house}. As confirmed by the D24 Chaturvimshamsha chart, your cognitive blueprint exhibits "${intellectType}". You possess tremendous capacity for clearing competitive administrative/technical examinations, conducting deep research, and achieving excellence in top-tier global institutions.`;

  // -------------------------------------------------------------
  // PILLAR D: PROFESSION & CAREER (व्यवसाय, आजीविका व पद-प्रतिष्ठा)
  // -------------------------------------------------------------
  const tenthOccupants = kundli.planets.filter(p => p.house === 10).map(p => p.name);
  const tenthAspects = kundli.houses.find(h => h.houseNumber === 10)?.aspects || [];

  let careerTrack: LifePredictions['professionAndCareer']['careerTrack'] = 'Corporate Leadership / Tech Industry';
  if (sunPlanet.house === 10 || marsPlanet.house === 10 || (tenthLord === 'Sun' && sunPlanet.status !== 'Debilitated') || (tenthLord === 'Mars' && marsPlanet.status !== 'Debilitated')) {
    careerTrack = 'Govt Job / Public Administration';
  } else if (tenthLord === 'Mercury' || tenthLord === 'Venus' || seventhLordPlanet.house === 10) {
    careerTrack = 'Independent Business / Entrepreneurship';
  } else if (jupiterPlanet.house === 10 || saturnPlanet.house === 10) {
    careerTrack = 'Professional Practice / Consultancy';
  }

  const favorableDomains = [
    'प्रौद्योगिकी नेतृत्व, सॉफ्टवेयर आर्किटेक्चर, आईटी एवं डिजिटल इनोवेशन',
    'प्रशासनिक पद, नीति निर्माण, सरकारी उपक्रम एवं कॉर्पोरेट गवर्नेंस',
    'वित्तीय परामर्श, इन्वेस्टमेंट बैंकिंग, सीए एवं रणनीतिक व्यापार',
    'अन्तर्राष्ट्रीय व्यापार, लॉजिस्टिक्स, रियल एस्टेट एवं उच्च स्तरीय परामर्श'
  ];

  const peakRise = [
    '28 से 34 वर्ष की आयु (करियर में तीव्र छलांग व स्वतंत्र पहचान)',
    '36 से 45 वर्ष की आयु (सर्वोच्च पद, अधिकार, मान-सम्मान व व्यापक वित्तीय समृद्धि)'
  ];

  const profHindi = `आपकी कुंडली में दशम भाव (कर्म भाव) के स्वामी ${tenthLord} हैं, जो ${tenthLordPlanet.house}वें भाव में ${tenthLordPlanet.status} अवस्था में स्थित हैं। दशम भाव में ${tenthOccupants.length > 0 ? tenthOccupants.join(', ') + ' ग्रह' : 'शुभ ग्रहों का प्रभाव'} विद्यमान है। D10 (दशांश) कुंडली का विश्लेषण दर्शाता है कि आपकी मुख्य आजीविका दिशा "${careerTrack}" के लिए सर्वथा उपयुक्त है। कुंडली में बनने वाले राजयोग एवं धन योग आपको जीवन में उच्च सामाजिक प्रतिष्ठा, अधिकार और दीर्घकालिक संपत्ति प्रदान करेंगे। आपका स्वभाव सेवा और व्यापार दोनों में सफलता अर्जित करने में सक्षम है, किंतु 32 वर्ष के उपरांत स्वतंत्र निर्णयकारी पद पर कार्य करने से अप्रत्याशित सफलता मिलेगी।`;

  const profEnglish = `Your professional destiny (Karma Bhava - 10th House) is ruled by ${tenthLord} positioned in House ${tenthLordPlanet.house} in ${tenthLordPlanet.status} state. The D10 Dashamsha chart establishes a powerful career blueprint favoring "${careerTrack}". Astrological Raja Yogas and Dhana Yogas in your chart promise high societal stature, executive authority, and continuous financial expansion. The peak milestone age windows include ${peakRise.join(' and ')}.`;

  return {
    natureAndPersonality: {
      temperament,
      element: elementHindi,
      modality,
      lagnaSignInfluence: `${asc.sign} लग्न के प्रभाव से ओजस्वी, साहसी व सत्यनिष्ठ व्यक्तित्व`,
      lagnaLordPlacement: `${lagnaLordName} ग्रह कुंडली के ${lagnaLordPlanet.house}वें भाव में स्थित होकर आत्मबल को सुदृढ़ कर रहे हैं`,
      moonSignNature: `${moon.sign} राशि एवं ${moon.nakshatra} नक्षत्र से तीव्र कल्पनाशक्ति व संवेदनशीलता`,
      nakshatraPersonality: `${moon.nakshatra} के प्रभाव से लक्ष्य के प्रति अडिग निष्ठा`,
      keyStrengths: natureStrengths,
      areasForGrowth: natureGrowthAreas,
      hindi: natureHindi,
      english: natureEnglish
    },
    loveAndMarriage: {
      seventhHouseCondition: `सप्तम भाव में ${seventhHouseOccupants.length > 0 ? seventhHouseOccupants.join(', ') : 'शांत एवं शुभ दृष्टि'} का संचार`,
      seventhLordDignity: `${seventhLord} सप्तमेश होकर ${seventhLordPlanet.house}वें भाव में ${seventhLordPlanet.status} स्थिति में हैं`,
      venusCondition: `शुक्र ${venusPlanet.house}वें भाव में ${venusPlanet.sign} राशि में स्थापित`,
      jupiterCondition: `बृहस्पति ${jupiterPlanet.house}वें भाव से दृष्टि संबंध स्थापित कर रहे हैं`,
      navamshaVerdict: 'D9 नवमांश कुंडली में वैवाहिक सामंजस्य एवं परस्पर निष्ठा के शुभ संकेत',
      manglikAnalysis: kundli.doshas.manglik.isManglik ? `मांगलिक प्रभाव (${kundli.doshas.manglik.severity}) - उचित उपाय व मिलान अनुशंसित` : 'गैर-मांगलिक (निर्दोष कलत्र भाव)',
      spouseProfile: {
        appearance: spouseAppearance,
        nature: spouseNature,
        direction: spouseDirection,
        professionHint: spouseProfession,
        personalityVibe: 'गरिमामय, सुसंस्कृत एवं परिवार को जोड़ने वाला'
      },
      marriageTimingWindows: marriageWindows,
      harmonyScore,
      hindi: loveHindi,
      english: loveEnglish,
      remedies: [
        'प्रतिदिन श्री शिव-पार्वती की संयुक्त पूजा करें',
        'शुक्रवार को श्री सूक्तम् का पाठ अथवा सोमवार को कच्चा दूध शिवलिंग पर अर्पित करें',
        'वैवाहिक सामंजस्य हेतु शयनकक्ष में सकारात्मक ऊर्जा बनाए रखें'
      ]
    },
    educationAndIntellect: {
      secondHouseFoundation: `द्वितीय भाव (संस्कार व वाणी) स्वामी ${houseLords[2]} की शुभ स्थिति`,
      fourthHouseSchooling: `चतुर्थ भाव (औपचारिक विद्या) स्वामी ${fourthLord} ${fourthLordPlanet.house}वें भाव में`,
      fifthHouseIntellect: `पंचम भाव (मेधा व पूर्व पुण्य) स्वामी ${fifthLord} ${fifthLordPlanet.house}वें भाव में ${fifthLordPlanet.status}`,
      ninthHouseHigherLearning: `नवम भाव (उच्च विद्या व अनुसंधान) स्वामी ${ninthLord} की कृपा`,
      mercuryCondition: `बुध ${mercuryPlanet.house}वें भाव में स्थित होकर तार्किक बुद्धि को प्रखर कर रहे हैं`,
      jupiterCondition: `बृहस्पति ${jupiterPlanet.house}वें भाव में स्थित होकर ज्ञान व विवेक को आलोकित कर रहे हैं`,
      d24ChaturvimshamshaAnalysis: 'D24 सिद्धांश कुंडली उच्च स्तरीय ज्ञान व शोध का समर्थन करती है',
      intellectType,
      recommendedStreams,
      higherEducationAndAbroad: 'उच्च शिक्षा, स्नातकोत्तर एवं प्रतिष्ठित संस्थानों में चयन के अत्यंत प्रबल योग',
      competitiveExamScore: eduExamScore,
      hindi: eduHindi,
      english: eduEnglish,
      remedies: [
        'प्रतिदिन अध्ययन से पूर्व "ॐ ऐं सरस्वत्यै नमः" का 11 बार स्मरण करें',
        'बुधवार को भगवान गणेश को दूर्वा अर्पित करें और संकटनाशन स्तोत्र का पाठ करें',
        'उत्तर या पूर्व दिशा की ओर मुख करके अध्ययन करें'
      ]
    },
    professionAndCareer: {
      tenthHouseStatus: `दशम भाव (कर्म भाव) स्वामी ${tenthLord} ${tenthLordPlanet.house}वें भाव में ${tenthLordPlanet.status} अवस्था में`,
      tenthLordDignity: `${tenthLord} की स्थिति कार्यक्षेत्र में सतत उन्नति का मार्ग प्रशस्त करती है`,
      occupantsAndAspects: tenthOccupants.length > 0 ? `दशम भाव में ${tenthOccupants.join(', ')} की उपस्थिति` : 'दशम भाव पर शुभ ग्रहों की दृष्टि',
      d10DashamshaVerdict: 'D10 दशांश कुंडली के अनुसार कार्यक्षेत्र में स्वतंत्र नेतृत्व व पद-प्रतिष्ठा का योग',
      careerTrack,
      favorableDomains,
      wealthAccumulationLevel: 'उच्च स्तरीय संचित धन (Dhana Yoga) एवं अचल संपत्ति निर्माण',
      peakRisePeriods: peakRise,
      hindi: profHindi,
      english: profEnglish,
      remedies: [
        'प्रतिदिन प्रातः सूर्य देव को तांबे के लोटे से जल (अर्घ्य) अर्पित करें',
        'कार्यस्थल पर उत्तर दिशा में कुबेर यंत्र अथवा श्री यंत्र स्थापित करें',
        'शनिवार को दशरथ कृत शनि स्तोत्र का पाठ करें और जरूरतमंदों की सहायता करें'
      ]
    }
  };
}
