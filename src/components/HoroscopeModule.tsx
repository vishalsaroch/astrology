import React, { useState } from 'react';
import {
  Moon,
  Sparkles,
  Heart,
  Briefcase,
  Wallet,
  Activity,
  Calendar,
  Compass,
  Star,
  Flame,
  Droplets,
  Wind,
  Mountain,
  GraduationCap,
  Brain,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ZODIAC_SIGNS } from '../services/astrology/ephemeris';
import { useTranslation } from '../i18n/LanguageContext';

export const HoroscopeModule: React.FC = () => {
  const { t } = useTranslation();
  const [selectedSignIndex, setSelectedSignIndex] = useState<number>(0);
  const [timeframe, setTimeframe] = useState<'today' | 'tomorrow' | 'weekly' | 'monthly' | 'yearly'>('today');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'love' | 'education' | 'nature' | 'profession' | 'wealth'>('all');

  const selectedSign = ZODIAC_SIGNS[selectedSignIndex];

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Fire': return Flame;
      case 'Water': return Droplets;
      case 'Air': return Wind;
      default: return Mountain;
    }
  };

  const ElementIcon = getElementIcon(selectedSign.element);

  // Sign-specific Vedic forecast data
  const SIGN_FORECASTS: Record<string, {
    loveHindi: string;
    loveEnglish: string;
    loveScore: number;
    eduHindi: string;
    eduEnglish: string;
    eduScore: number;
    natureHindi: string;
    natureEnglish: string;
    profHindi: string;
    profEnglish: string;
    profScore: number;
    wealthHindi: string;
    wealthEnglish: string;
    wealthScore: number;
    upaya: string;
    mantra: string;
  }> = {
    Aries: {
      loveHindi: 'मंगल के प्रभाव से प्रेम जीवन में उत्साह रहेगा। जीवनसाथी के साथ संवाद में सौम्यता बरतें और अनावश्यक जिद से बचें।',
      loveEnglish: 'Mars brings energetic passion to romantic relations. Practice gentleness in communications.',
      loveScore: 84,
      eduHindi: 'विद्यार्थियों के लिए तकनीकी व प्रतियोगी परीक्षाओं में एकाग्रता बढ़ेगी। कठिन विषयों को समझने में सफलता मिलेगी।',
      eduEnglish: 'High focus in technical subjects and competitive preparation with strong recall ability.',
      eduScore: 88,
      natureHindi: 'ऊर्जावान, साहसी एवं निर्णयकारी स्वभाव। अत्यधिक जल्दबाजी या उतावलेपन पर नियंत्रण रखना हितकर होगा।',
      natureEnglish: 'Courageous and action-oriented. Keep impulsive tendencies balanced with calm reflection.',
      profHindi: 'कार्यक्षेत्र में नेतृत्व का अवसर मिलेगा। नई योजनाओं की शुरुआत और वरिष्ठ अधिकारियों से सहयोग प्राप्त होगा।',
      profEnglish: 'Executive leadership opportunities emerge. Favorable for launching strategic initiatives.',
      profScore: 92,
      wealthHindi: 'आर्थिक स्थिति सुदृढ़ होगी। पुराने निवेश से लाभ और नए व्यापारिक अनुबंध मिलने की प्रबल संभावना है।',
      wealthEnglish: 'Solid financial growth with positive yields from past investments.',
      wealthScore: 85,
      upaya: 'हनुमान चालीसा का पाठ करें और तांबे के लोटे से सूर्य देव को जल अर्पित करें।',
      mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः'
    },
    Taurus: {
      loveHindi: 'शुक्र की कृपा से दांपत्य जीवन में मधुरता और आकर्षण बढ़ेगा। साथी के साथ आनंददायक समय बीतेगा।',
      loveEnglish: 'Venus infuses romantic warmth, harmony, and mutual appreciation into relationships.',
      loveScore: 92,
      eduHindi: 'रचनात्मक विषयों, कला, वाणिज्य और वित्त के छात्रों के लिए उत्कृष्ट प्रदर्शन का समय है।',
      eduEnglish: 'Exceptional performance in arts, finance, architecture, and creative sciences.',
      eduScore: 86,
      natureHindi: 'धैर्यवान, सुरुचिपूर्ण, स्थिर और विश्वसनीय स्वभाव। हठधर्मी विचारों से बचकर लचीलापन अपनाएं।',
      natureEnglish: 'Reliable, patient, and grounded. Cultivate flexibility against rigid perspectives.',
      profHindi: 'स्थिर प्रगति के योग हैं। बैंकिंग, डिजाइन, रियल एस्टेट और विलासिता व्यापार में विशेष सफलता मिलेगी।',
      profEnglish: 'Steady career advancement in design, corporate commerce, real estate, and finance.',
      profScore: 89,
      wealthHindi: 'धन संचय में वृद्धि होगी। भौतिक सुख-सुविधाओं और आभूषणों पर शुभ व्यय के संकेत हैं।',
      wealthEnglish: 'Stable accumulation of assets and investments in long-term value.',
      wealthScore: 90,
      upaya: 'शुक्रवार को माता लक्ष्मी को सफेद मिठाई या मिश्री अर्पित करें।',
      mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः'
    },
    Gemini: {
      loveHindi: 'संवाद और वैचारिक तालमेल से संबंधों में नई ताजगी आएगी। गलतफहमियों को खुलकर बात करके दूर करें।',
      loveEnglish: 'Intellectual banter and active communication rejuvenate romantic and marital ties.',
      loveScore: 82,
      eduHindi: 'कोडिंग, भाषा विज्ञान, पत्रकारिता व डेटा विश्लेषण में अध्ययनरत छात्रों को शानदार सफलता मिलेगी।',
      eduEnglish: 'Stellar academic progress in computer science, languages, media, and data research.',
      eduScore: 94,
      natureHindi: 'तीव्र बुद्धि, मिलनसार, जिज्ञासु और बहुमुखी प्रतिभा के धनी। विचारों के भटकाव पर अंकुश लगाएं।',
      natureEnglish: 'Curious, articulate, and versatile. Anchor focus to avoid cognitive restlessness.',
      profHindi: 'नेटवर्किंग, मीडिया, सॉफ्टवेयर और व्यापार में नए अवसर प्राप्त होंगे। यात्राएं लाभप्रद रहेंगी।',
      profEnglish: 'Thriving prospects in technology architecture, communications, and digital consulting.',
      profScore: 91,
      wealthHindi: 'आय के एक से अधिक स्रोत विकसित होंगे। बुद्धिमत्तापूर्ण निवेश से धन लाभ होगा।',
      wealthEnglish: 'Multiple inflow channels develop through strategic advisory and tech contracts.',
      wealthScore: 84,
      upaya: 'भगवान गणेश को दूर्वा अर्पित करें और संकटनाशन स्तोत्र का पाठ करें।',
      mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः'
    },
    Cancer: {
      loveHindi: 'चंद्रमा का प्रभाव भावनात्मक गहराई प्रदान करेगा। परिवार व जीवनसाथी के प्रति समर्पण सुखद रहेगा।',
      loveEnglish: 'Deep emotional resonance and protective tenderness enhance domestic happiness.',
      loveScore: 90,
      eduHindi: 'चिकित्सा, मनोविज्ञान, रसायन विज्ञान और समाजशास्त्र में शोधार्थियों के लिए अनुकूल समय है।',
      eduEnglish: 'High grasping power in biology, medicine, psychology, and public administration.',
      eduScore: 87,
      natureHindi: 'संवेदनशील, करुणामय, अंतर्ज्ञानी और परोपकारी। अति-भावुकता में निर्णय लेने से बचें।',
      natureEnglish: 'Intuitive, empathetic, and nurturing. Guard against emotional over-sensitivity.',
      profHindi: 'मानव संसाधन, जन-कल्याण, चिकित्सा और सलाहकार सेवाओं में आपकी प्रतिष्ठा में वृद्धि होगी।',
      profEnglish: 'Stellar reputation growth in healthcare, HR leadership, and public sector advisory.',
      profScore: 88,
      wealthHindi: 'गृह-निर्माण या वाहन संबंधी योजनाओं में धन का सदुपयोग होगा। बचत में स्थिरता आएगी।',
      wealthEnglish: 'Gains utilized in home enhancements, vehicles, or secure fixed-income bonds.',
      wealthScore: 86,
      upaya: 'सोमवार को शिवलिंग पर कच्चा दूध व जल अर्पित करें और ॐ नमः शिवाय का जप करें।',
      mantra: 'ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः'
    },
    Leo: {
      loveHindi: 'प्रेम संबंधों में गरिमा और निष्ठा रहेगी। अपने साथी की भावनाओं का आदर करें और अहंकार त्यागें।',
      loveEnglish: 'Noble loyalty in relationships. Practice humble empathy to nurture your partner.',
      loveScore: 86,
      eduHindi: 'सिविल सर्विसेज, कानून, प्रशासन व प्रबंधन की प्रतियोगी परीक्षाओं में शीर्ष स्थान के योग हैं।',
      eduEnglish: 'Exceptional competitive prowess in administrative, legal, and public examinations.',
      eduScore: 93,
      natureHindi: 'तेजस्वी, स्वाभिमानी, उदार और जन्मजात नेता। दूसरों को प्रेरित करने की स्वाभाविक क्षमता।',
      natureEnglish: 'Magnificent, honorable, and visionary. Natural capacity to inspire and organize teams.',
      profHindi: 'प्रशासनिक व उच्च प्रबंधकीय पदों पर पदोन्नति के योग। सरकारी कार्यों में सफलता प्राप्त होगी।',
      profEnglish: 'High executive promotion potential and fruitful breakthroughs in public administration.',
      profScore: 95,
      wealthHindi: 'राजकीय या कॉर्पोरेट सम्मान के साथ वित्तीय लाभ। दीर्घकालिक परिसंपत्तियों में वृद्धि।',
      wealthEnglish: 'Prestigious rewards and lucrative long-term financial expansion.',
      wealthScore: 91,
      upaya: 'प्रतिदिन प्रातः आदित्य हृदय स्तोत्र का पाठ करें और गायत्री मंत्र जपें।',
      mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः'
    },
    Virgo: {
      loveHindi: 'व्यावहारिक समझदारी से पारिवारिक सामंजस्य बना रहेगा। छोटी बातों में नुक्ताचीनी से बचें।',
      loveEnglish: 'Practical understanding preserves marital peace. Avoid over-critical tendencies.',
      loveScore: 83,
      eduHindi: 'गणित, लेखांकन (Accounting), शोध और चिकित्सा शिक्षा में विश्लेषणात्मक मेधा का उत्कृष्ट उपयोग।',
      eduEnglish: 'Analytical brilliance in mathematics, CA, accounting, and empirical research.',
      eduScore: 95,
      natureHindi: 'व्यवस्थित, परिश्रमी, विश्लेषक और कर्तव्यनिष्ठ। अत्यधिक चिंता करने से बचें।',
      natureEnglish: 'Systematic, meticulous, and conscientious. Manage chronic stress with mindfulness.',
      profHindi: 'डेटा, ऑडिट, परामर्श और तकनीकी क्षेत्र में आपकी विशेषज्ञता की व्यापक सराहना होगी।',
      profEnglish: 'Widespread acclaim for domain expertise in systems audit, tech engineering, and ops.',
      profScore: 90,
      wealthHindi: 'नियोजित बजट से अनावश्यक व्ययों पर नियंत्रण रहेगा। आकस्मिक बचत के अवसर मिलेंगे।',
      wealthEnglish: 'Impeccable budget discipline curbs waste, creating healthy surplus liquidity.',
      wealthScore: 88,
      upaya: 'बुधवार को हरी मूंग दाल का दान करें और श्री विष्णु सहस्रनाम का पाठ करें।',
      mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः'
    },
    Libra: {
      loveHindi: 'सप्तम भाव में शुक्र का सकारात्मक प्रभाव वैवाहिक जीवन में प्रेम, सौहार्द और संतुलन लाएगा।',
      loveEnglish: 'Harmonious Venusian balance brings mutual devotion, elegance, and romantic joy.',
      loveScore: 94,
      eduHindi: 'लॉ, अंतरराष्ट्रीय संबंध, फैशन, डिजाइन व कला के क्षेत्र में विशेष मेधा का प्रदर्शन।',
      eduEnglish: 'Superb aptitude in law, corporate arbitration, design, and international studies.',
      eduScore: 89,
      natureHindi: 'न्यायप्रिय, कूटनीतिक, कलाप्रेमी और सौम्य। अनिर्णय की स्थिति से बाहर निकलें।',
      natureEnglish: 'Diplomatic, equitable, and refined. Cultivate swift decisiveness.',
      profHindi: 'साझेदारी के व्यापार, जनसंपर्क और कॉर्पोरेट मध्यस्थता में भारी सफलता के योग हैं।',
      profEnglish: 'Outstanding success in joint ventures, client relations, and commercial mediation.',
      profScore: 92,
      wealthHindi: 'व्यापारिक अनुबंधों और रचनात्मक परियोजनाओं से निरंतर धन प्रवाह बना रहेगा।',
      wealthEnglish: 'Continuous inflow from lucrative partnerships and creative commercial ventures.',
      wealthScore: 89,
      upaya: 'श्री सूक्तम् का पाठ करें और सुगंधित इत्र का प्रयोग करें।',
      mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः'
    },
    Scorpio: {
      loveHindi: 'गहन भावनात्मक निष्ठा रहेगी। साथी के प्रति संदेह से बचें और विश्वास को सुदृढ़ बनाएं।',
      loveEnglish: 'Deep and intense devotion. Strengthen transparent trust with your significant other.',
      loveScore: 85,
      eduHindi: 'गूढ़ विज्ञान, ज्योतिष, साइबर सुरक्षा, रक्षा तकनीक और औषधि विज्ञान में गहन अध्ययन।',
      eduEnglish: 'Profound aptitude in cybersecurity, forensic sciences, deep tech, and occult research.',
      eduScore: 91,
      natureHindi: 'दृढ़निश्चयी, रहस्यमयी, तीव्र अंतर्ज्ञानी और अदम्य साहसी। प्रतिशोध की भावना से बचें।',
      natureEnglish: 'Resilient, intuitive, and enigmatic. Transform intense energy into creative mastery.',
      profHindi: 'अनुसंधान, रक्षा, सर्जरी, रियल एस्टेट व स्वतंत्र उपक्रमों में अप्रत्याशित सफलता।',
      profEnglish: 'Breakthrough gains in investigative research, engineering, and independent ventures.',
      profScore: 93,
      wealthHindi: 'विरासत या गुप्त स्रोतों से धन लाभ के योग। जोखिम भरे निवेश में सावधानी रखें।',
      wealthEnglish: 'Gains through strategic long-term ventures and unexpected asset appreciation.',
      wealthScore: 87,
      upaya: 'मंगलवार को सुंदरकांड का पाठ करें और लाल मसूर की दाल का दान करें।',
      mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः'
    },
    Sagittarius: {
      loveHindi: 'गुरु के शुभ प्रभाव से वैवाहिक जीवन में सुख, सम्मान और आध्यात्मिक चेतना का संचार होगा।',
      loveEnglish: 'Jupiterian blessings bring spiritual harmony, intellectual depth, and joy to love.',
      loveScore: 91,
      eduHindi: 'उच्च शिक्षा, दर्शनशास्त्र, कानून, वैदिक अध्ययन व शोध में राष्ट्रीय/अंतरराष्ट्रीय मान्यता।',
      eduEnglish: 'Excellence in higher education, philosophy, judicial studies, and global research.',
      eduScore: 96,
      natureHindi: 'आशावादी, दार्शनिक, सत्यनिष्ठ और स्वतंत्र चेता। अति-उदारता में सीमाएं न भूलें।',
      natureEnglish: 'Optimistic, philosophical, and truth-seeking. Maintain practical financial boundaries.',
      profHindi: 'परामर्श, शिक्षा, न्यायपालिका और अंतरराष्ट्रीय संस्थाओं में उच्च पद की प्राप्ति।',
      profEnglish: 'Elevation to distinguished advisory, educational, legal, or ministerial roles.',
      profScore: 94,
      wealthHindi: 'भाग्य की अनुकूलता से धन में वृद्धि। धार्मिक एवं लोकोपकारी कार्यों पर शुभ व्यय।',
      wealthEnglish: 'Fortuitous wealth expansion through righteous enterprise and global projects.',
      wealthScore: 92,
      upaya: 'गुरुवार को केले के वृक्ष पर जल चढ़ाएं और श्री गुरु स्तोत्र का पाठ करें।',
      mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः'
    },
    Capricorn: {
      loveHindi: 'धैर्य और जिम्मेदारी से रिश्तों में स्थिरता आएगी। साथी को पर्याप्त समय और भावनात्मक समर्थन दें।',
      loveEnglish: 'Grounded stability and mature devotion create enduring marital strength.',
      loveScore: 85,
      eduHindi: 'इंजीनियरिंग, भूगर्भ विज्ञान, औद्योगिक प्रबंधन व सीए की पढ़ाई में कठिन परिश्रम का फल मिलेगा।',
      eduEnglish: 'Tenacious perseverance yields top honors in engineering, finance, and industrial ops.',
      eduScore: 90,
      natureHindi: 'अनुशासित, व्यावहारिक, महत्वाकांक्षी और गंभीर। कार्य के दबाव में निजी जीवन की उपेक्षा न करें।',
      natureEnglish: 'Disciplined, pragmatic, and ambitious. Balance workload with restorative leisure.',
      profHindi: 'कठिन परिश्रम से उच्च पद व सामाजिक प्रतिष्ठा का निर्माण। दीर्घकालिक परियोजनाओं में सफलता।',
      profEnglish: 'Stalwart ascent to executive leadership through unwavering institutional discipline.',
      profScore: 95,
      wealthHindi: 'अचल संपत्ति, भूमि और सुरक्षित निवेश से धन में निरंतर वृद्धि होगी।',
      wealthEnglish: 'Solid real-estate equity growth and steadily compounding financial stability.',
      wealthScore: 93,
      upaya: 'शनिवार को दशरथ कृत शनि स्तोत्र का पाठ करें और पीपल के वृक्ष पर दीप प्रज्वलित करें।',
      mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः'
    },
    Aquarius: {
      loveHindi: 'मित्रतापूर्ण और बौद्धिक संबंध मजबूत होंगे। साथी को व्यक्तिगत स्वतंत्रता और सम्मान दें।',
      loveEnglish: 'Progressive, friendship-based romantic harmony with mutual intellectual respect.',
      loveScore: 87,
      eduHindi: 'एआई, डेटा साइंस, अंतरिक्ष विज्ञान, इलेक्ट्रॉनिक्स व सामाजिक शोध में नवीन कीर्तिमान।',
      eduEnglish: 'Pioneering achievements in AI, astrophysics, electronics, and global sociology.',
      eduScore: 94,
      natureHindi: 'दूरदर्शी, मानवतावादी, नवोन्मेषी और स्वतंत्र विचारक। एकाकीपन की प्रवृत्ति से बचें।',
      natureEnglish: 'Visionary, humanitarian, and original. Channel abstract ideas into tangible social good.',
      profHindi: 'तकनीकी अनुसंधान, एनजीओ, वैश्विक स्टार्टअप्स और नवाचार में अग्रदूत की भूमिका।',
      profEnglish: 'Trailblazing leadership in cutting-edge tech startups, NGOs, and innovation labs.',
      profScore: 93,
      wealthHindi: 'डिजिटल उपक्रमों और वैश्विक नेटवर्क से अप्रत्याशित वित्तीय लाभ के योग।',
      wealthEnglish: 'Significant upside from digital products, IP patents, and global networks.',
      wealthScore: 90,
      upaya: 'शनिवार को काले तिल और सरसों के तेल का दान करें तथा हनुमान चालीसा पढ़ें।',
      mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः'
    },
    Pisces: {
      loveHindi: 'आत्मीय प्रेम और समर्पण का अनुभव होगा। साथी के साथ आध्यात्मिक व मानसिक जुड़ाव गहराएगा।',
      loveEnglish: 'Deep soulful devotion and empathetic unity enrich marital and romantic bonds.',
      loveScore: 93,
      eduHindi: 'साहित्य, ललित कला, चिकित्सा, योग विज्ञान और अध्यात्म में असाधारण अध्ययन क्षमता।',
      eduEnglish: 'Exceptional creative depth in literature, fine arts, medicine, and yogic sciences.',
      eduScore: 92,
      natureHindi: 'दयालु, कल्पनाशक, आध्यात्मिक और त्यागी। अव्यावहारिक दिवास्वप्नों से बचें।',
      natureEnglish: 'Compassionate, imaginative, and spiritually attuned. Ground aspirations with real discipline.',
      profHindi: 'काउंसलिंग, कला, अस्पताल, परोपकार और विदेशी व्यापार में व्यापक ख्याति।',
      profEnglish: 'Luminous acclaim in wellness counseling, creative media, healthcare, and overseas trade.',
      profScore: 91,
      wealthHindi: 'आध्यात्मिक शांति के साथ स्थिर धन प्रवाह। परोपकार में किया गया व्यय आत्मसंतुष्टि देगा।',
      wealthEnglish: 'Generous financial abundance harmonized by charitable giving and ethical commerce.',
      wealthScore: 89,
      upaya: 'गुरुवार को भगवान विष्णु की पूजा करें और पीले वस्त्र धारण करें।',
      mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः'
    }
  };

  const currentForecast = SIGN_FORECASTS[selectedSign.name] || SIGN_FORECASTS['Aries'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Moon className="w-3.5 h-3.5 text-blue-400" />
          सटीक वैदिक राशिफल एवं भविष्यफल
        </div>
        <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
          {t('todayHoroscope')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2">
          12 राशियों का प्रेम, शिक्षा, स्वभाव, करियर एवं आर्थिक फलित विश्लेषण (Accurate Vedic Forecast)
        </p>
      </div>

      {/* 12 Zodiac Sign Grid Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
        {ZODIAC_SIGNS.map((sign, idx) => {
          const isSelected = selectedSignIndex === idx;
          return (
            <button
              key={sign.name}
              onClick={() => setSelectedSignIndex(idx)}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center border transition-all ${
                isSelected
                  ? 'bg-gradient-to-b from-amber-500 to-yellow-600 text-stone-950 border-amber-300 shadow-lg shadow-amber-500/25 scale-105'
                  : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-amber-500/40 hover:bg-stone-800'
              }`}
            >
              <span className="text-xl mb-1">{sign.symbol}</span>
              <span className="text-xs font-bold font-cinzel truncate w-full text-center">
                {sign.name}
              </span>
              <span className={`text-[9px] ${isSelected ? 'text-stone-950 font-bold' : 'text-stone-500'}`}>
                {sign.sanskrit}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timeframe Tabs */}
      <div className="flex justify-center gap-2">
        {[
          { id: 'today', label: 'आज (Today)' },
          { id: 'tomorrow', label: 'कल (Tomorrow)' },
          { id: 'weekly', label: 'साप्ताहिक (Weekly)' },
          { id: 'monthly', label: 'मासिक (Monthly)' },
          { id: 'yearly', label: 'वार्षिक 2026-2027 (Yearly)' }
        ].map(tf => (
          <button
            key={tf.id}
            onClick={() => setTimeframe(tf.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              timeframe === tf.id
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Main Horoscope Card */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Sign Header Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-stone-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shadow-inner">
              {selectedSign.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold font-cinzel text-amber-200">
                  {selectedSign.name} ({selectedSign.sanskrit})
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-xs font-medium border border-stone-700">
                  राशि स्वामी: {selectedSign.lord}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ElementIcon className="w-3.5 h-3.5 text-amber-400" /> {selectedSign.element} तत्व
                </span>
                <span>•</span>
                <span>वैदिक राशि: {selectedSign.sanskrit}</span>
              </p>
            </div>
          </div>

          {/* Lucky Attributes Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs w-full sm:w-auto">
            <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700 text-center">
              <span className="text-[10px] text-stone-400 block font-semibold">शुभ अंक (Lucky No)</span>
              <span className="font-bold text-amber-400 text-sm">{(selectedSignIndex * 3 + 7) % 9 + 1}</span>
            </div>
            <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700 text-center">
              <span className="text-[10px] text-stone-400 block font-semibold">शुभ रंग (Lucky Color)</span>
              <span className="font-bold text-amber-300 text-xs">
                {['लाल (Crimson)', 'सफेद (White)', 'हरा (Emerald)', 'चमकीला सफेद (Silver)', 'केसरिया (Amber)', 'गहरा हरा (Dark Green)', 'गुलाबी (Pink)', 'गहरा लाल (Maroon)', 'पीला (Yellow)', 'नीला (Blue)', 'आसमानी (Sky Blue)', 'हल्दी पीला (Golden Yellow)'][selectedSignIndex]}
              </span>
            </div>
            <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700 text-center">
              <span className="text-[10px] text-stone-400 block font-semibold">शुभ समय (Auspicious Time)</span>
              <span className="font-bold text-amber-400 text-xs">09:15 AM - 11:30 AM</span>
            </div>
            <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700 text-center">
              <span className="text-[10px] text-stone-400 block font-semibold">शुभ दिशा (Direction)</span>
              <span className="font-bold text-amber-300 text-xs">पूर्व / उत्तर-पूर्व</span>
            </div>
          </div>
        </div>

        {/* Life Pillars Score Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'प्रेम व संबंध (Love)', score: currentForecast.loveScore, icon: Heart, color: 'text-rose-400', bar: 'bg-rose-500' },
            { label: 'शिक्षा व मेधा (Education)', score: currentForecast.eduScore, icon: GraduationCap, color: 'text-blue-400', bar: 'bg-blue-500' },
            { label: 'करियर व नौकरी (Career)', score: currentForecast.profScore, icon: Briefcase, color: 'text-amber-400', bar: 'bg-amber-500' },
            { label: 'धन व संपत्ति (Wealth)', score: currentForecast.wealthScore, icon: Wallet, color: 'text-emerald-400', bar: 'bg-emerald-500' }
          ].map(pillar => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.label} className="bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${pillar.color}`} />
                    <span className="text-xs font-semibold text-stone-300">{pillar.label}</span>
                  </div>
                  <span className="font-bold text-xs text-stone-100">{pillar.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-700 rounded-full overflow-hidden">
                  <div className={`h-full ${pillar.bar} rounded-full`} style={{ width: `${pillar.score}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-800">
          {[
            { id: 'all', label: 'संपूर्ण फलित (All)' },
            { id: 'love', label: '💖 प्रेम व संबंध (Love)' },
            { id: 'education', label: '🎓 शिक्षा व विद्या (Education)' },
            { id: 'nature', label: '🧠 स्वभाव व मन (Nature)' },
            { id: 'profession', label: '💼 करियर व व्यापार (Career)' },
            { id: 'wealth', label: '💰 धन व वित्त (Wealth)' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Detailed Astrological Sector Narratives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Love */}
          {(selectedCategory === 'all' || selectedCategory === 'love') && (
            <div className="bg-stone-900/80 border border-rose-500/20 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm font-cinzel">
                <Heart className="w-4 h-4" />
                <span>प्रेम एवं वैवाहिक संबंध (Love & Relationships)</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-sans">
                {currentForecast.loveHindi}
              </p>
              <p className="text-xs text-stone-400 italic">
                {currentForecast.loveEnglish}
              </p>
            </div>
          )}

          {/* Education */}
          {(selectedCategory === 'all' || selectedCategory === 'education') && (
            <div className="bg-stone-900/80 border border-blue-500/20 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm font-cinzel">
                <GraduationCap className="w-4 h-4" />
                <span>शिक्षा, विद्या एवं मेधा (Education & Intellect)</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-sans">
                {currentForecast.eduHindi}
              </p>
              <p className="text-xs text-stone-400 italic">
                {currentForecast.eduEnglish}
              </p>
            </div>
          )}

          {/* Nature */}
          {(selectedCategory === 'all' || selectedCategory === 'nature') && (
            <div className="bg-stone-900/80 border border-emerald-500/20 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-cinzel">
                <Brain className="w-4 h-4" />
                <span>स्वभाव एवं मनोदशा (Nature & Personality)</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-sans">
                {currentForecast.natureHindi}
              </p>
              <p className="text-xs text-stone-400 italic">
                {currentForecast.natureEnglish}
              </p>
            </div>
          )}

          {/* Profession */}
          {(selectedCategory === 'all' || selectedCategory === 'profession') && (
            <div className="bg-stone-900/80 border border-amber-500/20 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-cinzel">
                <Briefcase className="w-4 h-4" />
                <span>करियर, नौकरी व व्यापार (Career & Profession)</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-sans">
                {currentForecast.profHindi}
              </p>
              <p className="text-xs text-stone-400 italic">
                {currentForecast.profEnglish}
              </p>
            </div>
          )}

          {/* Wealth */}
          {(selectedCategory === 'all' || selectedCategory === 'wealth') && (
            <div className="bg-stone-900/80 border border-stone-800 p-5 rounded-2xl space-y-2 md:col-span-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-cinzel">
                <Wallet className="w-4 h-4" />
                <span>धन, वित्त एवं संपत्ति (Wealth & Finances)</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-sans">
                {currentForecast.wealthHindi}
              </p>
              <p className="text-xs text-stone-400 italic">
                {currentForecast.wealthEnglish}
              </p>
            </div>
          )}
        </div>

        {/* Daily Vedic Upaya & Mantra Banner */}
        <div className="bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border border-amber-500/40 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm font-cinzel">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>दैनिक शुभ वैदिक उपाय एवं मंत्र (Daily Astrological Remedy & Mantra)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">सटीक दैनिक उपाय:</span>
              <p className="text-stone-200 font-semibold">{currentForecast.upaya}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">राशि स्वामी बीज मंत्र (108 बार जप):</span>
              <p className="text-amber-200 font-mono font-bold bg-stone-900 p-2 rounded-lg border border-stone-800">{currentForecast.mantra}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
